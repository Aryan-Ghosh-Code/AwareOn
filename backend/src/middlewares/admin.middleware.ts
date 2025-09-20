import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			res.status(401).json({ message: "Unauthorized: No token provided" });
			return;
		}

		const token = authHeader.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload & { adminPassword: string };
		if (!decoded || !decoded.adminPassword) {
			res.status(401).json({ message: "Unauthorized: Invalid token" });
			return;
		}

		if (decoded.adminPassword !== ADMIN_PASSWORD) {
			res.status(403).json({ message: "Forbidden: Invalid admin password" });
			return;
		}

		next();
	} catch (error) {
		console.error("Error verifyAdmin middleware", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default verifyAdmin;