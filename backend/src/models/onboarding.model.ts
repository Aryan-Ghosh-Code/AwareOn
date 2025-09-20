import mongoose from "mongoose";

const OnboardingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "ownerModel",
    },
    customerModel: {
        type: String,
        required: true,
        enum: ["NGO", "Govt"],
    },
    contactId: {
        type: String,
        required: true
    },
    fundAccountId: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Onboarding = mongoose.model("Onboarding", OnboardingSchema);
export default Onboarding;