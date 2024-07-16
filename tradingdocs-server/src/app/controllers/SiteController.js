const uploadImage = require("../../config/clouds/cloudinary/uploadImage");
const Post = require("../models/Post");
const User = require("../models/User");
class SiteController {
	// [GET] /
	async index(req, res, next) {
		// Post.deleteMany({}).then(() => res.send("OK"));
		try {
			const posts = await Post.aggregate([
				{
					$lookup: {
						from: "users",
						let: { userId: "$userId" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$_id", "$$userId"] },
								},
							},
							{
								$project: { _id: 1, username: 1, role: 1 },
							},
						],
						as: "user",
					},
				},
				{
					$lookup: {
						from: "posttypes",
						let: { postTypeId: "$postType" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$_id", "$$postTypeId"] },
								},
							},
							{
								$project: { _id: 1, name: 1 },
							},
						],
						as: "postType",
					},
				},
				{
					$lookup: {
						from: "documents",
						let: { documentId: "$document" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$_id", "$$documentId"] },
								},
							},
							{
								$project: {
									_id: 1,
									name: 1,
									lecturer: 1,
									durability: 1,
								},
							},
						],
						as: "document",
					},
				},
				{
					$lookup: {
						from: "places",
						let: { placeId: "$place" },
						pipeline: [
							{
								$match: {
									$expr: { $eq: ["$_id", "$$placeId"] },
								},
							},
							{
								$project: { _id: 1, description: 1, time: 1 },
							},
						],
						as: "place",
					},
				},
				// Optionally flatten the arrays if you expect single values
				{
					$unwind: {
						path: "$user",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$unwind: {
						path: "$postType",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$unwind: {
						path: "$document",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$unwind: {
						path: "$place",
						preserveNullAndEmptyArrays: true,
					},
				},
			]);

			res.json(posts);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: "Internal server error" });
		}
	}

	async uploadImg(req, res, next) {
		console.log("fileeee", req.file);
		res.send("thanh cong");
		// let result;
		// try {
		// 	result = await uploadImage(req.file.path, "publicId");
		// 	console.log("Upload result:", result.uploadResult);
		// 	console.log("Optimized URL:", result.optimizeUrl);
		// 	console.log("Auto-cropped URL:", result.autoCropUrl);

		// 	// res.send(result);
		// } catch (error) {
		// 	console.error("Failed to upload image:", error);
		// 	res.status(500).send({ error: "Failed to upload image" });
		// }
	}
}

module.exports = new SiteController();
