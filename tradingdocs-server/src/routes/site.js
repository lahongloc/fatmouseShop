const express = require("express");
const router = express.Router();
const upload = require("../app/middlewares/multer");

const siteController = require("../app/controllers/SiteController");

router.get("/", siteController.index);
router.post(
	"/upload-image",
	upload.single("tenfile"),
	siteController.uploadImg,
);

module.exports = router;
