"use strict";

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

router.use("/v1/api/access", require("./access"));
router.use("/v1/api/table-manage", require("./tableManage"));

// router.get("/", (req, res) => {
//   res.json({
//     message: "Welcome to the API",
//   });
// });

module.exports = router;
