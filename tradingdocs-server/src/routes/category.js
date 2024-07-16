const express = require("express");
const router = express.Router();

const cateController = require("../app/controllers/CategoryController");

router.get("/get-cates", cateController.getCates);

module.exports = router;
