const { Op } = require("sequelize");
const { BadRequestError, ServerError } = require("../core/error.response");
const stringToUTCDate = require("../helpers/stringDateToUTC");
const BilliardTable = require("../models/BilliardTable");
const Booking = require("../models/Booking");
const Customer = require("../models/Customer");

class BookingService {
  static getAllBooking = async () => {
    const bookings = await Booking.findAll();
    return bookings;
  };

  static getBookingByID = async () => {
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
    const foundedTable = await BilliardTable.findOne({
      where: { id: table_id },
    });
    if (!foundedTable) {
      throw new BadRequestError("Invalid table ID");
    }
    const foundedCustomer = await Customer.findOne({
      where: { id: customer_id },
    });
    if (!foundedCustomer) {
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
    global.io.emit("New booking");

    if (!newBooking) {
      throw new ServerError("Booking not created");
    }
  };
}

module.exports = BookingService;
