import { io } from "socket.io-client";

let socket: any;

export const initSocket = () => {
  if (!socket) {
    // Always connect to the standalone server
    const socketUrl = "http://localhost:3001";
    console.log("Connecting to standalone socket server at:", socketUrl);
    
    socket = io(socketUrl, {
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
      timeout: 20000,
      transports: ["websocket", "polling"]
    });
    
    socket.on("connect", () => {
      console.log("Socket connected successfully with ID:", socket.id);
    });
    
    socket.on("connect_error", (err: any) => {
      console.error("Socket connection error:", err);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};