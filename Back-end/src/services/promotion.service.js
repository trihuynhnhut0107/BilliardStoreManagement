"use strict";

const { BadRequestError, ServerError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const Promotion = require("../models/Promotion");

class PromotionService {
  static getAllPromotions = async () => {
    return await Promotion.findAll();
  };
  static getPromotionByID = async (promotionID) => {
    return await Promotion.findOne({ where: { id: promotionID } });
  };
  static createNewPromotion = async ({
    name,
    description,
    discount_rate,
    start_date,
    end_date,
    max_usage,
    promotion_code,
  }) => {
    if (!name || !discount_rate || !start_date || !end_date || !max_usage) {
      throw new BadRequestError("Please fill all the required fields");
    }

    const startDate = stringToUTCDate(start_date);
    const endDate = stringToUTCDate(end_date);

    if (startDate === false || endDate === false) {
      throw new BadRequestError("Invalid date format");
    }

    // Generate promotion code if not provided
    const generatedCode =
      promotion_code || this.generatePromotionCode(name, startDate, endDate);

    const createdPromotion = await Promotion.create({
      name,
      description,
      discount_rate,
      start_date: startDate,
      end_date: endDate,
      max_usage,
      promotion_code: generatedCode,
    });

    if (!createdPromotion) {
      throw new ServerError("Promotion not created");
    }
    return { promotionID: createdPromotion.id, promotion_code: generatedCode };
  };
  // Helper function to generate a promotion code
  static generatePromotionCode = (name, startDate, endDate) => {
    const cleanedName = name.replace(/\s+/g, "").replace(/[^a-zA-Z0-9]/g, "");
    const formattedStartDate = startDate
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const formattedEndDate = endDate
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");
    const durationDays = Math.floor(
      (endDate - startDate) / (1000 * 60 * 60 * 24)
    );

    // Combine name, start date, and duration for code
    return `${cleanedName}`.toUpperCase();
  };
}

module.exports = PromotionService;
