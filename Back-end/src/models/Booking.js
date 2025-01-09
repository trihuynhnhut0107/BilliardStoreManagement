const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  table_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("booked", "playing", "cancelled", "completed"),
    allowNull: false,
    defaultValue: "booked",
  },
  promotion_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Booking;
