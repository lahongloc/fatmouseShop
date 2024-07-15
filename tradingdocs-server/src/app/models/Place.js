const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const placeSchema = new Schema(
	{
		_id: { type: Number },
		description: { type: String, required: true },
		time: { type: Date, required: true },
	},
	{ _id: false }, // This should be in the schema options
);

placeSchema.plugin(AutoIncrement, { id: "place_seq", inc_field: "_id" });

module.exports = mongoose.model("Place", placeSchema);
