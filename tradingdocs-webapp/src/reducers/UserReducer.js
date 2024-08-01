import cookie from "react-cookies";
import { LOGIN, LOGOUT } from "./actions";
import { remove as removeCookie, load } from "react-cookies";
import APIs, { endpoints } from "../configs/APIs";

const signOut = async () => {
	try {
		const res = await APIs.get(endpoints["signOut"], {
			credentials: "include",
		});

		if (res.status === 200) {
			// Successfully logged out, redirect to login page or homepage
			window.location.href = "/sign-in"; // Adjust the URL to your login page
		} else {
			console.error("Failed to log out");
		}
	} catch (err) {
		console.error(err);
	}
};

export const UserReducer = (current, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload;
		case LOGOUT:
			// cookie.remove("user");
			// cookie.remove("token");
			removeCookie("user", {
				path: "/",
				domain: window.location.hostname,
			});
			removeCookie("token", {
				path: "/",
				domain: window.location.hostname,
			});

			console.log(
				"Cookies removed:",
				!cookie.load("user"),
				!cookie.load("token"),
			);
			signOut();
			return null;
		default:
			return current;
	}
};

export default UserReducer;
