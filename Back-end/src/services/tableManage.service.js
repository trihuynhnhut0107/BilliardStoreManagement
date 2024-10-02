const BilliardTable = require("../models/BilliardTable");

class tableManageService {
  static async getTableList() {
    const tableList = await BilliardTable.findAll();
    if (!tableList) {
      throw new Error("Table list not found");
    }
    return tableList;
  }
}
