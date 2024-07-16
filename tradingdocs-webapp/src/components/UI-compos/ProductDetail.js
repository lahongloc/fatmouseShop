import React, { useState } from "react";
import {
	Container,
	Grid,
	Paper,
	Typography,
	Avatar,
	Chip,
	Box,
	TextField,
	Button,
} from "@mui/material";
import { styled } from "@mui/system";

// Custom styled component for the price
const PriceChip = styled(Chip)(({ theme }) => ({
	backgroundColor: theme.palette.primary,
	color: theme.palette.primary,
	padding: "5px 10px",
	fontSize: "1.2rem",
	fontWeight: "bold",
}));

const CustomChip = styled(Chip)(({ theme }) => ({
	marginRight: theme.spacing(1),
	marginBottom: theme.spacing(1),
}));

const ProductDetail = ({ product }) => {
	const [purchaseQuantity, setPurchaseQuantity] = useState(1);
	const [error, setError] = useState("");

	const handlePurchaseQuantityChange = (event) => {
		const value = parseInt(event.target.value, 10);
		if (value > product.quantity) {
			setError(
				"Số lượng mua không được lớn hơn số lượng sản phẩm có sẵn.",
			);
		} else {
			setError("");
			setPurchaseQuantity(value);
		}
	};

	return (
		<Container maxWidth="lg" sx={{ marginTop: 14 }}>
			<Paper elevation={3} sx={{ padding: 4 }}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Box sx={{ textAlign: "center" }}>
							<Avatar
								variant="rounded"
								src={product.image}
								alt={product.documentName}
								sx={{
									width: "100%",
									height: "auto",
									marginBottom: 2,
								}}
							/>
						</Box>
					</Grid>
					<Grid
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
						item
						xs={12}
						md={6}
					>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								marginBottom: 2,
								marginTop: -5,
							}}
						>
							<Avatar
								src="/path/to/default-avatar.jpg"
								alt={product.user.username}
								sx={{ marginRight: 2 }}
							/>
							<Typography variant="h6">
								{product.user.username}
								<Typography
									variant="body1"
									color="textSecondary"
									gutterBottom
								>
									{new Date(
										product.createdAt,
									).toLocaleDateString("vi-VN", {
										year: "numeric",
										month: "long",
										day: "numeric",
									})}
								</Typography>
							</Typography>
						</Box>

						<Typography variant="h4">
							{product.documentName}{" "}
							<CustomChip
								// variant="outlined"
								label={`Loại giao dịch: ${product.postType.name}`}
								// color="primary"
							/>
							<CustomChip
								// variant="outlined"
								label={`Độ bền: ${
									product.durability
										? "Còn mới"
										: "Đã sử dụng"
								}`}
								// color="secondary"
							/>
						</Typography>

						<Typography
							variant="body1"
							color="textSecondary"
							gutterBottom
						>
							{product.description}
						</Typography>

						<Typography variant="body1" gutterBottom>
							Địa điểm: {product.place}
						</Typography>

						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								marginBottom: 2,
							}}
						>
							<Typography variant="body1" sx={{ marginRight: 1 }}>
								Giá:
							</Typography>
							<PriceChip
								label={`₫${product.price.toLocaleString(
									"vi-VN",
								)}`}
							/>
						</Box>

						<Typography variant="body1" gutterBottom>
							Số lượng có sẵn: {product.quantity}
						</Typography>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								marginBottom: 2,
							}}
						>
							<TextField
								label="Số lượng mua"
								variant="outlined"
								type="number"
								value={purchaseQuantity}
								onChange={handlePurchaseQuantityChange}
								error={!!error}
								helperText={error}
								inputProps={{ min: 1, max: product.quantity }}
								sx={{ marginRight: 2 }}
							/>
							<Button variant="contained" color="primary">
								Mua ngay
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Paper>
		</Container>
	);
};

export default ProductDetail;
