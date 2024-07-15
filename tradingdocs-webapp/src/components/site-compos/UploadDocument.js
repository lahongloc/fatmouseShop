import React, { useRef, useState } from "react";
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
} from "@mui/material";

const UploadDocument = () => {
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
		time: "",
		isNegotiable: false,
		quantity: "",
	});

	const handleChange = (event) => {
		const { name, value, type, checked } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: type === "checkbox" ? checked : value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		// Handle form submission logic here
		console.log(formData); // Log the form data
		// You can perform further actions like API calls here
	};

	return (
		<Grid
			container
			spacing={2}
			style={{ width: "60%", height: "80%", margin: "auto" }}
		>
			<Grid item xs={12}>
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
											<TextField
												label="Tên tài liệu"
												fullWidth
												required
												name="documentName"
												value={formData.documentName}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												label="Giảng viên"
												variant="outlined"
												fullWidth
												required
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
													<MenuItem value="new">
														New
													</MenuItem>
													<MenuItem value="used">
														Used
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
													<MenuItem value="original">
														Original
													</MenuItem>
													<MenuItem value="photo">
														Photo
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
													Loại giao dịch
												</InputLabel>
												<Select
													label="Loại giao dịch"
													name="postTypeId"
													value={formData.postTypeId}
													onChange={handleChange}
												>
													<MenuItem value="sell">
														Sell
													</MenuItem>
													<MenuItem value="exchange">
														Exchange
													</MenuItem>
													<MenuItem value="giveaway">
														Giveaway
													</MenuItem>
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
										<Grid item xs={12}>
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
												label="Thời gian hẹn lấy"
												variant="outlined"
												fullWidth
												type="datetime-local"
												InputLabelProps={{
													shrink: true,
												}}
												name="time"
												value={formData.time}
												onChange={handleChange}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<FormControlLabel
												control={
													<Checkbox
														name="isNegotiable"
														checked={
															formData.isNegotiable
														}
														onChange={handleChange}
													/>
												}
												label="Khách hàng có thể đề nghị địa điểm và thời gian lấy sản phẩm khác không?"
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
											<Button
												type="submit"
												variant="contained"
												color="primary"
												fullWidth
											>
												Post
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
