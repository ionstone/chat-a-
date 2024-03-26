import { useEffect, useRef, useState } from "react";
import { useGetMessages, getWelcomeMessages } from "../../hooks/conversation";
import MessageSkeleton from "../skeletons/MessageRefresh";
import Message from "./Message";
import useListenMessages from "../../hooks/listenMessages";
import useMessages from "../../zustand/useMessages";

const Messages = () => {
	const { messages, loading } = useGetMessages();
	const { typing, setTyping } = useMessages();
	useListenMessages();
	const lastMessageRef = useRef();
	const [showButton, setShowButton] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages, typing]);

	return (
		<div className="px-4 flex-1 overflow-auto">
			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
			{typing && (
				<div className="chat-bubble pb-2 bg-white">
					<div className="flex space-x-2 justify-center items-center bg-white h-4 w-20">
						<span className="sr-only">Loading...</span>
						<div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
						<div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
						<div className="h-2 w-2 bg-blue-500 rounded-full animate-bounce"></div>
					</div>
				</div>
			)}
			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && showButton && (
				<button
					onClick={() => {
						setShowButton(false);
						setTyping(true);
						getWelcomeMessages();
					}}
					className="start-conversation-button bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white font-bold py-2 px-4 rounded-full transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
				>
					👉 Click to Start the Conversation
				</button>
			)}
		</div>
	);
};

export default Messages;
