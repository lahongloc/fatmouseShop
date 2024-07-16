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
					: text.length > 35
					? `${text.substring(0, 35)}...`
					: text}
			</Typography>
			{text.length > 35 && (
				<Button onClick={handleToggle}>
					{isExpanded ? "Rút gọn" : "Hiển thị đầy đủ"}
				</Button>
			)}
		</div>
	);
};

export default TextTruncateExpand;
