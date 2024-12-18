const request = require("supertest");
const chai = require("chai");

const expect = chai.expect;

const baseURL = "http://localhost:8080";

describe("Login Test", () => {
  describe("Login Success", () => {
    it("should return login successfully", (done) => {
      const loginData = {
        username: "uniqueUsername",
        password: "validPassword",
      };
      request(baseURL)
        .post("/v1/api/access/store-site/login")
        .send(loginData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.message).to.equal("Login successfully");
          done();
        });
    });
  });

  describe("Missing Username Field", () => {
    it("should return 'Please fill all the required fields' when username is missing", (done) => {
      const loginData = {
        username: "", // Blank username
        password: "validPassword",
      };
      request(baseURL)
        .post("/v1/api/access/store-site/login")
        .send(loginData)
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

  describe("Missing Password Field", () => {
    it("should return 'Please fill all the required fields' when password is missing", (done) => {
      const loginData = {
        username: "uniqueUsername",
        password: "", // Blank password
      };
      request(baseURL)
        .post("/v1/api/access/store-site/login")
        .send(loginData)
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

  describe("Missing Both Username and Password", () => {
    it("should return 'Please fill all the required fields' when both username and password are missing", (done) => {
      const loginData = {
        username: "", // Blank username
        password: "", // Blank password
      };
      request(baseURL)
        .post("/v1/api/access/store-site/login")
        .send(loginData)
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
