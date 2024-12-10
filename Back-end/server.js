// server.js
const express = require("express");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
require("./src/models/index");

const app = require("./src/app"); // Import app setup
const socketAsyncHandler = require("./src/helpers/socketAsyncHandler");

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

module.exports = server; // Export server for testing

// Graceful shutdown function
function gracefulShutdown() {
  console.log("Received shutdown signal, shutting down gracefully...");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0); // Exit the process once all connections are closed
  });

  // If connections don't close within 10 seconds, force close
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1); // Forcefully exit if it takes too long
  }, 10000);
}

// Catch `Ctrl + C` (SIGINT)
process.on("SIGINT", gracefulShutdown);

// Catch SIGTERM (when a termination signal is sent to the process, like when deployed in the cloud)
process.on("SIGTERM", gracefulShutdown);
