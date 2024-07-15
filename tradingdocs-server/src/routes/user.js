const express = require("express");
const router = express.Router();
const auth = require("../config/auth/jwtAuth");
const authenticateToken = require("../app/middlewares/authenticateToken");

const userController = require("../app/controllers/UserController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/current-user", authenticateToken, userController.takeCurrentUser);

module.exports = router;
