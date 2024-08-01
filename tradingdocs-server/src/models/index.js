const mongoose = require("mongoose");

async function connect() {
	try {
		await mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("success!");
	} catch (error) {
		console.log("fail!", error);
	}
}
module.exports = { connect };
