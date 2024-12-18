const chai = require("chai");
const sinon = require("sinon");
const expect = chai.expect;
const tableManageService = require("../../services/tableManage.service");

describe("Table Management Service - createNewTable", () => {
  let createNewTable;

  beforeEach(() => {
    // Mock the createNewTable function from tableManageService
    createNewTable = sinon.stub(tableManageService, "createNewTable");
  });

  afterEach(() => {
    // Restore the original function after each test
    createNewTable.restore();
  });

  it("should return success message when table is created successfully", async () => {
    const createTableData = {
      table_type: "hole",
      stick_quantity: 3,
      ball_quantity: 8,
      price: 100000,
    };

    createNewTable.resolves({ message: "Table created successfully" });

    const result = await tableManageService.createNewTable(createTableData);

    expect(result.message).to.equal("Table created successfully");
  });

  it("should return error message when table type is missing", async () => {
    const createTableData = {
      table_type: "",
      stick_quantity: 3,
      ball_quantity: 8,
      price: 100000,
    };

    createNewTable.rejects({ message: "Please fill all the required field" });

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });

  it("should return error message when stick quantity is missing", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: "",
      ball_quantity: 8,
      price: 100000,
    };

    createNewTable.rejects({ message: "Please fill all the required field" });

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });

  it("should return error message when ball quantity is missing", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: 3,
      ball_quantity: "",
      price: 100000,
    };

    createNewTable.rejects({ message: "Please fill all the required field" });

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });

  it("should return error message when price is missing", async () => {
    const createTableData = {
      table_type: "carom",
      stick_quantity: 3,
      ball_quantity: 8,
      price: "",
    };

    createNewTable.rejects({ message: "Please fill all the required field" });

    try {
      await tableManageService.createNewTable(createTableData);
    } catch (error) {
      expect(error.message).to.equal("Please fill all the required field");
    }
  });
});
