import axios from "axios";
import cookie from "react-cookies";

const BASE_URL = "http://localhost:3000";

export const endpoints = {
	login: "/user/login",
	"current-user": "/user/current-user",
	register: "/user/register",
	"upload-post": "/post/upload",
	"upload-test": "/upload-image",
	"get-posts": "/post/get-posts",
	"get-categories": "/cate/get-cates",
	"get-postTypes": "/postType/get-postTypes",
	"update-post": "/post/update-post",
	"create-receipt": "/receipt/create-receipt",
	"get-receipts": "/receipt/get-receipts",
	"get-postType-statistic": "/user/postType-statistic",
	"get-revenue-statistic": "/user/revenue-statistic",
	"get-post-by-user-id": "/post/get-posts-by-user-id",
};

export default axios.create({
	baseURL: BASE_URL,
});
