---
title: "tRPC API Development Guide"
description: "Complete guide to creating tRPC routers, input validation, error handling, and client-side usage patterns."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["trpc", "api", "backend", "typescript", "validation"]
categories: ["guides", "backend"]
difficulty: "intermediate"
prerequisites: ["typescript", "trpc", "zod"]
related_docs:
  - "../guides/GUIDE.creating-pages.md"
  - "../guides/GUIDE.database-development.md"
dependencies: []
llm_context: "high"
search_keywords: ["trpc", "api", "routers", "procedures", "validation", "zod"]
---

# tRPC API Development Guide

## Purpose

This guide covers creating tRPC routers, input validation with Zod, error handling patterns, and client-side usage in the Sirius design system.

## Overview

tRPC provides end-to-end type safety between client and server. All API routes are defined in `lib/trpc/routers/` and accessed via `lib/trpc/client.ts`.

## Creating a New Router

### File Structure

Create a new router file in `lib/trpc/routers/`:

```typescript
// lib/trpc/routers/my-feature.ts
import { z } from 'zod';
import { router, publicProcedure } from '../server';

export const myFeatureRouter = router({
  // Procedures go here
});
```

### Register Router

Add to main app router in `lib/trpc/routers/_app.ts`:

```typescript
import { router } from '../server';
import { exampleRouter } from './example';
import { projectsRouter } from './projects';
import { documentationRouter } from './documentation';
import { myFeatureRouter } from './my-feature';

export const appRouter = router({
  example: exampleRouter,
  projects: projectsRouter,
  documentation: documentationRouter,
  myFeature: myFeatureRouter, // Add here
});

export type AppRouter = typeof appRouter;
```

## Procedures

### Query Procedures

**Use for reading data.**

```typescript
import { router, publicProcedure } from '../server';
import { z } from 'zod';

export const dataRouter = router({
  // Simple query
  getData: publicProcedure.query(async () => {
    return { message: 'Hello from server' };
  }),

  // Query with input validation
  getById: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ input }) => {
      // Use input.id
      return { id: input.id, data: 'some data' };
    }),

  // Query with async data fetching
  list: publicProcedure.query(async () => {
    const data = await fetchDataFromDatabase();
    return data;
  }),
});
```

### Mutation Procedures

**Use for creating, updating, or deleting data.**

```typescript
export const dataRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string().min(1),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      // Create data
      const newItem = await createData(input);
      return newItem;
    }),

  update: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).optional(),
      email: z.string().email().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...updates } = input;
      const updated = await updateData(id, updates);
      return updated;
    }),

  delete: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input }) => {
      await deleteData(input.id);
      return { success: true };
    }),
});
```

## Input Validation

### Zod Schemas

**Always validate inputs with Zod.**

```typescript
import { z } from 'zod';

// Simple validation
.input(z.object({
  id: z.string(),
  name: z.string(),
}))

// Advanced validation
.input(z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().min(18).max(100),
  tags: z.array(z.string()).min(1),
  status: z.enum(['active', 'inactive', 'pending']),
  metadata: z.object({
    key: z.string(),
    value: z.string(),
  }).optional(),
}))
```

### Common Validation Patterns

```typescript
// String validation
z.string().min(1)           // Required string
z.string().max(100)          // Max length
z.string().email()          // Email format
z.string().url()            // URL format
z.string().uuid()           // UUID format

// Number validation
z.number().int()            // Integer
z.number().min(0)           // Minimum value
z.number().max(100)         // Maximum value
z.number().positive()       // Positive number

// Array validation
z.array(z.string())         // Array of strings
z.array(z.string()).min(1)  // Non-empty array

// Optional fields
z.string().optional()       // Optional string
z.string().nullable()       // Nullable string
z.string().default('')      // Default value
```

## Real-World Examples

### Example 1: Documentation Router

Reference: `lib/trpc/routers/documentation.ts`

```typescript
import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { buildDocTreeWithStats, parseMarkdownFile } from '@/lib/utils/doc-utils';
import { join } from 'path';
import { DocTreeSchema, DocFileSchema } from '@/lib/types/documentation';

const DOCS_DIR = join(process.cwd(), 'docs');

export const documentationRouter = router({
  getDocTree: publicProcedure.query(async () => {
    try {
      const tree = await buildDocTreeWithStats();
      return tree;
    } catch (error) {
      console.error('Error building doc tree:', error);
      throw new Error('Failed to build documentation tree');
    }
  }),

  getDocContent: publicProcedure
    .input(z.object({
      path: z.string(),
    }))
    .query(async ({ input }) => {
      try {
        const cleanPath = input.path.startsWith('docs/') 
          ? input.path.slice(5) 
          : input.path;
        const fullPath = join(DOCS_DIR, cleanPath);
        const { metadata, content } = await parseMarkdownFile(fullPath);
        
        return {
          relativePath: input.path,
          path: fullPath,
          name: input.path.split('/').pop() || input.path,
          metadata,
          content,
        };
      } catch (error) {
        console.error(`Error fetching doc content for ${input.path}:`, error);
        throw new Error(`Failed to fetch document: ${input.path}`);
      }
    }),
});
```

### Example 2: Projects Router

Reference: `lib/trpc/routers/projects.ts`

```typescript
import { z } from 'zod';
import { router, publicProcedure } from '../server';
import { promises as fs } from 'fs';
import { join } from 'path';
import { ProjectTaskFileSchema, ProjectInfoSchema } from '@/lib/types/project-management';

const PROJECTS_DIR = join(process.cwd(), 'projects');

export const projectsRouter = router({
  listProjects: publicProcedure.query(async () => {
    try {
      if (!(await directoryExists(PROJECTS_DIR))) {
        return [];
      }

      const entries = await fs.readdir(PROJECTS_DIR, { withFileTypes: true });
      const projects: z.infer<typeof ProjectInfoSchema>[] = [];

      for (const entry of entries) {
        if (entry.name === 'template-project' || entry.name === 'README.md') {
          continue;
        }

        if (!entry.isDirectory()) {
          continue;
        }

        // Process project...
        projects.push({
          name: entry.name,
          taskFiles: [],
          hasTaskFiles: false,
          hasPRD: false,
          hasPlans: false,
        });
      }

      return projects;
    } catch (error) {
      console.error('Error listing projects:', error);
      throw new Error('Failed to list projects');
    }
  }),

  getProjectTasks: publicProcedure
    .input(z.object({ projectName: z.string() }))
    .query(async ({ input }) => {
      // Implementation
    }),
});
```

## Error Handling

### Try-Catch Pattern

**Always wrap async operations in try-catch.**

```typescript
export const dataRouter = router({
  getData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      try {
        const data = await fetchData(input.id);
        return data;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
      }
    }),
});
```

### Custom Error Messages

```typescript
export const dataRouter = router({
  getData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const data = await findData(input.id);
      
      if (!data) {
        throw new Error(`Data not found: ${input.id}`);
      }

      return data;
    }),
});
```

## Client-Side Usage

### Setup

The tRPC client is configured in `lib/trpc/client.ts`:

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './routers/_app';

export const trpc = createTRPCReact<AppRouter>();
```

### Using Queries

```typescript
"use client";

import { trpc } from "@/lib/trpc/client";

export default function MyPage() {
  const { data, isLoading, error } = trpc.myFeature.getData.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data?.message}</div>;
}
```

### Using Mutations

```typescript
"use client";

import { trpc } from "@/lib/trpc/client";
import { useState } from "react";

export default function CreateForm() {
  const [name, setName] = useState("");

  const createMutation = trpc.myFeature.create.useMutation({
    onSuccess: () => {
      console.log("Created successfully");
      setName("");
    },
    onError: (error) => {
      console.error("Error:", error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit" disabled={createMutation.isLoading}>
        {createMutation.isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
```

### Query with Parameters

```typescript
const { data } = trpc.myFeature.getById.useQuery({ id: "123" });
```

### Invalidation

```typescript
const utils = trpc.useUtils();

const createMutation = trpc.myFeature.create.useMutation({
  onSuccess: () => {
    utils.myFeature.list.invalidate(); // Refetch list
  },
});
```

## Best Practices

1. **Validate all inputs** - Use Zod schemas for type safety
2. **Handle errors** - Wrap async operations in try-catch
3. **Type safety** - Export router types for client usage
4. **Error messages** - Provide clear error messages
5. **File organization** - One router per feature/domain
6. **Async/await** - Use modern async patterns
7. **Error logging** - Log errors for debugging
8. **Return types** - Return consistent data structures

## Related Documentation

- [Creating Pages](./GUIDE.creating-pages.md) - Using tRPC in pages
- [Database Development](./GUIDE.database-development.md) - Database queries in routers

---

_Follow these patterns for type-safe API development with tRPC._



