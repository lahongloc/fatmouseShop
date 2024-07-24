import cookie from "react-cookies";
import { LOGIN, LOGOUT } from "./actions";
import { remove as removeCookie, load } from "react-cookies";

// const UserReducer = (currentState, action) => {
// 	switch (action.type) {
// 		case LOGIN:
// 			return action.payload;
// 		case LOGOUT:
// 			console.log("đăng xuất");
// 			cookie.remove("token");
// 			cookie.remove("user");
// 			return null;
// 	}

// 	return currentState;
// };

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
			return null;
		default:
			return current;
	}
};

export default UserReducer;
