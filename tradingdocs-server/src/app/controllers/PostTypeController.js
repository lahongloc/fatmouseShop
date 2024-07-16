const PostType = require("../models/PostType");

class PostTypeController {
	// [GET] /postType/get-postTypes
	getPostTypes(req, res, next) {
		PostType.find({})
			.then((postTypes) => res.json(postTypes))
			.catch(next);
	}
}

module.exports = new PostTypeController();
