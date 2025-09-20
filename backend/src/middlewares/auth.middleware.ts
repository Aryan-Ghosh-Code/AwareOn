import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../redis/client";
import User from "../models/user.model";
import NGO from "../models/ngo.model";
import Govt from "../models/govt.model";
import { DecodedToken } from "../types";
import { Model } from "mongoose";

type StakeholderRole = "user" | "ngo" | "govt";

const modelMap: Record<StakeholderRole, Model<any>> = {
	user: User,
	ngo: NGO,
	govt: Govt,
};

const reqKeyMap = {
	user: "user",
	ngo: "ngo",
	govt: "govt",
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			res.status(401).json({ error: "Unauthorized - No Token Provided" });
			return;
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
		if (!decoded || !decoded.userId || !decoded.role) {
			res.status(401).json({ error: "Unauthorized - Invalid Token Payload" });
			return;
		}

		const { userId, role } = decoded;

		// Ensure valid stakeholder type
		if (!["user", "ngo", "govt"].includes(role)) {
			res.status(401).json({ error: "Unauthorized - Invalid Role" });
			return;
		}

		// Redis check
		const redisKey = `UN-${role}:${userId}`;
		const payload = await client.get(redisKey);
		if (!payload) {
			res.status(401).json({ error: `Unauthorized - No ${role} Data in Cache, Login first` });
			return;
		}

		const data = JSON.parse(payload);
		if (data.token !== token) {
			res.status(401).json({ error: "Unauthorized - Token Mismatch" });
			return;
		}

		// DB lookup
		const Model = modelMap[role];
		const stakeholder = await Model.findById(userId).select("-password");
		if (!stakeholder) {
			res.status(404).json({ error: `${role} Not Found!` });
			return;
		}

		// Attach stakeholder to request
		(req as any)[reqKeyMap[role]] = stakeholder;

        console.log((req as any)[reqKeyMap[role]]);

		next();
	} catch (error) {
		console.log("Error in verifyToken middleware", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default verifyToken;