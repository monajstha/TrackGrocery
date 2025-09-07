import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;
const { PROD_DATABASE_URL, LOCAL_DATABASE_URL, NODE_ENV } = process.env;

console.log('NODE ENV: ', NODE_ENV);
const pool = new Pool({
  connectionString:
    NODE_ENV === 'production' ? PROD_DATABASE_URL : LOCAL_DATABASE_URL,
});

export default pool;
