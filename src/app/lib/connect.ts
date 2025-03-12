"use server";
import mongoose from "mongoose";

let isConnected = false;

export async function connect(): Promise<void> {
    if (isConnected && mongoose.connection.readyState === 1) {
        console.log("Already connected to the database.");
        return;
    }

    try {
        if (!process.env.MONGO_URL) {
            throw new Error("MONGO_URL is not defined in the environment variables.");
        }

        await mongoose.connect(process.env.MONGO_URL, {
            bufferCommands: false,
        });

        isConnected = true;
        console.log("Database connected successfully...");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

if (process.env.NODE_ENV !== "production") {
    mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected. Reconnecting...");
        isConnected = false;
    });
}

export default connect;
