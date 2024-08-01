const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleAouth2Controller = require("../app/controllers/GoogleAouth2Controller");
// const isLoggedIn = require("../app/middlewares/google/isLoggedIn");
const ensureAuthenticated = require("../app/middlewares/google/ensureAuthenticated");

router.get("/", googleAouth2Controller.home);
router.get("/success", ensureAuthenticated, googleAouth2Controller.success);
router.get(
	"/google",
	passport.authenticate("google", { scope: ["email", "profile"] }),
);
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	googleAouth2Controller.redirect,
	// passport.authenticate("google", {
	// 	successRedirect: "http://localhost:3001/",
	// 	failureRedirect: "/auth/failure",
	// }),
);
router.get("/logout", googleAouth2Controller.logout);
router.get("/failure", googleAouth2Controller.failure);

module.exports = router;
