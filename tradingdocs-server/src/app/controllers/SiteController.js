const uploadImage = require("../../config/clouds/cloudinary/uploadImage");
class SiteController {
	// [GET] /
	index(req, res, next) {
		res.render("user/user");
	}

	async uploadImg(req, res, next) {
		// console.log("fileeee", req.file);
		// res.send("thanh cong");
		let result;
		try {
			result = await uploadImage(req.file.path, "publicId");
			console.log("Upload result:", result.uploadResult);
			console.log("Optimized URL:", result.optimizeUrl);
			console.log("Auto-cropped URL:", result.autoCropUrl);

			// res.send(result);
		} catch (error) {
			console.error("Failed to upload image:", error);
			res.status(500).send({ error: "Failed to upload image" });
		}
	}
}

module.exports = new SiteController();
