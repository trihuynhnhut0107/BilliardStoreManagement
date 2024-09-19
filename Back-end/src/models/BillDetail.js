const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const BillDetail = sequelize.define("BillDetail", {
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
