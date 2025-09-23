import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "user"
    },
    name: {
        type: String,
        min: 2,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
        required: true
    },
    profilePic: {
        type: String
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"],
        required: true
    },
    problemRepoIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem"
        }
    ],
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    },
    tier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tier",
        required: true
    },
    points: {
        type: Number,
        required: true,
        default: 0
    },
    community: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Community"
        }
    ],
    openCommunity: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OpenCommunity"
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;