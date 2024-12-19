const sequelize = require("../configs/sequelize");
const MenuItem = require("./MenuItem");
const BilliardTable = require("./BilliardTable");
const Staff = require("./Staff");
const Account = require("./Account");
const Bill = require("./Bill");
const Customer = require("./Customer");
const BillDetail = require("./BillDetail");
const { UserExistError } = require("../core/error.response");
const Conversation = require("./Conversation");
const Message = require("./Message");

// // Set up relationships
// Customer.hasOne(Account, {
//   foreignKey: "accountableId",
//   constraints: false,
//   scope: {
//     accountableType: "Customer", // Only link Customers
//   },
// });

// Staff.hasOne(Account, {
//   foreignKey: "accountableId",
//   constraints: false,
//   scope: {
//     accountableType: "Staff", // Only link Staff
//   },
// });

Account.belongsTo(Customer, {
  foreignKey: "accountID",
  constraints: false,
  as: "Customer",
});

Account.belongsTo(Staff, {
  foreignKey: "accountID",
  constraints: false,
  as: "Staff",
});

Staff.hasMany(Bill, {
  foreignKey: "staff_id",
});

Customer.hasMany(Bill, {
  foreignKey: "customer_id",
});

Bill.hasMany(BillDetail, {
  foreignKey: "bill_id",
});

Conversation.belongsTo(Customer, { foreignKey: "customerID" });

Conversation.belongsTo(Staff, { foreignKey: "staffID", allowNull: true });

// Conversation model
Conversation.hasMany(Message, { foreignKey: "conversationID" });

// Message model
Message.belongsTo(Conversation, { foreignKey: "conversationID" });

// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });
