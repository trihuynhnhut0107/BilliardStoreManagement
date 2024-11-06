import { io } from "socket.io-client";
export const useSocket = () => {
  const socket = io("http://localhost:8080");
  socket.on("connect", () => {
    console.log("connected");
  });
  return { socket };
};
