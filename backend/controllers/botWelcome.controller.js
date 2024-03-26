import dotenv from "dotenv";
import { sendBotMessage } from "./bot.controller.js";


export const sendWelcomeMessages = async (req, res) => {
	const userId = req.user._id;
	const { delay } = req.query;

	const welcomeMessages = [
		"👋 Hello! Welcome to our chat application.",
    "😊 We are glad to have you here.",
    "💬 Let’s start the conversation!",
		"https://static.wikia.nocookie.net/sanrio/images/1/10/Hello-kitty.png/",
	];

	try {
		
		for (let i = 0; i < welcomeMessages.length; i++) {
			const message = welcomeMessages[i];
			await new Promise((resolve) => setTimeout(resolve, delay));
		
			if (i === welcomeMessages.length - 1) {
				await sendBotMessage(userId, message, 0);
			} else {
				await sendBotMessage(userId, message, 0, "welcome");
			}
		}

		res.status(200).json({ message: "Welcome messages sent successfully" });
	} catch (error) {
		console.log("Error in sendWelcomeMessages: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

