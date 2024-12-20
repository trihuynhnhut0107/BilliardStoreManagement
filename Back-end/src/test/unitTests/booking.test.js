const chai = require("chai");
const sinon = require("sinon");
const { expect } = chai;

// Import your service method
const BookingService = require("../../services/booking.service");

describe("BookingService - createBooking", () => {
  let mockCreateBooking;

  // Setup mock for createBooking
  beforeEach(() => {
    // If the method interacts with external systems like DB, mock them here
    mockCreateBooking = sinon.stub(BookingService, "createBooking");
  });

  afterEach(() => {
    // Restore the stubbed methods
    sinon.restore();
  });

  it("should return success when booking is created successfully", async () => {
    // Prepare mock return data
    const bookingData = {
      table_id: 1,
      customer_id: 1,
      start_time: "08:30:00 12/13/2024",
      end_time: "10:30:00 12/13/2024",
    };

    const expectedResponse = {
      message: "Create booking successfully",
    };

    // Stub the createBooking method to resolve with expected data
    mockCreateBooking.resolves(expectedResponse);

    // Call the service method
    const response = await BookingService.createBooking(bookingData);

    // Assert that the response is what we expected
    expect(response.message).to.equal("Create booking successfully");
  });

  it('should return error when "table_id" is missing', async () => {
    const bookingData = {
      table_id: "",
      customer_id: 1,
      start_time: "08:30:00 12/13/2024",
      end_time: "10:30:00 12/13/2024",
    };

    const expectedError = {
      message: "Please fill all the required fields",
    };

    // Stub the method to simulate an error response
    mockCreateBooking.throws(expectedError);

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

    const expectedError = {
      message: "Please fill all the required fields",
    };

    // Stub the method to simulate an error response
    mockCreateBooking.throws(expectedError);

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

    const expectedError = {
      message: "Please fill all the required fields",
    };

    // Stub the method to simulate an error response
    mockCreateBooking.throws(expectedError);

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

    const expectedError = {
      message: "Please fill all the required fields",
    };

    // Stub the method to simulate an error response
    mockCreateBooking.throws(expectedError);

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

    const expectedError = {
      message: "Invalid date format",
    };

    // Stub the method to simulate an error response
    mockCreateBooking.throws(expectedError);

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

    const expectedError = {
      message: "Invalid table ID",
    };

    // Stub the method to simulate an error response
    mockCreateBooking.throws(expectedError);

    try {
      await BookingService.createBooking(bookingData);
    } catch (err) {
      expect(err.message).to.equal("Invalid table ID");
    }
  });
});
