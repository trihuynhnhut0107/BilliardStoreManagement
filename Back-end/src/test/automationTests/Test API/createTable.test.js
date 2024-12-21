const request = require("supertest");
const chai = require("chai");
const tableManageService = require("../services/tableManage.service");
const expect = chai.expect;

const baseURL = "http://localhost:8080";

describe("Create Table API test", () => {
  // Successful Create Table Case
  describe("Create Table Success", () => {
    it("should return create table successfully", (done) => {
      const createTableData = {
        table_type: "hole",
        stick_quantity: 3,
        ball_quantity: 8,
        price: 100000,
      };

      request(baseURL)
        .post("/v1/api/table-manage/create-new-table")
        .send(createTableData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Table created successfully");
          done();
        });
    });
  });

  // Missing Table Number Field Case
  describe("Missing Table Type", () => {
    it('should return "Table number is required" when table number is missing', (done) => {
      const createTableData = {
        table_type: "",
        stick_quantity: 3,
        ball_quantity: 8,
        price: 100000,
      };

      request(baseURL)
        .post("/v1/api/table-manage/create-new-table")
        .send(createTableData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required field"
          );
          done();
        });
    });
  });

  // Missing Table Name Field Case
  describe("Missing Table Name Field", () => {
    it('should return "Table name is required" when table name is missing', (done) => {
      const createTableData = {
        table_type: "carom",
        stick_quantity: "",
        ball_quantity: 8,
        price: 100000,
      };

      request(baseURL)
        .post("/v1/api/table-manage/create-new-table")
        .send(createTableData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required field"
          );
          done();
        });
    });
  });

  // Missing Table Status Field Case
  describe("Missing Table Status Field", () => {
    it('should return "Table status is required" when table status is missing', (done) => {
      const createTableData = {
        table_type: "",
        stick_quantity: 3,
        ball_quantity: "",
        price: 100000,
      };
      request(baseURL)
        .post("/v1/api/table-manage/create-new-table")
        .send(createTableData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required field"
          );
          done();
        });
    });
  });
});
