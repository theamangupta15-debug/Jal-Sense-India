import app from './app.js';
import { connectDB } from './config/database.js';
import { ENV } from './config/env.js';

async function bootstrap() {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log(`[Jal Sense India Backend] Server running on port ${ENV.PORT} (${ENV.NODE_ENV})`);
  });
}
const cors = require('cors');
require('dotenv').config();

app.use(cors({
    origin: process.env.FRONTEND_URL, // Accepts traffic from your live Vercel site
    credentials: true, // Required if you are sending cookies or authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

bootstrap();