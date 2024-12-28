"use strict";

const { CREATED, OK } = require("../core/success.response");
const menuManageService = require("../services/menuManage.service");

class menuManageController {
  getMenuList = async (req, res, next) => {
    new OK({
      message: "Get menu list OK!",
      metadata: await menuManageService.getMenuList(),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  getMenuListPagination = async (req, res, next) => {
    new OK({
      message: "Get menu list with pagination OK!",
      metadata: await menuManageService.getMenuListPagination(
        req.query.page_size,
        req.query.page_number
      ),
    }).send(res);
  };
  createMenuItem = async (req, res, next) => {
    new CREATED({
      message: await menuManageService.createMenuItem(req.body),
    }).send(res);
  };
  updateMenuItem = async (req, res, next) => {
    new CREATED({
      message: await menuManageService.updateMenuItem(req.body),
    }).send(res);
  };
  deleteMenuItem = async (req, res, next) => {
    new CREATED({
      message: await menuManageService.deleteMenuItem(req.body),
    }).send(res);
  };
}

module.exports = new menuManageController();
