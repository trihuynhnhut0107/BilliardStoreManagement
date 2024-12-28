"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();
const customerManageController = require("../../controllers/customerManage.controller");

router.get(
  "/get-all-customer",
  asyncHandler(customerManageController.getAllCustomer)
);
router.get(
  "/get-all-customer-pagination",
  asyncHandler(customerManageController.getAllCustomerPagination)
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
