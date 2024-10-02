"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const tableManageController = require("../../controllers/tableManage.controller");
const router = express.Router();

router.get("/get-all-tables", asyncHandler(tableManageController.getAllTable));
