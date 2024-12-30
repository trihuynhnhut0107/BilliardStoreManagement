"use strict";

const express = require("express");
const billManageController = require("../../controllers/billManage.controller");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();

router.get("/get-all-bill", asyncHandler(billManageController.getAllBill));
router.get(
  "/get-all-bill-pagination",
  asyncHandler(billManageController.getAllBillPagination)
);
router.get(
  "/get-bill-detail/:id",
  asyncHandler(billManageController.getBillDetailByID)
);
router.post("/create-bill", asyncHandler(billManageController.createBill));

module.exports = router;
