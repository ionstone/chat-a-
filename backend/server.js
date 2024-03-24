import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectDb from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import messagesRoutes from "./routes/message.routes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messagesRoutes);
app.listen(PORT, () => {
	connectDb();
	console.log("Server Running on port", PORT);
});
