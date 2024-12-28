const { Op } = require("sequelize");
const { BadRequestError, ServerError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const BilliardTable = require("../models/BilliardTable");
const Booking = require("../models/Booking");
const Customer = require("../models/Customer");

class BookingService {
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
    return booking;
  };

  static createBooking = async ({
    table_id,
    customer_id,
    start_time,
    end_time,
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

    const newBooking = await Booking.create({
      table_id,
      customer_id,
      start_time: startTime,
      end_time: endTime,
    });
    // global.io.emit("New booking");

    if (!newBooking) {
      throw new ServerError("Booking not created");
    }
    return "Create booking successfully";
  };
}

module.exports = BookingService;
