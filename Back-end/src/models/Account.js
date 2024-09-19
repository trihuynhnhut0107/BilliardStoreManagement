const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Account = sequelize.define("Account", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Account;
