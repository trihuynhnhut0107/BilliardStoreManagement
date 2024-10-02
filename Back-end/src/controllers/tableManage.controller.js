"use strict";

const tableManageService = require("../services/tableManage.service");

class tableManageController {
  getAllTable = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await tableManageService.getTableList(),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}
module.exports = new tableManageController();
