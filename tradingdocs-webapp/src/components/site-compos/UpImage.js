import React, { useState } from "react";
import {
	Grid,
	TextField,
	Button,
	Typography,
	Card,
	CardContent,
} from "@mui/material";
import axios from "axios";
import APIs, { endpoints } from "../../configs/APIs";

const UploadForm = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const formData = new FormData();
		formData.append("tenfile", file);
		console.log(file);

		try {
			const response = await APIs.post(
				endpoints["upload-test"],
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
			);
			console.log("File uploaded successfully", response.data);
		} catch (error) {
			console.error("Error uploading file", error);
		}
	};

	return (
		<Grid container spacing={2} justifyContent="center">
			<Grid item xs={12} md={6}>
				<Card>
					<CardContent>
						<Typography variant="h5" component="h2">
							Upload Image
						</Typography>
						<form onSubmit={handleSubmit}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										type="file"
										onChange={handleFileChange}
										fullWidth
										InputLabelProps={{ shrink: true }}
									/>
								</Grid>

								<Grid item xs={12}>
									<Button
										type="submit"
										variant="contained"
										color="primary"
										fullWidth
									>
										Upload
									</Button>
								</Grid>
							</Grid>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default UploadForm;
