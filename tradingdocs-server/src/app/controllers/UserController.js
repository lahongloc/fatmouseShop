const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
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
}

module.exports = new UserController();
