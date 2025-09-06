import dotenv from 'dotenv';

dotenv.config();

const getDB_URL = () => {
  let dbUrl;
  // Determine which environment to use based on an argument or env variable
  const env = process.argv[2] || 'local';

  if (env === 'production') {
    dbUrl = process.env.PROD_DATABASE_URL;
    if (!dbUrl) {
      console.error(
        'Error: PROD_DATABASE_URL is not set in .env or environment',
      );
      process.exit(1);
    }
  } else {
    // Construct local database URL dynamically
    const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;
    if (!DB_USER || !DB_NAME || !DB_PASSWORD || !DB_PORT || !DB_HOST) {
      console.error(
        'Error: Missing required local DB env variables (DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST)',
      );
      process.exit(1);
    }
    dbUrl = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }

  return dbUrl;
};

export { getDB_URL };
