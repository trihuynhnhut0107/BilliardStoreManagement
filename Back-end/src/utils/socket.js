const BilliardTable = require("../models/BilliardTable");
// src/utils/socket.js

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`USER CONNECTED: ${socket.id}`);

    socket.on("message", (msg) => {
      socket.broadcast.emit("message", msg); // Broadcast the message to all clients
    });

    socket.on("joinConversation", ({ conversationID }) => {
      socket.join(`conversation_${conversationID}`);
    });

    socket.on("change-availability", async (itemID) => {
      const billiardTable = await BilliardTable.findOne({
        where: { id: itemID },
      });

      if (!billiardTable) {
        io.emit("availability-changed", -1); // Table not found, emit -1
      } else {
        const newStatus =
          billiardTable.status === "Available" ? "Busy" : "Available";

        const [numberOfAffectedRows] = await BilliardTable.update(
          { status: newStatus },
          { where: { id: itemID } }
        );

        if (numberOfAffectedRows === 0) {
          io.emit("availability-changed", -1); // Failed to update, emit -1
        } else {
          io.emit("availability-changed", {
            tableID: itemID,
            newStatus: newStatus,
          }); // Successfully updated, emit itemID
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

  // Make the io instance available throughout the app
  global.io = io;
};
