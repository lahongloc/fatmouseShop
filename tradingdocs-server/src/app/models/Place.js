const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const placeSchema = new Schema({
	description: { type: String, required: true },
	time: { type: Date, required: true },
});

module.exports = placeSchema;
