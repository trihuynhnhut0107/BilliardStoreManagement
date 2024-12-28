"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const router = express.Router();
const menuManageController = require("../../controllers/menuManage.controller");

router.get("/get-menu-list", asyncHandler(menuManageController.getMenuList));
router.get(
  "/get-menu-list-pagination",
  asyncHandler(menuManageController.getMenuListPagination)
);
router.post(
  "/create-new-menu-item",
  asyncHandler(menuManageController.createMenuItem)
);
router.post(
  "/update-menu-item",
  asyncHandler(menuManageController.updateMenuItem)
);
router.post(
  "/delete-menu-item",
  asyncHandler(menuManageController.deleteMenuItem)
);

module.exports = router;
