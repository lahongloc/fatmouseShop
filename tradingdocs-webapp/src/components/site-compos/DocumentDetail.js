import { useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { useEffect, useState } from "react";
import ProductDetail from "../UI-compos/ProductDetail";

const DocumentDetail = () => {
	const [q] = useSearchParams();
	const [document, setDocument] = useState([]);
	const [sucess, setsucess] = useState(false);

	const loadDocumentDetail = async () => {
		setsucess(false);
		try {
			let url = `${endpoints["get-posts"]}?postId=${q.get("postId")}`;
			console.log(url);
			const res = await APIs.get(url);
			console.log("nay: ", res.data[0].user.username);
			setDocument(res.data[0]);
			setsucess(true);
		} catch (err) {
			setsucess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		loadDocumentDetail();
	}, []);

	return <>{sucess && <ProductDetail product={document} />}</>;
};

export default DocumentDetail;
