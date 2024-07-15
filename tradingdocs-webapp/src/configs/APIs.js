import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:3000";

export const endpoints = {
	login: "/user/login",
	"current-user": "/user/current-user",
	register: "/user/register",
	"upload-post": "/post/upload",
};

export default axios.create({
	baseURL: BASE_URL,
});
