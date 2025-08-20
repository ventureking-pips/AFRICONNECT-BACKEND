import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
router.post(
  "/register",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be 6 or more characters").isLength({ min: 6 }),
  ],
  registerUser
);

// @route   POST /api/auth/login
router.post("/login", loginUser);

// @route   GET /api/auth/me
router.get("/me", protect, getMe);

export default router;
