const sequelize = require("../configs/sequelize");
const MenuItem = require("./MenuItem");
const BilliardTable = require("./BilliardTable");
const Staff = require("./Staff");
const Account = require("./Account");
const Bill = require("./Bill");
const Customer = require("./Customer");
const BillDetail = require("./BillDetail");
const Conversation = require("./Conversation");
const Message = require("./Message");
const Promotion = require("./Promotion");
const { BadRequestError } = require("../core/error.response");

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

Bill.hasMany(BillDetail, { foreignKey: "bill_id" });
BillDetail.belongsTo(Bill, { foreignKey: "bill_id" });

Bill.belongsToMany(Promotion, {
  through: "BillPromotion",
});
Promotion.belongsToMany(Bill, {
  through: "BillPromotion",
});

const BillPromotion = sequelize.models.BillPromotion;
BillPromotion.beforeBulkCreate(async (billPromotions, options) => {
  for (const billPromotion of billPromotions) {
    const promotionInstance = await Promotion.findByPk(
      billPromotion.PromotionId
    );

    if (!promotionInstance) {
      throw new BadRequestError("Promotion not found");
    }

    const currentUsage = await BillPromotion.count({
      where: { PromotionId: billPromotion.PromotionId },
    });

    if (currentUsage >= promotionInstance.max_usage) {
      throw new BadRequestError(
        `Promotion ${promotionInstance.id} has reached its maximum usage limit of ${promotionInstance.max_usage}`
      );
    }
  }
});

Conversation.belongsTo(Customer, { foreignKey: "customerID" });

Conversation.belongsTo(Staff, { foreignKey: "staffID", allowNull: true });

// Conversation model
Conversation.hasMany(Message, { foreignKey: "conversationID" });

// Message model
Message.belongsTo(Conversation, { foreignKey: "conversationID" });

// Associations
BillDetail.belongsTo(MenuItem, {
  foreignKey: "item_id",
  constraints: false,
  as: "menuItem",
});

BillDetail.belongsTo(BilliardTable, {
  foreignKey: "item_id",
  constraints: false,
  as: "billiardTable",
});

// Sync models with database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => {
    console.error("Unable to create tables:", error);
  });
