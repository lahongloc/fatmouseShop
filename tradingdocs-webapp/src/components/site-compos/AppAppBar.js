import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "../UI-compos/ToggleColorMode";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { LOGOUT } from "../../reducers/actions";
import { Avatar, Menu } from "@mui/material";
import logo from "../../static/images/logo.png";
import AvatarChip from "../UI-compos/AvatarChip";
import IconButton from "@mui/material/IconButton";

const logoStyle = {
	width: "95px",
	height: "auto",
	cursor: "pointer",
};

function AppAppBar({ mode, toggleColorMode }) {
	const settings = [
		{
			name: "Tài khoản",
			link: "/user-info",
		},
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

	const [open, setOpen] = React.useState(false);
	const [user, dispatch] = React.useContext(UserContext);
	const navigate = useNavigate();

	const toggleDrawer = (newOpen) => () => {
		setOpen(newOpen);
	};

	const scrollToSection = (sectionId) => {
		const sectionElement = document.getElementById(sectionId);
		const offset = 128;
		if (sectionElement) {
			const targetScroll = sectionElement.offsetTop - offset;
			sectionElement.scrollIntoView({ behavior: "smooth" });
			window.scrollTo({
				top: targetScroll,
				behavior: "smooth",
			});
			setOpen(false);
		}
	};
	const avatarStyle = {
		backgroundColor: "#1976d2",
	};

	const menus = [
		{
			name: "Tài liệu",
			link: "/",
		},
		{
			name: "Đơn hàng của tôi",
			link: "/receipts-list",
		},
		{
			name: "Đơn hàng của khách",
			link: "/all-orders",
		},
	];

	const [navIndex, setNavIndex] = React.useState(0);

	return (
		<div>
			<AppBar
				position="fixed"
				sx={{
					boxShadow: 0,
					bgcolor: "transparent",
					backgroundImage: "none",
					mt: 2,
				}}
			>
				<Container maxWidth="lg">
					<Toolbar
						variant="regular"
						sx={(theme) => ({
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							flexShrink: 0,
							borderRadius: "999px",
							bgcolor:
								theme.palette.mode === "light"
									? "rgba(255, 255, 255, 0.4)"
									: "rgba(0, 0, 0, 0.4)",
							backdropFilter: "blur(24px)",
							maxHeight: 40,
							border: "1px solid",
							borderColor: "divider",
							boxShadow:
								theme.palette.mode === "light"
									? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
									: "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
						})}
					>
						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								alignItems: "center",
								ml: "-18px",
								px: 0,
							}}
						>
							<img
								src={logo}
								style={logoStyle}
								alt="logo of sitemark"
							/>
							<Box
								sx={{
									display: {
										xs: "none",
										md: "flex",
										width: "40%",
										justifyContent: "space-between",
									},
								}}
							>
								{menus.map((item, index) => {
									return (
										<MenuItem
											key={index}
											onClick={() => {
												setNavIndex(index);
												navigate(item.link);
											}}
											sx={{
												py: "6px",
												px: "12px",
												backgroundColor:
													navIndex === index
														? "rgb(59 130 246 / 20%)"
														: "",
												borderRadius: "17px",
											}}
										>
											<Typography
												variant="body2"
												color="text.primary"
											>
												{item.name}
											</Typography>
										</MenuItem>
									);
								})}
								<IconButton
									color="primary"
									variant="text"
									size="small"
									component="button"
									sx={{ backgroundColor: "rgb(229 246 253)" }}
									onClick={() => {
										setNavIndex("");
										navigate("/upload-documents");
									}}
								>
									<AddOutlinedIcon />
								</IconButton>
							</Box>
						</Box>
						<Box
							sx={{
								display: { xs: "none", md: "flex" },
								gap: 0.5,
								alignItems: "center",
							}}
						>
							{user ? (
								<Box sx={{ flexGrow: 0 }}>
									<Button
										sx={{
											borderRadius: "50%",
										}}
									>
										<Avatar
											onClick={handleOpenUserMenu}
											alt={user.user.username}
											src="/path/to/default-avatar.jpg"
											style={avatarStyle}
											sx={{
												boxShadow:
													"rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
											}}
										/>
									</Button>
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
													if (setting.link) {
														setNavIndex("");
														navigate(setting.link);
													} else {
														setNavIndex("");
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
										color="primary"
										variant="text"
										size="small"
										component="button"
										onClick={() => navigate("/sign-in")}
									>
										Đăng nhập
									</Button>
									<Button
										color="primary"
										variant="contained"
										size="small"
										component="button"
										onClick={() => navigate("/sign-up")}
									>
										Đăng ký
									</Button>
								</>
							)}
						</Box>
						<Box sx={{ display: { sm: "", md: "none" } }}>
							<Button
								variant="text"
								color="primary"
								aria-label="menu"
								onClick={toggleDrawer(true)}
								sx={{ minWidth: "30px", p: "4px" }}
							>
								<MenuIcon />
							</Button>
							<Drawer
								anchor="right"
								open={open}
								onClose={toggleDrawer(false)}
							>
								<Box
									sx={{
										minWidth: "60dvw",
										p: 2,
										backgroundColor: "background.paper",
										flexGrow: 1,
									}}
								>
									<MenuItem onClick={() => navigate("/")}>
										Tài liệu
									</MenuItem>
									<MenuItem
										onClick={() =>
											navigate("/receipts-list")
										}
									>
										Đơn hàng của tôi
									</MenuItem>
									<MenuItem
										onClick={() => navigate("/all-orders")}
									>
										Đơn hàng của khách
									</MenuItem>
									<MenuItem
										onClick={() =>
											navigate("/upload-documents")
										}
									>
										Thêm tài liệu
									</MenuItem>

									<Divider />
									{!user && (
										<>
											<MenuItem>
												<Button
													color="primary"
													variant="contained"
													component="button"
													onClick={() =>
														navigate("/sign-un")
													}
													sx={{ width: "100%" }}
												>
													Đăng ký
												</Button>
											</MenuItem>
											<MenuItem>
												<Button
													color="primary"
													variant="outlined"
													component="button"
													onClick={() =>
														navigate("/sign-in")
													}
													sx={{ width: "100%" }}
												>
													Đăng nhập
												</Button>
											</MenuItem>
										</>
									)}
								</Box>
							</Drawer>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</div>
	);
}

AppAppBar.propTypes = {
	mode: PropTypes.oneOf(["dark", "light"]).isRequired,
	toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
