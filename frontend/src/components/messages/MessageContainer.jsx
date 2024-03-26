import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/logout";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import useMessages from "../../zustand/useMessages";
import logo from "../../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";

const MessageContainer = () => {
	const { typing } = useMessages();
	const { authUser } = useAuthContext();
	const { logout } = useLogout();

	return (
		<div
			className="md:min-w-[450px] lg:min-w-[600px] xl:min-w-[800px] 2xl:min-w-[900px] h-[calc(64dvh)] flex flex-col"
			style={{
				backgroundImage:
					"linear-gradient(239.26deg, #ddeeed 63.17%, #fdf1e0 94.92%)",
			}}
		>
			<>
				<div className="bg-blue-500 px-4 py-2 mb-2 flex justify-between items-center">
					<button
						onClick={logout}
						className="text-white bg-teal-300 hover:bg-teal-500 text-sm font-semibold py-2 px-4 rounded shadow-lg flex items-center"
					>
						<FaSignOutAlt className="mr-2" />
					</button>
					<span className="text-white font-bold">
						{authUser.username}'s Space 🚀
					</span>
					<img src={logo} alt="Logo" className="inline-block h-14 w-auto" />
				</div>
				<Messages />
				{!typing && <MessageInput />}{" "}
			</>
		</div>
	);
};

export default MessageContainer;
