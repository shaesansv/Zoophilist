import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("❌ Mongo URI not found in environment variables");
}

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // options not strictly needed in latest mongoose
    });
    console.log("✅ MongoDB Connected...");
  } catch (error: any) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;


// export const connectDB = async () => {
//   const mongoURI = process.env.MONGO_URI;

//   if (!mongoURI) {
//     console.error("❌ MONGO_URI not found in environment variables");
//     process.exit(1);
//   }

//   try {
//     await mongoose.connect(mongoURI, { dbName: "forest-pet-shop" });
//     console.log("🍃 MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     process.exit(1);
//   }
// };
