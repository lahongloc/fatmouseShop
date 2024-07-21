import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TextTruncateExpand = ({ text }) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div>
			<Typography>
				{isExpanded
					? text
					: text.length > 28
					? `${text.substring(0, 28)}...`
					: text}
				{text.length > 28 && (
					<span
						style={{ color: "blue", cursor: "pointer" }}
						onClick={handleToggle}
					>
						{isExpanded ? "Rút gọn" : "Xem thêm"}
					</span>
				)}
			</Typography>
			{/* {text.length > 30 && (
				<Button onClick={handleToggle}>
					{isExpanded ? "Rút gọn" : "Xem thêm"}
				</Button>
			)} */}
		</div>
	);
};

export default TextTruncateExpand;
