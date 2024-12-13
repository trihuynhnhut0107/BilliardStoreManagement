"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const bookingController = require("../../controllers/booking.controller");
const router = express.Router();

router.get("/get-all-booking", asyncHandler(bookingController.getAllBooking));
router.get(
  "/booking/:booking_id",
  asyncHandler(bookingController.getBookingByID)
);
router.post("/create-booking", asyncHandler(bookingController.createBooking));

module.exports = router;
