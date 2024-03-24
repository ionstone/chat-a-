import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import dotenv from "dotenv";

// Assuming you have stored your bot's ID in an environment variable named BOT_ID
dotenv.config();

const botId = process.env.BOT_ID;
// console.log(botId, "botId");
export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const userId = req.user._id;

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
			botId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

		// SOCKET IO FUNCTIONALITY WILL GO HERE
		// You can emit an event here to notify the bot about the new message

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
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
