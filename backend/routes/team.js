const teamCtr = require("../controllers/team");

const express = require("express");
const router = express.Router();

router.post("/create/team", teamCtr.createTeam); // check
router.put("/add/member", teamCtr.addMember); // check
router.put("/remove/member", teamCtr.removeMember); // check

module.exports = router;
