import { useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";
import { useEffect, useState } from "react";
import ProductDetail from "../UI-compos/ProductDetail";
import NotFoundPage from "../UI-compos/NotFoundPage ";

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

	if (sucess && !document) {
		return <NotFoundPage />;
	}

	return <>{sucess && <ProductDetail product={document} />}</>;
};

export default DocumentDetail;
