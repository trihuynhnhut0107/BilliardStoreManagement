"use strict";

const { OK } = require("../core/success.response");
const reportService = require("../services/report.service");

class ReportController {
  getSalesReport = async (req, res, next) => {
    new OK({
      message: "Get report list OK!",
      metadata: await reportService.getSalesReport(
        req.query.start_time,
        req.query.end_time
      ),
    }).send(res);
  };
}
module.exports = new ReportController();
