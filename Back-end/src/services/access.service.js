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
    let holderStaff;
    holderStaff = await Account.findOne({ where: { email: email } });
    if (holderStaff) {
      throw new BadRequestError("Email already exists");
    }
    holderStaff = await Account.findOne({ where: { username: username } });
    if (holderStaff) {
      throw new BadRequestError("Username already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const newStaffAccount = await Account.create({
      username,
      email,
      password: passwordHash,
      accountableType: "Staff",
    });
    if (!newStaffAccount) {
      throw new AuthFailureError("Account not created");
    }
    const newStaff = await Staff.create({
      name,
      phone_number,
      role,
      accountID: newStaffAccount.id,
    });
    if (!newStaff) {
      throw new AuthFailureError("Staff not created");
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
    const foundStaffAccount = await Account.findOne({
      where: {
        username: username,
        accountableType: "Staff",
      },
    });
    if (!foundStaffAccount) {
      throw new AuthFailureError("Staff account not found");
    }
    const match = await bcrypt.compare(password, foundStaffAccount.password);
    if (!match) {
      throw new AuthFailureError("Invalid password");
    }

    const foundStaff = await Staff.findOne({
      where: {
        accountID: foundStaffAccount.id,
      },
    });

    return {
      // user: getInfoData({
      //   fields: ["username", "accountableType"],
      //   object: foundStaffAccount,
      // }),
      staffID: foundStaff.id,
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
    const newCustomerAccount = await Account.create({
      username,
      email,
      password: passwordHash,
      accountableType: "Customer",
    });
    if (!newCustomerAccount) {
      throw new AuthFailureError("Account not created");
    }
    const newCustomer = await Customer.create({
      name,
      phone_number,
      email,
      accountID: newCustomerAccount.id,
    });
    if (!newCustomer) {
      throw new AuthFailureError("Customer not created");
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
    const foundCustomerAccount = await Account.findOne({
      where: {
        username: username,
        accountableType: "Customer",
      },
    });
    if (!foundCustomerAccount) {
      throw new AuthFailureError("Customer account not found");
    }
    const match = await bcrypt.compare(password, foundCustomerAccount.password);
    if (!match) {
      throw new AuthFailureError("Invalid password");
    }

    const foundCustomer = await Customer.findOne({
      where: {
        accountID: foundCustomerAccount.id,
      },
    });

    return {
      // user: getInfoData({
      //   fields: ["username", "accountableType"],
      //   object: foundCustomer,
      // }),
      customerID: foundCustomer.id,
    };
  };
}

module.exports = { StaffAccessService, CustomerAccessService };
