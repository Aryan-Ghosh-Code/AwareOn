import { Request, Response } from "express";
import Community from "../../models/community.model";
import User from "../../models/user.model";
import { getReceiverSocketId, io } from "../../socket/socket";
import OpenCommunity from "../../models/openCommunity.model";

export const sendMessageToCommunity = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.user?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await Community.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        // fetch sender details from User model
        const sender = await User.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "User",
            message,
        };

        // push to chats
        community.chats.push(newMessage);
        await community.save();

        // notify all members except sender
        for (const member of community.members) {
            if (member.memberId.toString() === senderId.toString()) continue;

            const receiverSocketId = getReceiverSocketId(member.memberId.toString());
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", {
                    sender,
                    message,
                });
            }
        }

        res.status(200).json({
            sender,
            message,
        });
    } catch (error) {
        console.error("Error in User sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMyCommunities = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const user = await User.findById(userId)
            .populate({
                path: "community",
                populate: {
                    path: "tierId",
                    select: "tierName",
                },
                select: "-chats"
            })
            .populate({
                path: "openCommunity",
                select: "-chats"
            });

        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const tierCommunities = user.community;
        const openCommunities = user.openCommunity;

        res.status(200).json({
            tierCommunities,
            openCommunities,
        });
    } catch (error) {
        console.error("Error in User getCommunities controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getCommunityDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const community = await Community.findById(id)
            .populate({
                path: "members.memberId",
                select: "_id name profilePic email",
            })
            .populate({
                path: "chats.sender",
                select: "_id name profilePic",
            })
            .populate({
                path: "tierId",
                select: "tierName"
            });

        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        res.status(200).json(community);
    } catch (error) {
        console.error("Error fetching community details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getOpenCommunities = async (req: Request, res: Response) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const user = await User.findById(userId).select("community openCommunity");
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const openCommunities = await OpenCommunity.find({
            _id: { $nin: user.openCommunity },
        }).select("-chats");

        res.status(200).json(openCommunities);
    } catch (error) {
        console.error("Error in User getOpenCommunities controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const joinOpenCommunity = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).json({ error: "Cannot find Community ID" });
            return;
        }

        const user = await User.findById(req.user?._id);
        if (!user) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const openCommunity = await OpenCommunity.findById(id).select("-chats");
        if (!openCommunity) {
            res.status(400).json({ error: "Cannot find Community" });
            return;
        }

        const alreadyMember = openCommunity.members.some(
            (m) => m.memberId.toString() === user._id.toString() && m.memberModel === "User"
        );

        if (alreadyMember) {
            res.status(400).json({ error: "User is already a member of this community" });
            return;
        }

        const newMember = {
            memberId: user._id,
            memberModel: "User",
        };
        openCommunity.members.push(newMember);

        if (!user.community.includes(openCommunity._id)) {
            user.openCommunity.push(openCommunity._id);
        }

        await Promise.all([openCommunity.save(), user.save()]);
        res.status(200).json(openCommunity);
    } catch (error) {
        console.error("Error in User joinOpenCommunity controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getOpenCommunityDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const community = await OpenCommunity.findById(id)
            .populate({
                path: "members.memberId",
                select: "_id name profilePic email",
            })
            .populate({
                path: "chats.sender",
                select: "_id name profilePic",
            })

        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        res.status(200).json(community);
    } catch (error) {
        console.error("Error fetching User Open Community details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const sendMessageToOpenCommunity = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.user?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await OpenCommunity.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        // fetch sender details from User model
        const sender = await User.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "User",
            message,
        };

        // push to chats
        community.chats.push(newMessage);
        await community.save();

        // notify all members except sender
        for (const member of community.members) {
            if (member.memberId.toString() === senderId.toString()) continue;

            const receiverSocketId = getReceiverSocketId(member.memberId.toString());
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", {
                    sender,
                    message,
                });
            }
        }

        res.status(200).json({
            sender,
            message,
        });
    } catch (error) {
        console.error("Error in User sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};