const { OK, CREATED } = require("../core/success.response");
const BookingService = require("../services/booking.service");

class BookingController {
  getAllBooking = async (req, res, next) => {
    new OK({
      message: "Get all booking successfully",
      metadata: await BookingService.getAllBooking(),
    });
  };
  getBookingByID = async (req, res, next) => {
    new OK({
      message: "Get booking by ID successfully",
      metadata: await BookingService.getBookingByID(req.params.booking_id),
    });
  };
  createBooking = async (req, res, next) => {
    new CREATED({
      message: "Create booking successfully",
      metadata: await BookingService.createBooking(req.body),
    });
  };
}
module.exports = new BookingController();
