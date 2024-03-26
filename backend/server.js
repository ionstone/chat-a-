import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import messagesRoutes from "./routes/message.routes.js";
import botRoutes from "./routes/bot.routes.js";
import path from "path";
import { app, server } from "./socket/socket.js";
dotenv.config();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/bot", botRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
server.listen(PORT, () => {
	connectDb();
	console.log("Server Running on port", PORT);
});
