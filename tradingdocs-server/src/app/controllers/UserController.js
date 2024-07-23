const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Post = require("../models/Post");
const Receipt = require("../models/Receipt");
const ObjectId = require("mongodb").ObjectId;

const auth = require("../../config/auth/jwtAuth");

class UserController {
	// [POST] /user/register
	async register(req, res, next) {
		try {
			const { fullName, gender, username, password, email, hotline } =
				req.body;

			const userByUsername = await User.findOne({ username });
			if (userByUsername) {
				throw new Error("Username already exists");
			}

			const userByEmail = await User.findOne({ email });
			if (userByEmail) {
				throw new Error("Email already exists");
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({
				fullName,
				gender,
				username,
				password: hashedPassword,
				email,
				hotline,
			});

			await newUser.save();

			res.json({ status: 200, message: "Registration successful" });
		} catch (err) {
			console.error(err.message);
			res.status(400).json({ status: 400, message: err.message });
		}
	}

	// [POST] /user/login
	login(req, res, next) {
		const { username, password } = req.body;

		User.findOne({ username })
			.then((user) => {
				if (!user) {
					return res.status(400).json({ msg: "Invalid credentials" });
				}

				// Compare passwords (hashed vs plaintext)
				return bcrypt
					.compare(password, user.password)
					.then((isMatch) => {
						if (!isMatch) {
							return res
								.status(400)
								.json({ msg: "Invalid credentials" });
						}

						// If credentials are correct, create JWT token
						const payload = {
							user: {
								id: user.id,
								username: user.username,
								email: user.email,
								hotline: user.hotline,
								fullName: user.fullName,
								role: user.role,
								// Add more fields as needed
							},
						};

						return new Promise((resolve, reject) => {
							jwt.sign(
								payload,
								auth.secret, // Use your own JWT secret key
								{ expiresIn: "7d" }, // Token expires in 1 hour (optional)
								(err, token) => {
									if (err) reject(err);
									resolve(token);
								},
							);
						}).then((token) => {
							// Return token and user info
							res.json({ token });
						});
					});
			})
			.catch((err) => {
				console.error(err.message);
				res.status(500).send("Server Error");
			});
	}

	// [GET] /user/current-user
	takeCurrentUser(req, res) {
		res.json({ message: "Current user info", user: req.user });
	}

	// [GET] /user/postType-statistic
	async postTypeStatistic(req, res, next) {
		try {
			const userId = req.user.user.id;

			const result = await Receipt.aggregate([
				{
					$lookup: {
						from: "posts",
						localField: "postId",
						foreignField: "_id",
						as: "postDetails",
					},
				},
				{ $unwind: "$postDetails" },
				{
					$match: {
						"postDetails.userId": new ObjectId(userId),
					},
				},
				{
					$lookup: {
						from: "posttypes",
						localField: "postDetails.postType",
						foreignField: "_id",
						as: "postTypeDetails",
					},
				},
				{ $unwind: "$postTypeDetails" },
				{
					$group: {
						_id: {
							userId: "$postDetails.userId",
							postType: "$postTypeDetails.name",
						},
						totalQuantity: { $sum: "$quantity" },
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "_id.userId",
						foreignField: "_id",
						as: "userDetails",
					},
				},
				{ $unwind: "$userDetails" },
				{
					$project: {
						_id: 0,
						// userId: "$_id.userId",
						// userName: "$userDetails.fullName",
						name: "$_id.postType",
						// totalQuantity: 1,
						value: "$totalQuantity",
					},
				},
			]);
			res.json(result);
		} catch (error) {
			console.error("Error in countPostsByPostType:", error);
			throw error;
		}
	}

	// [GET] /user/revenue-statistic
	async revenueStatistic(req, res, next) {
		try {
			const userId = req.user.user.id; // Replace this with the actual user ID

			const result = await Receipt.aggregate([
				// Step 1: Lookup to get post details
				{
					$lookup: {
						from: "posts",
						localField: "postId",
						foreignField: "_id",
						as: "postDetails",
					},
				},
				{ $unwind: "$postDetails" },
				// Step 2: Filter receipts by the specified user ID
				{
					$match: {
						"postDetails.userId": new ObjectId(userId),
					},
				},
				// Step 3: Group by user and calculate the total quantity and total revenue
				{
					$group: {
						_id: "$postDetails.userId",
						totalRevenue: { $sum: "$totalPrice" },
						totalPostsQuantity: { $sum: "$quantity" },
					},
				},
				// Step 4: Lookup to get user details
				{
					$lookup: {
						from: "users",
						localField: "_id",
						foreignField: "_id",
						as: "userDetails",
					},
				},
				{ $unwind: "$userDetails" },
				// Step 5: Project the results to include user details, total revenue, and total posts quantity
				{
					$project: {
						_id: 0,
						userId: "$_id",
						userName: "$userDetails.fullName",
						totalRevenue: 1,
						totalPostsQuantity: 1,
					},
				},
			]);

			const totalPostsQuantity = await Post.countDocuments({ userId });
			console.log("so luong laaa: ", totalPostsQuantity);

			// result.totalPostsQuantity = totalPostsQuantity;
			if (result.length === 0) result.push({});
			result.push({
				totalPostsQuantity,
			});
			console.log("kqua la: ", result);
			// if (result.length > 0) {
			// 	result[0].totalPostsQuantity = totalPostsQuantity ?? 0;
			// } else {
			// 	// If result is empty, provide a default value
			// 	result.push({
			// 		userId: new mongoose.Types.ObjectId(userId),
			// 		userName: (await User.findById(userId)).fullName,
			// 		totalRevenue: 0,
			// 		totalPostsQuantity: totalPostsQuantity ?? 0,
			// 	});
			// }

			res.json(result);
		} catch (error) {
			console.error("Error in countPostsByPostType:", error);
			throw error;
		}
	}
}

module.exports = new UserController();
