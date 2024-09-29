const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const BillDetail = sequelize.define("BillDetail", {
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
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = BillDetail;
