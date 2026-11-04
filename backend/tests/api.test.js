import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

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
      .send({ message: 'Does boiling make chemical water safe?' });
    expect(res.status).toBe(200);
    expect(res.body.data.reply).toContain('CANNOT remove dissolved chemical contaminants');
  });
});