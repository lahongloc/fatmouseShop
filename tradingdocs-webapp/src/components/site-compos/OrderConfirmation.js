import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	Paper,
	Grid,
	Divider,
	Card,
	CardMedia,
	CardContent,
	Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import APIs, { endpoints } from "../../configs/APIs";
import { useSearchParams } from "react-router-dom";
import cookie from "react-cookies";
import { UserContext } from "../../App";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";

const StyledContainer = styled(Container)(({ theme }) => ({
	marginTop: theme.spacing(10),
	marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
	padding: theme.spacing(1.5),
	fontSize: "1.1rem",
}));

const OrderConfirmation = () => {
	const [user, dispatch] = useContext(UserContext);
	const [phone, setPhone] = useState(user.user.hotline);

	const handlePhoneChange = (event) => {
		setPhone(event.target.value);
	};

	const handlePlaceOrder = async () => {
		try {
			const res = await APIs.post(endpoints["create-receipt"], receipt, {
				headers: {
					Authorization: cookie.load("token"),
				},
			});
			console.log(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const [q] = useSearchParams();
	const [receipt, setReceipt] = useState(cookie.load(q.get("receiptId")));
	const [order, setOrder] = useState({});
	const [success, setSuccess] = useState(false);

	const loadPost = async () => {
		setSuccess(false);
		try {
			const res = await APIs.get(
				`${endpoints["get-posts"]}?postId=${receipt.postId}`,
			);
			setOrder(res.data[0]);
			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		console.log("user laaa: ");
		loadPost();
	}, []);

	useEffect(() => {
		setReceipt((prev) => {
			return {
				...prev,
				totalPrice: order.price ? order.price * receipt.quantity : 0,
			};
		});
	}, [order]);

	return (
		<>
			{success && (
				<StyledContainer maxWidth="md">
					{/* <Typography variant="h4" gutterBottom>
						Xác nhận Đơn hàng
					</Typography> */}
					<Paper elevation={3} sx={{ p: 3 }}>
						<Box mb={3}>
							<Typography
								sx={{
									fontWeight: 600,
									textTransform: "uppercase",
								}}
								variant="h6"
							>
								Địa chỉ nhận hàng <PlaceOutlinedIcon />
							</Typography>
							<Typography>Địa chỉ: {order.place}</Typography>
						</Box>
						<Divider />
						<Box my={3}>
							<Typography
								sx={{
									fontWeight: 600,
									textTransform: "uppercase",
								}}
								variant="h6"
								gutterBottom
							>
								Số điện thoại liên lạc <PhoneOutlinedIcon />
							</Typography>
							<TextField
								fullWidth
								label="Số điện thoại"
								variant="outlined"
								value={phone}
								onChange={handlePhoneChange}
							/>
						</Box>
						<Divider />
						<Box my={3}>
							<Typography
								sx={{
									fontWeight: 600,
									textTransform: "uppercase",
								}}
								variant="h6"
								gutterBottom
							>
								Chi tiết đơn hàng <InventoryOutlinedIcon />
							</Typography>
							<Grid container spacing={2} alignItems="center">
								<Grid item xs={4}>
									<Card>
										<CardMedia
											sx={{
												boxShadow:
													"rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
											}}
											component="img"
											height="140"
											image={order.image}
											alt={order.documentName}
										/>
									</Card>
								</Grid>
								<Grid item xs={8}>
									<Card>
										<CardContent>
											<Alert icon={false} severity="info">
												<Typography variant="subtitle1">
													{order.documentName}
												</Typography>
												<Typography>
													Số lượng: {receipt.quantity}
												</Typography>
												<Typography>
													Giá:{" "}
													{order?.price?.toLocaleString() ??
														0}{" "}
													VND
												</Typography>
											</Alert>
										</CardContent>
									</Card>
								</Grid>
							</Grid>
						</Box>
						<Divider />
						<Box my={3}>
							<Alert
								icon={false}
								variant="outlined"
								severity="info"
							>
								<Typography
									sx={{
										fontWeight: 600,
										textTransform: "uppercase",
									}}
									variant="h6"
								>
									Chi tiết thanh toán <PaymentOutlinedIcon />
								</Typography>
								<Typography>
									Tổng tiền hàng:{" "}
									{receipt.totalPrice.toLocaleString()}
									VND
								</Typography>
								<Typography>
									Tổng thanh toán:{" "}
									{receipt.totalPrice.toLocaleString()}
									VND
								</Typography>
							</Alert>
						</Box>
						<Divider />
						<Box my={0} textAlign="center">
							<StyledButton
								variant="contained"
								color="primary"
								onClick={handlePlaceOrder}
							>
								Đặt hàng
							</StyledButton>
						</Box>
					</Paper>
				</StyledContainer>
			)}
		</>
	);
};

export default OrderConfirmation;
