import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { createApp } from './app';

describe('GET /api/health', () => {
  it('returns 200 when the database responds', async () => {
    const db = { query: async () => ({ rows: [] }) } as never;
    const res = await request(createApp(db)).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', db: 'up' });
  });

  it('returns 503 when the database fails', async () => {
    const db = { query: async () => { throw new Error('down'); } } as never;
    const res = await request(createApp(db)).get('/api/health');
    expect(res.status).toBe(503);
  });
});
