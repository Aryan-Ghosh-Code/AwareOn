import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema({
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Govt"
    },
    intentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Problem"
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
    actions: {
        type: Array,
        default: [],
        required: true
    },
    workforce: {
        type: Number,
        required: true
    },
    articulateProof: {
        type: Array,
        default: [],
        required: true
    }
}, { timestamps: true });

const Report = mongoose.model("Report", ReportSchema);
export default Report;