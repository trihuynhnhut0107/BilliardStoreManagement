"use strict";

const express = require("express");
const billManageController = require("../../controllers/billManage.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();

router.post("/create-bill", asyncHandler(billManageController.createBill));

module.exports = router;
