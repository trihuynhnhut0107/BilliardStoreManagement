const assert = require("assert");
const request = require("supertest");
const server = require("../../server"); // Import app and server from server.js
const chai = require("chai");
const expect = chai.expect; // Import and define 'expect' from Chai

describe("GET /v1/api/table-manage/get-all-tables", () => {
  after(() => {
    // Close the server after all tests
    server.close();
  });

  it("should return a list of all tables", (done) => {
    request(server) // Send the request to the Express app
      .get("/v1/api/table-manage/get-all-tables")
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        // Use chai's 'expect' to perform assertions
        expect(res.body.metadata).to.be.an("array");
        expect(res.body.metadata.length).to.be.above(0);
        done();
      });
  });
});
