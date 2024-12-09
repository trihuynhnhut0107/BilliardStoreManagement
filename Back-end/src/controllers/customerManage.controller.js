"use strict";

const { CREATED } = require("../core/success.response");
const customerManageService = require("../services/customerManage.service");

class customerManageController {
  getAllCustomer = async (req, res, next) => {
    new CREATED({
      message: "Get all customer OK!",
      metadata: await customerManageService.getAllCustomer(),
    }).send(res);
  };
  getCustomerByID = async (req, res, next) => {
    new CREATED({
      message: "Get customer by ID OK!",
      metadata: await customerManageService.getCustomerByID(req.params.id),
    }).send(res);
  };
  getCustomerWithBill = async (req, res, next) => {
    new CREATED({
      message: "Get customer with bill OK!",
      metadata: await customerManageService.getCustomerWithBill(req.params.id),
    }).send(res);
  };
  updateCustomer = async (req, res, next) => {
    new CREATED({
      message: "Update customer OK!",
      metadata: await customerManageService.updateCustomer(req.body),
    }).send(res);
  };
}
module.exports = new customerManageController();
