const sequelize = require("../configs/sequelize");
const MenuItem = require("./MenuItem");
const BilliardTable = require("./BilliardTable");
const Staff = require("./Staff");
const Account = require("./Account");
const Bill = require("./Bill");
const Customer = require("./Customer");
const BillDetail = require("./BillDetail");
const { UserExistError } = require("../core/error.response");

// Set up relationships
Customer.hasOne(Account, {
  foreignKey: "accountableId",
  constraints: false,
  scope: {
    accountableType: "Customer", // Only link Customers
  },
});

Staff.hasOne(Account, {
  foreignKey: "accountableId",
  constraints: false,
  scope: {
    accountableType: "Staff", // Only link Staff
  },
});

Account.belongsTo(Customer, {
  foreignKey: "accountableId",
  constraints: false,
  as: "Customer",
});

Account.belongsTo(Staff, {
  foreignKey: "accountableId",
  constraints: false,
  as: "Staff",
});

Customer.hasMany(Bill);
Bill.belongsTo(Customer);

Bill.hasMany(BillDetail);
BillDetail.belongsTo(Bill);

// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });
