const express = require("express");
const router = express.Router();
const authenticateToken = require("../app/middlewares/authenticateToken");
const upload = require("../app/middlewares/multer");

const postController = require("../app/controllers/PostController");

router.post(
	"/upload",
	authenticateToken,
	upload.single("image"),
	postController.createPost,
);
router.get("/get-posts", postController.getPosts);

module.exports = router;
