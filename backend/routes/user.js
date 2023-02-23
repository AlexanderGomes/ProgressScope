const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.post("/register", userController.registerUser); // check
router.post("/login", userController.loginUser); // check

module.exports = router;
