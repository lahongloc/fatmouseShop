const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const Product = new Schema(
	{
		_id: { type: Number },
		name: { type: String, required: true },
		description: { type: String },
		image: { type: String },
		slug: { type: String, slug: "name", unique: true },
	},
	{ _id: false, timestamps: true },
);

// ADD PLUGINS
Product.plugin(AutoIncrement);
mongoose.plugin(slug);
// soft deletion plugin
Product.plugin(mongooseDelete, {
	deletedAt: true,
	overrideMethods: "all",
});

module.exports = mongoose.model("Product", Product);
