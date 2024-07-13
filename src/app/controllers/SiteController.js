class SiteController {
	// [GET] /
	index(req, res, next) {
		res.send("hello");
	}
}

module.exports = new SiteController();
