const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		fullName: { type: String, required: true },
		gender: { type: Boolean },
		username: { type: String, required: true, unique: true },
		password: {
			type: String,
			validate: {
				validator: function (value) {
					if (!this.googleId && !value) {
						return false;
					}
					return true;
				},
				message:
					"Password is required unless you are logging in with Google.",
			},
		},
		email: { type: String, required: true },
		hotline: { type: String },
		role: { type: String, required: true, default: "NORMAL_USER" },
		status: { type: Boolean, default: true },
		googleId: { type: String },
	},
	{ timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
