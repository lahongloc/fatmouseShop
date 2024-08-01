import { Button } from "@mui/material";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UpdateImage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		console.log("paramss: ", urlParams);
		const token = urlParams.get("token");
		if (token) {
			console.log("token google la: ", token);
			// localStorage.setItem("jwtToken", token);
			navigate("/up"); // Redirect to dashboard or any protected route
		}
	}, [navigate]);
	const handleRefresh = () => {
		window.location.href = "http://localhost:3000/auth/google";
	};

	return (
		<Button onClick={handleRefresh} sx={{ mt: 15 }}>
			Click to refresh
		</Button>
	);
};

export default UpdateImage;
