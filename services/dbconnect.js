import mongoose from "mongoose";

let cachedDb = null;

export async function dbConnect() {
  if (cachedDb) {
    console.log("Using existing database connection");
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      directConnection: true,
    });

    console.log("Connected to MongoDB");
    cachedDb = conn;
    return cachedDb;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw new Error("Could not connect to MongoDB");
  }
}
