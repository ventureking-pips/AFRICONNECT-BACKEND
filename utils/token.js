import jwt from "jsonwebtoken";
import crypto from "crypto";

export const signAccessToken = (userId, role) =>
  jwt.sign({ sub: userId, role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || "15m" });

export const signRefreshToken = (userId, deviceId) =>
  jwt.sign({ sub: userId, did: deviceId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${process.env.REFRESH_EXPIRE_DAYS || 7}d`,
  });

export const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

export const setRefreshCookie = (res, refreshToken) => {
  const maxAge = (Number(process.env.REFRESH_EXPIRE_DAYS || 7) * 24 * 60 * 60) * 1000;
  res.cookie("rt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/api/auth",
    maxAge,
  });
};

export const clearRefreshCookie = (res) => {
  res.clearCookie("rt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/api/auth",
  });
};
