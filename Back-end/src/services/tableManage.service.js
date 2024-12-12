"use strict";
const { Op } = require("sequelize");
const BilliardTable = require("../models/BilliardTable");
const BillDetail = require("../models/BillDetail");
const getCurrentTime = require("../helpers/getCurrentTime");
const { BadRequestError, ServerError } = require("../core/error.response");

class tableManageService {
  static getTableList = async () => {
    const currentTime = new Date().toISOString();
    const bookedBillDetails = await BillDetail.findAll({
      where: {
        itemType: "BilliardTable", // Ensuring only billiard table bookings
        start_time: { [Op.lte]: currentTime },
        end_time: { [Op.gte]: currentTime },
      },
    });
    console.log("Booked bill details:::", bookedBillDetails);
    const unavailableTableIds = bookedBillDetails.map(
      (detail) => detail.itemId
    );
    const tableList = await BilliardTable.findAll();
    if (!tableList) {
      throw new BadRequestError("Table list not found");
    }
    const updatedTableList = tableList.map((table) => {
      if (unavailableTableIds.includes(table.id)) {
        table.status = "Unavailable";
      } else {
        table.status = "Available";
      }
      return table;
    });

    return updatedTableList;
  };

  static createNewTable = async ({
    table_type,
    stick_quantity,
    ball_quantity,
    price,
    status = "available",
  }) => {
    if (!table_type || !stick_quantity || !ball_quantity || !price) {
      throw new BadRequestError("Please fill all the required field");
    }
    const newTable = await BilliardTable.create({
      table_type,
      stick_quantity,
      ball_quantity,
      price,
      status,
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
