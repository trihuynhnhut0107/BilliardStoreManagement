const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;

// Import your service and models
const BookingService = require("../../services/booking.service");
const BilliardTable = require("../../models/BilliardTable");
const Customer = require("../../models/Customer");
const Booking = require("../../models/Booking");

describe("BookingService - createBooking", () => {
  let tableStub, customerStub, bookingFindStub, bookingCreateStub;

  beforeEach(() => {
    // Stub dependencies
    tableStub = sinon.stub(BilliardTable, "findOne");
    customerStub = sinon.stub(Customer, "findOne");
    bookingFindStub = sinon.stub(Booking, "findOne");
    bookingCreateStub = sinon.stub(Booking, "create");
  });

  afterEach(() => {
    // Restore all stubs
    sinon.restore();
  });

  it("should return success when booking is created successfully", async () => {
    const bookingData = {
      table_id: 1,
      customer_id: 1,
      start_time: "08:30:00 12/13/2024",
      end_time: "10:30:00 12/13/2024",
    };

    tableStub.resolves({ id: 1 });
    customerStub.resolves({ id: 1 });
    bookingFindStub.resolves(null); // No conflicting booking
    bookingCreateStub.resolves({ id: 1 });

    const response = await BookingService.createBooking(bookingData);

    expect(response).to.equal("Create booking successfully");
  });

  it('should return error when "table_id" is missing', async () => {
    const bookingData = {
      table_id: "",
      customer_id: 1,
      start_time: "08:30:00 12/13/2024",
      end_time: "10:30:00 12/13/2024",
    };

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Please fill all the required fields");
    }
  });

  it('should return error when "customer_id" is missing', async () => {
    const bookingData = {
      table_id: 1,
      customer_id: "",
      start_time: "08:30:00 12/13/2024",
      end_time: "10:30:00 12/13/2024",
    };

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Please fill all the required fields");
    }
  });

  it('should return error when "start_time" is missing', async () => {
    const bookingData = {
      table_id: 1,
      customer_id: 1,
      start_time: "",
      end_time: "10:30:00 12/13/2024",
    };

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Please fill all the required fields");
    }
  });

  it('should return error when "end_time" is missing', async () => {
    const bookingData = {
      table_id: 1,
      customer_id: 1,
      start_time: "08:30:00 12/13/2024",
      end_time: "",
    };

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Please fill all the required fields");
    }
  });

  it("should return error for invalid date formats", async () => {
    const bookingData = {
      table_id: 1,
      customer_id: 1,
      start_time: "08:30:00 13/12/2024", // Invalid format
      end_time: "10:30:00 12/13/2024",
    };

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Invalid date format");
    }
  });

  it("should return error when table_id is invalid", async () => {
    const bookingData = {
      table_id: 100, // Assuming this table ID does not exist
      customer_id: 1,
      start_time: "08:30:00 12/13/2024",
      end_time: "10:30:00 12/13/2024",
    };

    tableStub.resolves(null); // Table not found

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Invalid table ID");
    }
  });
});
