"use strict";

const { CREATED } = require("../core/success.response");
const billManageService = require("../services/billManage.service");

class billManageController {
  createBill = async (req, res, next) => {
    new CREATED({
      message: await billManageService.createBill(req.body),
    }).send(res);
  };
}

module.exports = new billManageController();
