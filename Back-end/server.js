// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("./src/models/index");

const app = require("./src/app"); // Import app setup

const server = http.createServer(app);

// Initialize Socket.io with the server
const io = new Server(server, {
  cors: {
    origin: "*", // Replace '*' with your client URL in production for security
    methods: ["GET", "POST"],
  },
});

require("./src/utils/socket")(io); // Pass Socket.io to a separate file for better structure

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
