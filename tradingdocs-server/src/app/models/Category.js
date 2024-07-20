const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema(
	{
		// _id: { type: Number, required: true },
		type: { type: String, required: true },
		name: { type: String, required: true },
		description: { type: String, required: true },
	},
	// { _id: false },
);

// categorySchema.plugin(AutoIncrement, { id: "category_seq", inc_field: "_id" });

module.exports = mongoose.model("Category", categorySchema);
