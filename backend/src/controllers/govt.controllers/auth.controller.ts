import { Request, Response } from "express";
import { GovtLoginBody, GovtSignupBody } from "../../types";
import bcrypt from "bcryptjs";
import client from "../../redis/client";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";
import Govt from "../../models/govt.model";
import Tier from "../../models/tier.model";
import Community from "../../models/community.model";

export const signup = async (req: Request, res: Response) => {
	try {
		const {
			govtId,
			name,
			email,
			password,
			mobileNo,
			town,
			city,
			state,
			pincode
		}: GovtSignupBody = req.body;

		if (password.length < 6) {
			res.status(400).json({ error: "Password should be at least 6 characters long" });
			return;
		}
		if (name.length < 2) {
			res.status(400).json({ error: "Name should be at least 2 characters long" });
			return;
		}
		if (mobileNo.length !== 10) {
			res.status(400).json({ error: "Enter a valid Mobile Number" });
			return;
		}
		if (!town) {
			res.status(400).json({ error: "Town is required" });
			return;
		}
		if (!city) {
			res.status(400).json({ error: "City is required" });
			return;
		}
		if (!state) {
			res.status(400).json({ error: "State is required" });
			return;
		}
		if (!pincode) {
			res.status(400).json({ error: "Pincode is required" });
			return;
		}
		if (!govtId) {
			res.status(400).json({ error: "Govt. Id is required" });
			return;
		}

		const sameGovt = await Govt.findOne({ $or: [{ email }, { mobileNo }] });
		if (sameGovt) {
			res.status(400).json({
				error: sameGovt.mobileNo === mobileNo ? "A Govt. Body with this mobile no. already exists. Use another mobile no., or try logging into your account." : "A Govt. Body with this Email. already exists. Use another Email., or try logging into your account."
			});
			return;
		}

		const salt = await bcrypt.genSalt(12);
		const passwordHash = await bcrypt.hash(password, salt);

		const tier = await Tier.findOne({ tierName: "Climate Vanguard" });
		if (!tier) {
			res.status(400).json({ error: "Error in assigning tier to the user" });
			return;
		}

		const community = await Community.findOne({ tierId: tier._id });
		if (!community) {
			res.status(400).json({ error: "Error in assigning community to the user" });
			return;
		}

		const newUser = new Govt({
			govtId,
			name,
			email,
			password: passwordHash,
			mobileNo,
			jurisdiction: {
				town,
				city,
				state,
				pincode
			},
			tier: tier._id
		});

		if (newUser) {
			const newMember = {
				memberId: newUser._id,
				memberModel: "Govt"
			}
			tier.members.push(newMember);
			community.members.push(newMember);
			newUser.community.push(community._id);

			await Promise.all([newUser.save(), tier.save(), community.save()]);

			const token = generateTokenAndSetCookie(newUser._id, res);
			const payload = {
				token,
				_id: newUser._id,
				role: newUser.role,
				govtId: newUser.govtId,
				name: newUser.name,
				email: newUser.email,
				mobileNo: newUser.mobileNo,
				jurisdiction: newUser.jurisdiction
			}

			await client.set(`UN-govt:${newUser._id}`, JSON.stringify(payload));
			await client.expire(`UN-govt:${newUser._id}`, 30 * 24 * 60 * 60);

			res.status(201)
				.header("Authorization", `Bearer ${token}`)
				.json({
					_id: newUser._id,
					role: newUser.role,
					govtId: newUser.govtId,
					name: newUser.name,
					email: newUser.email,
					mobileNo: newUser.mobileNo,
					profilePic: newUser.profilePic,
					jurisdiction: newUser.jurisdiction,
					token
				});
		}
	} catch (error) {
		console.log("Error in SGovt. Signup controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password }: GovtLoginBody = req.body;
		const user = await Govt.findOne({ email });
		if (!user) {
			res.status(400).json({ error: "Cannot find Govt. Body" });
			return;
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password || "");
		if (!isPasswordCorrect) {
			res.status(400).json({ error: "Invalid Login Credentials" });
			return;
		}

		res.cookie("UN-jwt", "", { maxAge: 0 });
		const token = generateTokenAndSetCookie(user._id, res);
		const payload = {
			token,
			_id: user._id,
			role: user.role,
			govtId: user.govtId,
			name: user.name,
			email: user.email,
			mobileNo: user.mobileNo,
			jurisdiction: user.jurisdiction
		}

		await client.set(`UN-govt:${user._id}`, JSON.stringify(payload));
		await client.expire(`UN-govt:${user._id}`, 30 * 24 * 60 * 60);

		res.status(200)
			.header("Authorization", `Bearer ${token}`)
			.json({
				_id: user._id,
				role: user.role,
				govtId: user.govtId,
				name: user.name,
				email: user.email,
				mobileNo: user.mobileNo,
				profilePic: user.profilePic,
				jurisdiction: user.jurisdiction,
				token
			});
	} catch (error) {
		console.log("Error in Govt. Login controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const logout = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		res.cookie("UN-jwt", "", { maxAge: 0 });
		await client.del(`UN-govt:${userId}`);

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in Govt. Logout controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}