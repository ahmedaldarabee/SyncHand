"use server";
import mongoose from "mongoose";

export async function connect(): Promise<void> {
  const mongoUrl = process.env.MONGO_URL;
  
  if (!mongoUrl) {
    console.error("MongoDB connection URL is not defined in environment variables.");
    return;
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("DB connected...");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export default connect;
