const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const mongooseDelete = require("mongoose-delete");

const postSchema = new Schema(
	{
		// _id: Number,
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
		price: { type: Number, required: false, default: 0 },
		exchangeDocument: { type: String, required: false },
		image: { type: String, required: false },
		description: { type: String, required: true },
		place: { type: String, required: true },
		quantity: { type: Number, required: true },
	},
	{ timestamps: true },
	// { _id: false, timestamps: true },
);

// postSchema.plugin(AutoIncrement, { id: "post_seq", inc_field: "_id" });

// postSchema.virtual("id").get(function () {
// 	return this._id.toHexString();
// });

postSchema.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
});

postSchema.set("toJSON", {
	virtuals: true,
});

module.exports = mongoose.model("Post", postSchema);
