import type { Config } from 'drizzle-kit';

const databaseProvider = process.env.DATABASE_PROVIDER || 'sqlite';
const databaseUrl = process.env.DATABASE_URL || './dev.db';

const config: Config = {
  schema: './lib/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: databaseUrl,
  },
};

export default config;

