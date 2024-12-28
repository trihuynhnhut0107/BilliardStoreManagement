const { Op } = require("sequelize");
const { BadRequestError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const sequelize = require("../configs/sequelize");
const Bill = require("../models/Bill");
const BillDetail = require("../models/BillDetail");

class reportService {
  static getSalesReport = async (start_date, end_date) => {
    if (!start_date || !end_date) {
      throw new BadRequestError("Start date and end date are required");
    }

    const startDate = stringToUTCDate(start_date);
    const endDate = stringToUTCDate(end_date);

    if (startDate === false || endDate === false) {
      throw new BadRequestError("Invalid date format");
    }

    // Fetch the sales report with a proper GROUP BY query
    const salesReport = await Bill.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate, endDate],
        },
      },
      include: [
        {
          model: BillDetail,
          required: true, // Ensures that only bills with details are fetched
        },
      ],
      group: [
        sequelize.fn("MONTH", sequelize.col("Bill.createdAt")), // Group by month
        sequelize.fn("YEAR", sequelize.col("Bill.createdAt")), // Group by year (optional, for full date granularity)
      ],
      attributes: [
        [sequelize.fn("YEAR", sequelize.col("Bill.createdAt")), "year"], // Group by year
        [sequelize.fn("MONTH", sequelize.col("Bill.createdAt")), "month"], // Group by month
        [sequelize.fn("SUM", sequelize.col("total_price")), "total_sales"], // Aggregated total sales
      ],
    });

    return salesReport;
  };
}

module.exports = reportService;
