const { Op } = require("sequelize");
const { BadRequestError, ServerError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const BilliardTable = require("../models/BilliardTable");
const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const convertUTCToGMT7String = require("../helpers/UTCToStringDate");
const Promotion = require("../models/Promotion");
const checkPromotionUsage = require("../helpers/checkPromotionUsage");

class BookingService {
  static getBookingByCustomerID = async (customer_id) => {
    const bookings = await Booking.findAll({
      where: { customer_id },
    });

    if (!bookings || bookings.length === 0) {
      throw new BadRequestError("Booking not found");
    }

    // Convert Sequelize instances to plain objects and format the dates
    const updatedBookings = bookings.map((booking) => {
      const bookingData = booking.get({ plain: true }); // Convert to plain object
      // Convert start_time and end_time to GMT+7 formatted strings
      bookingData.start_time = convertUTCToGMT7String(bookingData.start_time);
      bookingData.end_time = convertUTCToGMT7String(bookingData.end_time);
      return bookingData; // Return the plain object with updated dates
    });

    return updatedBookings;
  };

  static confirmBooking = async ({ booking_id }) => {
    const booking = await Booking.findOne({
      where: { id: booking_id },
    });

    if (!booking) {
      throw new BadRequestError("Booking not found");
    }

    if (booking.status !== "booked") {
      throw new BadRequestError("Booking is not in booked status");
    }

    await booking.update({ status: "playing" });

    return { bookingID: booking.id };
  };
  static getAllBooking = async () => {
    {
      // Fetch all bookings
      const bookings = await Booking.findAll();

      // Get the current time
      const currentTime = new Date();

      // Iterate through each booking and check its start time
      for (let booking of bookings) {
        const startTime = new Date(booking.start_time);

        // Check if the booking has exceeded the 15-minute window
        if (
          currentTime - startTime > 15 * 60 * 1000 &&
          booking.status === "booked"
        ) {
          // Update the status to 'canceled'
          await booking.update({ status: "cancelled" });
        }
      }

      return bookings; // Return the list of bookings after updates
    }
  };
  static getAllBookingPagination = async (page_size, page_number) => {
    if (!page_number) {
      throw new BadRequestError("Page number is required");
    }
    if (page_number < 1) {
      throw new BadRequestError("Invalid page number");
    }
    if (page_size < 1) {
      throw new BadRequestError("Invalid page size");
    }

    const currentTime = new Date();
    const pageSizeInt = parseInt(page_size, 10);
    const pageNumberInt = parseInt(page_number, 10);
    const totalRecords = await Booking.count();
    const totalPages = Math.ceil(totalRecords / pageSizeInt);

    const bookings = await Booking.findAll({
      limit: pageSizeInt,
      offset: (pageNumberInt - 1) * pageSizeInt,
    });

    if (!bookings) {
      throw new BadRequestError("Booking not found");
    }

    for (let booking of bookings) {
      const startTime = new Date(booking.start_time);

      // Check if the booking has exceeded the 15-minute window
      if (
        currentTime - startTime > 15 * 60 * 1000 &&
        booking.status === "booked"
      ) {
        // Update the status to 'canceled'
        await booking.update({ status: "cancelled" });
      }
    }

    // Convert start_time and end_time to GMT+7
    const convertedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const customer = await Customer.findOne({
          where: { id: booking.customer_id },
        });
        const { customer_id, start_time, end_time, id, ...rest } =
          booking.toJSON(); // Exclude customer_id and extract fields

        return {
          id: id,
          customer: customer.name, // Place customer field first
          ...rest, // Include the rest of the fields
          start_time: convertUTCToGMT7String(start_time),
          end_time: convertUTCToGMT7String(end_time),
        };
      })
    );

    return {
      totalRecords,
      totalPages,
      currentPage: pageNumberInt,
      pageSize: pageSizeInt,
      bookings: convertedBookings,
    };
  };

  static getBookingByTableID = async (table_id) => {
    const now = new Date();
    const gmt7Offset = 7 * 60 * 60 * 1000;

    // Calculate the start and end of the current day in GMT+7
    const gmt7StartOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const utcStartOfDay = new Date(gmt7StartOfDay.getTime() - gmt7Offset); // Adjust to UTC

    const utcEndOfDay = new Date(utcStartOfDay.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours

    // Query the database for bookings within the UTC range
    const bookings = await Booking.findAll({
      where: {
        table_id: table_id,
        start_time: {
          [Op.gte]: utcStartOfDay,
          [Op.lt]: utcEndOfDay,
        },
      },
    });

    return bookings;
  };

  static getBookingByTableIDandDate = async (table_id, date) => {
    // Convert the input date (assumed to be in GMT+7) to UTC start and end times

    const utcStartOfDay = stringToUTCDate(`00:00:00 ${date}`);

    const utcEndOfDay = new Date(utcStartOfDay.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours

    const bookings = await Booking.findAll({
      where: {
        table_id,
        start_time: {
          [Op.gte]: utcStartOfDay,
          [Op.lt]: utcEndOfDay,
        },
      },
      order: [["start_time", "ASC"]],
    });
    return bookings;
  };

  static getBookingByID = async (booking_id) => {
    const booking = await Booking.findOne({
      where: { id: booking_id },
    });
    const customer = await Customer.findOne({
      where: { id: booking.customer_id },
    });
    return { booking, customer };
  };

  static createBooking = async ({
    table_id,
    customer_id,
    start_time,
    end_time,
    promotion_code,
  }) => {
    if (!table_id || !customer_id || !start_time || !end_time) {
      throw new BadRequestError("Please fill all the required fields");
    }
    const foundTable = await BilliardTable.findOne({
      where: { id: table_id },
    });
    if (!foundTable) {
      throw new BadRequestError("Invalid table ID");
    }
    const foundCustomer = await Customer.findOne({
      where: { id: customer_id },
    });
    if (!foundCustomer) {
      throw new BadRequestError("Customer id not found");
    }

    const startTime = stringToUTCDate(start_time);
    const endTime = stringToUTCDate(end_time);

    if (startTime === false || endTime === false) {
      throw new BadRequestError("Invalid date format");
    }

    // Check if the table is available for the requested time span
    const existingBooking = await Booking.findOne({
      where: {
        table_id,
        [Op.or]: [
          {
            start_time: { [Op.between]: [startTime, endTime] },
          },
          {
            end_time: { [Op.between]: [startTime, endTime] },
          },
          {
            [Op.and]: [
              { start_time: { [Op.lte]: startTime } },
              { end_time: { [Op.gte]: endTime } },
            ],
          },
        ],
      },
    });

    if (existingBooking) {
      throw new BadRequestError(
        "Table is already booked for the requested time span"
      );
    }
    let promotionId = null;
    if (promotion_code) {
      const promotion = await Promotion.findOne({
        where: { promotion_code },
      });

      if (!promotion) {
        throw new BadRequestError("Invalid promotion code");
      }

      // Check promotion usage
      if (!(await checkPromotionUsage(promotion.id))) {
        throw new BadRequestError(
          "Promotion has reached its maximum usage limit"
        );
      }

      promotionId = promotion.id;
    }

    const newBooking = await Booking.create({
      table_id,
      customer_id,
      start_time: startTime,
      end_time: endTime,
      promotion_code: promotionId ? promotion_code : null,
    });

    // global.io.emit("New booking");

    if (!newBooking) {
      throw new ServerError("Booking not created");
    }
    return { bookingID: newBooking.id };
  };
}

module.exports = BookingService;
