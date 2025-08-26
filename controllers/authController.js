// controllers/authController.js
import jwt from "jsonwebtoken";
import { logAudit } from "../utils/auditLogger.js";
import AuditLog from "../models/AuditLog.js";


export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh"
  });

 res.json({
  "accessToken": "new.jwt.token.here",
  "role": "client"
 });
};

export const refresh = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
};

// controllers/authController.js
export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
  });
  res.json({ message: "Logged out successfully" });
};

// controllers/auditController.js
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
    // Only allow super-admin
    if (req.user.role !== "super-admin") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const logs = await AuditLog.find()
      .populate("userId", "email role") // show who did it
      .sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch audit logs" });
  }
};
