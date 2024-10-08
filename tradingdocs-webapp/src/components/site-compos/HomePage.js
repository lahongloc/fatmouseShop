import { Box, Container } from "@mui/material";
import PostCard from "../UI-compos/PostCard";
import APIs, { endpoints } from "../../configs/APIs";
import { useContext, useEffect, useState } from "react";
import LevitatedSearchBox from "../UI-compos/LevitatedSearchBox";
import cookie from "react-cookies";
import {
	save as saveCookie,
	load,
	remove as removeCookie,
} from "react-cookies";
import { UserContext } from "../../App";
import { LOGIN } from "../../reducers/actions";

const HomePage = () => {
	const [user, dispatch] = useContext(UserContext);
	const [posts, setPosts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [postTypes, setPostTypes] = useState([]);
	const [query, setQuery] = useState("");

	const loadAouthUser = async () => {
		try {
			const token = cookie.load("token");
			console.log("token la: ", token);
			if (token) {
				const currentUser = await APIs.get(endpoints["current-user"], {
					headers: {
						Authorization: token,
					},
				});
				saveCookie("user", currentUser.data.user, {
					path: "/",
					domain: window.location.hostname,
				});
				dispatch({
					type: LOGIN,
					payload: currentUser.data.user,
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadAouthUser();
	}, []);
	const loadCategories = async () => {
		try {
			const res = await APIs.get(endpoints["get-categories"]);
			setCategories(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const loadPostTypes = async () => {
		try {
			const res = await APIs.get(endpoints["get-postTypes"]);
			setPostTypes(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	const loadPosts = async () => {
		try {
			const res = await APIs.get(`${endpoints["get-posts"]}${query}`);
			console.log(res.data[0]);
			setPosts(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadPosts();
		loadCategories();
		loadPostTypes();
	}, []);

	useEffect(() => {
		loadPosts();
	}, [query]);

	const handleQueryChange = (form) => {
		setQuery(
			`?search=${form?.searchContent}&postType=${form?.postType}&category=${form?.category}&durability=${form?.durability}`,
		);
	};

	return (
		<>
			{/* <Draggable> */}
			<Box sx={{ position: "fixed", top: -35, left: 85, zIndex: 1000 }}>
				<LevitatedSearchBox
					categories={categories}
					postTypes={postTypes}
					searchSubmit={handleQueryChange}
				/>
			</Box>
			{/* </Draggable> */}
			<Container sx={{ display: "flex", flexWrap: "wrap", mt: 15 }}>
				{posts.map((post, index) => {
					return (
						<PostCard
							postId={post._id}
							name={post.user.username}
							img={post.image}
							des={post.description}
							time={post.createdAt}
							postType={post.postType.name}
							isNegotiable={post.isNegotiable}
							price={post.price}
							ownerId={post.user._id}
							documentName={post.documentName}
							quantity={post.quantity}
						/>
					);
				})}
			</Container>
		</>
	);
};

export default HomePage;
