const auth = require("../../../config/auth/jwtAuth");
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
	const authHeader = req.headers["authorization"];
	const token = authHeader;
	console.log("au hd: ", authHeader);
	console.log("token: ", token);

	if (token == null) return res.sendStatus(401);

	jwt.verify(token, auth.secret, (err, user) => {
		if (err) return res.sendStatus(403);
		req.user = user;
		next();
	});
}

module.exports = authenticateToken;
