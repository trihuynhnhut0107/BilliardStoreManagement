"use strict";

const { CREATED, OK } = require("../core/success.response");
const {
  StaffAccessService,
  CustomerAccessService,
} = require("../services/access.service");

class AccessController {
  staffSignUp = async (req, res, next) => {
    new CREATED({
      message: "Signup success",
      metadata: await StaffAccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  staffLogin = async (req, res, next) => {
    new OK({
      message: "Login successfully",
      metadata: await StaffAccessService.login(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  customerSignUp = async (req, res, next) => {
    new CREATED({
      message: "Registered OK!",
      metadata: await CustomerAccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
  customerLogin = async (req, res, next) => {
    new OK({
      message: "Login OK!",
      metadata: await CustomerAccessService.login(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };
}

module.exports = new AccessController();
