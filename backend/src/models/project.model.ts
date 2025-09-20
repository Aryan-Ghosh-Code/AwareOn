import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "ownerModel",
    },
    ownerModel: {
        type: String,
        required: true,
        enum: ["NGO", "Govt"],
    },
    name: {
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    timeline: {
        startDate: {
            type: String,
            required: true
        },
        endDate: {
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
    description: {
        type: String,
        required: true
    },
    objectives: {
        type: Array,
        default: [],
        required: true
    },
    tariff: {
        type: Array,
        default: [],
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    fundRaised: {
        type: Number,
        default: 0,
        required: true
    },
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Report",
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
}, { timestamps: true });

const Project = mongoose.model("Project", ProjectSchema);
export default Project;