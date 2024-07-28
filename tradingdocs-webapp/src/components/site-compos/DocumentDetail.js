import { useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { useEffect, useState } from "react";
import ProductDetail from "../UI-compos/ProductDetail";
import NotFoundPage from "../UI-compos/NotFoundPage ";
import CarouselCards from "../UI-compos/CarouselCards";

const DocumentDetail = () => {
	const [q] = useSearchParams();
	const [document, setDocument] = useState([]);
	const [sucess, setsucess] = useState(false);

	const [posts, setPosts] = useState([]);

	const loadDocumentDetail = async () => {
		setsucess(false);
		try {
			let url = `${endpoints["get-posts"]}?postId=${q.get("postId")}`;
			const currentDocumentRes = await APIs.get(url);
			setDocument(currentDocumentRes.data[0]);

			const postsRes = await APIs.get(endpoints["get-posts"]);
			// console.log(postsRes.data);
			// console.log(currentDocumentRes.data[0]._id);
			const mustShowPosts = postsRes.data.filter(
				(post) => post._id != currentDocumentRes.data[0]._id,
			);

			setPosts(mustShowPosts);

			setsucess(true);
		} catch (err) {
			setsucess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		loadDocumentDetail();
	}, [q]);

	if (sucess && !document) {
		return <NotFoundPage />;
	}

	return (
		<>
			{sucess && (
				<>
					<ProductDetail product={document} />
					<CarouselCards items={posts} />
				</>
			)}
		</>
	);
};

export default DocumentDetail;
