const reportController = require("../controllers/report");

const express = require("express");
const router = express.Router();

router.post("/create/report", reportController.createReport); // check
router.put("/label/report", reportController.labelReport); // check
router.post("/comment/report", reportController.commentReport); // check



module.exports = router;
