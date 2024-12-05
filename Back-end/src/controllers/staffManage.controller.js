"use strict";

const { CREATED } = require("../core/success.response");
const staffManageService = require("../services/staffManage.service");

class staffManageController {
  getAllStaff = async (req, res, next) => {
    new CREATED({
      message: "Get all staff OK!",
      metadata: await staffManageService.getAllStaff(),
    }).send(res);
  };
  getStaffByID = async (req, res, next) => {
    new CREATED({
      message: "Get staff by ID OK!",
      metadata: await staffManageService.getStaffByID(req.params.id),
    }).send(res);
  };
  updateStaffInfo = async (req, res, next) => {
    new CREATED({
      message: "Update staff info OK!",
      metadata: await staffManageService.updateStaffInfo(req.body),
    }).send(res);
  };
}
module.exports = new staffManageController();
