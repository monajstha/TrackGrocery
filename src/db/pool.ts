import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

const pool = new Pool({
  connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
});

export default pool;
