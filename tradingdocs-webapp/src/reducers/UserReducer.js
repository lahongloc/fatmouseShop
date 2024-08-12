import cookie from "react-cookies";
import { LOGIN, LOGOUT } from "./actions";
import { remove as removeCookie, load } from "react-cookies";
import APIs, { BASE_URL, endpoints } from "../configs/APIs";

const signOut = async () => {
	window.open(`${BASE_URL}${endpoints["signOut"]}`);
};

export const UserReducer = (current, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload;
		case LOGOUT:
			removeCookie("user", {
				path: "/",
				domain: window.location.hostname,
			});
			removeCookie("token", {
				path: "/",
				domain: window.location.hostname,
			});

			signOut();
			return null;
		default:
			return current;
	}
};

export default UserReducer;
