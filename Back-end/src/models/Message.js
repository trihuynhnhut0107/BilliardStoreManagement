const { DataTypes } = require("sequelize");
const sequelize = require("../configs/sequelize");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  conversationID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  senderType: {
    type: DataTypes.ENUM("customer", "staff"),
    allowNull: false,
  },
  senderID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  messageText: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Message;
