import cors from 'cors';
import express from 'express';
import type { Pool } from 'pg';

export function createApp(db: Pick<Pool, 'query'>) {
  const app = express();
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(express.json());

  app.get('/api/health', async (_req, res) => {
    try {
      await db.query('SELECT 1');
      res.json({ status: 'ok', db: 'up' });
    } catch {
      res.status(503).json({ status: 'error', db: 'down' });
    }
  });

  return app;
}
