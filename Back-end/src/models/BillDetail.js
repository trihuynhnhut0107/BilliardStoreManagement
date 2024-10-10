const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");
const MenuItem = require("./MenuItem");
const BilliardTable = require("./BilliardTable");

const BillDetail = sequelize.define(
  "BillDetail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    itemType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }
  // {
  //   hooks: {
  //     beforeSave: async (billDetail, options) => {
  //       if (billDetail.itemType === "MenuItem") {
  //         // Set start_time and end_time to current time
  //         const now = new Date();
  //         billDetail.start_time = now;
  //         billDetail.end_time = now;
  //         // Find the MenuItem record and calculate the price
  //         const menuItem = await MenuItem.findByPk(billDetail.itemId); // Assume itemId relates to the MenuItem or BilliardTable
  //         if (menuItem) {
  //           billDetail.price = menuItem.price * menuItem.quantity;
  //         } else {
  //           throw new Error(`MenuItem with ID ${billDetail.itemId} not found.`);
  //         }
  //       } else if (billDetail.itemType === "BilliardTable") {
  //         // Find the BilliardTable record and calculate the price
  //         const billiardTable = await BilliardTable.findByPk(billDetail.itemId); // Assume itemId relates to the MenuItem or BilliardTable
  //         if (billiardTable) {
  //           const timeDifference =
  //             (billDetail.end_time - billDetail.start_time) / (1000 * 60 * 60); // Time difference in hours
  //           billDetail.price = timeDifference * billiardTable.price;
  //         }
  //       }
  //     },
  //   },
  // }
);

module.exports = BillDetail;
