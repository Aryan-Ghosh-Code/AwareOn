import mongoose from "mongoose";

const SDGCommunitySchema = new mongoose.Schema({
    SDG: {
        type: String,
        enum: ["SDG 13", "SDG 14", "SDG 15"],
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
                enum: ["NGO", "Govt", "User"],
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
                enum: ["NGO", "Govt", "User"],
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

const SDGCommunity = mongoose.model("SDGCommunity", SDGCommunitySchema);
export default SDGCommunity;