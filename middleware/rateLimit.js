import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,                   // 10 attempts / 15 mins / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many login attempts. Try again later." },
});

export const refreshLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 min
  max: 30,                   // 30 refreshes / min / IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many refresh requests. Slow down." },
});
