import { Request, Response } from "express";
import { AdminToken, Receiver, VirtualAccount } from "../types";
import jwt from "jsonwebtoken";
import twilioClient from "../services/twilio";
import axios from "axios";
import Tier from "../models/tier.model";
import User from "../models/user.model";
import NGO from "../models/ngo.model";
import Govt from "../models/govt.model";
import Community from "../models/community.model";
import SDGCommunity from "../models/openCommunity.model";
import OpenCommunity from "../models/openCommunity.model";
//import AWS from "aws-sdk";

export type TierName = "Earth Stewards" | "Ocean Guardians" | "Climate Vanguard";


export const getToken = async (req: Request, res: Response) => {
	try {
		const { password }: AdminToken = req.body;
		const adminPassword = process.env.ADMIN_PASSWORD!;

		if (!password || password !== adminPassword) {
			res.status(401).json({ error: "Invalid Admin Credentials" });
			return;
		}

		const payload = {
			adminPassword,
		};

		const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "5h" });
		res.status(200).json(token);
	} catch (error) {
		console.log("Error in getting Admin Token", error);
		res.status(500).json({ error: "Internal Server error" });
	}
}

export const sendSMS = async (req: Request, res: Response) => {
	try {
		const { phone, message } = req.body;

		const sms = await twilioClient.messages.create({
			body: message || "🚨 SOS Alert! Please help!",
			from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
			to: `+91${phone}`, // assuming Indian numbers
			messagingServiceSid: 'MGaf5170e85aba429fd3e1bf6a42f16a73'
		});

		res.json({ success: true, sid: sms.sid, status: sms.status });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: "Failed to send SMS" });
	}
}

/*export const sendSMS2 = async (req: Request, res: Response) => {
	AWS.config.update({ region: "ap-south-1" });
	const sns = new AWS.SNS();

	try {
		const { phone, message } = req.body;

		await sns.publish({
			Message: message || "🚨 SOS Alert! Please help!",
			PhoneNumber: phone,
		}).promise();

		res.json({ success: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false });
	}
}*/

export const checkVirtualAccounts = async (req: Request, res: Response) => {
	try {
		const response = await axios.get(
			"https://api.razorpay.com/v1/virtual_accounts",
			{
				auth: {
					username: process.env.RAZORPAY_KEY_ID!,
					password: process.env.RAZORPAY_KEY_SECRET!,
				},
			}
		);

		// Transform the data into a clean JSON structure
		const virtualAccounts = response.data.items.map((account: any, index: number) => {
			const accountData = {
				index: index + 1,
				id: account.id,
				status: account.status,
				description: account.description || 'N/A',
				amount_expected: account.amount_expected,
				amount_paid: account.amount_paid,
				customer_id: account.customer_id,
				close_by: account.close_by,
				closed_at: account.closed_at,
				created_at: account.created_at,
				receivers: [] as any[]
			};

			if (account.receivers && account.receivers.length > 0) {
				accountData.receivers = account.receivers.map((receiver: any, rIndex: number) => ({
					index: rIndex + 1,
					id: receiver.id,
					entity: receiver.entity,
					type: receiver.type,
					account_number: receiver.account_number,
					ifsc: receiver.ifsc || 'N/A',
					bank_name: receiver.bank_name || 'N/A',
					name: receiver.name || 'N/A',
					is_payout_account: receiver.type === 'bank_account',
					use_for_payouts: receiver.type === 'bank_account' ? receiver.account_number : null
				}));
			}

			return accountData;
		});

		// Find the recommended account for payouts
		const payoutAccount: VirtualAccount | undefined = (virtualAccounts as VirtualAccount[]).find((account: VirtualAccount) =>
			account.receivers.some((receiver: Receiver) => receiver.is_payout_account)
		);

		const recommendedAccountNumber = payoutAccount?.receivers.find(
			(receiver: any) => receiver.is_payout_account
		)?.account_number;

		res.status(200).json({
			success: true,
			total_accounts: response.data.count,
			recommended_payout_account: recommendedAccountNumber || null,
			accounts: virtualAccounts,
			raw_response: response.data
		});

	} catch (error) {
		if (axios.isAxiosError(error)) {
			const rzpError = error.response?.data?.error;
			const errMsg = rzpError?.description || error.message || "Unknown Razorpay error";

			return res.status(error.response?.status || 400).json({
				success: false,
				error: errMsg,
				details: rzpError || null,
			});
		}

		res.status(500).json({
			success: false,
			error: "Internal Server Error",
			details: error instanceof Error ? error.message : "Unknown error"
		});
	}
};

export const checkRazorpayAccount = async (req: Request, res: Response) => {
	const auth = {
		username: process.env.RAZORPAY_KEY_ID!,
		password: process.env.RAZORPAY_KEY_SECRET!,
	};

	try {
		// Check account details
		const accountResponse = await axios.get(
			"https://api.razorpay.com/v1/account",
			{ auth }
		);

		// Check what endpoints are accessible
		const endpointChecks = [];

		// Test various endpoints
		const endpointsToTest = [
			{ name: "Virtual Accounts", url: "https://api.razorpay.com/v1/virtual_accounts" },
			{ name: "Fund Accounts", url: "https://api.razorpay.com/v1/fund_accounts" },
			{ name: "Contacts", url: "https://api.razorpay.com/v1/contacts" },
			{ name: "Payouts", url: "https://api.razorpay.com/v1/payouts" }
		];

		for (const endpoint of endpointsToTest) {
			try {
				await axios.get(endpoint.url, { auth });
				endpointChecks.push({ name: endpoint.name, status: "accessible" });
			} catch (error) {
				if (axios.isAxiosError(error)) {
					endpointChecks.push({
						name: endpoint.name,
						status: "not_accessible",
						error: error.response?.data?.error?.description || "Unknown error"
					});
				}
			}
		}

		res.status(200).json({
			success: true,
			account_details: accountResponse.data,
			endpoint_accessibility: endpointChecks,
			recommendations: {
				razorpay_x_needed: !endpointChecks.find(e => e.name === "Virtual Accounts" && e.status === "accessible"),
				next_steps: [
					"If Virtual Accounts is not accessible, you need RazorpayX",
					"Contact Razorpay support to enable RazorpayX",
					"Once enabled, you can create virtual accounts for payouts"
				]
			}
		});

	} catch (error) {
		if (axios.isAxiosError(error)) {
			return res.status(error.response?.status || 500).json({
				success: false,
				error: error.response?.data?.error?.description || "API Error",
				details: error.response?.data
			});
		}

		return res.status(500).json({
			success: false,
			error: "Internal Server Error",
			details: error instanceof Error ? error.message : "Unknown error"
		});
	}
};

export const createTier = async (req: Request, res: Response) => {
	try {
		const tiers: TierName[] = ["Earth Stewards", "Ocean Guardians", "Climate Vanguard"];

		const existing = await Tier.find({ tierName: { $in: tiers } }).select("tierName");
		const existingNames = existing.map(t => t.tierName);

		const toCreate = tiers.filter(t => !existingNames.includes(t));

		if (toCreate.length === 0) {
			return res.status(200).json({ message: "All tiers already exist" });
		}

		const newTiers = await Tier.insertMany(
			toCreate.map(tierName => ({ tierName, members: [] }))
		);

		res.status(201).json({
			message: "Tiers created successfully",
			created: newTiers,
		});
	} catch (error) {
		console.error("Error creating tiers:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const addMembers = async (req: Request, res: Response) => {
	try {
		// 1. Find the Earth Stewards tier
		const earthStewards = await Tier.findOne({ tier: "Earth Stewards" });
		if (!earthStewards) {
			res.status(400).json({ error: "Earth Stewards tier not found" });
			return;
		}

		// 2. Fetch all users, NGOs, Govt
		const users = await User.find({}, "_id");
		const ngos = await NGO.find({}, "_id");
		const govts = await Govt.find({}, "_id");

		// 3. Prepare members in required format
		const members = [
			...users.map(u => ({ id: u._id, memberModel: "User" })),
			...ngos.map(n => ({ id: n._id, memberModel: "NGO" })),
			...govts.map(g => ({ id: g._id, memberModel: "Govt" })),
		];

		// 4. Push all members into Earth Stewards tier
		earthStewards.members.push(...members);

		await earthStewards.save();

		res.status(200).json({
			message: "Earth Stewards tier populated successfully",
			totalAdded: members.length,
		});
	} catch (error) {
		console.error("Error populating Earth Stewards tier:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const createCommunity = async (req: Request, res: Response) => {
	try {
		const tiers = await Tier.find();

		if (tiers.length === 0) {
			res.status(400).json({ message: "No tiers found" });
			return;
		}

		const createdCommunities = [];

		for (const tier of tiers) {
			// Checking if community already exists for this tier
			let community = await Community.findOne({ tierId: tier._id });

			if (!community) {
				community = new Community({
					tierId: tier._id,
					members: [],
					chats: [],
				});
				await community.save();
				createdCommunities.push(community);
			}
		}

		res.status(201).json({
			message: "Communities created successfully (if not existing)",
			created: createdCommunities,
		});
	} catch (error) {
		console.error("Error in createCommunity controller:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const populateCommunity = async (req: Request, res: Response) => {
	try {
		const { tierId } = req.params;

		// Fetch all users, NGOs, and Govt
		const users = await User.find({}, "_id");
		const ngos = await NGO.find({}, "_id");
		const govts = await Govt.find({}, "_id");

		// Build members array
		const members = [
			...users.map((u) => ({ memberId: u._id, memberModel: "User" })),
			...ngos.map((n) => ({ memberId: n._id, memberModel: "NGO" })),
			...govts.map((g) => ({ memberId: g._id, memberModel: "Govt" })),
		];

		// Either create a new Community or update existing
		let community = await Community.findOne({ tierId });

		if (!community) {
			community = new Community({
				tierId,
				members,
				chats: [],
			});
		} else {
			// Avoid duplicates
			const existingIds = new Set(
				community.members.map((m) => m.memberId.toString())
			);
			const newMembers = members.filter(
				(m) => !existingIds.has(m.memberId.toString())
			);
			community.members.push(...newMembers);
		}

		await community.save();

		await Promise.all([
			User.updateMany({ _id: { $in: users.map((u) => u._id) } }, { community: community._id }),
			NGO.updateMany({ _id: { $in: ngos.map((n) => n._id) } }, { community: community._id }),
			Govt.updateMany({ _id: { $in: govts.map((g) => g._id) } }, { community: community._id }),
		]);

		res.json({ success: true, message: "Community members populated", community });
	} catch (error) {
		console.error("Error in populateCommunity controller:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const createOpenCommunities = async (req: Request, res: Response) => {
	try {
		const civicIssue = [
			"Waste Management & Sanitation",
			"Roads & Traffic Management",
			"Water Supply & Drainage",
			"Public Health & Safety",
			"Parks & Urban Green Spaces",
			"Electricity & Street Lighting",
			"Noise & Air Pollution"
		];
		const created: string[] = [];
		const skipped: string[] = [];

		for (const issue of civicIssue) {
			const communityExists = await OpenCommunity.findOne({ civicIssue: issue });
			if (!communityExists) {
				await OpenCommunity.create({
					civicIssue: issue,
					members: [],
					chats: []
				});
				created.push(issue);
			} else {
				skipped.push(issue);
			}
		}

		res.status(201).json({
			message: "SDG communities setup complete",
			created,
			skipped
		});
	} catch (error) {
		console.error("Error in createSDGCommunities controller:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
}