const jwt = require("jsonwebtoken");
const auth = require("../../../config/auth/jwtAuth");

function generateTokens(user) {
	return new Promise((resolve, reject) => {
		const accessToken = jwt.sign(user, auth.secret, {
			expiresIn: "15m",
		});
		const refreshToken = jwt.sign(user, auth.REFRESH_TOKEN_SECRET, {
			expiresIn: "7d",
		});

		resolve({ accessToken, refreshToken });
	});
}

module.exports = generateTokens;
