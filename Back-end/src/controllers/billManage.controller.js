"use strict";

const { CREATED, OK } = require("../core/success.response");
const billManageService = require("../services/billManage.service");

class billManageController {
  getAllBill = async (req, res, next) => {
    new OK({
      message: "Get all bill successfully",
      metadata: await billManageService.getAllBill(),
    }).send(res);
  };
  createBill = async (req, res, next) => {
    new CREATED({
      message: await billManageService.createBill(req.body),
    }).send(res);
  };
}

module.exports = new billManageController();
