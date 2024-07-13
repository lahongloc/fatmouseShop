const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 3000;

// SortMiddleware
// const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes");
const db = require("./config/database");

// connect to db
db.connect();

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

app.listen(port, () => {
	console.log(`App listening on port http://localhost:${port}`);
});
