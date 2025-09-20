import mongoose from "mongoose";

const ProblemSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    url: {
        type: String,
        required: true
    },
    location: {
        lat: {
            type: Number,
            required: true
        },
        lon: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    problem: {
        type: String,
        required: true
    },
    SDG: {
        type: Array,
        default: [],
        required: true
    },
    decription: {
        type: String,
    },
    alertLevel: {
        type: String,
        required: true,
        enum: ["high", "medium", "low"]
    },
    confidence: {
        type: Number,
        required: true
    },
    actionableInsights: {
        type: Array,
        required: true
    },
    NGOWorking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NGO",
            required: true
        }
    ],
    GovtWorking: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Govt",
            required: true
        }
    ],
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Report"
        }
    ],
    comments: [
        {
            name: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ],
    statusForUser: {
        type: String,
        required: true,
        enum: ["pending", "ongoing", "solved"],
        default: "pending"
    },
    statusForGovt: {
        type: String,
        required: true,
        enum: ["pending", "ongoing", "solved"],
        default: "pending"
    }
}, { timestamps: true });

const Problem = mongoose.model("Problem", ProblemSchema);
export default Problem;