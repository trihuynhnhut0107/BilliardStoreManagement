"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const customerManageController = require("../../controllers/customerManage.controller");
const router = express.Router();

router.get(
  "/get-all-customer",
  asyncHandler(customerManageController.getAllCustomer)
);
router.get(
  "/customer/:id",
  asyncHandler(customerManageController.getCustomerByID)
);
router.get(
  "/customer-with-bill/:id",
  asyncHandler(customerManageController.getCustomerWithBill)
);
router.post(
  "/update-customer",
  asyncHandler(customerManageController.updateCustomer)
);

module.exports = router;
