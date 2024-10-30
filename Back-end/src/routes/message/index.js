"use strict";

const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const messagingController = require("../../controllers/messaging.controller");

const router = express.Router();

router.post("/send-message", asyncHandler(messagingController.sendMessage));

router.get(
  "/get-conversation/:id",
  asyncHandler(messagingController.getConversation)
);

module.exports = router;
