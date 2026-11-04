import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/app.js';

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jalsense_nagpur';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
    } catch {
      console.warn('[API Test] MongoDB not connected; running route tests with fallback.');
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

describe('Phase 3 Backend API Tests', () => {
  it('GET /api/v1/health returns HTTP 200 with health metadata', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.pilot).toBe('Nagpur, Maharashtra');
  });

  it('GET /api/v1/locations/search without query returns empty array', async () => {
    const res = await request(app).get('/api/v1/locations/search');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });

  it('GET /unknown-route returns HTTP 404 with standard envelope', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('POST /api/v1/assistant/chat returns boiling clarification warning', async () => {
    const res = await request(app)
      .post('/api/v1/assistant/chat')
      .send({ message: 'Does boiling tap water remove chemical contaminants?' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.answer).toBeDefined();
    expect(res.body.data.answer.toLowerCase()).toContain('cannot remove chemical contaminants');
  }, 10000);
});