import { Button } from "@mui/material";
import APIs, { endpoints } from "../../configs/APIs";
import cookie from "react-cookies";
import {
	save as saveCookie,
	load,
	remove as removeCookie,
} from "react-cookies";

const handleRefresh = async () => {
	try {
		const res = await fetch("http://localhost:3000/user/refresh-token", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});
		saveCookie("token", res.data.token, {
			path: "/",
			domain: window.location.hostname,
		});

		saveCookie("refreshToken", res.data.refreshToken, {
			path: "/",
			domain: window.location.hostname,
		});
	} catch (err) {
		console.error(err);
	}
};

export default handleRefresh;
