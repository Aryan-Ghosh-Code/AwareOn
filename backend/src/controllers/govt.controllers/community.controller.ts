import { Request, Response } from "express";
import Community from "../../models/community.model";
import { getReceiverSocketId, io } from "../../socket/socket";
import Govt from "../../models/govt.model";
import OpenCommunity from "../../models/openCommunity.model";

export const sendMessageToCommunity = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.govt?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await Community.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        const sender = await Govt.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "Govt",
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
        console.error("Error in Govt sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMyCommunities = async (req: Request, res: Response) => {
    try {
        const govtId = req.govt?._id;
        if (!govtId) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const govt = await Govt.findById(govtId)
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

        if (!govt) {
            res.status(400).json({ error: "Govt. Body not found" });
            return;
        }

        const tierCommunities = govt.community;
        const openCommunities = govt.openCommunity;

        res.status(200).json({
            tierCommunities,
            openCommunities,
        });
    } catch (error) {
        console.error("Error in Govt getCommunities controller", error);
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
            res.status(404).json({ error: "Community not found" });
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
        const govtId = req.govt?._id;
        if (!govtId) {
            res.status(400).json({ error: "Cannot find Govt" });
            return;
        }

        const govt = await Govt.findById(govtId).select("community openCommunity");
        if (!govt) {
            res.status(400).json({ error: "Govt not found" });
            return;
        }

        const openCommunities = await OpenCommunity.find({
            _id: { $nin: govt.openCommunity },
        }).select("-chats");

        res.status(200).json(openCommunities);
    } catch (error) {
        console.error("Error in Govt getOpenCommunities controller", error);
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

        const govt = await Govt.findById(req.govt?._id);
        if (!govt) {
            res.status(400).json({ error: "Cannot find Govt" });
            return;
        }

        const openCommunity = await OpenCommunity.findById(id).select("-chats");
        if (!openCommunity) {
            res.status(400).json({ error: "Cannot find Community" });
            return;
        }

        const alreadyMember = openCommunity.members.some(
            (m) => m.memberId.toString() === govt._id.toString() && m.memberModel === "Govt"
        );

        if (alreadyMember) {
            res.status(400).json({ error: "NGO is already a member of this community" });
            return;
        }

        const newMember = {
            memberId: govt._id,
            memberModel: "Govt",
        };
        openCommunity.members.push(newMember);

        if (!govt.community.includes(openCommunity._id)) {
            govt.openCommunity.push(openCommunity._id);
        }

        await Promise.all([openCommunity.save(), govt.save()]);
        res.status(200).json(openCommunity);
    } catch (error) {
        console.error("Error in Govt joinOpenCommunity controller", error);
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
        console.error("Error fetching Govt Open Community details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const sendMessageToOpenCommunity = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.govt?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await OpenCommunity.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        const sender = await Govt.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "Govt",
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
        console.error("Error in Govt sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};