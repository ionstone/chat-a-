import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const botId = process.env.BOT_ID;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:4000"],
		methods: ["GET", "POST"],
	},
});

export const getUserSocketId = (userId) => {
	return userSocketMap[userId];
};

const userSocketMap = {}; 

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	
	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		
	});
});

export { app, io, server };
