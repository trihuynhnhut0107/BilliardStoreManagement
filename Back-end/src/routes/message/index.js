module.exports = (socket) => {
  // Listen for messages
  socket.on("message", (data) => {
    console.log("Received message:", data);
    socket.emit("message", `Socket id: ${socket.id} - ${data}`); // Send message back to the client
  });

  socket.on("joinChannel", (channel) => {
    socket.join(channel);
    console.log(`User joined channel: ${channel}`);
  });
  socket.on("leaveChannel", (channel) => {
    socket.leave(channel);
    console.log(`User left channel: ${channel}`);
  });
  socket.on("channelMessage", ({ channel, msg }) => {
    console.log(`Message to channel ${channel}:`, msg);
    socket.to(channel).emit("channelMessage", msg); // Send message to clients in the specified channel
  });
};
