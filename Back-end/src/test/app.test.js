const request = require("supertest");
const chai = require("chai");
const expect = chai.expect;

const baseURL = "http://localhost:8080";

describe("staff access", () => {
  describe("Sign up success", () => {
    it("should return signup successfully", (done) => {
      const signupData = {
        email: "validEmail@gmail.com",
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData) // Correctly send the request body
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Signup success");
          done();
        });
    });
  });
  describe("Sign up with wrong email format", () => {
    it("should return email format error", (done) => {
      const signupData = {
        email: "invalidEmail",
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Invalid email format");
          done();
        });
    });
  });
  describe("Sign up with short username", () => {
    it("should return username length error", (done) => {
      const signupData = {
        email: "validEmail1@gmail.com",
        username: "short",
        password: "validPassword",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Username needs to be at least 8 characters"
          );
          done();
        });
    });
  });
  describe("Sign up with short password", () => {
    it("should return password length error", (done) => {
      const signupData = {
        email: "validEmail2@gmail.com",
        username: "validUsername",
        password: "short",
        name: "validName",
        phone_number: "0993923123",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Password needs to be at least 8 characters"
          );
          done();
        });
    });
  });
  describe("Sign up with missing field", () => {
    it("should return field missing error", (done) => {
      const signupData = {
        email: "validEmail3@gmail.com",
        username: "validUsername",
        name: "validName",
        phone_number: "099392312",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Please fill all the required fields"
          );
          done();
        });
    });
  });
  describe("Sign up with invalid phone number", () => {
    it("should return phone number error", (done) => {
      const signupData = {
        email: "validEmail4@gmail.com",
        username: "validUsername",
        password: "validPassword",
        name: "validName",
        phone_number: "99392312",
        role: "manager",
      };

      request(baseURL)
        .post("/v1/api/access/store-site/signup")
        .send(signupData)
        .expect(403)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal(
            "Phone numbers need to be started with a 0 and have 10 or 11 characters"
          );
          done();
        });
    });
  });
});
