import { Request, Response } from "express";
import { UserLoginBody, UserSignupBody } from "../../types";
import User from "../../models/user.model";
import bcrypt from "bcryptjs";
import client from "../../redis/client";
import generateTokenAndSetCookie from "../../utils/generateTokenAndSetCookie";
import Tier from "../../models/tier.model";
import Community from "../../models/community.model";

export const signup = async (req: Request, res: Response) => {
	try {
		const {
			name,
			email,
			password,
			mobileNo,
			gender,
			city,
			state,
			pincode
		}: UserSignupBody = req.body;

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
		if (gender !== "M" && gender !== "F" && gender !== "O") {
			res.status(400).json({ error: "Enter a gender" });
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


		const sameUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
		if (sameUser) {
			res.status(400).json({
				error: sameUser.mobileNo === mobileNo ? "A user with this mobile no. already exists. Use another mobile no., or try logging into your account." : "A user with this Email. already exists. Use another Email., or try logging into your account."
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

		const newUser = new User({
			name,
			email,
			password: passwordHash,
			mobileNo,
			gender,
			location: {
				city,
				state,
				pincode
			},
			tier: tier._id
		});

		if (newUser) {
			const newMember = {
				memberId: newUser._id,
				memberModel: "User"
			};
			tier.members.push(newMember);
			community.members.push(newMember);
			newUser.community.push(community._id);

			await Promise.all([newUser.save(), tier.save(), community.save()]);

			const token = generateTokenAndSetCookie(newUser._id, res);
			const payload = {
				token,
				_id: newUser._id,
				role: newUser.role,
				name: newUser.name,
				email: newUser.email,
				mobileNo: newUser.mobileNo,
				gender: newUser.gender,
				location: newUser.location
			}

			await client.set(`UN-user:${newUser._id}`, JSON.stringify(payload));
			await client.expire(`UN-user:${newUser._id}`, 30 * 24 * 60 * 60);

			res.status(201)
				.header("Authorization", `Bearer ${token}`)
				.json({
					_id: newUser._id,
					role: newUser.role,
					name: newUser.name,
					email: newUser.email,
					mobileNo: newUser.mobileNo,
					gender: newUser.gender,
					profilePic: newUser.profilePic,
					location: newUser.location,
					token
				});
		}
	} catch (error) {
		console.log("Error in User Signup controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password }: UserLoginBody = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			res.status(400).json({ error: "Cannot find User" });
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
			name: user.name,
			email: user.email,
			mobileNo: user.mobileNo,
			gender: user.gender,
			location: user.location
		}

		await client.set(`UN-user:${user._id}`, JSON.stringify(payload));
		await client.expire(`UN-user:${user._id}`, 30 * 24 * 60 * 60);

		res.status(200)
			.header("Authorization", `Bearer ${token}`)
			.json({
				_id: user._id,
				role: user.role,
				name: user.name,
				email: user.email,
				mobileNo: user.mobileNo,
				gender: user.gender,
				profilePic: user.profilePic,
				location: user.location,
				token
			});
	} catch (error) {
		console.log("Error in User Login controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const logout = async (req: Request, res: Response) => {
	try {
		const userId = req.params.id;

		res.cookie("UN-jwt", "", { maxAge: 0 });
		await client.del(`UN-user:${userId}`);

		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in User Logout controller", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}