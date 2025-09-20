import mongoose from "mongoose";

const NGOSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
        default: "ngo"
    },
    regId: {
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
    SDG: {
        type: Array,
        default: [],
        required: true
    },
    aim: {
        type: String,
        required: true
    },
    objectives: {
        type: Array,
        default: []
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

const NGO = mongoose.model("NGO", NGOSchema);
export default NGO;