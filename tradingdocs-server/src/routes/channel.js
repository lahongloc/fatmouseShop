const express = require("express");
const router = express.Router();

const channelController = require("../app/controllers/ChannelController");

router.post("/create-channel", channelController.createChannel);
router.get("/get-messages", channelController.getMessages);

module.exports = router;
