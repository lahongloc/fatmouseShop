import React, { useEffect, useRef, useState } from "react";
import {
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Checkbox,
	FormControlLabel,
	Button,
	Typography,
	TextareaAutosize,
	Card,
	CardContent,
	CardMedia,
	Autocomplete,
	Alert,
} from "@mui/material";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import TextFieldOption from "../UI-compos/TextFieldOption";
import LinearBuffer from "../UI-compos/LinearBuffer";
import { useNavigate } from "react-router-dom";

const UploadDocument = () => {
	const [categories, setCategories] = useState([]);
	const [postTypes, setPostTypes] = useState([]);

	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(true);

	const navigate = useNavigate();

	const loadCategories = async () => {
		try {
			const res = await APIs.get(endpoints["get-categories"]);
			setCategories(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const loadPostTypes = async () => {
		try {
			const res = await APIs.get(endpoints["get-postTypes"]);
			setPostTypes(res.data);
		} catch (err) {
			console.error(err);
		}
	};
	useEffect(() => {
		loadCategories();
		loadPostTypes();
	}, []);

	const img = useRef();
	const [preview, setPreview] = useState(null);
	const [formData, setFormData] = useState({
		documentName: "",
		lecturer: "",
		durability: "",
		categoryId: "",
		image: null,
		postTypeId: "",
		price: "",
		description: "",
		place: "",
		// isNegotiable: false,
		quantity: "",
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: type === "checkbox" ? checked : value,
			[name]: value < 0 ? 0 : value,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const res = await APIs.post(endpoints["upload-post"], formData, {
				headers: {
					Authorization: cookie.load("token"),
					"Content-Type": "multipart/form-data",
				},
			});
			setSuccess(true);
			navigate(`/`);
		} catch (err) {
			setSuccess(false);
			console.error(err);
		} finally {
			setLoading(false);
			setTimeout(() => {
				setSuccess(true);
			}, 5000);
		}

		// Handle form submission logic here
		// console.log(formData); // Log the form data
		// You can perform further actions like API calls here
	};

	return (
		<Grid
			container
			spacing={2}
			style={{ width: "60%", height: "80%", margin: "auto" }}
		>
			<Grid item xs={12}>
				{loading && <LinearBuffer />}
				<Card variant="outlined">
					<CardContent>
						<Typography variant="h6" gutterBottom>
							ĐĂNG MỘT TÀI LIỆU
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={3}>
									<input
										onChange={(e) => {
											const selectedFile =
												e.target.files[0];
											const reader = new FileReader();
											reader.onloadend = () => {
												setFormData((prev) => {
													return {
														...prev,
														image: reader.result,
													};
												});
											};
											reader.readAsDataURL(selectedFile);
										}}
										accept="image/*"
										style={{ display: "none" }}
										id="image-upload"
										multiple
										type="file"
										ref={img}
									/>
									<label htmlFor="image-upload">
										<CardMedia
											component="img"
											height="200"
											image={
												formData.image ??
												"https://via.placeholder.com/150"
											} // Placeholder image URL
											alt="Default Image"
											style={{ cursor: "pointer" }}
										/>
									</label>
								</Grid>
								<Grid item xs={9}>
									<Grid container spacing={2}>
										<Grid item xs={12} sm={6}>
											{/* <TextField
												label="Tên tài liệu"
												fullWidth
												required
												name="documentName"
												value={formData.documentName}
												onChange={handleChange}
											/> */}
											<Autocomplete
												freeSolo
												options={[]}
												value={formData.documentName}
												onChange={handleChange}
												onInputChange={(
													event,
													newInputValue,
												) => {
													setFormData({
														...formData,
														documentName:
															newInputValue,
													});
												}}
												renderInput={(params) => (
													<TextField
														{...params}
														label="Tên tài liệu"
														fullWidth
														required
														name="documentName"
													/>
												)}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												label="Giảng viên"
												variant="outlined"
												fullWidth
												name="lecturer"
												value={formData.lecturer}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl
												fullWidth
												variant="outlined"
												required
											>
												<InputLabel>
													Còn mới/cũ
												</InputLabel>
												<Select
													label="Còn mới/cũ"
													name="durability"
													value={formData.durability}
													onChange={handleChange}
												>
													<MenuItem value="true">
														Mới
													</MenuItem>
													<MenuItem value="false">
														Cũ
													</MenuItem>
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl
												fullWidth
												variant="outlined"
												required
											>
												<InputLabel>
													Loại tài liệu
												</InputLabel>
												<Select
													label="Loại tài liệu"
													name="categoryId"
													value={formData.categoryId}
													onChange={handleChange}
												>
													{categories.map(
														(category, index) => {
															return (
																<MenuItem
																	value={
																		category._id
																	}
																	key={index}
																>
																	{
																		category.name
																	}
																</MenuItem>
															);
														},
													)}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControl
												fullWidth
												variant="outlined"
												required
											>
												<InputLabel>
													Loại giao dịch
												</InputLabel>
												<Select
													label="Loại giao dịch"
													name="postTypeId"
													value={formData.postTypeId}
													onChange={handleChange}
												>
													{postTypes.map(
														(postType, index) => {
															return (
																<MenuItem
																	value={
																		postType._id
																	}
																	key={index}
																>
																	{
																		postType.name
																	}
																	(
																	{
																		postType.type
																	}
																	)
																</MenuItem>
															);
														},
													)}
												</Select>
											</FormControl>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												label="Giá"
												variant="outlined"
												fullWidth
												type="number"
												name="price"
												value={formData.price}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											<TextField
												label="Mô tả"
												variant="outlined"
												fullWidth
												multiline
												rows={4}
												name="description"
												value={formData.description}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												label="Địa điểm hẹn lấy"
												variant="outlined"
												fullWidth
												multiline
												name="place"
												value={formData.place}
												onChange={handleChange}
											/>
										</Grid>

										<Grid item xs={12} sm={6}>
											<TextField
												label="Số lượng"
												variant="outlined"
												fullWidth
												type="number"
												name="quantity"
												value={formData.quantity}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12}>
											{success || (
												<Alert
													className="animate__animated animate__wobble"
													severity="warning"
												>
													Đã có lỗi xảy ra, vui lòng
													đăng nhập và thử lại, hoặc
													báo cáo với ADMIN{" "}
													<span
														style={{
															color: "red",
															cursor: "pointer",
														}}
													>
														tại đây.
													</span>
												</Alert>
											)}
										</Grid>
										<Grid item xs={12}>
											<Button
												type="submit"
												variant="contained"
												color="primary"
												disabled={loading}
												fullWidth
											>
												Đăng tài liệu
											</Button>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default UploadDocument;
