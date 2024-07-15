const express = require("express");
const router = express.Router();
const authenticateToken = require("../app/middlewares/authenticateToken");

const sitpostController = require("../app/controllers/PostController");

router.post("/upload", authenticateToken, sitpostController.createPost);

module.exports = router;
