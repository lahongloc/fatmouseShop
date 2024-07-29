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
	Chip,
	Tooltip,
	Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import APIs, { endpoints } from "../../configs/APIs";
import { useNavigate, useSearchParams } from "react-router-dom";
import cookie from "react-cookies";
import { UserContext } from "../../App";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import LinearBuffer from "../UI-compos/LinearBuffer";
import NotFoundPage from "../UI-compos/NotFoundPage ";
import CountdownProgress from "../UI-compos/CountdownProgress ";

const StyledContainer = styled(Container)(({ theme }) => ({
	marginTop: theme.spacing(15),
	marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(1),
	padding: theme.spacing(1),
	fontSize: "1rem",
}));

const CustomChip = styled(Chip)(({ theme }) => ({
	marginRight: theme.spacing(1),
	marginBottom: theme.spacing(1),
}));

const OrderConfirmation = () => {
	const [user, dispatch] = useContext(UserContext);
	const [phone, setPhone] = useState(user.user.hotline);
	const [message, setMessage] = useState({
		success: false,
		error: false,
	});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	// const [isDisabled, setIsDisabled] = useState(false)

	const handlePhoneChange = (event) => {
		setPhone(event.target.value);
	};

	const handlePlaceOrder = async () => {
		setLoading(true);
		try {
			const res = await APIs.post(endpoints["create-receipt"], receipt, {
				headers: {
					Authorization: cookie.load("token"),
				},
			});
			if (res.data.status == 400) {
				setMessage((prev) => {
					return { success: false, error: true };
				});
			} else {
				setMessage((prev) => {
					return { error: false, success: true };
				});
				setTimeout(() => {
					navigate(
						`/receipt-information/?receiptId=${res.data.receipt._id}`,
					);
				}, 5000);
			}
			console.log(res.data);
		} catch (err) {
			setMessage((prev) => {
				return { success: false, error: true };
			});
			console.error(err);
		} finally {
			setLoading(false);
			setTimeout(() => {
				setMessage({
					success: false,
					error: false,
				});
			}, 5000);
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
		loadPost();
	}, []);

	useEffect(() => {
		setReceipt((prev) => {
			return {
				...prev,
				totalPrice: order?.price ? order.price * receipt.quantity : 0,
			};
		});
	}, [order]);

	if (success && !order) {
		return <NotFoundPage />;
	}

	return (
		<>
			{success && (
				<StyledContainer maxWidth="md">
					<Chip
						icon={<ListAltOutlinedIcon />}
						color="primary"
						label="XÁC NHẬN ĐƠN HÀNG"
						sx={{ p: 0.75 }}
					/>
					<Paper elevation={3} sx={{ p: 3, mt: 2 }}>
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
						{loading && <LinearBuffer />}
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
									<Card
										sx={{
											boxShadow: "none",
											p: 0,
										}}
									>
										{/* <CardContent> */}
										<CustomChip
											variant="outlined"
											color="primary"
											label={`Loại giao dịch: ${order.postType.name}`}
										/>
										<CustomChip
											variant="outlined"
											color="primary"
											label={`Độ bền: ${
												order.durability
													? "Còn mới"
													: "Đã sử dụng"
											}`}
										/>
										<Tooltip
											title={order.category.description}
										>
											<CustomChip
												variant="outlined"
												color="primary"
												label={`Loại tài liệu: ${order.category.name}`}
											/>
										</Tooltip>
										{/* </CardContent> */}
										<CardContent
											sx={{
												boxShadow: "none",
												p: 0,
											}}
										>
											<Alert icon={false} severity="info">
												<Typography
													variant="subtitle1"
													sx={{
														textTransform:
															"uppercase",
														fontWeight: 600,
													}}
												>
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
						{message.error && (
							<Alert
								className="animate__animated animate__wobble"
								sx={{
									marginTop: 5,
								}}
								severity="error"
							>
								Đặt hàng thất bại, số lượng đơn hàng đã thay
								đổi. Vui lòng đăng nhập và thử lại, hoặc báo cáo
								với ADMIN{" "}
								<span
									style={{
										color: "red",
										cursor: "pointer",
									}}
								>
									tại đây.
								</span>
							</Alert>
						)}
						{message.success && (
							<Alert
								className="animate__animated animate__tada"
								sx={{
									marginTop: 5,
								}}
								severity="success"
							>
								Đặt hàng thành công, bạn sẽ được chuyển hướng tự
								động sau <CountdownProgress /> giây
							</Alert>
						)}
						<Box
							my={3}
							sx={{
								border: "1px solid rgb(25 118 210)",
								padding: 2,
								borderRadius: "7px",
							}}
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
							<Grid
								sx={{
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
								}}
								fullWidth
							>
								<Grid item>
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
								</Grid>
								<Grid item>
									<StyledButton
										disabled={loading}
										variant="contained"
										color="primary"
										onClick={handlePlaceOrder}
									>
										Đặt hàng
									</StyledButton>
								</Grid>
							</Grid>
						</Box>
						{/* <Divider />
						<Box my={0} textAlign="center">
							<StyledButton
								variant="contained"
								color="primary"
								onClick={handlePlaceOrder}
							>
								Đặt hàng
							</StyledButton>
						</Box> */}
					</Paper>
				</StyledContainer>
			)}
		</>
	);
};

export default OrderConfirmation;
