const Post = require("../models/Post");
const PostType = require("../models/PostType");
const Receipt = require("../models/Receipt");
const User = require("../models/User");
const ObjectId = require("mongodb").ObjectId;

class ReceiptController {
	// [POST] /receipt/create-reipt
	async createReceipt(req, res, next) {
		try {
			const buyer = await User.findById(req.body.userId);
			const post = await Post.findById(req.body.postId);

			if (post.userId._id.equals(buyer._id)) {
				throw new Error("Invalid buyer");
			}

			const receipt = {
				buyerId: buyer,
				postId: post,
				quantity: req.body.quantity,
				totalPrice: req.body.totalPrice,
			};

			if (receipt.quantity > post.quantity)
				throw new Error("post quantity changed");
			else {
				const createdReceipt = new Receipt(receipt);
				createdReceipt
					.save()
					.then((r) => {
						post.quantity = post.quantity - receipt.quantity;
						post.save()
							.then(() => {
								res.json({ status: 200, receipt: r });
							})
							.catch((err) => res.status(400).send(err));
					})
					.catch(() =>
						res.status(400).send("failed to create receipt"),
					);
			}
		} catch (err) {
			return res.json({ status: 400, err });
		}
	}

	// [GET] /receipt/get-receipts
	async getReceipts(req, res, next) {
		try {
			const receiptId = req.query.receiptId
				? new ObjectId(req.query.receiptId)
				: null;

			const match = receiptId
				? { $match: { _id: receiptId } }
				: { $match: {} };

			let receipts = await Receipt.aggregate([
				match,
				{
					$lookup: {
						from: "users", // collection name in MongoDB
						localField: "buyerId",
						foreignField: "_id",
						as: "buyer",
					},
				},
				{
					$unwind: "$buyer", // Unwind the array to get an object
				},

				// Lookup post details
				{
					$lookup: {
						from: "posts", // collection name in MongoDB
						localField: "postId",
						foreignField: "_id",
						as: "post",
					},
				},
				{
					$unwind: "$post", // Unwind the array to get an object
				},

				// Lookup post user details
				{
					$lookup: {
						from: "users", // collection name in MongoDB
						localField: "post.userId",
						foreignField: "_id",
						as: "post.user",
					},
				},
				{
					$unwind: {
						path: "$post.user",
						preserveNullAndEmptyArrays: true, // In case user details are not found
					},
				},

				// Lookup postType details
				{
					$lookup: {
						from: "posttypes", // collection name in MongoDB
						localField: "post.postType",
						foreignField: "_id",
						as: "post.postType",
					},
				},
				{
					$unwind: {
						path: "$post.postType",
						preserveNullAndEmptyArrays: true, // In case postType details are not found
					},
				},

				// Lookup category details
				{
					$lookup: {
						from: "categories", // collection name in MongoDB
						localField: "post.category",
						foreignField: "_id",
						as: "post.category",
					},
				},
				{
					$unwind: {
						path: "$post.category",
						preserveNullAndEmptyArrays: true, // In case category details are not found
					},
				},

				// Project the fields including postType and category details
				{
					$project: {
						_id: 1,
						buyer: {
							_id: 1,
							fullName: 1,
							email: 1,
							hotline: 1,
						},
						post: {
							_id: 1,
							documentName: 1,
							price: 1,
							quantity: 1,
							image: 1,
							place: 1,
							user: {
								_id: 1,
								fullName: 1,
								email: 1,
								hotline: 1,
							},
							postType: {
								// Include all fields of postType
								_id: 1,
								type: 1,
								name: 1,
							},
							category: {
								// Include all fields of category
								_id: 1,
								type: 1,
								name: 1,
								description: 1,
							},
						},
						quantity: 1,
						totalPrice: 1,
						createdAt: 1,
						updatedAt: 1,
					},
				},
			]);
			res.json(receipts);
		} catch (err) {
			console.error(err);
			res.status(500).json({ error: "Internal server error" });
		}
	}
}

module.exports = new ReceiptController();
