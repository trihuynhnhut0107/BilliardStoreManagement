"use strict";

const { BadRequestError, ServerError } = require("../core/error.response");
const Staff = require("../models/Staff");

class staffManageService {
  static getAllStaff = async () => {
    const foundStaff = await Staff.findAll();
    if (!foundStaff) {
      throw new BadRequestError("Staff not found");
    }
    return foundStaff;
  };
  static getAllStaffPagination = async (page_size, page_number) => {
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
    const totalPages = Math.ceil(totalRecords / pageSizeInt);
    const totalRecords = await Staff.count();
    const foundStaff = await Staff.findAll({
      limit: pageSizeInt,
      offset: (pageNumberInt - 1) * pageSizeInt,
    });
    if (!foundStaff) {
      throw new BadRequestError("Staff not found");
    }
    return {
      totalRecords,
      totalPages,
      currentPage: pageNumberInt,
      pageSize: pageSizeInt,
      staffs: foundStaff,
    };
  };
  static getStaffByID = async (staff_id) => {
    const foundStaff = await Staff.findOne({
      where: { id: staff_id },
    });
    if (!foundStaff) {
      throw new BadRequestError("Staff not found");
    }
    return foundStaff;
  };
  static updateStaffInfo = async ({ staff_id, name, phone_number, role }) => {
    if (!staff_id) {
      throw new BadRequestError("Staff ID is required");
    }
    const foundStaff = await Staff.findOne({
      where: { id: staff_id },
    });
    if (!foundStaff) {
      throw new BadRequestError("Staff not found");
    }
    const updatedField = {
      name: name ?? foundStaff.name,
      phone_number: phone_number ?? foundStaff.phone_number,
      role: role ?? foundStaff.role,
    };
    const [numberOfAffectedRows] = await Staff.update(updatedField, {
      where: { id: staff_id },
    });
    if (numberOfAffectedRows === 0) {
      throw new ServerError("Staff not updated");
    }
    return "Staff updated successfully";
  };
}
module.exports = staffManageService;
