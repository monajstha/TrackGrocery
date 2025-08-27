import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

const SQL_CREATE_TABLE_CATEGORIES = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

const main = async () => {
  const client = new Client({
    connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  });
  try {
    await client.connect();
    await client.query(SQL_CREATE_TABLE_CATEGORIES);
  } catch (error) {
    console.log('Error creating table', error);
    process.exit(1);
  } finally {
    await client.end();
  }
};

main();
