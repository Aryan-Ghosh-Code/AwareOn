import mongoose from "mongoose";

const GovtSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "govt"
    },
    govtId: {
        type: String,
        required: true
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
    projectRepoIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project_Repository"
        }
    ],
    jurisdiction: {
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
            ref: "SDGCommunity"
        }
    ]
}, { timestamps: true });

const Govt = mongoose.model("Govt", GovtSchema);
export default Govt;