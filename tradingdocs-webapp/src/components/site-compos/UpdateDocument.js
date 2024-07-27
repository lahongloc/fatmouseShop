import React, { useContext, useEffect, useRef, useState } from "react";
import {
	Grid,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Button,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Autocomplete,
	Alert,
} from "@mui/material";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import { useSearchParams } from "react-router-dom";
import LinearBuffer from "../UI-compos/LinearBuffer";
import { UserContext } from "../../App";
import NotFoundPage from "../UI-compos/NotFoundPage ";

const UpdateDocument = ({ match }) => {
	const [user, dispatch] = useContext(UserContext);

	const [categories, setCategories] = useState([]);
	const [postTypes, setPostTypes] = useState([]);
	const [document, setDocument] = useState(null);
	const [initialData, setInitialData] = useState(null);
	const [originalImage, setOriginalImage] = useState(null); // State for original image
	const [sucess, setSucess] = useState(false);
	const [q] = useSearchParams();

	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({
		success: false,
		error: false,
	});

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

	const loadDocument = async () => {
		setSucess(false);
		try {
			const res = await APIs.get(
				`${endpoints["get-posts"]}?postId=${q.get("postId")}`,
			);
			const doc = res.data[0];
			doc.price = doc.price ?? 0;
			setDocument(doc);
			setInitialData(doc);
			setOriginalImage(doc.image); // Set original image URL
			setSucess(true);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadCategories();
		loadPostTypes();
		loadDocument();
	}, []);

	const img = useRef();
	const [formData, setFormData] = useState({
		documentName: "",
		lecturer: "",
		durability: "",
		category: "",
		image: null,
		postType: "",
		price: "",
		description: "",
		place: "",
		quantity: "",
	});

	useEffect(() => {
		if (document) {
			setFormData({
				documentName: document.documentName,
				lecturer: document.lecturer,
				durability: document.durability,
				category: document.category._id,
				image: document.image,
				postType: document.postType._id,
				price: document.price,
				description: document.description,
				place: document.place,
				quantity: document.quantity,
			});
		}
	}, [document]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const getChangedValues = () => {
		const changedValues = {};
		for (const key in formData) {
			if (formData[key] != initialData[key]) {
				if (key === "postType" || key === "category") {
					if (formData[key] != initialData[key]._id) {
						changedValues[key] = formData[key];
					}
				} else {
					changedValues[key] = formData[key];
				}
			}
		}
		return changedValues;
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const changedData = getChangedValues();
		if (Object.keys(changedData).length === 0) {
			console.log("No changes detected.");
			return; // Exit if no changes
		}

		try {
			setLoading(true);
			const res = await APIs.put(
				`${endpoints["update-post"]}/${q.get("postId")}`,
				changedData,
				{
					headers: {
						Authorization: cookie.load("token"),
						"Content-Type": "multipart/form-data",
					},
				},
			);

			setMessage((prev) => {
				return { error: false, success: true };
			});
			loadDocument();
		} catch (err) {
			setMessage((prev) => {
				return { success: false, error: true };
			});
			console.error(err);
		} finally {
			setLoading(false);
			setTimeout(() => {
				setMessage({
					success: false,
					error: false,
				});
			}, 5000);
		}
		// console.log(changedData);
	};

	const resetImage = () => {
		setFormData((prevFormData) => ({
			...prevFormData,
			image: originalImage, // Reset image to original
		}));
	};

	const resetAllFields = () => {
		if (initialData) {
			setFormData((prev) => ({
				documentName: initialData.documentName,
				lecturer: initialData.lecturer,
				durability: initialData.durability,
				category: initialData.category._id,
				image: initialData.image, // This will keep the original image
				postType: initialData.postType._id,
				price: initialData.price,
				description: initialData.description,
				place: initialData.place,
				quantity: initialData.quantity,
			}));
		}
	};

	const isFormChanged = () => {
		if (!initialData) return false;
		const initialValues = {
			documentName: initialData.documentName,
			lecturer: initialData.lecturer,
			durability: initialData.durability,
			category: initialData.category._id,
			image: initialData.image,
			postType: initialData.postType._id,
			price: initialData.price,
			description: initialData.description,
			place: initialData.place,
			quantity: initialData.quantity,
		};
		for (const key in formData) {
			if (formData[key] != initialValues[key]) {
				return true;
			}
		}
		return false;
	};

	useEffect(() => {
		console.log("user dang nhap: ", user.user.id);
		console.log("user cua doc:", document?.user._id);
	});

	if (user.user.id !== document?.user._id) {
		return (
			<>
				<NotFoundPage />
			</>
		);
	}

	return (
		<>
			{sucess && (
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
									SỬA TÀI LIỆU
								</Typography>
								<form onSubmit={handleSubmit}>
									<Grid container spacing={2}>
										<Grid
											item
											xs={3}
											style={{ textAlign: "center" }}
										>
											<input
												onChange={(e) => {
													const selectedFile =
														e.target.files[0];
													const reader =
														new FileReader();
													reader.onloadend = () => {
														setFormData((prev) => ({
															...prev,
															image: reader.result,
														}));
													};
													reader.readAsDataURL(
														selectedFile,
													);
												}}
												accept="image/*"
												style={{ display: "none" }}
												id="image-upload"
												type="file"
												ref={img}
											/>
											<label htmlFor="image-upload">
												<CardMedia
													component="img"
													height="200"
													image={
														formData.image ??
														originalImage ??
														"https://via.placeholder.com/150"
													} // Use originalImage as fallback
													alt="Default Image"
													style={{
														cursor: "pointer",
													}}
												/>
											</label>
											<Button
												variant="outlined"
												onClick={resetImage}
												style={{ marginTop: "10px" }}
											>
												Refresh Image
											</Button>
										</Grid>
										<Grid item xs={9}>
											<Button
												variant="outlined"
												onClick={resetAllFields}
												style={{
													marginBottom: 20,
													marginLeft: "77%",
												}}
											>
												Refresh All
											</Button>
											<Grid container spacing={2}>
												<Grid item xs={12} sm={6}>
													<Autocomplete
														freeSolo
														options={[]}
														value={
															formData.documentName
														}
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
														renderInput={(
															params,
														) => (
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
														value={
															formData.lecturer
														}
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
															value={
																formData.durability
															}
															onChange={
																handleChange
															}
														>
															<MenuItem
																value={true}
															>
																Mới
															</MenuItem>
															<MenuItem
																value={false}
															>
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
															name="category"
															value={
																formData.category
															}
															onChange={
																handleChange
															}
														>
															{categories.map(
																(
																	category,
																	index,
																) => (
																	<MenuItem
																		value={
																			category._id
																		}
																		key={
																			index
																		}
																	>
																		{
																			category.name
																		}
																	</MenuItem>
																),
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
															name="postType"
															value={
																formData.postType
															}
															onChange={
																handleChange
															}
														>
															{postTypes.map(
																(
																	postType,
																	index,
																) => (
																	<MenuItem
																		value={
																			postType._id
																		}
																		key={
																			index
																		}
																	>
																		{
																			postType.name
																		}{" "}
																		(
																		{
																			postType.type
																		}
																		)
																	</MenuItem>
																),
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
														name="description"
														value={
															formData.description
														}
														onChange={handleChange}
														multiline
														rows={3}
													/>
												</Grid>
												<Grid item xs={12} sm={6}>
													<TextField
														label="Địa điểm hẹn lấy"
														variant="outlined"
														fullWidth
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
														value={
															formData.quantity
														}
														onChange={handleChange}
														inputProps={{
															min: 1,
														}}
													/>
												</Grid>
												<Grid item xs={12}>
													{message.success && (
														<Alert
															className="animate__animated animate__tada"
															severity="success"
														>
															Cập nhật thành công!
														</Alert>
													)}
													{message.error && (
														<Alert
															className="animate__animated animate__wobble"
															severity="error"
														>
															Đã có lỗi xảy ra,
															vui lòng đăng nhập
															và thử lại, hoặc báo
															cáo với ADMIN{" "}
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
														fullWidth
														disabled={
															!isFormChanged()
														}
													>
														Sửa tài liệu
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
			)}
		</>
	);
};

export default UpdateDocument;
