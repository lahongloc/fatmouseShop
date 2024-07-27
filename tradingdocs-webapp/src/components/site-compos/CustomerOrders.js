import React, { useEffect, useState } from "react";
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

import OrderDetailCard from "../UI-compos/OrderDetailCard";
import ReceiptSummaryCard from "../UI-compos/ReceiptSummaryCard";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import EmptyCart from "../UI-compos/EmptyCard";

const CustomerOrders = () => {
	const [orders, setOrders] = useState([]);
	const [success, setSuccess] = useState(false);
	const [currentOrder, setCurrentOrder] = useState();

	const loadOrders = async () => {
		setSuccess(false);
		try {
			const res = await APIs.get(endpoints["get-customer-orders"], {
				headers: {
					Authorization: cookie.load("token"),
				},
			});

			setOrders(res.data);
			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		loadOrders();
	}, []);

	if (success && orders.length === 0) {
		return <EmptyCart text={"Bạn vẫn chưa bán được đơn hàng nào"} />;
	}

	return (
		<>
			<Grid
				sx={{
					display: "flex",
					// alignItems: "center",
					justifyContent: "space-between",
					padding: 5,
				}}
			>
				<Grid
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
					item
					xs={12}
					md={5}
				>
					{success &&
						orders.map((order) => {
							return (
								<Box
									sx={
										order?._id === currentOrder?._id && {
											borderLeft:
												"3.5px solid rgb(25 118 210)",
											borderRadius: "12px",
										}
									}
									onClick={() => {
										setCurrentOrder(order);
									}}
								>
									<ReceiptSummaryCard receipt={order} />
								</Box>
							);
						})}
				</Grid>
				<Grid item xs={12} md={3}>
					{currentOrder ? (
						<OrderDetailCard orderData={currentOrder} />
					) : (
						""
					)}
				</Grid>
			</Grid>
		</>
	);
};

export default CustomerOrders;
