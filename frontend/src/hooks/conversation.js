import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMessages from "../zustand/useMessages";
import { set } from "mongoose";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	
	const { messages, setMessages, setTyping } = useMessages();
	

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				const res = await fetch(`/api/messages/`);
				const data = await res.json();

				if (data.error) throw new Error(data.error);
				setMessages(data);
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
				
			}
		};

		getMessages();
	}, [setMessages]); 

	return { messages, loading };
};

const getWelcomeMessages = async () => {
	try {
		const res = await fetch(`/api/bot/send-welcome-messages/?delay=5000`, {
			method: "POST", 
			headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (data.error) throw new Error(data.error);
		return data;
	} catch (error) {
		toast.error(error.message);
	}
};

export { useGetMessages, getWelcomeMessages };
export default useGetMessages;
