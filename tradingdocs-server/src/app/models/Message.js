const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
	channel: { type: mongoose.Types.ObjectId, ref: "Channel" },
	sender: { type: mongoose.Types.ObjectId, ref: "User" },
	message: String,
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);
