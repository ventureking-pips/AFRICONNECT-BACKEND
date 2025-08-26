import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import professionalRoutes from "./routes/professionalRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cookieParser from "cookie-parser"
import cors from "cors"
import auditRoutes from "./routes/auditRoutes.js";


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser())

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/professionals", professionalRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/audit", auditRoutes);
// CORS with credentials for refresh cookie
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Root route
app.get("/", (req, res) => {
  res.send("Afri-Connect API is running...");
});

// Error handler (optional basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
