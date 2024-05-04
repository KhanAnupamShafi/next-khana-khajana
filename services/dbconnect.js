// import mongoose from "mongoose";

// let cachedDb = null;

// export async function dbConnect() {
//   if (cachedDb) {
//     console.log("Using existing database connection");
//     return cachedDb;
//   }

//   try {
//     const conn = await mongoose.connect(
//       "mongodb+srv://vercel-admin-user-66368bfaab78d05a20034636:5aPBzHYAWqgRGJBM@aws-ap-south-1.hcihgob.mongodb.net/khanaKhazana"
//     );

//     console.log("Connected to MongoDB");
//     cachedDb = conn;
//     return cachedDb;
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
//     throw new Error("Could not connect to MongoDB");
//   }
// }
import mongoose from "mongoose";

const DATABASE_URL =
  "mongodb+srv://vercel-admin-user-66368bfaab78d05a20034636:5aPBzHYAWqgRGJBM@aws-ap-south-1.hcihgob.mongodb.net/khanaKhazana?retryWrites=true&w=majority";

if (!DATABASE_URL) {
  throw new Error(
    "Please define the DATABASE_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(DATABASE_URL);
    console.log("Connected");
    return conn;
  } catch (err) {
    console.log(err);
  }
}
