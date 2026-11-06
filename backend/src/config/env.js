import dotenv from 'dotenv';
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const defaultOrigins = NODE_ENV === 'production'
  ? ['https://jal-sense-india.vercel.app']
  : ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'];
const configuredOrigins = [
  process.env.ALLOWED_ORIGINS,
  process.env.FRONTEND_URL,
  process.env.CLIENT_ORIGIN
]
  .filter(Boolean)
  .flatMap((origins) => origins.split(','))
  .map((origin) => origin.trim().replace(/\/+$/, ''))
  .filter(Boolean);

export const ENV = {
  PORT: process.env.PORT || 5000,
  NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI || (
    NODE_ENV === 'production' ? '' : 'mongodb://127.0.0.1:27017/jalsense_nagpur'
  ),
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || defaultOrigins[0],
  ALLOWED_ORIGINS: [...new Set([...defaultOrigins, ...configuredOrigins])]
};