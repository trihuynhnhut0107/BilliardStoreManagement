// src/utils/socket.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    // socket.on("message", (msg) => {
    //   // Store the message in database
    //   io.emit("message", msg); // Broadcast the message to all clients
    // });
    require("../routes/message")(socket);
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
