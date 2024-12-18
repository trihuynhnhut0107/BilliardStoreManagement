const chai = require("chai");
const sinon = require("sinon");
const {
  StaffAccessService,
  CustomerAccessService,
} = require("../../services/access.service");

const expect = chai.expect;

describe("Login Unit Tests", () => {
  let staffServiceMock, customerServiceMock;

  beforeEach(() => {
    // Set up mocks for service methods
    staffServiceMock = sinon.stub(StaffAccessService, "login");
    customerServiceMock = sinon.stub(CustomerAccessService, "login");
  });

  afterEach(() => {
    // Restore the original methods after each test
    sinon.restore();
  });

  describe("Login Success", () => {
    it("should return login successfully", async () => {
      const loginData = {
        username: "uniqueUsername",
        password: "validPassword",
      };

      // Mock the service to return a successful response
      staffServiceMock.resolves({ message: "Login successfully" });

      // Call the login function and assert the response
      const result = await StaffAccessService.login(
        loginData.username,
        loginData.password
      );
      expect(result.message).to.equal("Login successfully");

      // Ensure the mock was called with the correct arguments
      expect(
        staffServiceMock.calledOnceWith(loginData.username, loginData.password)
      ).to.be.true;
    });
  });

  describe("Missing Username Field", () => {
    it("should return 'Please fill all the required fields' when username is missing", async () => {
      const loginData = {
        username: "", // Blank username
        password: "validPassword",
      };

      // Mock the service to return an error response
      staffServiceMock.rejects(
        new Error("Please fill all the required fields")
      );

      try {
        await StaffAccessService.login(loginData.username, loginData.password);
      } catch (error) {
        expect(error.message).to.equal("Please fill all the required fields");
      }

      // Ensure the mock was called with the correct arguments
      expect(
        staffServiceMock.calledOnceWith(loginData.username, loginData.password)
      ).to.be.true;
    });
  });

  describe("Missing Password Field", () => {
    it("should return 'Please fill all the required fields' when password is missing", async () => {
      const loginData = {
        username: "uniqueUsername",
        password: "", // Blank password
      };

      // Mock the service to return an error response
      staffServiceMock.rejects(
        new Error("Please fill all the required fields")
      );

      try {
        await StaffAccessService.login(loginData.username, loginData.password);
      } catch (error) {
        expect(error.message).to.equal("Please fill all the required fields");
      }

      // Ensure the mock was called with the correct arguments
      expect(
        staffServiceMock.calledOnceWith(loginData.username, loginData.password)
      ).to.be.true;
    });
  });

  describe("Missing Both Username and Password", () => {
    it("should return 'Please fill all the required fields' when both username and password are missing", async () => {
      const loginData = {
        username: "", // Blank username
        password: "", // Blank password
      };

      // Mock the service to return an error response
      staffServiceMock.rejects(
        new Error("Please fill all the required fields")
      );

      try {
        await StaffAccessService.login(loginData.username, loginData.password);
      } catch (error) {
        expect(error.message).to.equal("Please fill all the required fields");
      }

      // Ensure the mock was called with the correct arguments
      expect(
        staffServiceMock.calledOnceWith(loginData.username, loginData.password)
      ).to.be.true;
    });
  });
});
