const express = require("express");
const router = express.Router();
const passport = require("passport");
const googleAouth2Controller = require("../app/controllers/GoogleAouth2Controller");
const ensureAuthenticated = require("../app/middlewares/google/ensureAuthenticated");

router.get("/", googleAouth2Controller.home);
router.get("/success", ensureAuthenticated, googleAouth2Controller.success);
router.get(
	"/google",
	passport.authenticate("google", { scope: ["email", "profile"] }),
);
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/auth/failure" }),
	googleAouth2Controller.redirect,
);
router.get("/logout", googleAouth2Controller.logout);
router.get("/failure", googleAouth2Controller.failure);

module.exports = router;
