import React from "react";
import {
	Card,
	CardContent,
	Typography,
	Grid,
	Avatar,
	Badge,
	Paper,
	IconButton,
	Tooltip,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";

const ReceiptSummaryCard = ({ receipt, link }) => {
	const navigate = useNavigate();
	return (
		<Paper
			elevation={3}
			sx={{
				width: "500px",
				margin: "auto",
				mt: 1,
				mb: 1,
				borderRadius: "12px",
				cursor: "pointer",
				// backgroundColor: grey[50],
			}}
			onClick={() => {
				navigate(link);
			}}
		>
			<Card
				sx={{
					borderRadius: "8px",
					overflow: "hidden",
					position: "relative",
				}}
			>
				{/* <Tooltip title="Thêm tùy chọn">
					<IconButton
						sx={{
							position: "absolute",
							top: 8,
							right: 8,
							color: grey[800],
						}}
					>
						<MoreVertIcon />
					</IconButton>
				</Tooltip> */}

				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={4}>
							<Avatar
								src={receipt.postId.image}
								variant="rounded"
								sx={{
									width: 120,
									height: 120,
									borderRadius: "12px",
								}}
							/>
						</Grid>
						<Grid item xs={8}>
							<Badge
								badgeContent={receipt.transactionType.name}
								color="info"
								sx={{
									textTransform: "uppercase",
									backgroundColor: grey[300],
									color: grey[800],
									borderRadius: "8px",
								}}
							>
								<Typography
									sx={{
										mt: 0.5,
										fontWeight: 600,
										pr: 0.75,
										pl: 0.75,
									}}
									variant="h6"
									gutterBottom
									color={grey[800]}
								>
									{receipt.postId.documentName}
								</Typography>
							</Badge>
							<Typography
								sx={{ mt: 2 }}
								variant="body2"
								color={grey[700]}
							>
								Số lượng: {receipt.quantity}
							</Typography>
							<Typography variant="body2" color={grey[700]}>
								Tổng giá:{" "}
								{receipt.totalPrice.toLocaleString("vi-VN", {
									style: "currency",
									currency: "VND",
								})}
							</Typography>
							<Typography variant="body2" color={grey[700]}>
								Ngày giao dịch:{" "}
								{new Date(receipt.createdAt).toLocaleDateString(
									"vi-VN",
								)}
							</Typography>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Paper>
	);
};

export default ReceiptSummaryCard;
