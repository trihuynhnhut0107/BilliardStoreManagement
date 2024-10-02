const { Sequelize } = require("sequelize");

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize(
  "freedb_billiard_store",
  "freedb_trihuynhnhut0107",
  "kxVm*ne79jGj$zJ",
  {
    host: "sql.freedb.tech",
    port: 3306,
    dialect: "mysql",
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 5, // Maximum number of connections in pool
      min: 0, // Minimum number of connections in pool
      acquire: 30000, // Maximum time (in ms) that pool will try to get a connection before throwing an error
      idle: 10000, // Maximum time (in ms) a connection can be idle before being released
    },
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Adjust based on your SSL requirements
      },
    },
    logging: console.log,
  }
);

module.exports = sequelize;
