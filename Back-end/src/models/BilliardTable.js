const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const BilliardTable = sequelize.define("BilliardTable", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  table_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stick_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ball_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("available", "busy", "repairing"),
    allowNull: false,
    defaultValue: "available",
  },
});

module.exports = BilliardTable;
