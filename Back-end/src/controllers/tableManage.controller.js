"use strict";

const { CREATED, OK } = require("../core/success.response");
const tableManageService = require("../services/tableManage.service");

class tableManageController {
  getAllTable = async (req, res, next) => {
    new OK({
      message: "Get all table successfully",
      metadata: await tableManageService.getTableList(),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  createNewTable = async (req, res, next) => {
    new CREATED({
      message: await tableManageService.createNewTable(req.body),
    }).send(res);
  };
  updateTable = async (req, res, next) => {
    new OK({
      message: await tableManageService.updateTable(req.body),
    }).send(res);
  };
  deleteTable = async (req, res, next) => {
    new OK({
      message: await tableManageService.deleteTable(req.body),
    }).send(res);
  };
}
module.exports = new tableManageController();
