import mongoose from "mongoose";

const connecToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("🗄️  Connected to MongoDB");
    } catch (error) {
        console.log("❌ Error in connecting to MongoDB", error);
    }
}

export default connecToMongoDB;