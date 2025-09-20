import mongoose from "mongoose"

const TierSchema = new mongoose.Schema({
    tierName: {
        type: String,
        required: true,
        enum: ["Climate Vanguard", "Ocean Guardians", "Earth Stewards"]
    },
    members: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "memberModel"
            },
            memberModel: {
                type: String,
                required: true,
                enum: ["User", "NGO", "Govt"]
            }
        }
    ]
}, { timestamps: true });

const Tier = mongoose.model("Tier", TierSchema);
export default Tier;