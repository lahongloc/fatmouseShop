const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	type: { type: String, required: true },
	name: { type: String, required: true },
	description: { type: String, required: true },
});

module.exports = mongoose.model("Category", categorySchema);
