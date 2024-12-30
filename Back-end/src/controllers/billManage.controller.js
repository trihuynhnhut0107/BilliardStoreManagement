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
  getAllBillPagination = async (req, res, next) => {
    new OK({
      message: "Get all bill successfully",
      metadata: await billManageService.getAllBillPagination(
        req.query.page_size,
        req.query.page_number
      ),
    }).send(res);
  };
  getBillDetailByID = async (req, res, next) => {
    new OK({
      message: "Get bill detail by ID successfully",
      metadata: await billManageService.getBillDetailByID(req.params.id),
    }).send(res);
  };
  createBill = async (req, res, next) => {
    new CREATED({
      message: await billManageService.createBill(req.body),
    }).send(res);
  };
}

module.exports = new billManageController();
