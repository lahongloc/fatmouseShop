import React from "react";
import { PieChart, Pie, Cell, Tooltip, Label } from "recharts";
import { Box, Chip, Paper, Typography } from "@mui/material";
import InsertChartOutlinedTwoToneIcon from "@mui/icons-material/InsertChartOutlinedTwoTone";

const totalPrice = 50000;

const CoupleCharts = ({ ...props }) => {
	const chartData = props.transactionData
		? props.transactionData.map((item) => ({
				name: item._id,
				value: item.totalQuantity,
		  }))
		: [];

	const COLORS = [
		"rgba(255, 99, 132, 0.6)",
		"rgba(54, 162, 235, 0.6)",
		"rgba(255, 206, 86, 0.6)",
	];

	return (
		<Paper
			elevation={3}
			sx={{
				padding: 3,
				height: "100%",
				borderRadius: "12px",
				boxShadow: 6,
			}}
		>
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
					icon={<InsertChartOutlinedTwoToneIcon />}
					color="primary"
					label="THỐNG KÊ HÓA ĐƠN"
					sx={{ p: 0.75 }}
				/>
			</Typography>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 2,
					width: "100%",
					maxWidth: "20%",
					margin: "0 auto",
				}}
			>
				<Box sx={{ textAlign: "center" }}>
					<PieChart width={150} height={150}>
						<Pie
							data={chartData}
							cx="50%"
							cy="50%"
							innerRadius={50}
							outerRadius={60}
							fill="#8884d8"
							paddingAngle={5}
							dataKey="value"
						>
							{chartData.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
							<Label
								value={chartData.reduce(
									(acc, item) => acc + item.value,
									0,
								)}
								position="center"
								style={{
									fontSize: "16px",
									fontWeight: "bold",
								}}
							/>
						</Pie>
						<Tooltip />
					</PieChart>
					<Typography variant="body2" color="textSecondary">
						Các giao dịch
					</Typography>
				</Box>
				<Box sx={{ textAlign: "center" }}>
					<PieChart width={150} height={150}>
						<Pie
							data={[
								{
									name: "Tổng doanh thu",
									value: props.totalPrice,
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
								value={`${props.totalPrice.toLocaleString()} đ`}
								position="center"
								style={{
									fontSize: "16px",
									fontWeight: "bold",
								}}
							/>
						</Pie>
						<Tooltip />
					</PieChart>

					<Typography variant="body2" color="textSecondary">
						Tổng chi tiêu
					</Typography>
				</Box>
			</Box>
		</Paper>
	);
};

export default CoupleCharts;
