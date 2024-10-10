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
      const [numberOfAffectedRows] = await BilliardTable.update(
        { status: "Busy" },
        { where: { id: itemID } }
      );
      if (numberOfAffectedRows === 0) {
        socket.emit("availability-changed", -1);
      } else {
        socket.emit("availability-changed", itemID);
      }
    });
    // require("../routes/message")(socket);
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
