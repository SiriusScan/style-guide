import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const databaseUrl = process.env.DATABASE_URL || './dev.db';

const sqlite = new Database(databaseUrl);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: './drizzle' });

console.log('Migrations completed successfully');
sqlite.close();




