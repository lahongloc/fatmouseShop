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
router.put(
	"/update-post/:id",
	authenticateToken,
	upload.single("image"),
	postController.updatePost,
);
router.get("/get-posts", postController.getPosts);
router.get(
	"/get-posts-by-user-id",
	authenticateToken,
	postController.getPostsByUserId,
);
router.delete("/delete-post", authenticateToken, postController.deletePost);
router.patch("/restore-post", authenticateToken, postController.restorePost);

module.exports = router;
