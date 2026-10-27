import 'dotenv/config';
import { createApp } from './app';
import { pool } from './db';

const port = Number(process.env.PORT ?? 3000);
createApp(pool).listen(port, () => console.log(`API listening on :${port}`));
