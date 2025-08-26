// utils/auditLogger.js
import AuditLog from "../models/AuditLog.js";

export async function logAudit(user, action, req) {
  try {
    await AuditLog.create({
      userId: user._id,
      role: user.role,
      action,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
    });
  } catch (err) {
    console.error("Failed to save audit log:", err);
  }
}
