import express from "express";
import http from "http";
import dotenv from 'dotenv';
import { Server } from "socket.io";
import cors from "cors";
import handleSocketConnections from "./controllers/socketController.js";
dotenv.config(); 
const app = express();
const port=process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


// Socket.io server
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "https://clouwood-assignment.netlify.app",
      methods: ["GET", "POST"],
    },
  });
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

// Handle socket connections
handleSocketConnections(io);

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
