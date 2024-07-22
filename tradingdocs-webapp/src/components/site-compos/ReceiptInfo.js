import { useEffect, useState } from "react";
import ReceiptDetail from "../UI-compos/ReceiptDetail";
import { useSearchParams } from "react-router-dom";
import APIs, { endpoints } from "../../configs/APIs";

const ReceiptInfo = () => {
	const [receipt, setReceipt] = useState({});
	const [q] = useSearchParams();
	const [success, setSuccess] = useState(false);

	const loadReceipt = async () => {
		setSuccess(false);
		try {
			const res = await APIs.get(
				`${endpoints["get-receipts"]}?receiptId=${q.get("receiptId")}`,
			);
			setReceipt(res.data[0]);
			setSuccess(true);
		} catch (err) {
			setSuccess(false);
			console.error(err);
		}
	};

	useEffect(() => {
		loadReceipt();
	}, []);

	return <>{success && <ReceiptDetail orderData={receipt} />}</>;
};

export default ReceiptInfo;
