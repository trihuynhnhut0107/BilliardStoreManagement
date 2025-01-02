const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Bill = sequelize.define("Bill", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  item_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  staff_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  promotion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  total_discount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  checkout_price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

module.exports = Bill;
