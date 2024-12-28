"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const ReportController = require("../../controllers/report.controller");
const router = express.Router();

router.get("/get-sale-report", asyncHandler(ReportController.getSalesReport));

module.exports = router;
