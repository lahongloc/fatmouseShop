const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Post = require("../models/Post");
const PostType = require("../models/PostType");
const uploadImage = require("../../config/clouds/cloudinary/uploadImage");

class PostController {
	// [POST] /post/upload
	createPost(req, res, next) {
		// res.send(req.body.image);
		const {
			documentName,
			lecturer,
			durability,
			categoryId,
			postTypeId,
			price,
			description,
			exchangeDocument,
			place,
			image,
			// isNegotiable,
			quantity,
		} = req.body;

		let foundUser; // Variable to store the found user

		// Find the user by id
		User.findById(req.user.user.id)
			.then((user) => {
				if (!user) {
					return res.status(404).json({ msg: "User not found" });
				}
				foundUser = user; // Store the user for later use

				// Tìm kiếm Category theo categoryId
				return Category.findById(categoryId);
			})
			.then((category) => {
				if (!category) {
					return res.status(404).json({ msg: "Category not found" });
				}

				// take PostType
				return PostType.findById(postTypeId).then((postType) => {
					if (!postType) {
						return res
							.status(404)
							.json({ msg: "PostType not found" });
					}

					return uploadImage(
						image,
						`${foundUser._id + new Date().toString()}`,
					).then((result) => {
						// Create Post
						const post = new Post({
							userId: foundUser, // Assign found user's id
							documentName,
							postType: postType,
							lecturer,
							durability,
							price: price,
							image: result.optimizeUrl,
							description: description,
							place,
							// isNegotiable: isNegotiable,
							quantity: quantity,
							exchangeDocument: exchangeDocument,
							category,
						});

						return post.save().then(() => {
							res.json({
								status: 200,
								msg: "Document created successfully",
							});
						});
					});

					// Save Post
					// });
				});
			})
			.catch((err) => {
				console.error(err.message);
				next(err);
			});
	}

	// [GET] /post/get-posts
	async getPosts(req, res, next) {
		console.log("hahaha: ", req.query.postId);
		try {
			const postId = req.query.postId ? Number(req.query.postId) : null;

			const match = postId ? { $match: { _id: postId } } : { $match: {} };
			const posts = await Post.aggregate([
				match,
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
									$expr: {
										$eq: ["$_id", "$$postTypeId"],
									},
								},
							},
							{
								$project: { _id: 1, name: 1 },
							},
						],
						as: "postType",
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
}
module.exports = new PostController();
