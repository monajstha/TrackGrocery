import pg from 'pg';
import { getDB_URL } from './dbConfig';

const { Pool } = pg;

const pool = new Pool({
  connectionString: getDB_URL(),
});

export default pool;
