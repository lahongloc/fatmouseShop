import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import APIs, { endpoints } from "../../configs/APIs";
import { UserContext } from "../../App";
import cookie from "react-cookies";
import { LOGIN } from "../../reducers/actions";
import LinearBuffer from "../UI-compos/LinearBuffer";
import { Alert } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

function Copyright(props) {
	return (
		<Typography
			variant="body2"
			color="text.secondary"
			align="center"
			{...props}
		>
			{"Powered by "}
			<Link color="inherit" href="#">
				Fatmouse
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
	const [user, dispatch] = React.useContext(UserContext);
	const [loading, setLoading] = React.useState(false);
	const [success, setSuccess] = React.useState(true);

	const [q] = useSearchParams();
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();
		const userData = new FormData(event.currentTarget);

		const sign = async () => {
			setLoading(true);
			try {
				const res = await APIs.post(endpoints["login"], {
					username: userData.get("username"),
					password: userData.get("password"),
				});
				cookie.save("token", res.data.token);

				const currentUser = await APIs.get(endpoints["current-user"], {
					headers: {
						Authorization: res.data.token,
					},
				});
				cookie.save("user", currentUser.data.user);
				console.log("current: ", currentUser.data.user);

				dispatch({
					type: LOGIN,
					payload: currentUser.data.user,
				});
				setSuccess(true);
				const next = q.get("next");
				if (next) {
					navigate(`/${next}`);
				} else navigate("/");
			} catch (err) {
				setSuccess(false);
				console.error(err);
			} finally {
				setLoading(false);
				setTimeout(() => {
					setSuccess(true);
				}, 5000);
			}
		};

		sign();
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			{loading && <LinearBuffer />}

			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Đăng nhập
					</Typography>
					{success || (
						<Alert
							className="animate__animated animate__wobble"
							sx={{
								marginTop: 5,
								marginBottom: 5,
							}}
							severity="warning"
						>
							Tên đăng nhập hoặc mật khẩu không chính xác!
						</Alert>
					)}
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="username"
							label="Tên đăng nhập"
							name="username"
							autoComplete="username"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Mật khẩu"
							type="password"
							id="password"
							autoComplete="current-password"
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Lưu mật khẩu"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Đăng nhập
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Quên mật khẩu?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/sign-up" variant="body2">
									{"Bạn chưa có tài khoản? Đăng ký"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
