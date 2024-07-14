const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

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

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
	console.log(`App listening on port http://localhost:${port}`);
});
