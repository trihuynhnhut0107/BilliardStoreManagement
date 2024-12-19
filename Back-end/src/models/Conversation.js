const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Conversation = sequelize.define("Conversation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  customerID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  staffID: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("open", "handling", "closed"),
    allowNull: false,
    defaultValue: "open",
  },
});

module.exports = Conversation;
