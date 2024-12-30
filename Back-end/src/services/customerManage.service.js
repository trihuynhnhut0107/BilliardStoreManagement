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
  static getAllCustomerPagination = async (page_size, page_number) => {
    if (!page_number) {
      throw new BadRequestError("Page number is required");
    }
    if (page_number < 1) {
      throw new BadRequestError("Invalid page number");
    }
    if (page_size < 1) {
      throw new BadRequestError("Invalid page size");
    }
    const pageSizeInt = parseInt(page_size, 10);
    const pageNumberInt = parseInt(page_number, 10);
    const totalRecords = await Customer.count();
    const totalPages = Math.ceil(totalRecords / pageSizeInt);
    const foundCustomer = await Customer.findAll({
      limit: pageSizeInt,
      offset: (pageNumberInt - 1) * pageSizeInt,
    });
    if (!foundCustomer) {
      throw new BadRequestError("Customer not found");
    }
    return {
      totalRecords,
      totalPages,
      currentPage: pageNumberInt,
      pageSize: pageSizeInt,
      customers: foundCustomer,
    };
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
