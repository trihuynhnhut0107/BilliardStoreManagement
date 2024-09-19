const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const BilliardTable = sequelize.define("BilliardTable", {
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = BilliardTable;
