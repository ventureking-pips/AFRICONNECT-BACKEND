// routes/authRoutes.js
import express from "express";
import { login, refresh, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout); // 👈 new

export default router;
