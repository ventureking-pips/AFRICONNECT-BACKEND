import express from "express";
import {
  createBooking,
  getMyBookings,
} from "../controllers/bookingController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/bookings
// @desc    Create a booking (clients only)
router.post("/", protect, authorize("client", "admin"), createBooking);

// @route   GET /api/bookings/my
// @desc    Get my bookings (client logged in)
router.get("/my", protect, authorize("client", "admin"), getMyBookings);

export default router;
