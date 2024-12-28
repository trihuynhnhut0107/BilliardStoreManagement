const { OK, CREATED } = require("../core/success.response");
const BookingService = require("../services/booking.service");

class BookingController {
  getAllBooking = async (req, res, next) => {
    new OK({
      message: "Get all booking successfully",
      metadata: await BookingService.getAllBooking(),
    }).send(res);
  };
  getBookingByID = async (req, res, next) => {
    new OK({
      message: "Get booking by ID successfully",
      metadata: await BookingService.getBookingByID(req.params.booking_id),
    }).send(res);
  };

  getBookingByTableIDandDate = async (req, res, next) => {
    new OK({
      metadata: await BookingService.getBookingByTableIDandDate(
        req.params.table_id,
        req.query.date
      ),
    }).send(res);
  };
  createBooking = async (req, res, next) => {
    new CREATED({
      message: "Create booking successfully",
      metadata: await BookingService.createBooking(req.body),
    }).send(res);
  };
}
module.exports = new BookingController();
