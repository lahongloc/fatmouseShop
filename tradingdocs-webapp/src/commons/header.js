import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { UserContext } from "../App";
import { LOGOUT } from "../reducers/actions";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import AvatarChip from "../components/UI-compos/AvatarChip";
import { isNormalUser } from "../authorizations/roleAuths";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

function Header() {
	const [user, dispatch] = React.useContext(UserContext);

	const nav = useNavigate();
	const settings = [
		{
			name: "Tài khoản",
			link: "/user-info",
		},
		{ name: "Các đơn hàng đã đặt", link: "/receipts-list" },
		{ name: "Đơn hàng của khách", link: "/all-orders" },
		{
			name: "Đăng xuất",
			call: () => {
				dispatch({
					type: LOGOUT,
				});
			},
		},
	];

	const logout = () => {
		dispatch({
			type: LOGOUT,
		});
	};

	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<Box sx={{ mb: 8.75 }}>
			<AppBar position="fixed">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<AdbIcon
							sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
						/>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: "none", md: "flex" },
								fontFamily: "monospace",
								fontWeight: 700,
								letterSpacing: ".3rem",
								color: "inherit",
								textDecoration: "none",
							}}
						>
							LOGO
						</Typography>

						<Box
							sx={{
								flexGrow: 1,
								display: { xs: "none", md: "flex" },
							}}
						>
							<Button
								onClick={() => {
									nav("/");
								}}
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								TRANG CHỦ
							</Button>
							{/* {isNormalUser(user) && ( */}
							<Button
								onClick={() => {
									nav("/upload-documents");
								}}
								sx={{
									my: 2,
									color: "white",
									display: "block",
								}}
							>
								Đăng tài liệu
							</Button>
						</Box>

						{user ? (
							<Box sx={{ flexGrow: 0 }}>
								<Button onClick={logout} variant="info">
									Đăng Xuất {user.name}
								</Button>
								<Tooltip title={user.user.fullName}>
									<IconButton
										onClick={handleOpenUserMenu}
										sx={{ p: 0 }}
									>
										{/* <Avatar
											// style={avatarStyle}
											src="/path/to/default-avatar.jpg"
											alt={user.user.username}
											sx={{ marginRight: 2 }}
										/> */}
										<AvatarChip
											avatar={user.user.username}
											name={user.user.username}
											alt={user.user.username}
										/>
									</IconButton>
								</Tooltip>

								<Menu
									sx={{ mt: "45px" }}
									id="menu-appbar"
									anchorEl={anchorElUser}
									anchorOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "right",
									}}
									open={Boolean(anchorElUser)}
									onClose={handleCloseUserMenu}
								>
									{settings.map((setting) => (
										<MenuItem
											key={setting.name}
											onClick={() => {
												handleCloseUserMenu();
												if (setting.link)
													nav(setting.link);
												else {
													console.log("đăng cuât");
													setting.call();
												}
											}}
										>
											<Typography textAlign="center">
												{setting.name}
											</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						) : (
							<>
								<Button
									onClick={() => {
										nav("/sign-in");
									}}
									variant="secondary"
									startIcon={<LoginIcon />}
								>
									Đăng nhập
								</Button>
								<Button
									onClick={() => {
										nav("/sign-up");
									}}
									variant="secondary"
									startIcon={<ExitToAppOutlinedIcon />}
								>
									Đăng ký
								</Button>
							</>
						)}
					</Toolbar>
				</Container>
			</AppBar>
		</Box>
	);
}
export default Header;
