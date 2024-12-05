"use strict";

const Bill = require("../models/Bill");
const Customer = require("../models/Customer");

class customerManageService {
  static getAllCustomer = async () => {
    const foundedCustomer = await Customer.findAll();
    if (!foundedCustomer) {
      throw new Error("Customer not found");
    }
    return foundedCustomer;
  };
  static getCustomerByID = async (customer_id) => {
    const foundedCustomer = await Customer.findOne({
      where: { id: customer_id },
    });
    if (!foundedCustomer) {
      throw new Error("Customer not found");
    }
    return foundedCustomer;
  };
  static getCustomerWithBill = async (customer_id) => {
    const foundedCustomer = await Customer.findOne({
      where: { id: customer_id },
      include: Bill,
    });
    if (!foundedCustomer) {
      throw new Error("Customer not found");
    }
    return foundedCustomer;
  };
  static updateCustomer = async ({ customer_id, name, phone, email }) => {
    const foundCustomer = await Customer.findOne({
      where: { id: customer_id },
    });
    if (!foundCustomer) {
      throw new Error("Customer not found");
    }
    // Create an object with only the fields that are passed and not undefined
    const updatedFields = {
      name: name ?? foundCustomer.name,
      phone: phone ?? foundCustomer.phone,
      email: email ?? foundCustomer.email,
    };

    // Only update the fields that have changed
    const [numberOfAffectedRows] = await Customer.update(updatedFields, {
      where: { id: customer_id },
    });

    if (numberOfAffectedRows === 0) {
      throw new Error("Customer not updated");
    }
    return "Customer updated successfully";
  };
}
module.exports = customerManageService;
