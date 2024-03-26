import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();
	const navigate = useNavigate();
	const signup = async ({
		fullName,
		email,
		userName,
		password,
		confirmPassword,
	}) => {
		const success = handleInputErrors({
			fullName,
			email,
			userName,
			password,
			confirmPassword,
		});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup/", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fullName,
					email,
					userName,
					password,
					confirmPassword,
				}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			if (!res.ok) {
				throw new Error(data.message);
			}
			localStorage.setItem("chat-user", JSON.stringify(data));
			setAuthUser(data);
			navigate("/");
			toast.success("Signup successful");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;

function handleInputErrors({
	fullName,
	email,
	userName,
	password,
	confirmPassword,
}) {
	if (!fullName || !email || !userName || !password || !confirmPassword) {
		toast.error("Please fill in all fields");
		return false;
	}

	if (password !== confirmPassword) {
		toast.error("Passwords do not match");
		return false;
	}

	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}
