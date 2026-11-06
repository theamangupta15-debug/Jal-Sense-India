import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { ENV } from './config/env.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import v1Routes from './routes/v1/routes.js';

const app = express();

// Security Headers
app.use(helmet({
  contentSecurityPolicy: false // Allows frontend asset hydration in development
}));

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ENV.ALLOWED_ORIGINS.includes(origin) || ENV.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS policy'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '100kb' })); // Restrict payload size
app.use(rateLimiter({ maxRequests: 200, windowMs: 60 * 1000 }));

// Basic Health Check (Public Liveness)
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      pilot: 'Nagpur, Maharashtra',
      timestamp: new Date().toISOString()
    }
  });
});

// Operational Readiness Probe (Verifies DB connection readiness)
app.get('/api/v1/ready', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const isReady = dbState === 1;

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    data: {
      database: isReady ? 'connected' : 'disconnected',
      server: 'operational',
      timestamp: new Date().toISOString()
    }
  });
});

// Assistant Configuration & Status Check
app.get('/api/v1/assistant/status', (req, res) => {
  res.json({
    success: true,
    data: {
      provider: process.env.AI_PROVIDER || 'offline_deterministic',
      model: process.env.AI_MODEL || 'gemini-1.5-flash',
      hasApiKey: Boolean(process.env.AI_API_KEY),
      toolsActive: 10,
      guardrails: 'enforced'
    }
  });
});

// Mount V1 API
app.use('/api/v1', v1Routes);

// Centralized 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested endpoint '${req.originalUrl}' does not exist.`
    }
  });
});

// Error-Handling Middleware (Never leak internal stack traces)
app.use((err, req, res, next) => {
  const isDev = ENV.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected server error occurred.',
      ...(isDev && { details: err.stack })
    }
  });
});

export default app;