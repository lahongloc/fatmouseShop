import { Box, Container } from "@mui/material";
import PostCard from "../UI-compos/PostCard";
import APIs, { endpoints } from "../../configs/APIs";
import { useEffect, useState } from "react";

const HomePage = () => {
	const [posts, setPosts] = useState([]);

	const loadPosts = async () => {
		try {
			const res = await APIs.get(endpoints["get-posts"]);
			console.log(res.data[0]);
			setPosts(res.data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		loadPosts();
	}, []);

	const handleViewDetail = () => {
		console.log("haha");
	};

	return (
		<>
			<Container sx={{ display: "flex", flexWrap: "wrap" }}>
				{/* <h1>xin chao</h1> */}
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
						/>
					);
				})}
			</Container>
		</>
	);
};

export default HomePage;
