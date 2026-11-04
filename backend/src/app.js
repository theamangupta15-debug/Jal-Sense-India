import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import v1Routes from './routes/v1/routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ENV } from './config/env.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: ENV.CLIENT_ORIGIN }));
app.use(express.json());

// Add root route handler
app.get('/', (req, res) => {
  res.json({
    name: 'Jal Sense India / JalRakshak API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/v1/health',
    availableEndpoints: [
      '/api/v1/health',
      '/api/v1/locations',
      '/api/v1/locations/search?q=Katol',
      '/api/v1/standards',
      '/api/v1/sources',
      '/api/v1/health-guidance'
    ]
  });
});

// Mount API v1
app.use('/api/v1', v1Routes);

// Fallback for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.url} does not exist.` }
  });
});

app.use(errorHandler);

export default app;