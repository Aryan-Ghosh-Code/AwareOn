import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema(
    {
        tierId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tier",
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
    },
    { timestamps: true }
);

const Community = mongoose.model("Community", CommunitySchema);
export default Community;