"use strict";

const express = require("express");
const cors = require("cors");
const router = express.Router();

router.use(cors());

// router.use("/v1/api", require("./access"));

module.exports = router;
