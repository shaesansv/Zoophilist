import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";

// Routes
import authRoutes from "./routes/auth";
import shopRoutes from "./routes/shop";
import categoryRoutes from "./routes/categories";
import productRoutes from "./routes/products";
import orderRoutes from "./routes/orders";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/shop", shopRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.send({ message: "Forest Pet Shop API is running!" });
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🌲 Forest Pet Shop Server running on port ${PORT}`);
});
