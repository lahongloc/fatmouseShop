import React, { useContext, useEffect, useState } from "react";
import {
	Container,
	Grid,
	Paper,
	Typography,
	Box,
	Avatar,
	Divider,
	IconButton,
	Snackbar,
	Button,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { UserContext } from "../../App";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";

const UserInfo = () => {
	const [deletedDocumentId, setDeletedDocumentId] = useState("");
	const handleDeleteDocument = async (documentId) => {
		try {
			const res = await APIs.delete(
				`${endpoints["delete-post"]}?postId=${documentId}`,
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);

			if (res.status === 200) {
				setDeletedDocumentId(documentId);
				setOpen(true);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleRestoreDocument = async () => {
		try {
			const res = await APIs.patch(
				`${endpoints["restore-post"]}?postId=${deletedDocumentId}`,
				{}, // Empty object for the request body if you don't have any data to send
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);
			if (res.status === 200) {
				setDeletedDocumentId("");
				setOpen(false);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	const [open, setOpen] = React.useState(false);
	const action = (
		<React.Fragment>
			<Button
				color="secondary"
				size="small"
				onClick={handleRestoreDocument}
			>
				PHỤC HỒI
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	const columns = [
		{
			field: "image",
			headerName: "Ảnh",
			width: 100,
			renderCell: (params) => (
				<img
					src={params.value}
					alt=""
					style={{ width: "100%", borderRadius: "8px" }}
				/>
			),
		},
		{ field: "documentName", headerName: "Tên Tài Liệu", width: 220 },
		{ field: "quantity", headerName: "Số Lượng", width: 120 },
		{
			field: "price",
			headerName: "Giá",
			width: 100,
		},
		{
			field: "actions",
			headerName: "Hành Động",
			width: 150,
			renderCell: (params) => (
				<Box>
					<IconButton
						color="primary"
						onClick={() => {
							const url = `/update-document/?postId=${params.row.id}`;
							window.open(url, "_blank");
						}}
					>
						<CreateIcon />
					</IconButton>
					<IconButton
						color="primary"
						onClick={() => {
							const url = `/post-detail/?postId=${params.row.id}`;
							window.open(url, "_blank");
						}}
					>
						<VisibilityIcon />
					</IconButton>
					<IconButton
						color="success"
						onClick={() => handleDeleteDocument(params.row.id)}
					>
						<DeleteIcon />
					</IconButton>
				</Box>
			),
		},
	];

	const [user, dispatch] = useContext(UserContext);
	const [postTypeStats, setPostTypeStats] = useState([
		{ name: "", value: 0 },
	]);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [revenueStats, setRevenueStats] = useState();
	const [documents, setDocuments] = useState([]);
	const [rows, setRows] = useState([]);

	const [success, setSuccess] = useState(false);

	const loadStats = async () => {
		setSuccess(false);
		try {
			const postTypeStatsRes = await APIs.get(
				endpoints["get-postType-statistic"],
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);
			setPostTypeStats(postTypeStatsRes.data);
			setTotalQuantity(
				postTypeStatsRes.data.reduce(
					(sum, item) => sum + item.value,
					0,
				),
			);

			const revenueStatsRes = await APIs.get(
				endpoints["get-revenue-statistic"],
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);
			setRevenueStats(revenueStatsRes.data);

			const documentsRes = await APIs.get(
				endpoints["get-post-by-user-id"],
				{
					headers: {
						Authorization: cookie.load("token"),
					},
				},
			);

			setDocuments(documentsRes.data);

			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		loadStats();
	}, [deletedDocumentId]);

	useEffect(() => {
		setRows(
			documents.map((doc) => ({
				id: doc._id,
				image: doc.image,
				documentName: doc.documentName,
				quantity: doc.quantity,
				price: doc.price || "0.00",
			})),
		);
	}, [documents]);

	return (
		<>
			{success && (
				<Container maxWidth="lg">
					<Grid container spacing={7} sx={{ mt: 10 }}>
						<Grid item xs={12} md={5}>
							<Paper
								elevation={3}
								sx={{
									padding: 3,
									height: "100%",
									borderRadius: "12px",
									boxShadow: 6,
								}}
							>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										mb: 2,
										backgroundColor: "#f5f5f5",
										borderRadius: "8px",
										padding: "16px",
										boxShadow: 1,
									}}
								>
									<Avatar
										sx={{
											bgcolor: "primary.main",
											width: 100,
											height: 100,
											fontSize: "2rem",
											boxShadow:
												"rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
										}}
									>
										{user.user.fullName[0]}
									</Avatar>
									<Box sx={{ ml: 3 }}>
										<Typography variant="h6" gutterBottom>
											{user.user.fullName}
										</Typography>
										<Typography
											variant="body1"
											color="textSecondary"
										>
											{user.user.email}
										</Typography>
										<Typography
											variant="body1"
											color="textSecondary"
										>
											{user.user.hotline}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											sx={{ mt: 2 }}
										>
											{user.user.username}
										</Typography>
									</Box>
								</Box>
								<Divider sx={{ my: 2 }} />
								<Box sx={{ mt: 2 }}>
									<Typography variant="h6" gutterBottom>
										Thống Kê Tài Liệu
									</Typography>
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											gap: 0,
										}}
									>
										<Box sx={{ textAlign: "center" }}>
											<PieChart width={150} height={150}>
												<Pie
													data={postTypeStats}
													cx="50%"
													cy="50%"
													innerRadius={50}
													outerRadius={60}
													fill="#8884d8"
													dataKey="value"
													labelLine={false}
												>
													{postTypeStats.map(
														(entry, index) => (
															<Cell
																key={`cell-${index}`}
																fill={`rgba(${
																	index * 60
																}, ${
																	index * 100
																}, 200, 0.6)`}
															/>
														),
													)}
													<Label
														value={totalQuantity}
														position="center"
														style={{
															fontSize: "16px",
															fontWeight: "bold",
														}}
													/>
												</Pie>

												<Tooltip />
											</PieChart>
											{postTypeStats.length == 0 ? (
												<Typography
													variant="h3"
													sx={{
														color: `rgba(${
															1 * 60
														}, ${
															1 * 100
														}, 200, 0.6)`,
													}}
												>
													0
												</Typography>
											) : (
												totalQuantity
											)}
											<Typography
												variant="body2"
												color="textSecondary"
											>
												Các giao dịch
											</Typography>
										</Box>

										<Box sx={{ textAlign: "center" }}>
											<PieChart width={150} height={150}>
												<Pie
													data={[
														{
															name: "Tổng tài liệu",
															value:
																revenueStats[1]
																	?.totalPostsQuantity ??
																0,
														},
													]}
													cx="50%"
													cy="50%"
													innerRadius={50}
													outerRadius={60}
													fill="#82ca9d"
													dataKey="value"
													labelLine={false}
												>
													<Cell fill="rgba(100, 200, 100, 0.6)" />
													<Label
														value={
															revenueStats[1]
																?.totalPostsQuantity ??
															0
														}
														position="center"
														style={{
															fontSize: "16px",
															fontWeight: "bold",
														}}
													/>
												</Pie>
												<Tooltip />
											</PieChart>
											{revenueStats[1]
												?.totalPostsQuantity ?? (
												<Typography
													variant="h3"
													sx={{
														color: `rgba(${
															1 * 20
														}, ${
															1 * 20
														}, 200, 0.6)`,
													}}
												>
													0
												</Typography>
											)}
											<Typography
												variant="body2"
												color="textSecondary"
											>
												Tổng số tài liệu
											</Typography>
										</Box>

										<Box sx={{ textAlign: "center" }}>
											<PieChart width={150} height={150}>
												<Pie
													data={[
														{
															name: "Tổng doanh thu",
															value:
																revenueStats[0]
																	?.totalRevenue ||
																0,
														},
													]}
													cx="50%"
													cy="50%"
													innerRadius={50}
													outerRadius={60}
													fill="#ffc658"
													dataKey="value"
													labelLine={false}
												>
													<Cell fill="rgba(255, 198, 88, 0.6)" />
													<Label
														value={`${
															revenueStats[0]?.totalRevenue?.toLocaleString() ??
															0
														} đ`}
														position="center"
														style={{
															fontSize: "16px",
															fontWeight: "bold",
														}}
													/>
												</Pie>
												<Tooltip />
											</PieChart>
											{revenueStats[0]?.totalRevenue || (
												<Typography
													variant="h3"
													sx={{
														color: "red",
													}}
												>
													0
												</Typography>
											)}
											<Typography
												variant="body2"
												color="textSecondary"
											>
												Tổng doanh thu
											</Typography>
										</Box>
									</Box>
								</Box>
								<Snackbar
									open={open}
									autoHideDuration={30000}
									onClose={handleClose}
									message="Đã xóa tài liệu"
									action={action}
								/>
							</Paper>
						</Grid>

						<Grid item xs={12} md={6}>
							<Paper
								elevation={3}
								sx={{
									padding: 2,
									borderRadius: "12px",
									boxShadow: "none",
								}}
							>
								<Typography
									variant="h6"
									gutterBottom
									sx={{
										mb: 2,
										textTransform: "uppercase",
										fontWeight: 600,
									}}
								>
									Danh sách tài liệu
								</Typography>
								<Box sx={{ height: 400, width: "max-content" }}>
									<DataGrid
										// sx={{ height: "65vh" }}
										rows={rows}
										columns={columns}
										pageSize={5}
										rowsPerPageOptions={[5]}
									/>
								</Box>
							</Paper>
						</Grid>
					</Grid>
				</Container>
			)}
		</>
	);
};

export default UserInfo;
