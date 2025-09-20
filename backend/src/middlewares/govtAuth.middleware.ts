import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../redis/client";
import Govt from "../models/govt.model";

const verifyGovt = async (req: Request, res: Response, next: NextFunction) => {
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

		const redisKey = `UN-govt:${decodedUser.userId}`;
		const payload = await client.get(redisKey);
		if (!payload) {
			res.status(401).json({ error: "Unauthorized - No Govt. Data in Cache, Login first" });
			return;
		}

		const data = JSON.parse(payload);
		if (data.token !== token) {
			res.status(401).json({ error: "Unauthorized - Token Mismatch" });
			return;
		}

		const user = await Govt.findById(decodedUser.userId).select("-password");
		if (!user) {
			res.status(404).json({ error: "Govt. Body Not Found!" });
			return;
		}

		req.govt = user;
		next();
	} catch (error) {
		console.log("Error in Govt. verifyToken middleware", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export default verifyGovt;