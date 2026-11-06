import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { ENV } from './config/env.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import v1Routes from './routes/v1/routes.js';

const app = express();

// Trust reverse proxies (Render load balancers) so rate limiting & IP tracking work
app.set('trust proxy', 1);

// Robust Origin Checker
function isAllowedOrigin(origin) {
  // Allow health checks, cURL, server-to-server calls, or non-production local environments
  if (!origin || ENV.NODE_ENV !== 'production') {
    return true;
  }

  // Parse allowed origins list safely (supports array or comma-separated string)
  const configuredOrigins = Array.isArray(ENV.ALLOWED_ORIGINS)
    ? ENV.ALLOWED_ORIGINS
    : typeof ENV.ALLOWED_ORIGINS === 'string'
    ? ENV.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : [];

  const defaultProductionOrigins = [
    'https://jal-sense-india.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
  ];

  const fullAllowedList = [...new Set([...configuredOrigins, ...defaultProductionOrigins])];

  if (fullAllowedList.includes(origin)) {
    return true;
  }

  // Allow any dynamic Vercel preview deployment branch
  try {
    const url = new URL(origin);
    return url.protocol === 'https:' && (url.hostname === 'vercel.app' || url.hostname.endsWith('.vercel.app'));
  } catch {
    return false;
  }
}

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not permitted by CORS policy`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  optionsSuccessStatus: 200
};

// 1. CORS Preflight & Base Middleware (Mount FIRST before any routes)
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// 2. Security Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
  })
);

// 3. Body Parsing & Rate Limiting
app.use(express.json({ limit: '100kb' }));
app.use(rateLimiter({ maxRequests: 200, windowMs: 60 * 1000 }));

// 4. Liveness & Readiness Probes (Root and Legacy Compatibility Aliases)
const handleHealth = (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'healthy',
      pilot: 'Nagpur, Maharashtra',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
};

const handleReadiness = (req, res) => {
  const dbState = mongoose.connection.readyState;
  // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
  const isReady = dbState === 1;

  res.status(isReady ? 200 : 503).json({
    success: isReady,
    data: {
      database: isReady ? 'connected' : 'disconnected',
      dbStateCode: dbState,
      server: 'operational',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    }
  });
};

// Map health checks to both standard root and /api/v1 paths
app.get('/', handleHealth);
app.get('/health', handleHealth);
app.get('/api/health', handleHealth);
app.get('/api/v1/health', handleHealth);

app.get('/ready', handleReadiness);
app.get('/api/ready', handleReadiness);
app.get('/api/v1/ready', handleReadiness);

// 5. Assistant Status Check
app.get(['/api/assistant/status', '/api/v1/assistant/status'], (req, res) => {
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

// 6. Mount V1 API Routes
app.use('/api/v1', v1Routes);

// Fallback compatibility alias for unversioned `/api` calls
app.use('/api', v1Routes);

// 7. Centralized 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `The requested endpoint '${req.originalUrl}' does not exist on this server.`
    }
  });
});

// 8. Global Error-Handling Middleware
app.use((err, req, res, next) => {
  const isDev = ENV.NODE_ENV === 'development';
  console.error('[Error Handler]', err.message);

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