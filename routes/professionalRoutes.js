import express from "express";
import {
  createProfessional,
  getProfessionals,
} from "../controllers/professionalController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/professionals
// @desc    Create professional profile (only logged-in pros)
router.post("/", protect, authorize("pro", "admin"), createProfessional);

// @route   GET /api/professionals
// @desc    Get all professionals (public)
router.get("/", getProfessionals);

export default router;
