import { useEffect, useState } from "react";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import ReceiptSummaryCard from "../UI-compos/ReceiptSummaryCard";
import { Alert, Box, Chip, Container, Grid, Typography } from "@mui/material";
import UpdateImage from "./UpImage";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import CoupleCharts from "../UI-compos/CoupleCharts";
import EmptyCart from "../UI-compos/EmptyCard";

const ReceiptsList = () => {
	const [receipts, setReceipts] = useState([]);
	const [transactionStats, setTransactionStats] = useState([]);
	const [totalSpent, setTotalSpent] = useState(0);
	const [success, setSuccess] = useState(false);

	const loadReceipts = async () => {
		setSuccess(false);
		try {
			const receiptsRes = await APIs.get(
				endpoints["get-receipts-by-buyer-id"],
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);
			setReceipts(receiptsRes.data);

			const transactionRes = await APIs.get(
				endpoints["get-transaction-statistic"],
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);
			setTransactionStats(transactionRes.data);

			const totalSpentRes = await APIs.get(
				endpoints["get-buyer-total-price"],
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);

			setTotalSpent(totalSpentRes?.data[0]?.totalPrice ?? 0);
			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		loadReceipts();
	}, []);

	if (success && receipts.length == 0) {
		return <EmptyCart text={"Bạn vẫn chưa đặt đơn hàng nào"} />;
	}
	return (
		<>
			<Container sx={{ pt: 5 }}>
				<Grid
					container
					spacing={15}
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Grid
						sx={{
							height: "fit-content",

							// border: "1px solid black",
						}}
						item
						xs={12}
						md={5}
					>
						<CoupleCharts
							transactionData={transactionStats}
							totalPrice={totalSpent}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography
							color="primary"
							sx={{
								textTransform: "uppercase",
								fontWeight: 600,
								mt: -1,
								mb: 2,
							}}
							gutterBottom
						>
							<Chip
								icon={<StickyNote2OutlinedIcon />}
								color="info"
								label="CÁC ĐƠN ĐÃ ĐẶT"
								sx={{ p: 0.75 }}
							/>
						</Typography>
						<Box
							sx={{
								// border: "1px solid black",
								padding: "0 2rem",
								height: "65vh",
								width: "max-content",
								overflowY: "scroll",
								"&::-webkit-scrollbar": {
									width: "8px", // Width of the scrollbar
								},
								"&::-webkit-scrollbar-track": {
									background: "#f1f1f1", // Color of the track (the part of the scrollbar that the thumb slides along)
								},
								"&::-webkit-scrollbar-thumb": {
									background: "#888", // Color of the draggable part of the scrollbar
									borderRadius: "4px", // Rounded corners for the scrollbar thumb
								},
								"&::-webkit-scrollbar-thumb:hover": {
									background: "#555", // Color of the scrollbar thumb on hover
								},
								// Custom scrollbar styles for Firefox
								scrollbarWidth: "thin", // Width of the scrollbar (thin or auto)
								scrollbarColor: "#888 #f1f1f1",
							}}
						>
							{success &&
								receipts.map((receipt, index) => {
									return (
										<ReceiptSummaryCard
											key={index}
											receipt={receipt}
											link={`/receipt-information/?receiptId=${receipt._id}`}
										/>
									);
								})}
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default ReceiptsList;
