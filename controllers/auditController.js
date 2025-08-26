// controllers/auditController.js
import { logAudit } from "../utils/auditLogger.js";
import AuditLog from "../models/AuditLog.js";

export const logAdminDecision = async (req, res) => {
  try {
    const { decision } = req.body; // "STAY_SIGNED_IN" or "DECLINED_STAY"
    await logAudit(req.user, decision, req);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to log decision" });
  }
};
// controllers/auditController.js
export const getAuditLogs = async (req, res) => {
  try {
    if (req.user.role !== "super-admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { action, role, startDate, endDate, search } = req.query;

    let query = {};

    if (action) query.action = action;
    if (role) query.role = role;

    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (search) {
      query.$or = [
        { ip: { $regex: search, $options: "i" } },
        { userAgent: { $regex: search, $options: "i" } },
      ];
    }

    const logs = await AuditLog.find(query)
      .populate("userId", "email role")
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
};
