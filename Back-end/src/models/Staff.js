const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Staff = sequelize.define("Staff", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Active", "Terminated", "On leave", "Suspended"),
    allowNull: false,
    defaultValue: "Active",
  },
});

module.exports = Staff;
