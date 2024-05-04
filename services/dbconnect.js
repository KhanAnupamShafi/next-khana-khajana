import mongoose from "mongoose";

let cachedDb = null;

export async function dbConnect() {
  if (cachedDb) {
    console.log("Using existing database connection");
    return cachedDb;
  }

  try {
    const conn = await mongoose.connect(
      "mongodb+srv://vercel-admin-user-66368bfaab78d05a20034636:5aPBzHYAWqgRGJBM@aws-ap-south-1.hcihgob.mongodb.net/khanaKhazana"
    );

    console.log("Connected to MongoDB");
    cachedDb = conn;
    return cachedDb;
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw new Error("Could not connect to MongoDB");
  }
}
