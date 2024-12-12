"use strict";

const { BadRequestError, ServerError } = require("../core/error.response");
const Staff = require("../models/Staff");

class staffManageService {
  static getAllStaff = async () => {
    const foundedStaff = await Staff.findAll();
    if (!foundedStaff) {
      throw new BadRequestError("Staff not found");
    }
    return foundedStaff;
  };
  static getStaffByID = async (staff_id) => {
    const foundedStaff = await Staff.findOne({
      where: { id: staff_id },
    });
    if (!foundedStaff) {
      throw new BadRequestError("Staff not found");
    }
    return foundedStaff;
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
