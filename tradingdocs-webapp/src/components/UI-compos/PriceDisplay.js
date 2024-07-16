import React from "react";
import Typography from "@mui/material/Typography";
import { Chip } from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

const PriceDisplay = ({ price }) => {
	const priceStyle = {
		fontSize: "1rem",
		fontWeight: "bold",
		// color: "red", // Màu sắc với opacity
	};

	// Định dạng số tiền thành tiền tệ
	const formattedPrice = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND", // Tiền tệ Việt Nam
	}).format(price);

	return (
		<Typography component="div">
			<Chip
				color="success"
				variant="outlined"
				icon={<MonetizationOnOutlinedIcon />}
				label={<span style={priceStyle}>Giá: {formattedPrice}</span>}
			/>
		</Typography>
	);
};

export default PriceDisplay;
