const cloudinary = require("./cloudinary");

/**
 * Upload an image to Cloudinary
 * @param {string} imagePath - The local path to the image
 * @param {string} publicId - The public ID to assign to the uploaded image
 * @returns {Promise<Object>} - The result of the upload, including URLs
 */
const uploadImage = async (imagePath, publicId) => {
	try {
		// Upload the image
		const uploadResult = await cloudinary.uploader.upload(imagePath, {
			public_id: publicId,
		});

		console.log("Upload result:", uploadResult);

		// Optimize delivery by resizing and applying auto-format and auto-quality
		const optimizeUrl = cloudinary.url(publicId, {
			fetch_format: "auto",
			quality: "auto",
		});

		// Transform the image: auto-crop to square aspect_ratio
		const autoCropUrl = cloudinary.url(publicId, {
			crop: "auto",
			gravity: "auto",
			width: 500,
			height: 500,
		});

		return {
			uploadResult,
			optimizeUrl,
			autoCropUrl,
		};
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
};

module.exports = uploadImage;
