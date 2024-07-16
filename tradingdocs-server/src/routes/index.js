const siteRouter = require("./site");
const userRouter = require("./user");
const postRouter = require("./post");
const cateRouter = require("./category");
const postTypeRouter = require("./postType");

function route(app) {
	app.use("/", siteRouter);
	app.use("/user", userRouter);
	app.use("/post", postRouter);
	app.use("/cate", cateRouter);
	app.use("/postType", postTypeRouter);
}

module.exports = route;
