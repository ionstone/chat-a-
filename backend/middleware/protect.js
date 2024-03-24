import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;

		if (!token) {
			return res
				.status(401)
				.json({ message: "Not authorized to access this route" });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		if (!decoded) {
			return res
				.status(401)
				.json({ message: "Not authorized to access this route" });
		}
		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ message: "No user found with this id" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1);
	}
};
export default protect;
