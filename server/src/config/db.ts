import mongoose from "mongoose";

import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected...");
  } catch (error) {
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
