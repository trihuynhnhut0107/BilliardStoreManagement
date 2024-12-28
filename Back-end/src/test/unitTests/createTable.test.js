const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const tableManageService = require("../../services/tableManage.service");
const BilliardTable = require("../../models/BilliardTable");

describe("Table Management Service - createNewTable", () => {
  let createStub;

  beforeEach(() => {
    // Mock the createNewTable function from tableManageService
    createStub = sinon.stub(BilliardTable, "create");
  });

  afterEach(() => {
    // Restore the original function after each test
    sinon.restore();
  });

  it("should return success message when table is created successfully", async () => {
    const createTableData = {
      table_type: "hole",
      stick_quantity: 3,
      ball_quantity: 8,
      price: 100000,
    };
    // Mock Sequelize create method to resolve the same data
    createStub.resolves(createTableData);

    const result = await tableManageService.createNewTable(createTableData);
    expect(result).to.equal("Table created successfully");
    expect(createStub.calledOnce).to.be.true; // Ensure the stub was called
  });

  it("should return error message when table type is missing", async () => {
    const createTableData = {
      stick_quantity: "abc",
      ball_quantity: 8,
      price: 100000,
    };

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });

  it("should return error message when stick quantity is not a number", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: "abc",
      ball_quantity: 8,
      price: 100000,
    };

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Stick quantity must be a number");
    }
  });
  it("should return error message when stick quantity is missing", async () => {
    const createTableData = {
      table_type: "carom",
      ball_quantity: 8,
      price: 100000,
    };

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });

  it("should return error message when ball quantity is not a number", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: 3,
      ball_quantity: "abc",
      price: 100000,
    };

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Ball quantity must be a number");
    }
  });

  it("should return error message when ball quantity is missing", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: 3,
      price: 100000,
    };

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });

  it("should return error message when price is missing", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: "abc",
      ball_quantity: 8,
    };

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });
});
