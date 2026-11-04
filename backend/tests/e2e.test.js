import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/app.js';
import Location from '../src/models/Location.js';

dotenv.config();
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jalsense_nagpur';

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 2000 });
      // Fixture: Seed an existing Taluka and an empty Taluka
      await Location.updateOne(
        { locationId: 'LOC-MH-NAG-TAL-KAT' },
        { $set: { locationId: 'LOC-MH-NAG-TAL-KAT', name: 'Katol', level: 'taluka', parentId: 'LOC-MH-NAG' } },
        { upsert: true }
      );
      await Location.updateOne(
        { locationId: 'LOC-MH-NAG-TAL-BHI' },
        { $set: { locationId: 'LOC-MH-NAG-TAL-BHI', name: 'Bhivapur', level: 'taluka', parentId: 'LOC-MH-NAG' } },
        { upsert: true }
      );
    } catch {
      console.warn('[E2E Hook] Database connection fallback.');
    }
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
});

describe('Phase 7 End-to-End Integration Verification', () => {
  // Scenario A: Data Available
  it('Scenario A: Retrieves location intelligence with provenance and limitation notice', async () => {
    const res = await request(app).get('/api/v1/locations/LOC-MH-NAG/intelligence');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.location).toBeDefined();
    expect(res.body.provenance).toBeDefined();
    expect(res.body.limitations).toBeInstanceOf(Array);
  });

  // Scenario B: Data Unavailable (Honest Incomplete State)
  it('Scenario B: Explains data absence without inventing numbers for empty locality', async () => {
    const res = await request(app).get('/api/v1/locations/LOC-MH-NAG-TAL-BHI/intelligence');
    expect(res.status).toBe(200);
    expect(res.body.data.waterQualityIntelligence.hasLabData).toBe(false);
    expect(res.body.data.waterQualityIntelligence.concernClassification.level).toBe('insufficient_evidence');
    expect(res.body.limitations.some((lim) => lim.includes('No public laboratory'))).toBe(true);
  });

  // Scenario C: Malformed Input / Service Rejection
  it('Scenario C: Rejects invalid or malicious location identifier format', async () => {
    const res = await request(app).get('/api/v1/locations/INVALID_LOC_$$$');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });

  // Health and Readiness Checks
  it('GET /api/v1/ready responds with operational status', async () => {
    const res = await request(app).get('/api/v1/ready');
    expect([200, 503]).toContain(res.status);
    expect(res.body.data.server).toBe('operational');
  });

  it('GET /api/v1/assistant/status verifies 10 active tools and guardrails', async () => {
    const res = await request(app).get('/api/v1/assistant/status');
    expect(res.status).toBe(200);
    expect(res.body.data.toolsActive).toBe(10);
    expect(res.body.data.guardrails).toBe('enforced');
  });
});