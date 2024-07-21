const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const receiptSchema = new Schema(
	{
		// _id: Number,
		sellerId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		buyerId: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: true,
		},
		post: { type: mongoose.Types.ObjectId, ref: "Post", required: true },
		quantity: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
	},
	{ timestamps: true },
	// { _id: false, timestamps: true },
);

// receiptSchema.plugin(AutoIncrement, { id: "receipt_seq", inc_field: "_id" });

module.exports = mongoose.model("Receipt", receiptSchema);
