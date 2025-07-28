import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("connection error: " + error);
    }
}
export default connectDatabase;