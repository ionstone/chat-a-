import { useState } from "react";
import toast from "react-hot-toast";
import useMessages from "../zustand/useMessages";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
	const { authUser } = useAuthContext();

	const [loading, setLoading] = useState(false);

	const { messages, setMessages, setTyping } = useMessages();

	const sendMessage = async (message) => {
		setLoading(true);
		setTyping(true);

		try {
			const data = {
				createdAt: new Date().toISOString(),
				message: message,
				userId: authUser._id,
			};
			setMessages([...messages, data]);
			const res = await fetch(`/api/messages/send/?delay=5000`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
			});
			const result = await res.json();

			if (result.error) throw new Error(result.error);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { sendMessage, loading };
};
export default useSendMessage;
