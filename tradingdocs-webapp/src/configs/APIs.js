import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:3000";

export const endpoints = {
	login: "/user/login",
};

export default axios.create({
	baseURL: BASE_URL,
});
