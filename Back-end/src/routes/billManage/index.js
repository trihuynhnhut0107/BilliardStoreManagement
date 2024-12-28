"use strict";

const express = require("express");
const billManageController = require("../../controllers/billManage.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();

router.get("/get-all-bill", asyncHandler(billManageController.getAllBill));
router.post("/create-bill", asyncHandler(billManageController.createBill));

module.exports = router;
