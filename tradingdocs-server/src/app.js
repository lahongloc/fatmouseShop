const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
// const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 3000;

const Category = require("./app/models/Category");
const PostType = require("./app/models/PostType");

// CORS configuration
const corsOptions = {
	origin: "http://localhost:3001",
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// SortMiddleware
// const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes");
const db = require("./config/database");

// connect to db
db.connect().then(() => {
	initial();
});

app.use(express.static(path.join(__dirname, "public")));

// middleware for POST method
app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());

app.use(methodOverride("_method"));

// Custome middleware (apply SortMiddleware,..)
// app.use(SortMiddleware);

// HTTP logger
app.use(morgan("combined"));

// template engine
app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		helpers: {
			sum: (a, b) => a + b,
		},
	}),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources/views"));

route(app);

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
		keepExtensions: true,
		uploadDir: "uploads",
	}),
);

app.listen(port, () => {
	console.log(`App listening on port http://localhost:${port}`);
});

async function initial() {
	try {
		// Check and create categories
		const originalCategory = await Category.findOne({ type: "ORIGINAL" });
		if (!originalCategory) {
			await Category.create({
				type: "ORIGINAL",
				name: "Sách gốc",
				description: "Đây là sách nguyên bản, không phải sách photo",
			});
		}

		const photoCategory = await Category.findOne({ type: "PHOTO" });
		if (!photoCategory) {
			await Category.create({
				type: "PHOTO",
				name: "Sách photo",
				description: "Đây là sách photo, không phải sách nguyên bản",
			});
		}

		// Check and create post types
		const sellPostType = await PostType.findOne({ type: "SELL" });
		if (!sellPostType) {
			await PostType.create({
				type: "SELL",
				name: "Bán",
			});
		}

		const exchangePostType = await PostType.findOne({ type: "EXCHANGE" });
		if (!exchangePostType) {
			await PostType.create({
				type: "EXCHANGE",
				name: "Trao đổi",
			});
		}

		const giftPostType = await PostType.findOne({ type: "GIFT" });
		if (!giftPostType) {
			await PostType.create({
				type: "GIFT",
				name: "Tặng",
			});
		}

		console.log("Initial data created successfully");
	} catch (err) {
		console.error("Error initializing data:", err);
	}
}
