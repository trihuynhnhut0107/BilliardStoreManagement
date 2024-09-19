const sequelize = require("../configs/sequelize");
const MenuItem = require("./MenuItems");
const BilliardTable = require("./BilliardTable");
const Staff = require("./Staff");
const Account = require("./Account");
const Bill = require("./Bill");
const Customer = require("./Customer");
const BillDetail = require("./BillDetail");

// Set up relationships
Account.hasMany(Customer, { foreignKey: "account_id" });
Customer.belongsTo(Account, { foreignKey: "account_id" });

Account.hasMany(Staff, { foreignKey: "account_id" });
Staff.belongsTo(Account, { foreignKey: "account_id" });

Customer.hasMany(Bill, { foreignKey: "customer_id" });
Bill.belongsTo(Customer, { foreignKey: "customer_id" });

Bill.hasMany(BillDetail, { foreignKey: "bill_id" });
BillDetail.belongsTo(Bill, { foreignKey: "bill_id" });

BilliardTable.hasMany(BillDetail, { foreignKey: "table_id" });
BillDetail.belongsTo(BilliardTable, { foreignKey: "table_id" });

// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });
