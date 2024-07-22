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
} from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import CustomizedBreadcrumbs from "../UI-compos/CustomizedBreadcrumbs";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const UpdateImage = ({ order }) => {
	const orderData = {
		_id: "669e3af22357c02d9fe2ebba",
		quantity: 1,
		totalPrice: 175000,
		createdAt: "2024-07-22T10:56:50.893Z",
		updatedAt: "2024-07-22T10:56:50.893Z",
		buyer: {
			_id: "669dd8dfb396b1c167b43c19",
			fullName: "Nguyễn Phước Vinh",
			email: "vinh123@gmail.com",
			hotline: "0245589358",
		},
		post: {
			_id: "669cf94b7711f058223bbea9",
			documentName: "Hack não tiếng anh",
			category: {
				_id: "669c85331618f7d1287bc338",
				type: "ORIGINAL",
				name: "Sách gốc",
				description: "Đây là sách nguyên bản, không phải sách photo",
			},
			postType: {
				_id: "669c85331618f7d1287bc33e",
				type: "SELL",
				name: "Bán",
			},
			price: 175000,
			image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/669cf8ce7711f058223bbea0Sun%20Jul%2021%202024%2019:04:25%20GMT%2B0700%20(Indochina%20Time)?_a=BAMADKTE0",
			place: "D205 OU Mail Thị Lựu",
			quantity: 0,
			user: {
				_id: "669cf8ce7711f058223bbea0",
				fullName: "Đỗ Thanh Phước",
				email: "phuoc@gmail.com",
				hotline: "0214454478",
			},
		},
	};

	return (
		<Container maxWidth="md" sx={{ mt: 5 }}>
			<Typography
				variant="h4"
				gutterBottom
				sx={{ mb: 2, color: blue[800] }}
			>
				<Chip
					icon={<ReceiptLongIcon />}
					color="primary"
					label="THÔNG TIN HÓA ĐƠN"
					// variant="outlined"
				/>
			</Typography>

			<Grid container spacing={2}>
				{/* Delivery Location */}
				<Grid item xs={12}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: blue[600] }}
						>
							Địa Điểm Nhận Hàng
						</Typography>
						<Typography variant="body1">
							{orderData.place}
						</Typography>
					</Paper>
				</Grid>

				{/* Buyer Information */}
				<Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: green[600] }}
						>
							Thông Tin Người Mua
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
							Thông Tin Người Bán
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

				{/* Product Information */}
				<Grid item xs={12}>
					<Card variant="outlined" sx={{ display: "flex", mb: 2 }}>
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
							<Typography variant="h6">
								{orderData.post.documentName}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Số lượng: {orderData.quantity}
							</Typography>
							<Typography variant="body2" color="textSecondary">
								Giá:{" "}
								{orderData.post.price.toLocaleString("vi-VN", {
									style: "currency",
									currency: "VND",
								})}
							</Typography>
						</CardContent>
					</Card>
				</Grid>

				{/* Payment Information */}
				<Grid item xs={12}>
					<Paper elevation={3} sx={{ padding: 2 }}>
						<Typography
							variant="h6"
							gutterBottom
							sx={{ color: blue[600], mb: 1 }}
						>
							Thông Tin Thanh Toán
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

export default UpdateImage;
