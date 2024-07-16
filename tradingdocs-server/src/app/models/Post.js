const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const postSchema = new Schema(
	{
		_id: Number,
		documentName: { type: String, required: true },
		durability: { type: Boolean, required: true },
		lecturer: { type: String },
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		postType: {
			type: mongoose.Types.ObjectId,
			ref: "PostType",
			required: true,
		},
		// document: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: "Documentation",
		// 	required: true,
		// },
		price: { type: Number, required: false, default: Number(0) },
		exchangeDocument: { type: String, required: false },
		image: { type: String, required: false },
		description: { type: String, required: true },
		// place: {
		// 	type: mongoose.Types.ObjectId,
		// 	ref: "Place",
		// 	required: true,
		// },
		place: { type: String, required: true },
		// isNegotiable: { type: Boolean, required: true },
		quantity: { type: Number, required: true },
	},
	{ _id: false, timestamps: true },
);

postSchema.plugin(AutoIncrement, { id: "post_seq", inc_field: "_id" });

module.exports = mongoose.model("Post", postSchema);
