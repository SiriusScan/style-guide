---
title: "Code Organization Patterns"
description: "File naming conventions, directory structure standards, component co-location patterns, and project organization guidelines."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["organization", "structure", "naming", "conventions"]
categories: ["guides", "standards"]
difficulty: "beginner"
prerequisites: []
related_docs:
  - "../guides/GUIDE.creating-pages.md"
  - "../guides/PATTERNS.typescript.md"
dependencies: []
llm_context: "high"
search_keywords: ["file structure", "naming conventions", "code organization", "directory structure"]
---

# Code Organization Patterns

## Purpose

This guide defines file naming conventions, directory structure standards, component co-location patterns, and project organization guidelines for consistent code organization.

## File Naming Conventions

### Components

**Use PascalCase for React components.**

```
✅ CORRECT:
components/ui/Button.tsx
components/layouts/AppLayout.tsx
components/project-management/TaskCard.tsx

❌ WRONG:
components/ui/button.tsx
components/layouts/app-layout.tsx
components/project-management/task-card.tsx
```

### Utilities and Helpers

**Use kebab-case for utility files.**

```
✅ CORRECT:
lib/utils/filter-utils.ts
lib/utils/storage-utils.ts
lib/utils/doc-utils.ts

❌ WRONG:
lib/utils/filterUtils.ts
lib/utils/FilterUtils.ts
lib/utils/filter_utils.ts
```

### Pages

**Use Next.js App Router conventions.**

```
✅ CORRECT:
app/page.tsx                    // Home page
app/project-management/page.tsx // Route: /project-management
app/api/trpc/[trpc]/route.ts    // Dynamic route

❌ WRONG:
app/HomePage.tsx
app/projectManagement/page.tsx
```

### Types

**Use kebab-case for type definition files.**

```
✅ CORRECT:
lib/types/project-management.ts
lib/types/documentation.ts

❌ WRONG:
lib/types/projectManagement.ts
lib/types/ProjectManagement.ts
```

## Directory Structure

### Project Root Structure

```
style-guide/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── [routes]/         # Page routes
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # React components
│   ├── ui/               # ShadCN UI components
│   ├── layouts/          # Layout components
│   └── [feature]/        # Feature-specific components
├── lib/                   # Utilities and configurations
│   ├── db/               # Database (Drizzle)
│   ├── trpc/             # tRPC setup
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
├── docs/                  # Documentation
│   ├── guides/           # Developer guides
│   ├── development/      # Project-specific docs
│   └── templates/        # Documentation templates
├── projects/              # Project directories
│   ├── template-project/ # Template examples
│   └── [project-name]/   # Actual projects
├── scripts/               # Utility scripts
│   └── tests/            # Test scripts (TypeScript)
├── public/                # Static assets
└── package.json           # Dependencies
```

### Component Organization

```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── layouts/               # Layout components
│   ├── AppLayout.tsx
│   ├── PageLayout.tsx
│   └── index.ts           # Barrel export
├── loaders/               # Loading components
│   ├── ActiveConstellationV2Loader.tsx
│   └── index.ts
└── [feature]/             # Feature-specific components
    ├── Component1.tsx
    ├── Component2.tsx
    └── index.ts           # Barrel export
```

### Library Organization

```
lib/
├── db/                    # Database
│   ├── index.ts          # Database connection
│   ├── schema.ts         # Drizzle schema
│   └── migrate.ts        # Migration script
├── trpc/                  # tRPC setup
│   ├── client.ts         # Client configuration
│   ├── server.ts         # Server setup
│   └── routers/          # tRPC routers
│       ├── _app.ts       # Main router
│       ├── example.ts
│       └── projects.ts
├── types/                 # TypeScript types
│   ├── project-management.ts
│   └── documentation.ts
└── utils/                 # Utility functions
    ├── filter-utils.ts
    ├── storage-utils.ts
    └── doc-utils.ts
```

## Component Co-location

### Feature-Based Organization

**Group related components together.**

```
components/project-management/
├── ProjectSidebar.tsx
├── TaskViewer.tsx
├── TaskCard.tsx
├── KanbanBoard.tsx
└── index.ts              # Export all components
```

### Barrel Exports

**Use index.ts for clean imports.**

```typescript
// components/layouts/index.ts
export { AppLayout } from './AppLayout';
export { PageLayout } from './PageLayout';
export { ContentSection } from './ContentSection';
export { GridLayout } from './GridLayout';

// Usage
import { AppLayout, ContentSection } from '@/components/layouts';
```

## Utils Organization

### Single Responsibility

**Each utility file should have a single purpose.**

```
lib/utils/
├── filter-utils.ts      # Filtering functions
├── storage-utils.ts     # LocalStorage functions
├── doc-utils.ts         # Documentation utilities
└── project-utils.ts     # Project-related utilities
```

### Utility File Structure

```typescript
// lib/utils/filter-utils.ts

/**
 * Filter utilities for data manipulation
 */

export function filterByStatus<T extends { status: string }>(
  items: T[],
  status: string
): T[] {
  return items.filter(item => item.status === status);
}

export function filterBySearch<T extends { name: string }>(
  items: T[],
  query: string
): T[] {
  return items.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );
}
```

## Type Definitions

### Type File Organization

**Group related types together.**

```typescript
// lib/types/project-management.ts

export interface ProjectInfo {
  name: string;
  taskFiles: string[];
  hasTaskFiles: boolean;
  hasPRD: boolean;
  hasPlans: boolean;
}

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export type TaskStatus = Task['status'];
export type TaskPriority = Task['priority'];
```

### Zod Schemas

**Define Zod schemas alongside types.**

```typescript
import { z } from 'zod';

export const ProjectInfoSchema = z.object({
  name: z.string(),
  taskFiles: z.array(z.string()),
  hasTaskFiles: z.boolean(),
  hasPRD: z.boolean(),
  hasPlans: z.boolean(),
});

export type ProjectInfo = z.infer<typeof ProjectInfoSchema>;
```

## Import Organization

### Import Order

**Organize imports consistently.**

```typescript
// 1. External dependencies
import { useState } from 'react';
import { z } from 'zod';

// 2. Internal absolute imports (@/)
import { AppLayout } from '@/components/layouts';
import { trpc } from '@/lib/trpc/client';

// 3. Relative imports
import { TaskCard } from './TaskCard';
import { TaskFilters } from './TaskFilters';

// 4. Types
import type { Task } from '@/lib/types/project-management';
```

### Path Aliases

**Use path aliases for clean imports.**

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}

// Usage
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
```

## Best Practices

1. **Consistent naming** - Follow conventions strictly
2. **Feature grouping** - Group related files together
3. **Barrel exports** - Use index.ts for clean imports
4. **Single responsibility** - One purpose per file
5. **Type co-location** - Keep types near usage
6. **Path aliases** - Use @/ for absolute imports
7. **Clear structure** - Make organization obvious
8. **Documentation** - Add README.md for complex directories

## Example Project Structure

```
app/
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
├── project-management/
│   └── page.tsx               # Project management page
└── api/
    └── trpc/
        └── [trpc]/
            └── route.ts       # tRPC API route

components/
├── ui/                        # Reusable UI
│   ├── button.tsx
│   └── card.tsx
├── layouts/                   # Layout components
│   ├── AppLayout.tsx
│   └── index.ts
└── project-management/        # Feature components
    ├── ProjectSidebar.tsx
    ├── TaskViewer.tsx
    └── index.ts

lib/
├── db/
│   ├── index.ts              # Database connection
│   └── schema.ts             # Schema definition
├── trpc/
│   ├── client.ts             # Client setup
│   ├── server.ts             # Server setup
│   └── routers/              # API routers
│       └── projects.ts
├── types/
│   └── project-management.ts # Type definitions
└── utils/
    └── filter-utils.ts       # Utility functions
```

## Related Documentation

- [Creating Pages](./GUIDE.creating-pages.md) - Page structure
- [TypeScript Patterns](./PATTERNS.typescript.md) - Type definitions

---

_Follow these patterns for consistent code organization across the project._

