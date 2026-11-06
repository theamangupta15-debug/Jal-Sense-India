import app from './app.js';
import { connectDB } from './config/database.js';
import { ENV } from './config/env.js';

async function bootstrap() {
  await connectDB();
  const port = ENV.PORT;

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on port ${port}`);
  });
}

bootstrap();