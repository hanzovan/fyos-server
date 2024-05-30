import mongoose from "mongoose";

const connectDb = async() => {
    console.log("about to establish connection with MongoDB")
    try {
        await mongoose.connect(process.env.MONGODB_URI ?? "MONGODB_URI not found");
        console.log("Mongodb database connection established");
    } catch (error) {
        console.log("Mongodb database connection error", error instanceof Error ? error.message : "Unknown error while trying to connect to MongoDB");
    }
}

export { connectDb };