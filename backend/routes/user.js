const userController = require("../controllers/user");

const express = require("express");
const router = express.Router();

router.post("/register", userController.registerUser); // check
router.post("/login", userController.loginUser); // check
router.post("/create/report", userController.createReport); // check
router.put("/label/report", userController.labelReport); // check
router.post("/create/team", userController.createTeam); // check
router.put("/add/member", userController.addMember); // check
router.put("/remove/member", userController.removeMember); // check
router.post("/create/code", userController.codeForTeam); // check
router.put("/use/code", userController.useCodeTeam);  // check

module.exports = router;
