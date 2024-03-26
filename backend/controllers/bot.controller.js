import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import dotenv from "dotenv";
import { io, getUserSocketId } from "../socket/socket.js";
dotenv.config();

const botId = process.env.BOT_ID;
export const sendBotMessage = async (userId, messageContent, delay,str) => {
	try {
		
		let conversation = await Conversation.findOne({
			userId: userId,
		});

		if (!conversation) {
			conversation = await Conversation.create({
				userId: userId,
			});
		}

		const botMessage = new Message({
			userId: process.env.BOT_ID,

			message: messageContent,
		});

		if (botMessage) {
			conversation.messages.push(botMessage._id);
		}

		await Promise.all([conversation.save(), botMessage.save()]);
		const userSocketId = getUserSocketId(userId);
       
		if (userSocketId) {
			if (str) {
				io.to(userSocketId).emit("welcomeMessage", botMessage);
			}
			else{
				setTimeout(() => {
					io.to(userSocketId).emit("newMessage", botMessage);
				}, delay);
			}
			
		}
		return botMessage;
	} catch (error) {
		console.log("Error in sendBotMessage: ", error.message);
		throw error;
	}
};
