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
	gap: 10, // Reduce the spacing between dropdowns
});

const CustomSelect = styled(FormControl)({
	minWidth: 120,
	borderRadius: 20,
	"& .MuiOutlinedInput-root": {
		borderRadius: 20,
	},
});

const UpdateImage = () => {
	const [isOpen, setIsOpen] = useState(false);
	const searchBoxRef = useRef(null);

	const [formData, setFormData] = useState({
		postType: "",
		category: "",
		durability: "",
		searchContent: "",
	});

	const handleSearchIconClick = () => {
		setIsOpen((prev) => !prev);
		console.log("haha: ", isOpen);
	};

	const handleClickOutside = (event) => {
		if (
			searchBoxRef.current &&
			!searchBoxRef.current.contains(event.target)
		) {
			setIsOpen(false);
		}
	};

	const handleScroll = () => {
		setIsOpen(false);
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		window.addEventListener("scroll", handleScroll);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<SearchContainer ref={searchBoxRef} sx={{ mt: 15 }}>
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
						placeholder="Search..."
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
									<em>Post Type</em>
								</MenuItem>
								<MenuItem value="Bán">Bán</MenuItem>
								<MenuItem value="Trao đổi">Trao đổi</MenuItem>
								<MenuItem value="Tặng">Tặng</MenuItem>
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
									<em>Category</em>
								</MenuItem>
								<MenuItem value="Tài liệu gốc">
									Tài liệu gốc
								</MenuItem>
								<MenuItem value="Tài liệu photo">
									Tài liệu photo
								</MenuItem>
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
								inputProps={{ "aria-label": "Durability" }}
							>
								<MenuItem value="">
									<em>Durability</em>
								</MenuItem>
								<MenuItem value="Mới">Mới</MenuItem>
								<MenuItem value="Cũ">Cũ</MenuItem>
							</Select>
						</CustomSelect>
					</DropdownContainer>
				</SearchBox>
			)}
		</SearchContainer>
	);
};

export default UpdateImage;
