import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
	const { authUser } = useAuthContext();
	const fromMe = message.userId === authUser._id;
	const formattedTime = extractTime(message.createdAt);
	const chatClassName = fromMe ? "chat-end" : "chat-start";
	const bubbleBgColor = fromMe ? "linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%)" : "#fff";
	const bubbleTextColor = "#000";
	const bubbleBorder = fromMe ? "1px solid #333" : "none"; 

	const isUrl = (str) => {
		try {
			new URL(str);
			return true;
		} catch (_) {
			return false;
		}
	};

	return (
		<div className={`chat ${chatClassName}`}>
			<div
				style={{ background: bubbleBgColor, color: bubbleTextColor, border: bubbleBorder }} 
				className={`chat-bubble pb-2 `}
			>
				{isUrl(message.message) ? (
					<img src={message.message} alt="User content" />
				) : (
					message.message
				)}
			</div>
			<div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
				{formattedTime}
			</div>
		</div>
	);
};
export default Message;
