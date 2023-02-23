const ratingCtr = require("../controllers/rating");

const express = require("express");
const router = express.Router();

router.post("/rate/user", ratingCtr.rateCollegue); // check

module.exports = router;
