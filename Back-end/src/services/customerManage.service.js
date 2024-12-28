"use strict";

const { BadRequestError, ServerError } = require("../core/error.response");
const Bill = require("../models/Bill");
const Customer = require("../models/Customer");

class customerManageService {
  static getAllCustomer = async () => {
    const foundCustomer = await Customer.findAll();
    if (!foundCustomer) {
      throw new BadRequestError("Customer not found");
    }
    return foundCustomer;
  };
  static getCustomerByID = async (customer_id) => {
    const foundCustomer = await Customer.findOne({
      where: { id: customer_id },
    });
    if (!foundCustomer) {
      throw new BadRequestError("Customer not found");
    }
    return foundCustomer;
  };
  static getCustomerWithBill = async (customer_id) => {
    const foundCustomer = await Customer.findOne({
      where: { id: customer_id },
      include: Bill,
    });
    if (!foundCustomer) {
      throw new BadRequestError("Customer not found");
    }
    return foundCustomer;
  };
  static updateCustomer = async ({
    customer_id,
    name,
    phone_number,
    email,
  }) => {
    if (!customer_id) {
      throw new BadRequestError("Customer ID is required");
    }
    const foundCustomer = await Customer.findOne({
      where: { id: customer_id },
    });
    if (!foundCustomer) {
      throw new BadRequestError("Customer not found");
    }
    // Create an object with only the fields that are passed and not undefined
    const updatedFields = {
      name: name ?? foundCustomer.name,
      phone_number: phone_number ?? foundCustomer.phone_number,
      email: email ?? foundCustomer.email,
    };

    // Only update the fields that have changed
    const [numberOfAffectedRows] = await Customer.update(updatedFields, {
      where: { id: customer_id },
    });

    if (numberOfAffectedRows === 0) {
      throw new ServerError("Customer not updated");
    }
    return "Customer updated successfully";
  };
}
module.exports = customerManageService;
