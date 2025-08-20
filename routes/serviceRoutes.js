import express from "express";
import {
  createService,
  getServices,
} from "../controllers/serviceController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/services
// @desc    Create a service (only pros & admins)
router.post("/", protect, authorize("pro", "admin"), createService);

// @route   GET /api/services
// @desc    Get all services (public)
router.get("/", getServices);

export default router;
