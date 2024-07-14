const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		_id: Number,
		fullName: { type: String, required: true },
		gender: { type: Boolean, required: true },
		username: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		hotline: { type: String, required: true },
		role: { type: String, required: true, default: "NORMAL_USER" },
		status: { type: Boolean, default: true },
	},
	{ _id: false, timestamps: true },
);

userSchema.plugin(AutoIncrement, { id: "user_seq", inc_field: "_id" });

module.exports = mongoose.model("User", userSchema);
