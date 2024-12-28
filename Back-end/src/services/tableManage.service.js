"use strict";
const { Op } = require("sequelize");
const BilliardTable = require("../models/BilliardTable");
const BillDetail = require("../models/BillDetail");
const { BadRequestError, ServerError } = require("../core/error.response");
const validator = require("validator");
const Booking = require("../models/Booking");

class tableManageService {
  static getTableList = async () => {
    const currentTime = new Date().toISOString();

    // Fetch booked billiard tables from BillDetail
    const bookedBillDetails = await BillDetail.findAll({
      where: {
        itemType: "BilliardTable",
        start_time: { [Op.lte]: currentTime },
        end_time: { [Op.gte]: currentTime },
      },
    });

    // Fetch booked billiard tables from Booking
    const bookedBookings = await Booking.findAll({
      where: {
        start_time: { [Op.lte]: currentTime },
        end_time: { [Op.gte]: currentTime },
      },
    });

    // Merge unavailable table IDs
    const unavailableTableIds = new Set([
      ...bookedBillDetails.map((detail) => detail.itemId),
      ...bookedBookings.map((booking) => booking.table_id),
    ]);

    // Fetch all billiard tables
    const tableList = await BilliardTable.findAll();
    if (!tableList) {
      throw new BadRequestError("Table list not found");
    }

    // Update table statuses
    const updatedTableList = tableList.map((table) => {
      table.status = unavailableTableIds.has(table.id)
        ? "Unavailable"
        : "Available";
      return table;
    });

    return updatedTableList;
  };

  static getAllTablePagination = async (page_size, page_number) => {
    if (!page_number) {
      throw new BadRequestError("Page number is required");
    }
    if (!validator.isInt(String(page_number)) || page_number < 1) {
      throw new BadRequestError("Invalid page number");
    }
    if (!validator.isInt(String(page_size)) || page_size < 1) {
      throw new BadRequestError("Invalid page size");
    }

    const pageSizeInt = parseInt(page_size, 10);
    const pageNumberInt = parseInt(page_number, 10);

    // Get total count of records
    const totalRecords = await BilliardTable.count();

    // Calculate total pages
    const totalPages = Math.ceil(totalRecords / pageSizeInt);

    // Fetch the paginated list
    const tableList = await BilliardTable.findAll({
      limit: pageSizeInt,
      offset: (pageNumberInt - 1) * pageSizeInt,
    });

    return {
      totalRecords,
      totalPages,
      currentPage: pageNumberInt,
      pageSize: pageSizeInt,
      tables: tableList,
    };
  };

  static getTableByID = async (table_id) => {
    if (!table_id) {
      throw new BadRequestError("Table ID is required");
    }
    const table = await BilliardTable.findOne({ where: { id: table_id } });
    if (!table) {
      throw new BadRequestError("Table not found");
    }
    return table;
  };
  static createNewTable = async ({
    table_type,
    stick_quantity,
    ball_quantity,
    price,
    status,
  }) => {
    if (!table_type || !stick_quantity || !ball_quantity || !price) {
      throw new BadRequestError("Please fill all the required field");
    }
    if (
      !validator.isInt(String(stick_quantity)) ||
      !validator.isInt(String(ball_quantity)) ||
      !validator.isFloat(String(price))
    ) {
      throw new BadRequestError("Invalid input");
    }
    const newTable = await BilliardTable.create({
      table_type,
      stick_quantity,
      ball_quantity,
      price,
      status: status ?? "Available",
    });
    if (!newTable) {
      throw new ServerError("Table not created");
    }
    return "Table created successfully";
  };
  static updateTable = async ({
    table_id,
    table_type,
    stick_quantity,
    ball_quantity,
    price,
    status,
  }) => {
    if (!table_type || !stick_quantity || !ball_quantity || !price) {
      throw new BadRequestError("Please fill all the required field");
    }
    if (
      !validator.isInt(String(stick_quantity)) ||
      !validator.isInt(String(ball_quantity)) ||
      !validator.isFloat(String(price))
    ) {
      throw new BadRequestError("Invalid input");
    }
    if (!table_id) {
      throw new BadRequestError("Table ID is required");
    }
    const foundTable = await BilliardTable.findOne({ where: { id: table_id } });
    if (!foundTable) {
      throw new BadRequestError("Table not found");
    }
    // Create an object with only the fields that are passed and not undefined
    const updatedFields = {
      table_type: table_type ?? foundTable.table_type,
      stick_quantity: stick_quantity ?? foundTable.stick_quantity,
      ball_quantity: ball_quantity ?? foundTable.ball_quantity,
      price: price ?? foundTable.price,
      status: status ?? foundTable.status,
    };

    // Only update the fields that have changed
    const [numberOfAffectedRows] = await BilliardTable.update(updatedFields, {
      where: { id: table_id },
    });
    if (numberOfAffectedRows === 0) {
      throw new ServerError("Table not updated");
    }
    return "Table updated successfully";
  };

  static deleteTable = async ({ table_id }) => {
    if (!table_id) {
      throw new BadRequestError("Table ID is required");
    }
    const deletedTableCount = await BilliardTable.destroy({
      where: { id: table_id },
    });
    if (deletedTableCount === 0) {
      throw new ServerError("Table not deleted");
    } else {
      return "Table deleted successfully";
    }
  };
}

module.exports = tableManageService;
