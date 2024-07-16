const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Place = require("../models/Place");
const Post = require("../models/Post");
const PostType = require("../models/PostType");
const Documentation = require("../models/Documentation");
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
			time,
			isNegotiable,
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

				// Tạo mới Document với _id được tạo trước
				const document = new Documentation({
					name: documentName,
					lecturer,
					durability,
					category: category,
				});

				// Lưu Document
				return document.save();
			})
			.then((document) => {
				// take PostType
				return PostType.findById(postTypeId).then((postType) => {
					if (!postType) {
						return res
							.status(404)
							.json({ msg: "PostType not found" });
					}

					// Create Place
					const meetPlace = new Place({
						description: place,
						time: time,
					});

					// Save Place
					return meetPlace.save().then(() => {
						return uploadImage(
							image,
							`${foundUser._id + new Date().toString()}`,
						).then((result) => {
							// Create Post
							const post = new Post({
								userId: foundUser, // Assign found user's id
								document: document,
								postType: postType,
								price: price,
								image: result.optimizeUrl,
								description: description,
								place: meetPlace,
								isNegotiable: isNegotiable,
								quantity: quantity,
								exchangeDocument: exchangeDocument,
							});

							return post.save().then(() => {
								res.json({
									status: 200,
									msg: "Document created successfully",
								});
							});
						});

						// Save Post
					});
				});
			})
			.catch((err) => {
				console.error(err.message);
				next(err);
			});
	}

	// [GET] /post/get-posts
	async getPosts(req, res, next) {
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
}
module.exports = new PostController();
