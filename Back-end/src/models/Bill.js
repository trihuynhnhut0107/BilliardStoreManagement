const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Bill = sequelize.define("Bill", {
  table_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Bill;
