"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const staffManageController = require("../../controllers/staffManage.controller");
const router = express.Router();

router.get("/get-all-staff", asyncHandler(staffManageController.getAllStaff));
router.get("/staff/:id", asyncHandler(staffManageController.getStaffByID));
router.post(
  "/update-staff",
  asyncHandler(staffManageController.updateStaffInfo)
);

module.exports = router;
