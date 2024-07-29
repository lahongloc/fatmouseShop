import React from "react";
import {
	Box,
	Typography,
	Paper,
	Grid,
	Avatar,
	Divider,
	Card,
	CardContent,
	useTheme,
	Tooltip,
	Fade,
	Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const OrderDetailCard = ({ orderData }) => {
	const navigate = useNavigate();
	const theme = useTheme();
	return (
		<Box
			sx={{
				pt: 3,
				maxWidth: "900px",
				margin: "auto",
				// mt: 15,
				backgroundColor: theme.palette.background.default,
				color: theme.palette.text.primary,
				borderRadius: "12px",
				boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
			}}
		>
			<Typography
				variant="h5"
				gutterBottom
				sx={{
					color: theme.palette.primary.main,
					textAlign: "center",
					// fontWeight: "bold",
					marginBottom: "16px",
				}}
			>
				<Chip
					sx={{
						// color: theme.palette.primary.main,
						textAlign: "center",
						// fontWeight: "bold",
						fontSize: "1rem",
						// marginBottom: "16px",
					}}
					color="primary"
					icon={false}
					label="CHI TIẾT ĐƠN HÀNG"
				/>
			</Typography>
			<Paper
				elevation={3}
				sx={{
					padding: 3,
					backgroundColor: theme.palette.background.paper,
					borderRadius: "12px",
					boxShadow: "none",
				}}
			>
				<Grid container spacing={5}>
					<Grid item xs={12} md={6}>
						<Card
							sx={{
								// backgroundColor: "#f0f4c3",
								borderRadius: "8px",
								boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "scale(1.02)",
								},
								marginBottom: "16px",
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									sx={{
										color: theme.palette.secondary.main,
										fontWeight: "bold",
										marginBottom: "16px",
									}}
								>
									<Chip
										label="Thông tin người mua"
										color="primary"
										variant="outlined"
									/>
								</Typography>
								<Tooltip
									title="Tên người mua"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Tên:</strong>{" "}
										{orderData.buyerId.fullName}
									</Typography>
								</Tooltip>
								<Tooltip
									title="Email người mua"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Email:</strong>{" "}
										{orderData.buyerId.email}
									</Typography>
								</Tooltip>
								<Tooltip
									title="Hotline người mua"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Hotline:</strong>{" "}
										{orderData.buyerId.hotline}
									</Typography>
								</Tooltip>
							</CardContent>
						</Card>

						<Card
							sx={{
								// backgroundColor: "#fff9c4",
								borderRadius: "8px",
								boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "scale(1.02)",
								},
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									sx={{
										color: theme.palette.secondary.main,
										fontWeight: "bold",
										marginBottom: "16px",
									}}
								>
									<Chip
										label="Thông tin giao dịch"
										color="primary"
										variant="outlined"
									/>
								</Typography>
								<Tooltip
									title="Loại giao dịch"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Loại giao dịch:</strong>{" "}
										{orderData.transactionType.name}
									</Typography>
								</Tooltip>
								<Tooltip
									title="Tổng giá trị giao dịch"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Tổng giá:</strong>{" "}
										{orderData.totalPrice} VND
									</Typography>
								</Tooltip>
								<Tooltip
									title="Ngày tạo giao dịch"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Ngày tạo:</strong>{" "}
										{new Date(
											orderData.createdAt,
										).toLocaleString()}
									</Typography>
								</Tooltip>
								<Tooltip
									title="Ngày cập nhật giao dịch"
									arrow
									TransitionComponent={Fade}
								>
									<Typography variant="body2">
										<strong>Ngày cập nhật:</strong>{" "}
										{new Date(
											orderData.updatedAt,
										).toLocaleString()}
									</Typography>
								</Tooltip>
							</CardContent>
						</Card>
					</Grid>

					<Grid item xs={12} md={6}>
						<Card
							sx={{
								// backgroundColor: "#e3f2fd",
								borderRadius: "8px",
								boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
								transition: "transform 0.2s",
								"&:hover": {
									transform: "scale(1.02)",
								},
							}}
						>
							<CardContent>
								<Typography
									variant="h6"
									sx={{
										color: theme.palette.secondary.main,
										fontWeight: "bold",
										marginBottom: "16px",
									}}
								>
									<Chip
										label="Thông tin sản phẩm"
										color="primary"
										variant="outlined"
									/>
								</Typography>
								<Grid container spacing={2} alignItems="center">
									<Grid item xs={5}>
										<Avatar
											variant="square"
											src={orderData.postId.image}
											onClick={() => {
												navigate(
													`/post-detail/?postId=${orderData.postId._id}`,
												);
											}}
											sx={{
												width: "100%",
												height: "auto",
												borderRadius: "4px",
												transition: "transform 0.2s",
												"&:hover": {
													transform: "scale(1.1)",
												},
												cursor: "pointer",
											}}
										/>
									</Grid>
									<Grid item xs={7}>
										<Tooltip
											title="Tên tài liệu"
											arrow
											TransitionComponent={Fade}
										>
											<Typography variant="body2">
												<strong>Tên tài liệu:</strong>{" "}
												{orderData.postId.documentName}
											</Typography>
										</Tooltip>
										<Tooltip
											title="Loại tài liệu"
											arrow
											TransitionComponent={Fade}
										>
											<Typography variant="body2">
												<strong>Loại:</strong>{" "}
												{orderData.postId.category.name}
											</Typography>
										</Tooltip>
										<Tooltip
											title="Giá tài liệu"
											arrow
											TransitionComponent={Fade}
										>
											<Typography variant="body2">
												<strong>Giá:</strong>{" "}
												{orderData.postId.price} VND
											</Typography>
										</Tooltip>
										<Tooltip
											title="Số lượng tài liệu"
											arrow
											TransitionComponent={Fade}
										>
											<Typography variant="body2">
												<strong>Số lượng:</strong>{" "}
												{orderData.quantity}
											</Typography>
										</Tooltip>
										<Tooltip
											title="Địa điểm"
											arrow
											TransitionComponent={Fade}
										>
											<Typography variant="body2">
												<strong>Địa điểm:</strong>{" "}
												{orderData.postId.place}
											</Typography>
										</Tooltip>
									</Grid>
								</Grid>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
			</Paper>
		</Box>
	);
};

export default OrderDetailCard;
