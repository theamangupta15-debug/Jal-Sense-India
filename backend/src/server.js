import app from './app.js';
import { connectDB } from './config/database.js';
import { ENV } from './config/env.js';

async function bootstrap() {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`[Jal Sense India Backend] Server running on port ${ENV.PORT} (${ENV.NODE_ENV})`);
  });
}

bootstrap();