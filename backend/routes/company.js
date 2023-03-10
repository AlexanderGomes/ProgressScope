const companyController = require("../controllers/company");

const express = require("express");
const router = express.Router();

router.post("/register", companyController.registerCompany);
router.post("/login", companyController.loginCompany);
router.post("/create/code", companyController.createCode);
router.post("/role/change", companyController.changeRole);

module.exports = router;
