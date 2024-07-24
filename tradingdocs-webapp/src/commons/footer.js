import React from "react";
import { Box, Typography, Container, Link, Button, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { keyframes } from "@emotion/react";

// Animation for footer elements
const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const FooterContainer = styled(Box)(({ theme }) => ({
	backgroundColor: "#f0f0f0",
	color: "#333",
	padding: "20px 0",
	boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
	position: "relative",
	overflow: "hidden",
	animation: `${fadeIn} 1s ease-in-out`,
}));

const FooterLink = styled(Link)(({ theme }) => ({
	color: "#007bff",
	textDecoration: "none",
	"&:hover": {
		textDecoration: "underline",
		opacity: 0.8,
	},
}));

const FooterButton = styled(Button)(({ theme }) => ({
	backgroundColor: "#007bff",
	color: "#fff",
	"&:hover": {
		backgroundColor: "#0056b3",
	},
	marginTop: theme.spacing(2),
}));

const Footer = () => {
	return (
		<FooterContainer sx={{ mt: 10 }}>
			<Container>
				<Grid container spacing={4} justifyContent="center">
					<Grid item xs={12} sm={4} md={4}>
						<Typography variant="h6" gutterBottom>
							Về Chúng Tôi
						</Typography>
						<Typography variant="body2">
							Chúng tôi là nền tảng trao đổi, bán và tặng sách và
							tài liệu cũ hoặc mới.
						</Typography>
						<FooterButton variant="contained">
							Tìm Hiểu Thêm
						</FooterButton>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<Typography variant="h6" gutterBottom>
							Liên Kết Nhanh
						</Typography>
						<Typography variant="body2">
							<FooterLink href="#">Trang Chủ</FooterLink>
							<br />
							<FooterLink href="#">Sản Phẩm</FooterLink>
							<br />
							<FooterLink href="#">Giới Thiệu</FooterLink>
							<br />
							<FooterLink href="#">Liên Hệ</FooterLink>
						</Typography>
					</Grid>
					<Grid item xs={12} sm={4} md={4}>
						<Typography variant="h6" gutterBottom>
							Liên Hệ
						</Typography>
						<Typography variant="body2">
							Email:{" "}
							<FooterLink href="mailto:contact@example.com">
								contact@example.com
							</FooterLink>
							<br />
							Hotline:{" "}
							<FooterLink href="tel:+123456789">
								+123 456 789
							</FooterLink>
							<br />
							Địa chỉ: 123 Đường ABC, Thành phố XYZ
						</Typography>
					</Grid>
				</Grid>
				<Box mt={4} textAlign="center">
					<Typography variant="body2" color="textSecondary">
						&copy; {new Date().getFullYear()} Tất cả các quyền được
						bảo lưu.
					</Typography>
				</Box>
			</Container>
		</FooterContainer>
	);
};

export default Footer;
