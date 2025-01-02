const { Op, fn, col, literal } = require("sequelize");
const { BadRequestError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const sequelize = require("../configs/sequelize");
const Bill = require("../models/Bill");
const Booking = require("../models/Booking");

class ReportService {
  static getTableReport = async (start_date, end_date) => {
    // Validate input
    if (!start_date || !end_date) {
      throw new BadRequestError("Start date and end date are required");
    }

    const startDate = stringToUTCDate(start_date);
    const endDate = stringToUTCDate(end_date);

    if (startDate === false || endDate === false) {
      throw new BadRequestError("Invalid date format");
    }

    // Query for table report
    const tableReport = await Booking.findAll({
      attributes: [
        "table_id",
        [fn("DATE_FORMAT", col("start_time"), "%Y-%m"), "month"],
        [fn("COUNT", col("id")), "total_bookings"],
        [
          fn(
            "SUM",
            literal(`CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END`)
          ),
          "cancelled_count",
        ],
        [
          literal(
            `ROUND((SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) / COUNT(id)) * 100, 2)`
          ),
          "cancellation_rate",
        ],
      ],
      where: {
        start_time: { [Op.gte]: startDate },
        end_time: { [Op.lte]: endDate },
      },
      group: ["table_id", "month"],
      order: [
        ["table_id", "ASC"],
        ["month", "ASC"],
      ],
    });

    // Format the result
    return tableReport.map((result) => ({
      table_id: result.table_id,
      month: result.dataValues.month,
      total_bookings: parseInt(result.dataValues.total_bookings, 10),
      cancelled_count: parseInt(result.dataValues.cancelled_count, 10),
      cancellation_rate: parseFloat(result.dataValues.cancellation_rate),
    }));
  };

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
