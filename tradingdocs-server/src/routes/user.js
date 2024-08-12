const express = require("express");
const router = express.Router();
const authenticateToken = require("../app/middlewares/jwt/authenticateToken");

const userController = require("../app/controllers/UserController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current-user", authenticateToken, userController.takeCurrentUser);
router.post("/refresh-token", userController.refreshUser);
router.get("/get-users", userController.getUsers);

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

router.get("/clear-cookies", (req, res) => {
	res.clearCookie("refreshToken", {
		httpOnly: true,
		secure: true,
		sameSite: "None",
		path: "/",
	});
	res.redirect(process.env.ORIGIN);
});

router.get("/logout", (req, res) => {
	res.redirect("/user/clear-cookies");
});

module.exports = router;
