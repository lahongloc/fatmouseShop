const express = require("express");
const router = express.Router();

const messageController = require("../app/controllers/MessageController");

router.post("/send-message", messageController.sendMessage);

module.exports = router;
