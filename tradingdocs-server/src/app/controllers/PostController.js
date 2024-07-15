const mongoose = require("mongoose");
const User = require("../models/User");
const Category = require("../models/Category");
const Place = require("../models/Place");
const Post = require("../models/Post");
const PostType = require("../models/PostType");
const Documentation = require("../models/Documentation");

class PostController {
	// [POST] /post/upload
	createPost(req, res, next) {
		const {
			documentName,
			lecturer,
			durability,
			categoryId,
			postTypeId,
			price,
			image,
			description,
			place,
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
						// Create Post
						const post = new Post({
							userId: foundUser, // Assign found user's id
							document: document,
							postType: postType,
							price: price,
							image: image,
							description: description,
							place: meetPlace,
							isNegotiable: isNegotiable,
							quantity: quantity,
						});

						// Save Post
						return post.save().then(() => {
							res.json({
								status: 200,
								msg: "Document created successfully",
							});
						});
					});
				});
			})
			.catch((err) => {
				console.error(err.message);
				next(err);
			});
	}
}
module.exports = new PostController();
