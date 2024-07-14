const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const meanSchema = new Schema(
	{
		_id: Number,
		type: { type: String, required: true },
		name: { type: String, required: true },
	},
	{ _id: false },
);

meanSchema.plugin(AutoIncrement, { id: "mean_seq", inc_field: "_id" });

module.exports = mongoose.model("Mean", meanSchema);
