const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const auth = require("../../config/auth/jwtAuth");

class UserController {
	// [POST] /user/register
	register(req, res, next) {
		const { fullName, gender, username, password, email, hotline } =
			req.body;

		User.findOne({ username })
			.then((user) => {
				if (user) {
					return res.status(400).json({ msg: "User already exists" });
				}

				return bcrypt.hash(password, 10);
			})
			.then((hashedPassword) => {
				const newUser = new User({
					fullName,
					gender,
					username,
					password: hashedPassword,
					email,
					hotline,
				});

				newUser.save();
				res.json({ status: 200, message: "successful" });
			})
			.catch((err) => {
				console.error(err.message);
				res.status(400).send("bad request");
			});
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
								// Add more fields as needed
							},
						};

						return new Promise((resolve, reject) => {
							jwt.sign(
								payload,
								auth.secret, // Use your own JWT secret key
								{ expiresIn: "1h" }, // Token expires in 1 hour (optional)
								(err, token) => {
									if (err) reject(err);
									resolve(token);
								},
							);
						}).then((token) => {
							// Return token and user info
							res.json({
								token,
								user: {
									id: user.id,
									username: user.username,
									fullName: user.fullName,
									email: user.email,
									// Add more fields as needed
								},
							});
						});
					});
			})
			.catch((err) => {
				console.error(err.message);
				res.status(500).send("Server Error");
			});
	}
}

module.exports = new UserController();
