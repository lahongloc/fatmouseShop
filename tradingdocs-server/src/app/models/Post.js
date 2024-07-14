const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const placeSchema = require("./Place");
const bcrypt = require("bcryptjs");

const postSchema = new Schema(
	{
		_id: Number,
		userId: { type: Number, ref: "User", required: true },
		document: { type: Number, ref: "Document", required: true },
		mean: { type: Number, ref: "Mean", required: true },
		price: { type: Number, required: false },
		image: { type: String, required: false },
		description: { type: String, required: true },
		place: placeSchema,
		isNegotiable: { type: Boolean, required: true },
		quantity: { type: Number, required: true },
	},
	{ _id: false, timestamps: true },
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

postSchema.plugin(AutoIncrement, { id: "post_seq", inc_field: "_id" });

module.exports = mongoose.model("Post", postSchema);
