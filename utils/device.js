import crypto from "crypto";
import UAParser from "ua-parser-js";

export function getClientIP(req) {
  const xf = req.headers["x-forwarded-for"];
  if (typeof xf === "string") return xf.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

// a stable signature per device (not perfect, good enough)
// You can add localStorage "fingerprint" later if you want even stronger binding.
export function buildSignature(req) {
  const ip = (getClientIP(req) || "").split(".").slice(0,3).join("."); // /24
  const ua = req.get("user-agent") || "";
  return crypto.createHash("sha256").update(`${ua}::${ip}`).digest("hex");
}

export function devicePrettyName(req) {
  const ua = req.get("user-agent") || "";
  const parsed = UAParser(ua);
  const browser = parsed.browser?.name || "Browser";
  const os = parsed.os?.name || "OS";
  return `${browser} on ${os}`;
}

export function hashCode(code) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

export function generateCode(len = 6) {
  // numeric 6-digit
  const n = Math.floor(100000 + Math.random() * 900000);
  return String(n).padStart(6, "0");
}
