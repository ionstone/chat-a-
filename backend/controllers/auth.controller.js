import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generatetokenAndSetCookie from "../utils/token.js";
export const signup = async (req, res) => {
	try {
		const { fullName, userName, password, confirmPassword, email } = req.body;
		if (password !== confirmPassword) {
			return res.status(400).json({ message: "Password do not match" });
		}
		const user = await User.findOne({ $or: [{ userName }, { email }] });
		if (user) {
			if (user.userName === userName) {
				return res.status(400).json({ message: "Username already exists" });
			} else {
				return res.status(400).json({ message: "Email already exists" });
			}
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			fullName,
			userName,
			password: hashedPassword,
			email,
		});
		if (newUser) {
			generatetokenAndSetCookie(newUser._id, res);
			await newUser.save();
			res.status(201).json({ message: "User created successfully " });
		} else {
			res.status(400).json({ message: "User not created" });
		}
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;
		const user = await User.findOne({ userName });
		if (!user) {
			return res.status(400).json({ message: "Invalid username or password" });
		}
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(400).json({ message: "Invalid username or password" });
		}
		generatetokenAndSetCookie(user._id, res);
		res.status(200).json({ message: "Login successful" });
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};

export const logout = (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ message: "Logout successful" });
};
