const cloudinary = require("./cloudinary");

/**
 * Upload an image to Cloudinary
 * @param {string} imagePath - The local path to the image
 * @param {string} publicId - The public ID to assign to the uploaded image
 * @returns {Promise<Object>} - The result of the upload, including URLs
 */
const uploadImage = async (imagePath, publicId) => {
	try {
		const uploadResult = await cloudinary.uploader.upload(imagePath, {
			public_id: publicId,
		});

		const optimizeUrl = cloudinary.url(publicId, {
			fetch_format: "auto",
			quality: "auto",
		});

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
