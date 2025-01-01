const { Op } = require("sequelize");
const { BadRequestError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const sequelize = require("../configs/sequelize");
const Bill = require("../models/Bill");

class ReportService {
  // Method to fetch the sales report within a date range
  static getSalesReport = async (start_date, end_date) => {
    // Ensure that the start and end dates are provided
    if (!start_date || !end_date) {
      throw new BadRequestError("Start date and end date are required");
    }

    // Convert the string dates to UTC format
    const startDate = stringToUTCDate(start_date);
    const endDate = stringToUTCDate(end_date);

    // Check if the date conversion was successful
    if (startDate === false || endDate === false) {
      throw new BadRequestError("Invalid date format");
    }

    // Fetch the sales report with aggregation by year and month together
    const salesReport = await Bill.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate], // Filter by the provided date range
        },
      },
      group: [
        // Group by both year and month concatenated together as a formatted string (YYYY-MM)
        sequelize.literal(
          "CONCAT(YEAR(createdAt), '-', LPAD(MONTH(createdAt), 2, '0'))"
        ),
      ],
      attributes: [
        // Select a formatted year-month value as a single field
        [
          sequelize.literal(
            "CONCAT(YEAR(createdAt), '-', LPAD(MONTH(createdAt), 2, '0'))"
          ),
          "year_month",
        ],
        // Sum of total sales for that year-month group
        [sequelize.fn("SUM", sequelize.col("total_price")), "total_sales"],
      ],
      // Order the results by the formatted "year_month" in ascending order
      order: [
        [
          sequelize.literal(
            "CONCAT(YEAR(createdAt), '-', LPAD(MONTH(createdAt), 2, '0'))"
          ),
          "ASC",
        ],
      ],
    });

    // Return the aggregated report data
    return salesReport;
  };
}

module.exports = ReportService;
