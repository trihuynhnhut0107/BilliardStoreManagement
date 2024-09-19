const express = require("express");
const http = require("http");
const compression = require("compression");
const app = express();
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const Account = require("./models/Account");
const { create } = require("tar");
const WebSocket = require("ws");

const { Server } = require("socket.io");

app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create an HTTP server using Express
const server = http.createServer(app);

// Initialize Socket.io with the server
const io = new Server(server, {
  cors: {
    origin: "*", // Replace '*' with your client URL in production for security
    methods: ["GET", "POST"],
  },
});

require("./models/index");

// Handle Socket.io connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for messages from the client
  socket.on("message", (msg) => {
    console.log("Message received:", msg);

    // Broadcast the message to all connected clients
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

// // Init routes
// app.use("/", require("./routes"));

// // Handle error
// app.use((req, res, next) => {
//   const error = new Error("Not Found");
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   const statusCode = error.status || 500;
//   return res.status(statusCode).json({
//     status: "error",
//     code: statusCode,
//     message: error.message || "Internal server error",
//   });
// });
module.exports = server;
