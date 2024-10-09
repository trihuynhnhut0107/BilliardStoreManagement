const BilliardTable = require("../models/BilliardTable");

// src/utils/socket.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);
    socket.on("message", (msg) => {
      // Store the message in database
      socket.broadcast.emit("message", msg); // Broadcast the message to all clients
    });

    socket.on("change-availability", async (itemID) => {
      await BilliardTable.update({ status: "Busy" }, { where: { id: itemID } });
      const tableList = await BilliardTable.findAll();
      socket.emit("availability-changed", itemID);
    });
    // require("../routes/message")(socket);
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
