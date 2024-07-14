const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const documentSchema = new Schema(
	{
		_id: Number,
		name: { type: String, required: true },
		lecturer: { type: String, required: true },
		isNew: { type: Boolean, required: true },
		category: { type: Number, ref: "Category", required: true },
	},
	{ _id: false },
);

documentSchema.plugin(AutoIncrement, { id: "document_seq", inc_field: "_id" });

module.exports = mongoose.model("Document", documentSchema);
