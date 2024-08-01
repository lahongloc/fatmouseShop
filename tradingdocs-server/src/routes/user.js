const express = require("express");
const router = express.Router();
const auth = require("../config/auth/jwtAuth");
const authenticateToken = require("../app/middlewares/jwt/authenticateToken");

const userController = require("../app/controllers/UserController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current-user", authenticateToken, userController.takeCurrentUser);
router.post("/refresh-token", userController.refreshUser);

router.get(
	"/postType-statistic",
	authenticateToken,
	userController.postTypeStatistic,
);
router.get(
	"/revenue-statistic",
	authenticateToken,
	userController.revenueStatistic,
);
router.get(
	"/receipts-statistic",
	authenticateToken,
	userController.receiptsStatistic,
);
router.get(
	"/get-buyer-total-price",
	authenticateToken,
	userController.getBuyerTotalPrice,
);

// router.get("/logout", (req, res) => {
// 	res.clearCookie("refreshToken", {
// 		httpOnly: true,
// 		secure: true,
// 		sameSite: "None",
// 		path: "/",
// 	});
// 	res.status(200).json({ message: "Logged out successfully" });
// });

module.exports = router;
