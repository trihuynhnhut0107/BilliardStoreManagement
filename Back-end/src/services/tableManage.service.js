"use strict";
const BilliardTable = require("../models/BilliardTable");

class tableManageService {
  static getTableList = async () => {
    const tableList = await BilliardTable.findAll();
    if (!tableList) {
      throw new Error("Table list not found");
    }
    return tableList;
  };

  static createNewTable = async ({
    table_type,
    stick_quantity,
    ball_quantity,
    price,
    status = "available",
  }) => {
    const newTable = await BilliardTable.create({
      table_type,
      stick_quantity,
      ball_quantity,
      price,
      status,
    });
    if (!newTable) {
      throw new Error("Table not created");
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
    const foundTable = await BilliardTable.findOne({ where: { id: table_id } });
    if (!foundTable) {
      throw new Error("Table not found");
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
      throw new Error("Table not updated");
    }
    return "Table updated successfully";
  };

  static deleteTable = async ({ table_id }) => {
    const deletedTableCount = await BilliardTable.destroy({
      where: { id: table_id },
    });
    if (deletedTableCount === 0) {
      throw new Error("Table not deleted");
    } else {
      return "Table deleted successfully";
    }
  };
}

module.exports = tableManageService;
