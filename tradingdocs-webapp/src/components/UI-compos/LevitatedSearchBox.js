import React, { useState, useRef, useEffect } from "react";
import {
	Box,
	IconButton,
	InputBase,
	MenuItem,
	FormControl,
	Select,
	Paper,
	Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { styled } from "@mui/system";
import CachedIcon from "@mui/icons-material/Cached";

const SearchContainer = styled(Box)({
	display: "flex",
	alignItems: "center",
	position: "relative",
});

const SearchIconWrapper = styled(IconButton)({
	padding: 10,
	borderRadius: "50%",
	backgroundColor: "#1976d2",
	color: "#fff",
	"&:hover": {
		backgroundColor: "#1565c0",
	},
});

const SearchBox = styled(Paper)({
	display: "flex",
	flexDirection: "column",
	borderRadius: 20,
	padding: "10px 20px",
	boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
	position: "absolute",
	top: 0,
	left: 50,
	width: 500,
	backgroundColor: "#fff",
	zIndex: 10,
	transition: "opacity 0.3s ease",
});

const CustomInputBase = styled(InputBase)({
	marginLeft: 10,
	flex: 1,
	borderRadius: 20,
	padding: "5px 10px",
	border: "1px solid #ccc",
});

const DropdownContainer = styled(Box)({
	display: "flex",
	marginTop: 10,
	padding: "5px 10px",
	gap: 10,
});

const CustomSelect = styled(FormControl)({
	minWidth: 120,
	borderRadius: 20,
	"& .MuiOutlinedInput-root": {
		borderRadius: 20,
	},
});

const LevitatedSearchBox = ({ ...props }) => {
	const [isOpen, setIsOpen] = useState(false);

	const [formData, setFormData] = useState({
		postType: "",
		category: "",
		durability: "",
		searchContent: "",
	});

	const handleSearchIconClick = () => {
		setIsOpen((prev) => !prev);
	};

	const handleScroll = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		console.log(formData);
		props.searchSubmit(formData);
	}, [formData]);

	// useEffect(() => {
	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => {
	// 		window.removeEventListener("scroll", handleScroll);
	// 	};
	// }, []);

	return (
		<SearchContainer sx={{ mt: 15 }}>
			<SearchIconWrapper onClick={handleSearchIconClick}>
				<SearchIcon />
			</SearchIconWrapper>
			{isOpen && (
				<SearchBox className="animate__animated animate__flipInX">
					<CustomInputBase
						value={formData.searchContent}
						onChange={(e) => {
							setFormData((prev) => ({
								...prev,
								searchContent: e.target.value,
							}));
						}}
						placeholder="Nhập tên tài liệu..."
					/>
					<DropdownContainer>
						<CustomSelect variant="outlined">
							<Select
								value={formData.postType}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										postType: e.target.value,
									}))
								}
								displayEmpty
								inputProps={{ "aria-label": "Post Type" }}
							>
								<MenuItem value="">
									<em>Loại giao dịch</em>
								</MenuItem>
								{props?.postTypes.map((postType, index) => {
									return (
										<MenuItem
											key={index}
											value={postType._id}
										>
											{postType.name}
										</MenuItem>
									);
								})}
							</Select>
						</CustomSelect>
						<CustomSelect variant="outlined">
							<Select
								value={formData.category}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										category: e.target.value,
									}))
								}
								displayEmpty
								inputProps={{ "aria-label": "Category" }}
							>
								<MenuItem value="">
									<em>Loại tài liệu</em>
								</MenuItem>
								{props?.categories.map((category, index) => {
									return (
										<MenuItem
											key={index}
											value={category._id}
										>
											{category.name}
										</MenuItem>
									);
								})}
							</Select>
						</CustomSelect>
						<CustomSelect variant="outlined">
							<Select
								value={formData.durability}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										durability: e.target.value,
									}))
								}
								displayEmpty
								inputProps={{ "aria-label": "Category" }}
							>
								<MenuItem value="">
									<em>Độ bền</em>
								</MenuItem>
								<MenuItem value={true}>
									<em>Mới</em>
								</MenuItem>
								<MenuItem value={false}>
									<em>Cũ</em>
								</MenuItem>
							</Select>
						</CustomSelect>
						<IconButton
							onClick={() => {
								setFormData({
									postType: "",
									category: "",
									durability: "",
									searchContent: "",
								});
							}}
							sx={{
								height: "2.5rem",
								ml: "2rem",
								mt: 1,
								bgcolor: "#edf7ed",
							}}
						>
							<CachedIcon />
						</IconButton>
					</DropdownContainer>
				</SearchBox>
			)}
		</SearchContainer>
	);
};

export default LevitatedSearchBox;
