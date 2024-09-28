module.exports = (socket) => {
  socket.on("message", (msg) => {
    console.log("Received message:", msg); // Log received message
    socket.broadcast.emit("message", msg); // Broadcast the message to all clients except the sender
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
