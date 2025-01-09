"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const promotionController = require("../../controllers/promotion.controller");

const router = express.Router();

router.get(
  "/get-all-promotions",
  asyncHandler(promotionController.getAllPromotions)
);

router.get(
  "/get-promotion-by-id/:promotion_id",
  asyncHandler(promotionController.getPromotionByID)
);
router.post(
  "/create-new-promotion",
  asyncHandler(promotionController.createNewPromotion)
);

module.exports = router;
