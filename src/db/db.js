import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🟢 Conectado a MongoDB Atlas");
    } catch (error) {
        console.error("🔴 Error conectando a MongoDB Atlas:", error);
        process.exit(1);
    }
};

export default connectDB;