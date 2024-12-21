const request = require("supertest");
const chai = require("chai");
const BookingService = require("../services/booking.service");
const expect = chai.expect;

const baseURL = "http://localhost:8080";

describe("Booking API Test", () => {
  // Successful Booking Case
  describe("Booking Success", () => {
    it("should return booking successfully", (done) => {
      const bookingData = {
        table_id: 1,
        customer_id: 1,
        start_time: "08:30:00 12/13/2024",
        end_time: "10:30:00 12/13/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Create booking successfully");
          done();
        });
    });
  });
  describe("Missing Table ID Field", () => {
    it('should return "Table ID is required" when table ID is missing', (done) => {
      const bookingData = {
        table_id: "",
        customer_id: 1,
        start_time: "08:30:00 12/13/2024",
        end_time: "10:30:00 12/13/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required fields"
          );
          done();
        });
    });
  });
  describe("Missing Customer ID Field", () => {
    it('should return "Customer ID is required" when customer ID is missing', (done) => {
      const bookingData = {
        table_id: 1,
        customer_id: "",
        start_time: "08:30:00 12/13/2024",
        end_time: "10:30:00 12/13/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required fields"
          );
          done();
        });
    });
  });
  describe("Missing Start Time Field", () => {
    it('should return "Start Time is required" when start time is missing', (done) => {
      const bookingData = {
        table_id: 1,
        customer_id: 1,
        start_time: "",
        end_time: "10:30:00 12/13/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required fields"
          );
          done();
        });
    });
  });
  describe("Missing End Time Field", () => {
    it('should return "End Time is required" when end time is missing', (done) => {
      const bookingData = {
        table_id: 1,
        customer_id: 1,
        start_time: "08:30:00 12/13/2024",
        end_time: "",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required fields"
          );
          done();
        });
    });
  });
  describe("Missing All Fields", () => {
    it('should return "Please fill all the required fields" when all fields are missing', (done) => {
      const bookingData = {
        table_id: "",
        customer_id: "",
        start_time: "",
        end_time: "",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required fields"
          );
          done();
        });
    });
  });
  describe("Invalid Start Time Format", () => {
    it('should return "Invalid start time format" when start time is in invalid format', (done) => {
      const bookingData = {
        table_id: 1,
        customer_id: 1,
        start_time: "08:30:00 13/12/2024",
        end_time: "10:30:00 12/13/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Invalid date format");
          done();
        });
    });
  });
  describe("Invalid End Time Format", () => {
    it('should return "Invalid end time format" when end time is in invalid format', (done) => {
      const bookingData = {
        table_id: 1,
        customer_id: 1,
        start_time: "08:30:00 12/13/2024",
        end_time: "10:30:00 13/12/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Invalid date format");
          done();
        });
    });
  });
  describe("Invalid Table ID", () => {
    it('should return "Invalid table ID" when table ID is not found', (done) => {
      const bookingData = {
        table_id: 100,
        customer_id: 1,
        start_time: "08:30:00 12/13/2024",
        end_time: "10:30:00 12/13/2024",
      };

      request(baseURL)
        .post("/v1/api/booking/create-booking")
        .send(bookingData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Invalid table ID");
          done();
        });
    });
  });
});
