"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const bookingController = require("../../controllers/booking.controller");
const router = express.Router();

router.get("/get-all-booking", asyncHandler(bookingController.getAllBooking));
router.get(
  "/get-all-booking-pagination",
  asyncHandler(bookingController.getAllBookingPagination)
);

router.post("/confirm-booking", asyncHandler(bookingController.confirmBooking));
router.get("/:booking_id", asyncHandler(bookingController.getBookingByID));

// Add a new route to get bookings by table ID in params and date in query
router.get(
  "/table/:table_id",
  asyncHandler(bookingController.getBookingByTableIDandDate)
);

router.post("/create-booking", asyncHandler(bookingController.createBooking));

module.exports = router;
