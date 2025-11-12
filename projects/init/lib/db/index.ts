import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const databaseProvider = process.env.DATABASE_PROVIDER || 'sqlite';
const databaseUrl = process.env.DATABASE_URL || './dev.db';

let db: ReturnType<typeof drizzle>;

try {
  if (databaseProvider === 'sqlite') {
    const sqlite = new Database(databaseUrl);
    db = drizzle(sqlite, { schema });
  } else {
    // For other providers (PostgreSQL, MySQL), you would import the appropriate driver
    // Example for PostgreSQL:
    // import { drizzle } from 'drizzle-orm/postgres-js';
    // import postgres from 'postgres';
    // const client = postgres(databaseUrl);
    // db = drizzle(client, { schema });
    
    // For now, fallback to SQLite if provider not configured
    console.warn(`Database provider "${databaseProvider}" not fully configured. Falling back to SQLite.`);
    const sqlite = new Database(databaseUrl);
    db = drizzle(sqlite, { schema });
  }
} catch (error) {
  console.error('Database connection error:', error);
  // Application should still start even if database is not configured
  // This allows the app to run without database for initial setup
  throw error;
}

export { db };
export * from './schema';




