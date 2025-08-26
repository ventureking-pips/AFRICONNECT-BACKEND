// routes/auditRoutes.js
import express from "express";
import { logAdminDecision } from "../controllers/auditController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAuditLogs } from "../controllers/auditController.js";

const router = express.Router();

// Only admins log decisions
router.post("/admin-decision", authMiddleware, logAdminDecision);
router.get("/", authMiddleware, getAuditLogs);




export default router;
