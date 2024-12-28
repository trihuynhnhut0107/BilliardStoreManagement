"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();
const staffManageController = require("../../controllers/staffManage.controller");

router.get("/get-all-staff", asyncHandler(staffManageController.getAllStaff));
router.get(
  "/get-all-staff-pagination",
  asyncHandler(staffManageController.getAllStaffPagination)
);
router.get("/staff/:id", asyncHandler(staffManageController.getStaffByID));
router.post(
  "/update-staff",
  asyncHandler(staffManageController.updateStaffInfo)
);

module.exports = router;
