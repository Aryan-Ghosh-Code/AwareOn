import { Request, Response } from "express";
import { NGOLoginBody, NGOSignupBody } from "../../types";
import bcrypt from "bcryptjs";
import client from "../../redis/client";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";
import NGO from "../../models/ngo.model";
import Tier from "../../models/tier.model";
import Community from "../../models/community.model";

export const signup = async (req: Request, res: Response) => {
	try {
		const {
			regId,
			name,
			email,
			password,
			mobileNo,
			city,
			state,
			pincode,
			SDG,
			aim,
			objectives
		}: NGOSignupBody = req.body;

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
		if (!regId) {
			res.status(400).json({ error: "Govt. Registration Id is required" });
			return;
		}
		if (!aim) {
			res.status(400).json({ error: "Organisation aim is required" });
			return;
		}
		if (SDG.length < 1) {
			res.status(400).json({ error: "Atleast 1 SDG is required" });
			return;
		}


		const sameNGO = await NGO.findOne({ $or: [{ email }, { mobileNo }] });
		if (sameNGO) {
			res.status(400).json({
				error: sameNGO.mobileNo === mobileNo ? "An NGO with this mobile no. already exists. Use another mobile no., or try logging into your account." : "An NGO with this Email. already exists. Use another Email., or try logging into your account."
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

		const newUser = new NGO({
			regId,
			name,
			email,
			password: passwordHash,
			mobileNo,
			location: {
				city,
				state,
				pincode
			},
			SDG,
			aim,
			objectives,
			tier: tier._id
		});

		if (newUser) {
			const newMember = {
				memberId: newUser._id,
				memberModel: "NGO"
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
				regId: newUser.regId,
				name: newUser.name,
				email: newUser.email,
				mobileNo: newUser.mobileNo,
				location: newUser.location,
				SDG: newUser.SDG
			}

			await client.set(`UN-ngo:${newUser._id}`, JSON.stringify(payload));
			await client.expire(`UN-ngo:${newUser._id}`, 30 * 24 * 60 * 60);

			res.status(201)
				.header("Authorization", `Bearer ${token}`)
				.json({
					_id: newUser._id,
					role: newUser.role,
					regId: newUser.regId,
					name: newUser.name,
					email: newUser.email,
					mobileNo: newUser.mobileNo,
					profilePic: newUser.profilePic,
					location: newUser.location,
					SDG: newUser.SDG,
					token
				});
		}
	} catch (error) {
		console.log("Error in NGO Signup controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password }: NGOLoginBody = req.body;
		const user = await NGO.findOne({ email });
		if (!user) {
			res.status(400).json({ error: "Cannot find NGO" });
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
			regId: user.regId,
			name: user.name,
			email: user.email,
			mobileNo: user.mobileNo,
			location: user.location,
			SDG: user.SDG
		}

		await client.set(`UN-ngo:${user._id}`, JSON.stringify(payload));
		await client.expire(`UN-ngo:${user._id}`, 30 * 24 * 60 * 60);

		res.status(200)
			.header("Authorization", `Bearer ${token}`)
			.json({
				_id: user._id,
				role: user.role,
				regId: user.regId,
				name: user.name,
				email: user.email,
				mobileNo: user.mobileNo,
				profilePic: user.profilePic,
				location: user.location,
				SDG: user.SDG,
				token
			});
	} catch (error) {
		console.log("Error in NGO Login controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const logout = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		res.cookie("UN-jwt", "", { maxAge: 0 });
		await client.del(`UN-ngo:${userId}`);

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in NGO Logout controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}