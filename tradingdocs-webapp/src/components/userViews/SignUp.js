import React, { useState } from "react";
import { Grid, Typography, TextField, Button, Box, Alert } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import APIs, { endpoints } from "../../configs/APIs";
import LinearBuffer from "../UI-compos/LinearBuffer";
import "animate.css";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const [message, setMessage] = useState({
		success: false,
		error: false,
	});
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		fullName: "",
		gender: "", // Will store either 'male' or 'female'
		username: "",
		password: "",
		email: "",
		hotline: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// Handle form submission logic

		const signup = async () => {
			setLoading(true);
			try {
				const res = await APIs.post(endpoints["register"], formData);
				setMessage((prev) => {
					return { error: false, success: true };
				});
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

		signup();

		// console.log(formData);
	};

	return (
		<Grid sx={{ padding: 10, paddingRight: 15 }} container spacing={5}>
			{loading && <LinearBuffer />}
			{/* Left Side: Title */}
			<Grid item xs={10} sm={5}>
				<Typography
					variant="h5"
					sx={{
						fontSize: "3rem",
						fontWeight: 600,
					}}
					color="#0073e5"
				>
					HÃY CÙNG NHAU
				</Typography>
				<Typography
					sx={{
						fontSize: "2rem",
						fontWeight: 600,
					}}
					variant="h5"
					gutterBottom
				>
					BÁN, TRAO ĐỔI HOẶC TẶNG
				</Typography>
				<Typography
					sx={{
						fontSize: "1rem",
					}}
					variant="h7"
					color="#303741"
					gutterBottom
				>
					Chào mừng đến với{" "}
					<span style={{ fontWeight: 600 }}>TradingDocs</span>, nơi
					bạn có thể trao đổi, mua bán hoặc tặng tài liệu học tập đa
					dạng và thuận tiện. Hãy khám phá và chia sẻ kiến thức cùng
					cộng đồng ngay!
				</Typography>
				<Typography sx={{ paddingTop: 2.5 }}>
					<Button
						onClick={() => {
							navigate("/sign-in");
						}}
						sx={{
							borderRadius: 2,
							backgroundColor: "#006edc",
							fontWeight: 600,
						}}
						variant="contained"
						disableElevation
					>
						Bạn đã có tài khoản? Đăng nhập
					</Button>
				</Typography>
			</Grid>

			{/* Right Side: Register Form */}
			<Grid item xs={12} sm={5}>
				<Box
					p={3}
					bgcolor="background.paper"
					boxShadow={3}
					borderRadius={5}
				>
					<Typography gutterBottom>
						{message.success && (
							<Alert
								className="animate__animated animate__tada"
								sx={{
									borderRadius: 3,
								}}
								severity="success"
							>
								Đăng ký thành công!
							</Alert>
						)}
						{message.error && (
							<Alert
								className="animate__animated animate__wobble"
								sx={{
									borderRadius: 3,
								}}
								severity="error"
							>
								Đăng ký thất bại, username hoặc email đã tồn
								tại!
							</Alert>
						)}
					</Typography>
					<Typography variant="h6" gutterBottom>
						Đăng ký tài khoản
					</Typography>
					<form onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Họ và tên"
									name="fullName"
									value={formData.fullName}
									onChange={handleChange}
									variant="outlined"
									size="small"
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Tên đăng nhập"
									name="username"
									value={formData.username}
									onChange={handleChange}
									variant="outlined"
									size="small"
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Mật khẩu"
									name="password"
									type="password"
									value={formData.password}
									onChange={handleChange}
									variant="outlined"
									size="small"
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									variant="outlined"
									size="small"
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="Số điện thoại"
									name="hotline"
									value={formData.hotline}
									onChange={handleChange}
									variant="outlined"
									size="small"
									required
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											checked={
												formData.gender === "false"
											}
											onChange={handleChange}
											name="gender"
											value="false"
										/>
									}
									label="Male"
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={formData.gender === "true"}
											onChange={handleChange}
											name="gender"
											value="true"
										/>
									}
									label="Female"
								/>
							</Grid>
							<Grid item xs={12}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
								>
									Đăng ký
								</Button>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Grid>
		</Grid>
	);
};

export default SignUp;
