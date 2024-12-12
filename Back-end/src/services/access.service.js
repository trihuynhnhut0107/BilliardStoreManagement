"use strict";

const bcrypt = require("bcrypt");
const crypto = require("crypto");
const Staff = require("../models/Staff");
const Account = require("../models/Account");
const {
  AuthFailureError,
  UserExistError,
  BadRequestError,
} = require("../core/error.response");
const { getInfoData } = require("../utils");
const Customer = require("../models/Customer");
const validator = require("validator");
const isValidPhoneNumber = require("../helpers/phoneNumberValidation");

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
    if (!email || !username || !password || !name || !phone_number || !role) {
      throw new BadRequestError("Please fill all the required fields");
    }

    if (!validator.isEmail(email)) {
      throw new BadRequestError("Invalid email format");
    }

    if (username.length < 8) {
      throw new BadRequestError("Username needs to be at least 8 characters");
    }
    if (password.length < 8) {
      throw new BadRequestError("Password needs to be at least 8 characters");
    }
    if (!isValidPhoneNumber(phone_number)) {
      throw new BadRequestError(
        "Phone numbers need to be started with a 0 and have 10 or 11 characters"
      );
    }
    const holderStaff = await Account.findOne({ where: { email: email } });
    if (holderStaff) {
      throw new UserExistError("Email already exists");
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
    if (!username || !password) {
      throw new BadRequestError("Please fill all the required fields");
    }
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
  static signUp = async ({ email, username, password, name, phone_number }) => {
    if (!email || !username || !password || !name || !phone_number) {
      throw new BadRequestError("Please fill all the required fields");
    }
    if (!validator.isEmail(email)) {
      throw new AuthFailureError("Invalid email format");
    }
    const holderCustomer = await Account.findOne({ where: { email: email } });
    if (holderCustomer) {
      throw new UserExistError("Email already exists");
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
    if (!username || !password) {
      throw new BadRequestError("Please fill all the required fields");
    }
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
