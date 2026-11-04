import { randomUUID } from 'crypto';

export function errorHandler(err, req, res, next) {
  console.error(`[Server Error] ${err.message}`, err.stack);
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred.'
    },
    meta: {
      requestId: randomUUID(),
      timestamp: new Date().toISOString()
    }
  });
}