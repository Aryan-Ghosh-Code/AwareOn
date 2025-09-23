import { Request, Response } from "express";
import Community from "../../models/community.model";
import { getReceiverSocketId, io } from "../../socket/socket";
import NGO from "../../models/ngo.model";
import SDGCommunity from "../../models/openCommunity.model";

export const sendMessageToCommunity = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.ngo?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await Community.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        const sender = await NGO.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "NGO",
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
        console.error("Error in NGO sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getMyCommunities = async (req: Request, res: Response) => {
    try {
        const ngoId = req.ngo?._id;
        if (!ngoId) {
            res.status(400).json({ error: "Cannot find User" });
            return;
        }

        const ngo = await NGO.findById(ngoId)
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


        if (!ngo) {
            res.status(400).json({ error: "NGO not found" });
            return;
        }

        const tierCommunities = ngo.community;
        const openCommunities = ngo.openCommunity;

        res.status(200).json({
            tierCommunities,
            openCommunities,
        });
    } catch (error) {
        console.error("Error in NGO getCommunities controller", error);
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
        const ngoId = req.ngo?._id;
        if (!ngoId) {
            res.status(400).json({ error: "Cannot find NGO" });
            return;
        }

        const ngo = await NGO.findById(ngoId).select("community openCommunity");
        if (!ngo) {
            res.status(400).json({ error: "NGO not found" });
            return;
        }

        const openCommunities = await SDGCommunity.find({
            _id: { $nin: ngo.openCommunity },
        }).select("-chats");

        res.status(200).json(openCommunities);
    } catch (error) {
        console.error("Error in NGO getOpenCommunities controller", error);
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

        const ngo = await NGO.findById(req.ngo?._id);
        if (!ngo) {
            res.status(400).json({ error: "Cannot find NGO" });
            return;
        }

        const openCommunity = await SDGCommunity.findById(id).select("-chats");
        if (!openCommunity) {
            res.status(400).json({ error: "Cannot find Community" });
            return;
        }

        const alreadyMember = openCommunity.members.some(
            (m) => m.memberId.toString() === ngo._id.toString() && m.memberModel === "NGO"
        );

        if (alreadyMember) {
            res.status(400).json({ error: "NGO is already a member of this community" });
            return;
        }

        const newMember = {
            memberId: ngo._id,
            memberModel: "NGO",
        };
        openCommunity.members.push(newMember);

        if (!ngo.community.includes(openCommunity._id)) {
            ngo.openCommunity.push(openCommunity._id);
        }

        await Promise.all([openCommunity.save(), ngo.save()]);
        res.status(200).json(openCommunity);
    } catch (error) {
        console.error("Error in NGO joinOpenCommunity controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getOpenCommunityDetails = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const community = await SDGCommunity.findById(id)
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
        console.error("Error fetching NGO Open Community details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const sendMessageToOpenCommunity = async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const id = req.params.id;
        const senderId = req.ngo?._id;

        if (!senderId) {
            res.status(400).json({ error: "Cannot fetch Sender ID" });
            return;
        }

        const community = await SDGCommunity.findById(id);
        if (!community) {
            res.status(400).json({ error: "Community not found" });
            return;
        }

        const sender = await NGO.findById(senderId).select("_id name profilePic");
        if (!sender) {
            res.status(400).json({ error: "Sender not found" });
            return;
        }

        const newMessage = {
            sender: senderId,
            senderModel: "NGO",
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
        console.error("Error in NGO sendMessage controller", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};