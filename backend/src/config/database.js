import mongoose from 'mongoose';
import { ENV } from './env.js';

export async function connectDB() {
  try {
    const conn = await mongoose.connect(ENV.MONGODB_URI);
    console.log(`[Database] MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error(`[Database Error] Connection failed: ${err.message}`);
    if (ENV.NODE_ENV === 'production') {
      process.exit(1);
    }
    return null;
  }
}