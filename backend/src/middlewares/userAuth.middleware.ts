import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../redis/client";
import User from "../models/user.model";

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			res.status(401).json({ error: "Unauthorized - No Token Provided" });
			return;
		}

		const decodedUser = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { userId: string };
		if (!decodedUser) {
			res.status(401).json({ error: "Unauthorized - Invalid Token" });
			return;
		}

		const redisKey = `UN-user:${decodedUser.userId}`;
		const payload = await client.get(redisKey);
		if (!payload) {
			res.status(401).json({ error: "Unauthorized - No User Data in Cache, Login first" });
			return;
		}

		const data = JSON.parse(payload);
		if (data.token !== token) {
			res.status(401).json({ error: "Unauthorized - Token Mismatch" });
			return;
		}

		const user = await User.findById(decodedUser.userId).select("-password");
		if (!user) {
			res.status(404).json({ error: "User Not Found!" });
			return;
		}

		req.user = user;
		next();
	} catch (error) {
		console.log("Error in User verifyToken middleware", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export default verifyUser;