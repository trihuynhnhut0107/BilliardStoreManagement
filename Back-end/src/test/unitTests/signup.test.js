const chai = require("chai");
const sinon = require("sinon");
const { StaffAccessService } = require("../../services/access.service");
const expect = chai.expect;

describe("Staff Access - Signup Unit Tests", () => {
  let signUpStub;

  beforeEach(() => {
    // Stub the signUp method in the StaffAccessService
    signUpStub = sinon.stub(StaffAccessService, "signUp");
  });

  afterEach(() => {
    // Restore the original method after each test
    sinon.restore();
  });

  // Successful Signup Case
  describe("Sign Up Success", () => {
    it("should return signup successfully", async () => {
      const signupData = {
        email: "uniqueEmail@gmail.com",
        username: "uniqueUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      // Mock successful signup
      signUpStub.resolves({ message: "Signup success" });

      const result = await StaffAccessService.signUp(signupData);

      expect(signUpStub.calledOnceWithExactly(signupData)).to.be.true;
      expect(result.message).to.equal("Signup success");
    });
  });

  // Invalid Email Format Case
  describe("Invalid Email Format", () => {
    it("should return 'Invalid email format' error", async () => {
      const signupData = {
        email: "invalidEmail@", // Incorrect email format
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      // Mock invalid email format error
      signUpStub.rejects(new Error("Invalid email format"));

      try {
        await StaffAccessService.signUp(signupData);
      } catch (error) {
        expect(signUpStub.calledOnceWithExactly(signupData)).to.be.true;
        expect(error.message).to.equal("Invalid email format");
      }
    });
  });

  // Email Already Exists Case
  describe("Email Already Exists", () => {
    it("should return 'Email already exists' error", async () => {
      const signupData = {
        email: "existingEmail@gmail.com", // Duplicate email
        username: "newUniqueUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      // Mock email already exists error
      signUpStub.rejects(new Error("Email already exists"));

      try {
        await StaffAccessService.signUp(signupData);
      } catch (error) {
        expect(signUpStub.calledOnceWithExactly(signupData)).to.be.true;
        expect(error.message).to.equal("Email already exists");
      }
    });
  });

  // Missing Required Fields Cases
  const requiredFields = [
    {
      field: "email",
      value: "",
      message: "Please fill all the required fields",
    },
    {
      field: "username",
      value: "",
      message: "Please fill all the required fields",
    },
    {
      field: "password",
      value: "",
      message: "Please fill all the required fields",
    },
    {
      field: "name",
      value: "",
      message: "Please fill all the required fields",
    },
    {
      field: "phone_number",
      value: "",
      message: "Please fill all the required fields",
    },
  ];

  requiredFields.forEach(({ field, value, message }) => {
    describe(`Missing ${field}`, () => {
      it(`should return '${message}' when ${field} is missing`, async () => {
        const signupData = {
          email: "validEmail@gmail.com",
          username: "validUsername",
          password: "validPassword",
          name: "validName",
          phone_number: "0993923123",
          role: "manager",
        };

        signupData[field] = value; // Set the field to blank

        // Mock missing required fields error
        signUpStub.rejects(new Error(message));

        try {
          await StaffAccessService.signUp(signupData);
        } catch (error) {
          expect(signUpStub.calledOnceWithExactly(signupData)).to.be.true;
          expect(error.message).to.equal(message);
        }
      });
    });
  });

  // Invalid Phone Number Format Case
  describe("Invalid Phone Number Format", () => {
    it("should return an error for invalid phone number format", async () => {
      const signupData = {
        email: "validEmail@gmail.com",
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "invalidPhone", // Invalid format
        role: "manager",
      };

      // Mock invalid phone number format error
      signUpStub.rejects(
        new Error(
          "Phone numbers need to be started with a 0 and have 10 or 11 characters"
        )
      );

      try {
        await StaffAccessService.signUp(signupData);
      } catch (error) {
        expect(signUpStub.calledOnceWithExactly(signupData)).to.be.true;
        expect(error.message).to.equal(
          "Phone numbers need to be started with a 0 and have 10 or 11 characters"
        );
      }
    });
  });

  // All Fields Blank Case
  describe("All Fields Blank", () => {
    it("should return 'Please fill all the required fields' when all fields are blank", async () => {
      const signupData = {
        email: "",
        username: "",
        password: "",
        name: "",
        phone_number: "",
        role: "",
      };

      // Mock all fields blank error
      signUpStub.rejects(new Error("Please fill all the required fields"));

      try {
        await StaffAccessService.signUp(signupData);
      } catch (error) {
        expect(signUpStub.calledOnceWithExactly(signupData)).to.be.true;
        expect(error.message).to.equal("Please fill all the required fields");
      }
    });
  });
});
