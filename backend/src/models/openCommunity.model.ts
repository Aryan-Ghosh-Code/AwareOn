import mongoose from "mongoose";

const OpenCommunitySchema = new mongoose.Schema({
    civicIssue: {
        type: String,
        enum: [
            "Waste Management & Sanitation",
            "Roads & Traffic Management",
            "Water Supply & Drainage",
            "Public Health & Safety",
            "Parks & Urban Green Spaces",
            "Electricity & Street Lighting",
            "Noise & Air Pollution"
        ],
        required: true,
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "members.memberModel",
                required: true,
            },
            memberModel: {
                type: String,
                required: true,
                enum: ["Govt", "User"],
            },
        },
    ],
    chats: [
        {
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "chats.senderModel",
                required: true,
            },
            senderModel: {
                type: String,
                required: true,
                enum: ["Govt", "User"],
            },
            message: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
}, { timestamps: true });

const OpenCommunity = mongoose.model("OpenCommunity", OpenCommunitySchema);
export default OpenCommunity;