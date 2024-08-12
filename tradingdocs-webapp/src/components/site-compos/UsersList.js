import React, { useEffect, useState } from "react";
import {
	Container,
	Grid,
	Card,
	CardContent,
	Typography,
	Avatar,
	Box,
	TextField,
	Button,
	Divider,
} from "@mui/material";
import APIs, { endpoints } from "../../configs/APIs";

const UsersList = () => {
	const [users, setUsers] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await APIs.get(endpoints["get-users"]);
				setUsers(res.data);
			} catch (err) {
				console.error(err);
			}
		};

		fetchUsers();
	}, []);

	const handleSearch = (event) => {
		setSearchTerm(event.target.value);
	};

	const filteredUsers = users.filter((user) =>
		user.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<Container>
			<Box
				sx={{
					position: "fixed",
					top: 85,
					left: 0,
					width: "100%",
					backgroundColor: "white",
					zIndex: 1000,
					p: 2,
					display: "flex",
					justifyContent: "center",
					// boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
				}}
			>
				<TextField
					label="Tìm kiếm trên TradingDocs"
					variant="outlined"
					value={searchTerm}
					onChange={handleSearch}
					sx={{
						width: "45%",
						borderRadius: "25px",
						"& .MuiOutlinedInput-root": {
							borderRadius: "25px",
						},
					}}
				/>
			</Box>
			<Box sx={{ mt: 15, pt: 10 }}>
				<Grid container spacing={2}>
					{filteredUsers.map((user) => (
						<Grid item xs={12} sm={8} md={6} key={user._id}>
							<Card
								sx={{
									boxShadow: "none",
									boxShadow:
										"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
									borderRadius: "7px",
								}}
							>
								<CardContent>
									<Box display="flex" alignItems="center">
										<Avatar
											alt={user.fullName}
											src={`/static/images/avatar/${user._id}.jpg`}
											sx={{
												width: 56,
												height: 56,
												boxShadow:
													"rgba(3, 102, 214, 0.3) 0px 0px 0px 3px",
												backgroundColor: "#1976d2",
											}}
										/>
										<Box ml={2} flexGrow={1}>
											<Typography variant="h6">
												{user.fullName}
											</Typography>
											<Typography
												variant="body2"
												color="textSecondary"
											>
												{user.username}
											</Typography>
											<Typography variant="body2">
												{user.email}
											</Typography>
										</Box>
										<Button
											variant="contained"
											sx={{
												backgroundColor: "#ebf5ff",
												boxShadow: "none",
												color: "#0064d1",
												width: "max-content",
												fontWeight: 550,
												textTransform: "unset",
												borderRadius: "8px",
												"&:hover": {
													backgroundColor: "#ebf5ff",
												},
											}}
										>
											Nhắn tin
										</Button>
									</Box>
								</CardContent>
							</Card>
							<Divider />
						</Grid>
					))}
				</Grid>
			</Box>
		</Container>
	);
};

export default UsersList;
