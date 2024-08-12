import axios from "axios";
import cookie from "react-cookies";

export const BASE_URL = "http://localhost:3000";

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
	"get-receipts-by-buyer-id": "/receipt/get-receipts-by-buyer-id",
	"get-buyer-total-price": "/user/get-buyer-total-price",
	"get-transaction-statistic": "/user/receipts-statistic",
	"get-customer-orders": "/receipt/get-customer-orders",
	"delete-post": "/post/delete-post",
	"restore-post": "/post/restore-post",
	"refresh-token": "/user/refresh-token",
	"google-auth": "/auth",
	signOut: "/user/logout",
	"create-channel": "/channel/create-channel",
	"send-message": "/message/send-message",
	"get-messages": "/channel/get-messages",
	"get-users": "/user/get-users",
};

export default axios.create({
	baseURL: BASE_URL,
});
