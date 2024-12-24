const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

const {
  StaffAccessService,
  CustomerAccessService,
} = require("../services/access.service");

const baseURL = "http://localhost:8080";

describe("Staff Access - Signup API Tests", () => {
  // Successful Signup Case
  describe("Sign Up Success", () => {
    it("should return signup successfully", (done) => {
      const signupData = {
        email: "uniqueEmail@gmail.com",
        username: "uniqueUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Signup success");
          done();
        });
    });
  });

  // Invalid Email Format Case
  describe("Invalid Email Format", () => {
    it("should return 'Invalid email format' error", (done) => {
      const signupData = {
        email: "invalidEmail@", // Incorrect email format
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Invalid email format");
          done();
        });
    });
  });

  // Email Already Exists Case
  describe("Email Already Exists", () => {
    it("should return 'Email already exists' error", (done) => {
      const signupData = {
        email: "uniqueEmail@gmail.com", // This email should be created in the first test case
        username: "newUniqueUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Email already exists");
          done();
        });
    });
  });

  // Username Already Exists Case
  describe("Username Already Exists", () => {
    it("should return 'Username already exists' error", (done) => {
      const signupData = {
        email: "newEmail@gmail.com",
        username: "uniqueUsername", // This username should be created in the first test case
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Username already exists");
          done();
        });
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

  requiredFields.forEach((testCase) => {
    describe(`Missing ${testCase.field}`, () => {
      it(`should return '${testCase.message}' when ${testCase.field} is missing`, (done) => {
        const signupData = {
          email: "validEmail@gmail.com",
          username: "validUsername",
          password: "validPassword",
          name: "validName",
          phone_number: "0993923123",
          role: "manager",
        };

        signupData[testCase.field] = testCase.value; // Set field to blank

        request(baseURL)
          .post("/v1/api/access/store-site/signup")
          .send(signupData)
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body.message).to.equal(testCase.message);
            done();
          });
      });
    });
  });

  // Invalid Phone Number Format Case
  describe("Invalid Phone Number Format", () => {
    it("should return an error for invalid phone number format", (done) => {
      const signupData = {
        email: "validEmail@gmail.com",
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "invalidPhone", // Invalid format
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Phone numbers need to be started with a 0 and have 10 or 11 characters"
          );
          done();
        });
    });
  });

  // All Fields Blank Case
  describe("All Fields Blank", () => {
    it("should return 'Please fill all the required fields' when all fields are blank", (done) => {
      const signupData = {
        email: "",
        username: "",
        password: "",
        name: "",
        phone_number: "",
        role: "",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
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
});
