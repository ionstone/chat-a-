import { useEffect } from "react";
import useMessages from "../zustand/useMessages";

import { useSocketContext } from "../context/SocketContext";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages, setTyping } = useMessages();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			setMessages([...messages, newMessage]);
			setTyping(false);
		});

		// Listen for "welcomeMessage"
		socket?.on("welcomeMessage", (welcomeMessage) => {
			setMessages([...messages, welcomeMessage]);
		});

		return () => {
			socket?.off("newMessage");
			socket?.off("welcomeMessage"); 
		};
	}, [socket, setMessages, messages]);
};

export default useListenMessages;
