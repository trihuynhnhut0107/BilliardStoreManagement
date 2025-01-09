"use strict";

const { CREATED, OK } = require("../core/success.response");
const PromotionService = require("../services/promotion.service");

class PromotionController {
  getAllPromotions = async (req, res, next) => {
    new OK({
      message: "Get all promotions successfully!",
      metadata: await PromotionService.getAllPromotions(),
    }).send(res);
  };
  getPromotionByID = async (req, res, next) => {
    new OK({
      message: "Get promotion by ID successfully!",
      metadata: await PromotionService.getPromotionByID(
        req.params.promotion_id
      ),
    }).send(res);
  };
  createNewPromotion = async (req, res, next) => {
    new CREATED({
      message: "Create new promotion successfully!",
      metadata: await PromotionService.createNewPromotion(req.body),
    }).send(res);
  };
}

module.exports = new PromotionController();
