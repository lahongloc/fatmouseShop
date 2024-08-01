const siteRouter = require("./site");
const userRouter = require("./user");
const postRouter = require("./post");
const cateRouter = require("./category");
const postTypeRouter = require("./postType");
const receiptRouter = require("./receipt");
const googleRouter = require("./googleStrategy");

function route(app) {
	app.use("/", siteRouter);
	app.use("/user", userRouter);
	app.use("/post", postRouter);
	app.use("/cate", cateRouter);
	app.use("/postType", postTypeRouter);
	app.use("/receipt", receiptRouter);
	app.use("/auth", googleRouter);
}

module.exports = route;
