import app from './app.js';
import { connectDB } from './config/database.js';
import { ENV } from './config/env.js';

async function bootstrap() {
  try {
    // 1. Establish database connection before accepting traffic
    await connectDB();
    console.log('[Database] MongoDB Atlas connection verified.');

    // 2. Resolve port safely
    const port = Number(ENV.PORT) || 5000;

    // 3. Bind to 0.0.0.0 for cloud container hosting (Render requirement)
    const server = app.listen(port, '0.0.0.0', () => {
      console.log(`[Server] Running on port ${port} in ${ENV.NODE_ENV || 'development'} mode`);
      console.log(`[Health] Endpoints: /api/v1/health & /api/v1/ready`);
    });

    // 4. Graceful shutdown handlers
    const shutdown = (signal) => {
      console.log(`[Server] Received ${signal}. Closing HTTP listener...`);
      server.close(() => {
        console.log('[Server] HTTP listener closed cleanly.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

  } catch (error) {
    console.error('[Server Error] Bootstrap failed:', error.message || error);
    process.exit(1);
  }
}

bootstrap();