const Category = require("../models/Category");

class CategoryController {
	// [GET] /cate/get-cates
	getCates(req, res, next) {
		Category.find({})
			.then((categories) => res.json(categories))
			.catch(next);
	}
}

module.exports = new CategoryController();
