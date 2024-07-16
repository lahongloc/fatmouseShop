const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const documentationSchema = new Schema(
	{
		_id: Number,
		name: { type: String, required: true },
		durability: { type: Boolean, required: true },
		category: {
			type: mongoose.Types.ObjectId,
			ref: "Category",
			required: true,
		},
	},
	{ _id: false },
);

documentationSchema.plugin(AutoIncrement, {
	id: "documentation_seq",
	inc_field: "_id",
});

module.exports = mongoose.model("Documentation", documentationSchema);
