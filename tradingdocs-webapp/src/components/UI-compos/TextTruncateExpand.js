import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const TextTruncateExpand = ({
	text,
	maxLength = 28,
	canExpand = true,
	...props
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const handleToggle = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<div>
			<Typography {...props.sx}>
				{isExpanded
					? text
					: text.length > maxLength
					? `${text.substring(0, maxLength)}..`
					: text}
				{canExpand && text.length > maxLength && (
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
