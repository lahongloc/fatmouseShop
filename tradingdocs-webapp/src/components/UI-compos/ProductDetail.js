import React, { useContext, useState } from "react";
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
	Tooltip,
	Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import cookie from "react-cookies";
import { UserContext } from "../../App";

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

const avatarStyle = {
	backgroundColor: "#1976d2",
};

const ProductDetail = ({ product }) => {
	const [user, dispatch] = useContext(UserContext);
	const [purchaseQuantity, setPurchaseQuantity] = useState(1);
	const [error, setError] = useState("");
	const [msg, setMsg] = useState({
		status: false,
		msg: "",
	});

	const navigate = useNavigate();

	const handlePurchaseQuantityChange = (event) => {
		const value = parseInt(event.target.value, 10);
		if (value > product.quantity) {
			setError(
				"Số lượng mua không được lớn hơn số lượng sản phẩm có sẵn.",
			);
		} else if (value <= 0 || isNaN(value)) {
			setError("Số lượng phải lớn hơn 0.");
			setPurchaseQuantity(value);
		} else {
			setError("");
			setPurchaseQuantity(value);
		}
	};

	return (
		<Container maxWidth="lg" sx={{ marginTop: 14 }}>
			<Paper elevation={3} sx={{ padding: 4 }}>
				<Grid container spacing={10}>
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
								style={avatarStyle}
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
						<Typography
							sx={{ textTransform: "uppercase", fontWeight: 700 }}
							variant="h4"
							gutterBottom
						>
							{product.documentName}{" "}
						</Typography>
						<Typography
							sx={{ marginBottom: 2 }}
							variant="body1"
							color="textSecondary"
							gutterBottom
						>
							<Alert icon={false} severity="info">
								{product.description}
							</Alert>
						</Typography>

						<Typography variant="body1">
							<CustomChip
								label={`Loại giao dịch: ${product.postType.name}`}
							/>
							<CustomChip
								label={`Độ bền: ${
									product.durability
										? "Còn mới"
										: "Đã sử dụng"
								}`}
							/>
							<Tooltip title={product.category.description}>
								<CustomChip
									label={`Loại tài liệu: ${product.category.name}`}
								/>
							</Tooltip>
						</Typography>

						<Typography variant="body1" gutterBottom>
							Giảng viên: {product.lecturer}
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
								label={
									product.price
										? `₫${product.price.toLocaleString(
												"vi-VN",
										  )}`
										: `₫${"0".toLocaleString("vi-VN")}`
								}
							/>
						</Box>

						{msg.status && (
							<Alert
								className="animate__animated animate__wobble"
								sx={{
									marginTop: 5,
									marginBottom: 5,
								}}
								severity="warning"
							>
								{msg.msg}
							</Alert>
						)}
						<Typography variant="body1" gutterBottom>
							Số lượng có sẵn: {product.quantity}
						</Typography>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								marginBottom: 2,
								marginTop: 1.5,
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
								sx={{ marginRight: 2, width: "30%" }}
							/>

							<Button
								disabled={error}
								onClick={() => {
									if (user) {
										let receipt = {
											postId: product._id,
											userId: user.user.id,
											quantity: purchaseQuantity,
										};

										const receiptId = `receipt${
											receipt.postId +
											receipt.userId +
											receipt.quantity
										}`;

										cookie.save(receiptId, receipt, {
											path: "/order-confirmation/",
										});
										cookie.save(receiptId, receipt, {
											path: "/post-detail",
										});

										// console.log(receipt);
										navigate(
											`/order-confirmation/?receiptId=${receiptId}`,
										);
									} else {
										setMsg({
											status: true,
											msg: "Vui lòng đăng nhập để đặt hàng!",
										});
										setTimeout(() => {
											setMsg({});
										}, 5000);
									}
								}}
								variant="contained"
								color="primary"
							>
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
