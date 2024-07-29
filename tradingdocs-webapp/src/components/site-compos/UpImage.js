import React, { useState, useEffect, useRef } from "react";
import {
	Box,
	IconButton,
	TextField,
	MenuItem,
	Button,
	InputLabel,
	Select,
	FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const UpdateImage = () => {
	const [searchOpen, setSearchOpen] = useState(false);
	const [postType, setPostType] = useState("");
	const [category, setCategory] = useState("");
	const [durability, setDurability] = useState("");
	const searchContainerRef = useRef(null);

	const handleSearchClick = () => {
		setSearchOpen(!searchOpen);
	};

	const handleSearch = () => {
		// Handle search logic here
		setSearchOpen(false);
	};

	const handleScroll = () => {
		setSearchOpen(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<Box sx={{ mt: 15 }}>
			{!searchOpen && (
				<IconButton onClick={handleSearchClick}>
					<SearchIcon />
				</IconButton>
			)}
			{searchOpen && (
				<Box
					ref={searchContainerRef}
					sx={{
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000,
					}}
				>
					<Box
						sx={{
							backgroundColor: "white",
							borderRadius: "10px",
							padding: "20px",
							display: "flex",
							flexDirection: "column",
							gap: "20px",
							width: "80%",
							maxWidth: "600px",
						}}
					>
						<TextField
							label="Document Name"
							variant="outlined"
							fullWidth
						/>
						<Box sx={{ display: "flex", gap: "20px" }}>
							<FormControl fullWidth>
								<InputLabel>Post Type</InputLabel>
								<Select
									value={postType}
									onChange={(e) =>
										setPostType(e.target.value)
									}
									label="Post Type"
								>
									<MenuItem value="Bán">Bán</MenuItem>
									<MenuItem value="Trao đổi">
										Trao đổi
									</MenuItem>
									<MenuItem value="Tặng">Tặng</MenuItem>
								</Select>
							</FormControl>
							<FormControl fullWidth>
								<InputLabel>Category</InputLabel>
								<Select
									value={category}
									onChange={(e) =>
										setCategory(e.target.value)
									}
									label="Category"
								>
									<MenuItem value="Tài liệu gốc">
										Tài liệu gốc
									</MenuItem>
									<MenuItem value="Tài liệu photo">
										Tài liệu photo
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ display: "flex", gap: "20px" }}>
							<FormControl fullWidth>
								<InputLabel>Durability</InputLabel>
								<Select
									value={durability}
									onChange={(e) =>
										setDurability(e.target.value)
									}
									label="Durability"
								>
									<MenuItem value="Mới">Mới</MenuItem>
									<MenuItem value="Cũ">Cũ</MenuItem>
								</Select>
							</FormControl>
							<Button
								variant="contained"
								color="primary"
								onClick={handleSearch}
								sx={{ height: "fit-content" }}
							>
								Search
							</Button>
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	);
};

export default UpdateImage;
