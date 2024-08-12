const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const channelSchema = new mongoose.Schema({
	userId1: { type: mongoose.Types.ObjectId, ref: "User" },
	userId2: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Channel", channelSchema);
