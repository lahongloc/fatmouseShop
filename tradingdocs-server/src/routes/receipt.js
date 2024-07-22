const express = require("express");
const router = express.Router();
const authenticateToken = require("../app/middlewares/authenticateToken");

const receiptController = require("../app/controllers/ReceiptController");
router.post(
	"/create-receipt",
	authenticateToken,
	receiptController.createReceipt,
);

router.get("/get-receipts", receiptController.getReceipts);

module.exports = router;
