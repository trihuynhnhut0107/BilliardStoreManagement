// src/utils/socket.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New WebSocket connection");

    socket.on("message", (msg) => {
      // Store the message in database
      io.emit("message", msg); // Broadcast the message to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
