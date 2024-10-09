const socketAsyncHandler = (fn) => {
  return (socket, next) => {
    // Perform some middleware logic, e.g., authentication
    if (socket.handshake.query && socket.handshake.query.token) {
      // Validate token...
      return fn(socket, next);
    }
    return next(new Error("Authentication error"));
  };
};

module.exports = socketAsyncHandler;
