import rateLimit from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 1000,
  max: 1,
  skipSuccessfulRequests: true,
  legacyHeaders: false,
});

export default authLimiter;
