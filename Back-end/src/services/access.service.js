"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Staff = require("../models/Staff");
const Account = require("../models/Account");
const { AuthFailureError } = require("../core/error.response");
const { getInfoData } = require("../utils");
const Customer = require("../models/Customer");

const RoleUser = {
  ADMIN: "admin",
  STAFF: "staff",
  USER: "user",
};

class StaffAccessService {
  static signUp = async ({
    email,
    username,
    password,
    name,
    phone_number,
    role,
  }) => {
    const holderStaff = await Account.findOne({ where: { email: email } });
    if (holderStaff) {
      throw new Error("Email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newStaff = await Staff.create({
      name,
      phone_number,
      role,
    });
    if (!newStaff) {
      throw new AuthFailureError("Staff not created");
    }
    const newStaffAccount = await Account.create({
      username,
      email,
      password: passwordHash,
      accountableId: newStaff.id,
      accountableType: "Staff",
    });
    if (!newStaffAccount) {
      throw new AuthFailureError("Account not created");
    }
    return {
      code: 201,
      metadata: {
        user: getInfoData({
          fields: ["username", "email"],
          object: newStaffAccount,
        }),
      },
    };
  };
  static login = async ({ username, password }) => {
    const foundStaff = await Account.findOne({
      where: {
        username: username,
        accountableType: "Staff",
      },
    });
    if (!foundStaff) {
      throw new AuthFailureError("Staff account not found");
    }
    const match = await bcrypt.compare(password, foundStaff.password);
    if (!match) {
      throw new AuthFailureError("Invalid password");
    }

    return {
      user: getInfoData({
        fields: ["username", "accountableType"],
        object: foundStaff,
      }),
    };
  };
}

class CustomerAccessService {
  static signUp = async ({
    email,
    username,
    password,
    name,
    phone_number,
    role,
  }) => {
    const holderCustomer = await Account.findOne({ where: { email: email } });
    if (holderCustomer) {
      throw new Error("Email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      name,
      phone_number,
      email,
    });
    if (!newCustomer) {
      throw new AuthFailureError("Customer not created");
    }
    const newCustomerAccount = await Account.create({
      username,
      email,
      password: passwordHash,
      accountableId: newCustomer.id,
      accountableType: "Customer",
    });
    if (!newCustomerAccount) {
      throw new AuthFailureError("Account not created");
    }
    return {
      code: 201,
      metadata: {
        user: getInfoData({
          fields: ["username", "email"],
          object: newCustomerAccount,
        }),
      },
    };
  };
  static login = async ({ username, password }) => {
    const foundCustomer = await Account.findOne({
      where: {
        username: username,
        accountableType: "Customer",
      },
    });
    if (!foundCustomer) {
      throw new AuthFailureError("Customer account not found");
    }
    const match = await bcrypt.compare(password, foundCustomer.password);
    if (!match) {
      throw new AuthFailureError("Invalid password");
    }

    return {
      user: getInfoData({
        fields: ["username", "accountableType"],
        object: foundCustomer,
      }),
    };
  };
}

module.exports = { StaffAccessService, CustomerAccessService };
