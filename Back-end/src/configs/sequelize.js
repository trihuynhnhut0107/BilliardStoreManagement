const { Sequelize } = require("sequelize");

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize("billiard_store", "root", "root", {
  host: "localhost",
  port: 3307,
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});

module.exports = sequelize;
