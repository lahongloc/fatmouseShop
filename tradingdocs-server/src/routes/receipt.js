const express = require("express");
const router = express.Router();
const authenticateToken = require("../app/middlewares/authenticateToken");

const receiptController = require("../app/controllers/ReceiptController");
router.post(
	"/create-receipt",
	authenticateToken,
	receiptController.createReceipt,
);

router.get("/get-receipts", authenticateToken, receiptController.getReceipts);
router.get(
	"/get-receipts-by-buyer-id",
	authenticateToken,
	receiptController.getReceiptsByBuyerId,
);

router.get(
	"/get-customer-orders",
	authenticateToken,
	receiptController.getCustomerOrders,
);

module.exports = router;
