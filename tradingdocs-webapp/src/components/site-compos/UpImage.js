import React from "react";
import {
	Container,
	Grid,
	Paper,
	Typography,
	Box,
	Avatar,
	Divider,
	IconButton,
} from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

// Dữ liệu ví dụ
const user = {
	email: "vinh123@gmail.com",
	fullName: "Nguyễn Phước Vinh",
	hotline: "0245589358",
	id: "669dd8dfb396b1c167b43c19",
	username: "PhuocVinh",
};

const documents = [
	{
		_id: "669dd938b396b1c167b43c22",
		documentName: "Kinh tế chính trị",
		quantity: 4,
		price: 7000,
		image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/669dd8dfb396b1c167b43c19Mon%20Jul%2022%202024%2010:59:49%20GMT%2B0700%20(Indochina%20Time)?_a=BAMADKTE0",
	},
	{
		_id: "669cfa257711f058223bbeb1",
		documentName: "Giáo trình marketing căn bản",
		quantity: 1,
		price: 40000,
		image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/669cfa257711f058223bbeb1Sun%20Jul%2021%202024%2020:46:17%20GMT%2B0700%20(Indochina%20Time)?_a=BAMADKTE0",
	},
	{
		_id: "669cfa257711f058223bbeb2",
		documentName: "Sách lập trình cơ bản",
		quantity: 3,
		price: 25000,
		image: "https://res.cloudinary.com/dbfh15hki/image/upload/f_auto,q_auto/Sach-lap-trinh.jpg",
	},
];

const dataPieChart = [
	{ name: "Bán", value: 4 },
	{ name: "Trao đổi", value: 1 },
	{ name: "Tặng", value: 3 },
	{ name: "Mua", value: 5 },
];

const totalDocuments = documents.length;
const totalRevenue = documents.reduce(
	(acc, doc) => acc + doc.price * doc.quantity,
	0,
);

const totalQuantity = dataPieChart.reduce((acc, entry) => acc + entry.value, 0);

const emptyPieData = [{ name: "Chưa có dữ liệu", value: 1 }];

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
					onClick={() =>
						alert(`Xem chi tiết của ${params.row.documentName}`)
					}
				>
					<VisibilityIcon />
				</IconButton>
				<IconButton
					color="secondary"
					onClick={() =>
						alert(`Xóa tài liệu ${params.row.documentName}`)
					}
				>
					<DeleteIcon />
				</IconButton>
			</Box>
		),
	},
];

const rows = documents.map((doc) => ({
	id: doc._id,
	image: doc.image,
	documentName: doc.documentName,
	quantity: doc.quantity,
	price: doc.price,
}));

const UpdateImage = () => {
	return (
		<Container maxWidth="lg">
			<Grid container spacing={7} sx={{ mt: 2 }}>
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
								{user.fullName[0]}
							</Avatar>
							<Box sx={{ ml: 3 }}>
								<Typography variant="h6" gutterBottom>
									{user.fullName}
								</Typography>
								<Typography
									variant="body1"
									color="textSecondary"
								>
									{user.email}
								</Typography>
								<Typography
									variant="body1"
									color="textSecondary"
								>
									{user.hotline}
								</Typography>
								<Typography
									variant="body2"
									color="textSecondary"
									sx={{ mt: 2 }}
								>
									{user.username}
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
											data={dataPieChart}
											cx="50%"
											cy="50%"
											innerRadius={50}
											outerRadius={60}
											fill="#8884d8"
											dataKey="value"
											labelLine={false}
										>
											{dataPieChart.map(
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
											data={emptyPieData}
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
												value={totalDocuments}
												position="center"
												style={{
													fontSize: "16px",
													fontWeight: "bold",
												}}
											/>
										</Pie>
										<Tooltip />
									</PieChart>
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
											data={emptyPieData}
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
												value={totalRevenue}
												position="center"
												style={{
													fontSize: "16px",
													fontWeight: "bold",
												}}
											/>
										</Pie>
										<Tooltip />
									</PieChart>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										Tổng doanh thu
									</Typography>
								</Box>
							</Box>
						</Box>
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
	);
};

export default UpdateImage;
