const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const PostTypeSchema = new Schema(
	{
		// _id: Number,
		type: { type: String, required: true },
		name: { type: String, required: true },
	},
	// { _id: false },
);

// PostTypeSchema.plugin(AutoIncrement, { id: "postType_seq", inc_field: "_id" });

module.exports = mongoose.model("PostType", PostTypeSchema);
