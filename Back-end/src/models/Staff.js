const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Staff = sequelize.define("Staff", {
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
});

module.exports = Staff;
