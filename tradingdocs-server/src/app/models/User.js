const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
	{
		// _id: Number,
		fullName: { type: String, required: true },
		gender: { type: Boolean },
		username: { type: String, required: true, unique: true },
		password: {
			type: String,
			validate: {
				validator: function (value) {
					// If googleId is not provided, password is required
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
	// { _id: false, timestamps: true },
);

// userSchema.virtual("posts", {
// 	ref: "Post",
// 	localField: "_id",
// 	foreignField: "userId",
// });

// userSchema.pre("save", async function (next) {
// 	if (!this.isModified("password")) return next();
// 	const salt = await bcrypt.genSalt(10);
// 	this.password = await bcrypt.hash(this.password, salt);
// 	next();
// });

// userSchema.plugin(AutoIncrement, { id: "user_seq", inc_field: "_id" });

module.exports = mongoose.model("User", userSchema);
