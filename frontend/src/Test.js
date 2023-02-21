import React, { useState, useRef } from "react";

function GridCanvas() {
	const canvasContainer = useRef(null);
	const [hexString, setHexString] = useState("");
	const [canvas, setCanvas] = useState(
		Array(16 * 16).fill({ color: "#000000", isFilled: false })
	);
	const [pickedColor, setPickedColor] = useState("#000000");

	const handleCellClick = (cellIndex) => {
		const newCanvas = [...canvas];

		newCanvas[cellIndex] = {
			...newCanvas[cellIndex],
			color: pickedColor,
			isFilled: true,
		};

		setCanvas(newCanvas);
	};

	const renderCell = (cellIndex) => {
		const { color, isFilled } = canvas[cellIndex];
		return (
			<div
				key={cellIndex}
				className="cell"
				style={{
					backgroundColor: color,
					height: "25px",
					width: "25px",
				}}
				onClick={() => handleCellClick(cellIndex)}
			>
				{isFilled && <div className="fill-overlay" />}
			</div>
		);
	};

	const renderRow = (startIndex, endIndex) => {
		return (
			<div key={startIndex} className="row">
				{Array(endIndex - startIndex + 1)
					.fill(null)
					.map((_, i) => renderCell(startIndex + i))}
			</div>
		);
	};
	const handleColorChange = (event) => {
		setPickedColor(event.target.value);
	};
	const handleExportBMP = () => {
		// console.log(canvas)
		let hexArray = [];
		for (let i = 0; i < canvas.length; i++) {
			const { color } = canvas[i];
			const binaryValue = color === "#FFFFFF" ? "1" : "0";
			hexArray.push(binaryValue);
		}
		hexArray = hexArray.join("");
		const hexString = hexArray
			.match(/.{1,8}/g)
			.map((byte) => parseInt(byte, 2).toString(16));
		setHexString(hexString);
	};
	

	return (
		<div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
			<div className="color-picker-container">		
				<label>
					<input
						type="radio"
						name="color"
						value="#000000"
						onChange={handleColorChange}
					/>
					Black
				</label>
				<label>
					<input
						type="radio"
						name="color"
						value="#FFFFFF"
						onChange={handleColorChange}
					/>{" "}
					White
				</label>
			</div>
			<div ref={canvasContainer} className="canvas">
				{Array(16)
					.fill(null)
					.map((_, i) => renderRow(i * 16, i * 16 + 15))}
			</div>
			<button onClick={handleExportBMP}>Export to BMP</button>
			<p>Hex string: {hexString}</p>
			
		</div>
	);
}

export default GridCanvas;
