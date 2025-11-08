---
title: "Database Development Guide"
description: "Complete guide to Drizzle ORM schema definition, migrations, database provider configuration, and query patterns."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["database", "drizzle", "orm", "sqlite", "postgresql", "mysql"]
categories: ["guides", "backend"]
difficulty: "intermediate"
prerequisites: ["typescript", "sql", "drizzle-orm"]
related_docs:
  - "../guides/GUIDE.trpc-api-development.md"
dependencies: []
llm_context: "high"
search_keywords: ["database", "drizzle", "orm", "schema", "migrations", "sqlite", "postgresql"]
---

# Database Development Guide

## Purpose

This guide covers Drizzle ORM schema definition, migration workflow, database provider configuration, and query patterns for the Sirius design system.

## Overview

The project uses Drizzle ORM with support for SQLite (default), PostgreSQL, and MySQL. Schema definitions are in `lib/db/schema.ts` and migrations are managed via Drizzle Kit.

## Schema Definition

### Basic Table Definition

Reference: `lib/db/schema.ts`

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// Export types for use in application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### Column Types

```typescript
// SQLite column types
integer('id').primaryKey()                    // Primary key integer
text('name').notNull()                        // Required text
text('email').unique()                        // Unique text
integer('created_at', { mode: 'timestamp' })  // Timestamp integer
real('price')                                 // Floating point number
blob('data')                                  // Binary data

// PostgreSQL column types (when using PostgreSQL)
pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

// MySQL column types (when using MySQL)
mysqlTable('users', {
  id: int('id').primaryKey().autoincrement(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

### Relationships

```typescript
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
});

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  userId: integer('user_id').references(() => users.id),
});

// Define relations
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.userId],
    references: [users.id],
  }),
}));
```

## Database Configuration

### Environment Variables

Configure database provider in `.env`:

```env
# SQLite (default)
DATABASE_PROVIDER=sqlite
DATABASE_URL=./dev.db

# PostgreSQL
DATABASE_PROVIDER=postgresql
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# MySQL
DATABASE_PROVIDER=mysql
DATABASE_URL=mysql://user:password@localhost:3306/dbname
```

### Database Connection

Reference: `lib/db/index.ts`

```typescript
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const databaseUrl = process.env.DATABASE_URL || './dev.db';
const sqlite = new Database(databaseUrl);
export const db = drizzle(sqlite, { schema });
```

### Multi-Provider Support

```typescript
// lib/db/index.ts
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

const provider = process.env.DATABASE_PROVIDER || 'sqlite';
const databaseUrl = process.env.DATABASE_URL || './dev.db';

let db;

if (provider === 'sqlite') {
  const sqlite = new Database(databaseUrl);
  db = drizzle(sqlite, { schema });
} else if (provider === 'postgresql') {
  // PostgreSQL setup
  const { drizzle } = require('drizzle-orm/postgres-js');
  const postgres = require('postgres');
  const client = postgres(databaseUrl);
  db = drizzle(client, { schema });
} else if (provider === 'mysql') {
  // MySQL setup
  const { drizzle } = require('drizzle-orm/mysql2');
  const mysql = require('mysql2/promise');
  const connection = await mysql.createConnection(databaseUrl);
  db = drizzle(connection, { schema });
}

export { db };
```

## Migration Workflow

### Generate Migrations

After modifying schema, generate migrations:

```bash
npm run db:generate
```

This creates migration files in `drizzle/` directory.

### Run Migrations

Apply migrations to database:

```bash
npm run db:migrate
```

Reference: `lib/db/migrate.ts`

```typescript
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';

const databaseUrl = process.env.DATABASE_URL || './dev.db';
const sqlite = new Database(databaseUrl);
const db = drizzle(sqlite);

migrate(db, { migrationsFolder: './drizzle' });
console.log('Migrations completed successfully');
sqlite.close();
```

### Drizzle Studio

View and edit database in browser:

```bash
npm run db:studio
```

Opens Drizzle Studio at `http://localhost:4983`

## Query Patterns

### Select Queries

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Get all users
const allUsers = await db.select().from(users);

// Get user by ID
const user = await db.select().from(users).where(eq(users.id, 1));

// Get user with conditions
const activeUsers = await db
  .select()
  .from(users)
  .where(eq(users.status, 'active'));

// Limit results
const recentUsers = await db
  .select()
  .from(users)
  .orderBy(desc(users.createdAt))
  .limit(10);
```

### Insert Queries

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

// Insert single record
const newUser = await db.insert(users).values({
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
});

// Insert multiple records
await db.insert(users).values([
  { name: 'User 1', email: 'user1@example.com', createdAt: new Date() },
  { name: 'User 2', email: 'user2@example.com', createdAt: new Date() },
]);
```

### Update Queries

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Update single record
await db
  .update(users)
  .set({ name: 'Jane Doe' })
  .where(eq(users.id, 1));

// Update multiple fields
await db
  .update(users)
  .set({ 
    name: 'Jane Doe',
    email: 'jane@example.com',
  })
  .where(eq(users.id, 1));
```

### Delete Queries

```typescript
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Delete single record
await db.delete(users).where(eq(users.id, 1));

// Delete with conditions
await db.delete(users).where(eq(users.status, 'inactive'));
```

### Joins

```typescript
import { db } from '@/lib/db';
import { users, posts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// Inner join
const usersWithPosts = await db
  .select()
  .from(users)
  .innerJoin(posts, eq(users.id, posts.userId));

// Left join
const allUsersWithPosts = await db
  .select()
  .from(users)
  .leftJoin(posts, eq(users.id, posts.userId));
```

## Type Safety

### Infer Types

```typescript
import { users } from '@/lib/db/schema';

// Infer select type (read)
export type User = typeof users.$inferSelect;

// Infer insert type (write)
export type NewUser = typeof users.$inferInsert;
```

### Using Types

```typescript
import type { User, NewUser } from '@/lib/db/schema';

function getUser(): Promise<User[]> {
  return db.select().from(users);
}

function createUser(data: NewUser): Promise<void> {
  return db.insert(users).values(data);
}
```

## Using in tRPC Routers

```typescript
import { router, publicProcedure } from '../server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { z } from 'zod';
import { eq } from 'drizzle-orm';

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.id, input.id))
        .limit(1);
      
      if (!user) {
        throw new Error('User not found');
      }

      return user;
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      const [newUser] = await db
        .insert(users)
        .values({
          name: input.name,
          email: input.email,
          createdAt: new Date(),
        })
        .returning();

      return newUser;
    }),
});
```

## Best Practices

1. **Define schemas** - All tables in `lib/db/schema.ts`
2. **Export types** - Export inferred types for use in application
3. **Use migrations** - Always use migrations, never modify schema directly
4. **Type safety** - Leverage TypeScript types from Drizzle
5. **Error handling** - Handle database errors in tRPC routers
6. **Relations** - Define relationships for complex queries
7. **Indexes** - Add indexes for frequently queried columns
8. **Transactions** - Use transactions for multi-step operations

## Related Documentation

- [tRPC API Development](./GUIDE.trpc-api-development.md) - Using database in routers

---

_Follow these patterns for type-safe database development with Drizzle ORM._

