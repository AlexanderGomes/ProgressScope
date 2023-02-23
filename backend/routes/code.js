const codeController = require("../controllers/code");

const express = require("express");
const router = express.Router();


router.post("/create/code", codeController.codeForTeam); // check
router.put("/use/code", codeController.useCodeTeam);  // check

module.exports = router;
