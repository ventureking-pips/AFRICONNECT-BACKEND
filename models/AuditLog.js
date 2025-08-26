// models/AuditLog.js
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  role: { type: String, required: true },
  action: { type: String, required: true }, // e.g. "STAY_SIGNED_IN", "DECLINED_STAY"
  timestamp: { type: Date, default: Date.now },
  ip: { type: String },
  userAgent: { type: String },
});

export default mongoose.model("AuditLog", auditLogSchema);
