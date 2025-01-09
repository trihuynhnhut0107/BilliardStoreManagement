const sequelize = require("../configs/sequelize");
const Promotion = require("../models/Promotion");

const checkPromotionUsage = async (promotionId) => {
  const promotion = await Promotion.findByPk(promotionId);

  if (!promotion) {
    return false;
  }

  const usageCount = await sequelize.models.BillPromotion.count({
    where: { PromotionId: promotionId },
  });

  if (usageCount >= promotion.max_usage) {
    return false;
  }
  return true;
};
module.exports = checkPromotionUsage;
