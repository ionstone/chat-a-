import { Navigate, Route,Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Chat from "./pages/home/Chat";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className="p-4 h-screen flex items-center justify-center">
			<Routes>
				<Route path='/' element={authUser ? <Chat /> : <Navigate to={"/login"} />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
			</Routes>
			<Toaster />
		</div>
	);
}

export default App;
