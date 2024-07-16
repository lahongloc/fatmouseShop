const express = require("express");
const router = express.Router();

const postTypeController = require("../app/controllers/PostTypeController");

router.get("/get-postTypes", postTypeController.getPostTypes);

module.exports = router;
