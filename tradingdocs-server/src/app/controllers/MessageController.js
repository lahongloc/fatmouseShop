const Message = require("../models/Message");
const User = require("../models/User");
const pusher = require("../../config/pusher/pusher");
const ObjectId = require("mongodb").ObjectId;

class MessageController {
	// [POST] /message/send-message
	async sendMessage(req, res, next) {
		const { channelId, senderId, message } = req.body;
		const sender = await User.findById(senderId);
		const newMessage = new Message({
			channel: new ObjectId(channelId),
			sender: sender,
			message,
		});
		await newMessage.save();

		pusher.trigger(`channel-${channelId}`, "message", {
			senderId,
			message,
		});

		res.sendStatus(200);
	}
}

module.exports = new MessageController();
