const requestCounts = new Map();

/**
 * Lightweight sliding-window rate limiter
 * @param {number} maxRequests - Max requests allowed in the window
 * @param {number} windowMs - Window size in milliseconds
 */
export function rateLimiter({ maxRequests = 100, windowMs = 60 * 1000 } = {}) {
  return (req, res, next) => {
    // Exempt tests
    if (process.env.NODE_ENV === 'test') return next();

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const now = Date.now();
    const entry = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > entry.resetTime) {
      entry.count = 1;
      entry.resetTime = now + windowMs;
    } else {
      entry.count += 1;
    }

    requestCounts.set(ip, entry);

    if (entry.count > maxRequests) {
      return res.status(429).json({
        success: false,
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: 'Too many requests. Please slow down.'
        }
      });
    }

    next();
  };
}