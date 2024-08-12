const Channel = require("../models/Channel");
const Message = require("../models/Message");
const ObjectId = require("mongodb").ObjectId;

class ChannelController {
	// [POST] /channel/create-channel
	async createChannel(req, res, next) {
		const { userId1, userId2 } = req.body;

		let channel = await Channel.findOne({
			userId1: new ObjectId(userId1),
			userId2: new ObjectId(userId2),
		});

		if (!channel) {
			channel = new Channel({
				userId1: new ObjectId(userId1),
				userId2: new ObjectId(userId2),
			});
			await channel.save();
		}

		res.json(channel);
	}

	// [GET] /channel/get-messages
	async getMessages(req, res, next) {
		const { channelId } = req.query;
		const messages = await Message.find({
			channel: new ObjectId(channelId),
		}).populate("sender", "username");
		res.json(messages);
	}
}

module.exports = new ChannelController();
