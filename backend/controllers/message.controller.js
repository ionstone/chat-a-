import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import dotenv from "dotenv";
import { sendBotMessage } from "./bot.controller.js";

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const userId = req.user._id;
		const { delay } = req.query;

		let conversation = await Conversation.findOne({
			userId: userId,
		});

		if (!conversation) {
			conversation = await Conversation.create({
				userId: userId,
			});
		}

		const newMessage = new Message({
			userId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		
		const botMessage = await sendBotMessage(userId, message, delay);
		res.status(201).json(newMessage);
	} catch (error) {
		console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getMessages = async (req, res) => {
	try {
		const userId = req.user._id;

		const conversation = await Conversation.findOne({
			userId: userId,
		}).populate("messages"); 
		if (!conversation) {
			return res.status(200).json([]);
		}
		
		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
