import React from "react";
import { Button, Typography, Box, Container } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { keyframes } from "@emotion/react";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
`;

const EmptyCart = ({ text }) => {
	return (
		<Container
			maxWidth="sm"
			sx={{
				padding: 4,
				marginTop: 8,
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				textAlign: "center",
			}}
		>
			<ShoppingCartIcon
				sx={{
					fontSize: 100,
					color: "#1976d2",
					animation: `${bounceAnimation} 2s infinite`,
				}}
			/>
			<Typography
				variant="h6"
				gutterBottom
				sx={{ marginTop: 2, color: "#1976d2", fontWeight: "bold" }}
			>
				{text}
			</Typography>
			<Button
				variant="contained"
				color="primary"
				href="/"
				sx={{
					marginTop: 2,
					padding: "10px 20px",
					backgroundColor: "#1976d2",
					"&:hover": {
						backgroundColor: "#1565c0",
					},
				}}
			>
				Quay về trang chủ
			</Button>
		</Container>
	);
};

export default EmptyCart;
