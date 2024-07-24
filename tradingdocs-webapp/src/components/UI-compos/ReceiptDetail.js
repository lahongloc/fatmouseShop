import React from "react";
import {
	Container,
	Typography,
	Grid,
	Paper,
	Box,
	Divider,
	Avatar,
	Card,
	CardContent,
	CardMedia,
	Breadcrumbs,
	Chip,
	Alert,
	Tooltip,
	Badge,
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ContactEmergencyOutlinedIcon from "@mui/icons-material/ContactEmergencyOutlined";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import { styled } from "@mui/system";

const CustomChip = styled(Chip)(({ theme }) => ({
	marginRight: theme.spacing(1),
	marginBottom: theme.spacing(1),
}));

const ReceiptDetail = ({ orderData }) => {
	return (
		<Container maxWidth="md" sx={{ mt: 5 }}>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ mb: 1.5, color: blue[800] }}
			>
				<Chip
					icon={<ReceiptLongIcon />}
					color="primary"
					label="THÔNG TIN HÓA ĐƠN"
					sx={{ p: 0.75 }}
				/>
			</Typography>
			<Grid item xs={6}>
				<Card
					variant="outlined"
					sx={{
						display: "flex",
						mb: 2,
						justifyContent: "space-between",
					}}
				>
					<CardMedia
						component="img"
						sx={{
							width: 120,
							height: 160,
							padding: 2,
							objectFit: "cover",
						}}
						image={orderData.post.image}
						alt={orderData.post.documentName}
					/>

					<CardContent sx={{ flex: 1 }}>
						{/* <Typography></Typography> */}
						<Badge
							badgeContent={orderData.transactionType.name}
							color="success"
							sx={{ textTransform: "uppercase" }}
						>
							<Typography
								variant="h6"
								sx={{
									textTransform: "uppercase",
									fontWeight: 600,
									width: "max-content",
									pt: 1,
								}}
								gutterBottom
							>
								{orderData.post.documentName}
							</Typography>
						</Badge>

						<Typography variant="body2">
							Số lượng: {orderData.quantity}
						</Typography>
						<Typography variant="body2" gutterBottom>
							Giá:{" "}
							{orderData.post.price
								? orderData.post.price.toLocaleString("vi-VN", {
										style: "currency",
										currency: "VND",
								  })
								: "0"}
						</Typography>
					</CardContent>
					<CardContent sx={{ flex: 1 }}>
						<Alert
							// sx={{ width: "max-content" }}
							icon={false}
							severity="success"
						>
							<Typography
								variant="h6"
								gutterBottom
								sx={{ color: green[600] }}
							>
								Địa Điểm Nhận Hàng <PlaceOutlinedIcon />
							</Typography>
							<Typography variant="body1">
								{orderData.post.place}
							</Typography>
						</Alert>
					</CardContent>
				</Card>
			</Grid>

			<Grid container spacing={2}>
				{/* Buyer Information */}
				<Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: green[600] }}
						>
							Thông Tin Người Mua <ContactEmergencyOutlinedIcon />
						</Typography>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Avatar sx={{ bgcolor: green[500] }}>
									{orderData.buyer.fullName[0]}
								</Avatar>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									{orderData.buyer.fullName}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{orderData.buyer.email}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{orderData.buyer.hotline}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				{/* Seller Information */}
				<Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: red[600] }}
						>
							Thông Tin Người Bán <ContactMailOutlinedIcon />
						</Typography>
						<Grid container spacing={2} alignItems="center">
							<Grid item>
								<Avatar sx={{ bgcolor: red[500] }}>
									{orderData.post.user.fullName[0]}
								</Avatar>
							</Grid>
							<Grid item>
								<Typography variant="body1">
									{orderData.post.user.fullName}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{orderData.post.user.email}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
								>
									{orderData.post.user.hotline}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>

				{/* Payment Information */}
				<Grid item xs={12}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: blue[600], mb: 1 }}
						>
							Thông Tin Thanh Toán <PaymentOutlinedIcon />
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={6}>
								<Typography variant="body1">
									Tổng Tiền Hàng
								</Typography>
							</Grid>
							<Grid item xs={6} sx={{ textAlign: "right" }}>
								<Typography
									variant="body1"
									sx={{ fontWeight: "bold" }}
								>
									{orderData.totalPrice.toLocaleString(
										"vi-VN",
										{
											style: "currency",
											currency: "VND",
										},
									)}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			</Grid>
		</Container>
	);
};

export default ReceiptDetail;
