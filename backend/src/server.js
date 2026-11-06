import cors from 'cors';
import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/database.js';
import { ENV } from './config/env.js';

dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'https://jal-sense-india.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

async function bootstrap() {
  await connectDB();
  const port = process.env.PORT || ENV.PORT || 5000;

app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening on port ${port}`);
});
}

bootstrap();