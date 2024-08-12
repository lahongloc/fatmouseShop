const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostTypeSchema = new Schema({
	type: { type: String, required: true },
	name: { type: String, required: true },
});

module.exports = mongoose.model("PostType", PostTypeSchema);
