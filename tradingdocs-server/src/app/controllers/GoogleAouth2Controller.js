require("../../config/auth/googleAuth");
const auth = require("../../config/auth/jwtAuth");
const jwt = require("jsonwebtoken");
const generateTokens = require("../middlewares/jwt/generateTokens");
const client = require("../../config/database/redis/index");

class GoogleOauth2Controller {
	// [GET] /auth
	home(req, res, next) {
		// res.redirect("/auth/google");

		res.send('<a href="/auth/google">Authenticate with google</a>');
	}

	// [GET] /auth/failure
	failure(req, res, next) {
		res.send("Something went wrong!");
	}

	// [GET] /auth/success
	success(req, res, next) {
		res.send("dang nhap thanh cong!");
	}

	// [GET] /auth/logout
	logout(req, res) {
		req.logout((err) => {
			if (err) {
				console.log(err);
				res.send("that bai ruiii!");
			}
			res.send("dang xuat thanh cong");
		});
	}

	// [GET] /auth/google/callback
	redirect(req, res, next) {
		const payload = {
			user: {
				id: req.user._id,
				username: req.user.username,
				email: req.user.email,
				hotline: req.user.hotline || "",
				fullName: req.user.fullName,
				role: req.user.role,
			},
		};

		generateTokens(payload).then(async (tokens) => {
			await client.set(payload.user.id, tokens.refreshToken);
			res.cookie("token", tokens.accessToken, {
				httpOnly: false,
				secure: true,
				sameSite: "None",
				path: "/",
			});
			res.cookie("refreshToken", tokens.refreshToken, {
				httpOnly: true,
				secure: true,
				sameSite: "None",
				path: "/",
				maxAge: 7 * 24 * 60 * 60 * 1000,
			});

			res.redirect(`http://localhost:3001/`);
		});
	}
}

module.exports = new GoogleOauth2Controller();
