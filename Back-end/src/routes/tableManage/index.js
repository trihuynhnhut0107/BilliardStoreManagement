"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const TableManageController = require("../../controllers/tableManage.controller");
const router = express.Router();

router.get("/get-all-tables", asyncHandler(TableManageController.getAllTable));
router.get(
  "/get-all-tables-pagination",
  asyncHandler(TableManageController.getAllTablePagination)
);
router.get("/table/:id", asyncHandler(TableManageController.getTableByID));
router.post(
  "/create-new-table",
  asyncHandler(TableManageController.createNewTable)
);
router.post("/update-table", asyncHandler(TableManageController.updateTable));
router.post("/delete-table", asyncHandler(TableManageController.deleteTable));

module.exports = router;
