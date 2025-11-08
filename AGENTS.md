# AI Agent Guide for Style Guide Boilerplate

This document provides comprehensive guidance for AI agents working on this Next.js boilerplate project. It explains the technology stack, project structure, documentation system, and development workflows.

## Project Overview

### What This Is

The **Style Guide Boilerplate** is a production-ready Next.js 16 starter template with:

- **Full-stack TypeScript application** using Next.js App Router
- **Type-safe API development** with tRPC 11
- **Database ORM** with Drizzle (SQLite, PostgreSQL, MySQL support)
- **Modern UI components** using ShadCN UI and Tailwind CSS 4
- **Comprehensive documentation system** with LLM-optimized structure
- **Task management system** using JSON Schema
- **CI/CD workflows** for automated testing and deployment

### Technology Stack

```
Frontend:     Next.js 16, React 19, TypeScript 5.9
Backend:      Next.js API Routes, tRPC 11
Database:     Drizzle ORM (SQLite default, PostgreSQL/MySQL supported)
UI:           ShadCN UI, Tailwind CSS 4, Radix UI primitives
State:        TanStack Query (React Query)
Validation:   Zod 4
Deployment:   Vercel
CI/CD:        GitHub Actions
```

## Quick Start for AI Agents

### 1. Understand the Structure

```
style-guide/
├── app/                    # Next.js App Router (pages, layouts, API routes)
├── components/             # React components
│   ├── ui/                # ShadCN UI components
│   ├── layouts/           # Layout components (AppLayout, PageLayout, etc.)
│   ├── loaders/           # Loading components
│   └── [feature]/         # Feature-specific components
├── lib/                    # Utilities and configurations
│   ├── db/               # Drizzle ORM (database)
│   ├── trpc/             # tRPC setup (API)
│   ├── types/            # TypeScript type definitions
│   └── utils/            # Utility functions
├── docs/                   # Documentation system
│   ├── guides/           # Developer guides (how-to)
│   └── development/      # Project-specific docs
├── projects/               # Example projects and templates
│   └── template-project/ # Template with PRD, plans, tasks, resources
├── scripts/                # Utility scripts
│   └── tests/            # Test scripts (TypeScript)
└── public/                # Static assets
```

### 2. Read the Essential Guides

Before making any changes, read these guides in order:

1. **[Creating Pages](docs/guides/GUIDE.creating-pages.md)** - Learn page structure
2. **[Component Usage](docs/guides/GUIDE.component-usage.md)** - Understand components
3. **[TypeScript Patterns](docs/guides/PATTERNS.typescript.md)** - TypeScript conventions
4. **[Code Organization](docs/guides/PATTERNS.code-organization.md)** - File structure

### 3. Development Workflow

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Database migrations
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open database UI
```

## Documentation System

### Directory Organization

**`docs/guides/`** - Developer guides and tutorials
- How-to guides for common development tasks
- Code patterns and conventions
- Language-agnostic best practices

**`docs/development/`** - Project-specific documentation
- Project setup and configuration
- Project-specific workflows
- Task management system

**`docs/templates/`** - Documentation templates
- Templates for creating new documentation
- Ensure consistency across docs

### Available Guides

**Essential Guides** (Read First):
- [GUIDE.creating-pages.md](docs/guides/GUIDE.creating-pages.md) - Creating new pages in Next.js
- [GUIDE.component-usage.md](docs/guides/GUIDE.component-usage.md) - Using layout and UI components
- [GUIDE.styling-conventions.md](docs/guides/GUIDE.styling-conventions.md) - Tailwind CSS patterns
- [GUIDE.trpc-api-development.md](docs/guides/GUIDE.trpc-api-development.md) - Building type-safe APIs
- [GUIDE.database-development.md](docs/guides/GUIDE.database-development.md) - Drizzle ORM patterns

**Pattern Documents** (Reference):
- [PATTERNS.components.md](docs/guides/PATTERNS.components.md) - Mandatory component patterns
- [PATTERNS.typescript.md](docs/guides/PATTERNS.typescript.md) - TypeScript conventions
- [PATTERNS.code-organization.md](docs/guides/PATTERNS.code-organization.md) - File organization

**Project Documentation**:
- [README.ui-style-guide.md](docs/development/README.ui-style-guide.md) - UI style guide
- [README.task-management.md](docs/development/README.task-management.md) - Task system
- [ABOUT.documentation.md](docs/ABOUT.documentation.md) - Documentation standards

## Core Technologies

### Next.js App Router

- **Location**: `app/` directory
- **Routing**: File-system based (`app/[route]/page.tsx`)
- **Layouts**: Shared layouts in `app/layout.tsx`
- **API Routes**: `app/api/` directory
- **Server Components**: Default (use `"use client"` for client components)

**Key Files**:
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Homepage
- `app/globals.css` - Global styles

### tRPC (Type-Safe APIs)

- **Location**: `lib/trpc/`
- **Router Definition**: `lib/trpc/routers/_app.ts`
- **Server Setup**: `lib/trpc/server.ts`
- **Client Setup**: `lib/trpc/client.ts`

**Creating a New API Endpoint**:
1. Create router in `lib/trpc/routers/my-feature.ts`
2. Add to `_app.ts` router
3. Use in components via `trpc.myFeature.myProcedure.useQuery()`

**Example**:
```typescript
// lib/trpc/routers/my-feature.ts
import { router, publicProcedure } from '../server';
import { z } from 'zod';

export const myFeatureRouter = router({
  getData: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      return { id: input.id, data: 'some data' };
    }),
});
```

See [GUIDE.trpc-api-development.md](docs/guides/GUIDE.trpc-api-development.md) for complete guide.

### Drizzle ORM (Database)

- **Location**: `lib/db/`
- **Schema**: `lib/db/schema.ts`
- **Connection**: `lib/db/index.ts`
- **Migrations**: `lib/db/migrate.ts`

**Supported Databases**:
- SQLite (default) - Good for development
- PostgreSQL - Recommended for production
- MySQL - Also supported

**Configuration**: Set in `.env`:
```env
DATABASE_PROVIDER=sqlite
DATABASE_URL=./dev.db
```

**Creating Tables**:
```typescript
// lib/db/schema.ts
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

See [GUIDE.database-development.md](docs/guides/GUIDE.database-development.md) for complete guide.

### ShadCN UI Components

- **Location**: `components/ui/`
- **Installation**: Components added via `npx shadcn-ui@latest add [component]`
- **Customization**: Modify in `components/ui/` after installation
- **Theming**: Configure in `app/globals.css` (CSS variables)

**Key Components**:
- Button, Card, Input, Select, Dialog, Table, Form
- All components are TypeScript and use Radix UI primitives
- Fully customizable with Tailwind CSS

See [GUIDE.component-usage.md](docs/guides/GUIDE.component-usage.md) for usage patterns.

### Tailwind CSS

- **Configuration**: `tailwind.config.ts`
- **Global Styles**: `app/globals.css`
- **Color System**: Violet/purple theme (see globals.css)
- **Dark Mode**: Dark mode by default

**Color Palette**:
- Primary: Violet gradient (`violet-600` to `purple-600`)
- Background: Dark (`gray-900`, `gray-800`)
- Text: Light (`white`, `gray-200`, `gray-300`)
- Accent: Violet with opacity (`violet-500/10`)

See [GUIDE.styling-conventions.md](docs/guides/GUIDE.styling-conventions.md) for patterns.

## Common Development Tasks

### Creating a New Page

1. Create `app/[route]/page.tsx`
2. Use `AppLayout` wrapper
3. Add navigation items
4. Use `ContentSection` for content
5. Add tRPC queries if needed

**Example**:
```typescript
"use client";

import { AppLayout } from "@/components/layouts";
import { ContentSection } from "@/components/layouts";
import { trpc } from "@/lib/trpc/client";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon /> },
  { label: "My Page", href: "/my-page", icon: <PageIcon /> },
];

export default function MyPage() {
  const { data, isLoading } = trpc.example.getData.useQuery();

  return (
    <AppLayout title="My Page" navItems={navItems}>
      <ContentSection title="Content">
        {isLoading ? "Loading..." : data}
      </ContentSection>
    </AppLayout>
  );
}
```

See [GUIDE.creating-pages.md](docs/guides/GUIDE.creating-pages.md) for complete guide.

### Creating a New Component

1. Create in appropriate directory (`components/[feature]/`)
2. Define props interface (TypeScript)
3. Export interface with component
4. Use layout components for structure
5. Add to `index.ts` for barrel export

**Example**:
```typescript
// components/my-feature/MyComponent.tsx
export interface MyComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
}

export const MyComponent: React.FC<MyComponentProps> = ({
  title,
  description,
  onClick,
}) => {
  return (
    <div onClick={onClick}>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
    </div>
  );
};
```

See [PATTERNS.typescript.md](docs/guides/PATTERNS.typescript.md) for TypeScript patterns.

### Creating a New API Endpoint

1. Create router in `lib/trpc/routers/`
2. Define procedures with Zod validation
3. Add router to `_app.ts`
4. Use in components via tRPC client

**Example**:
```typescript
// lib/trpc/routers/users.ts
import { router, publicProcedure } from '../server';
import { z } from 'zod';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';

export const usersRouter = router({
  list: publicProcedure.query(async () => {
    return await db.select().from(users);
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
    }))
    .mutation(async ({ input }) => {
      return await db.insert(users).values(input);
    }),
});
```

See [GUIDE.trpc-api-development.md](docs/guides/GUIDE.trpc-api-development.md) for complete guide.

### Adding Database Tables

1. Define schema in `lib/db/schema.ts`
2. Generate migration: `npm run db:generate`
3. Run migration: `npm run db:migrate`
4. Use in tRPC routers or server components

See [GUIDE.database-development.md](docs/guides/GUIDE.database-development.md) for complete guide.

## File Naming Conventions

### Components
- **PascalCase**: `UserProfile.tsx`, `TaskCard.tsx`
- **Location**: `components/[feature]/ComponentName.tsx`

### Utilities
- **kebab-case**: `filter-utils.ts`, `storage-utils.ts`
- **Location**: `lib/utils/utility-name.ts`

### Types
- **kebab-case**: `project-management.ts`, `documentation.ts`
- **Location**: `lib/types/type-name.ts`

### Pages
- **Next.js conventions**: `page.tsx`, `layout.tsx`, `route.ts`
- **Routes**: Use kebab-case for route segments (`/project-management`)

See [PATTERNS.code-organization.md](docs/guides/PATTERNS.code-organization.md) for complete conventions.

## TypeScript Patterns

### Required Patterns

1. **Always define explicit props interfaces**
2. **Export all props interfaces**
3. **Type children as `React.ReactNode`**
4. **Never use `any` type**
5. **Use optional chaining for nested properties**
6. **Data flows down (props), events flow up (callbacks)**

**Example**:
```typescript
export interface CardProps {
  title: string;
  description?: string;
  variant?: "default" | "primary";
  children?: React.ReactNode;
  onClose?: () => void;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  variant = "default",
  children,
  onClose,
}) => {
  // Implementation
};
```

See [PATTERNS.typescript.md](docs/guides/PATTERNS.typescript.md) for complete patterns.

## Component Patterns

### Layout Components (Mandatory)

- **AppLayout**: Use for all pages with navigation
- **PageLayout**: Use for standalone pages
- **ContentSection**: Use for content blocks
- **GridLayout**: Use for responsive grids

**Example**:
```typescript
<AppLayout title="My Page" navItems={navItems}>
  <ContentSection title="Section 1" variant="primary">
    Primary content
  </ContentSection>
  
  <GridLayout columns={{ md: 2, lg: 3 }}>
    <ContentSection>Card 1</ContentSection>
    <ContentSection>Card 2</ContentSection>
    <ContentSection>Card 3</ContentSection>
  </GridLayout>
</AppLayout>
```

See [PATTERNS.components.md](docs/guides/PATTERNS.components.md) for complete patterns.

## Task Management System

### Overview

Tasks are managed using JSON Schema-compliant files in `projects/[project-name]/tasks/`.

### Task Structure

```json
{
  "id": "1",
  "title": "Task Title",
  "description": "Brief description",
  "details": "Detailed implementation notes",
  "status": "pending",  // pending | in_progress | completed | blocked
  "priority": "high",   // low | medium | high
  "dependencies": [],   // Array of task IDs
  "testStrategy": "How to verify completion",
  "subtasks": []        // Nested subtasks
}
```

### Using Tasks

1. Review tasks in `projects/[project-name]/tasks/`
2. Select task with no pending dependencies
3. Update status to `in_progress`
4. Complete work
5. Update status to `completed`

See [README.task-management.md](docs/development/README.task-management.md) for complete guide.

## Testing and Validation

### Pre-Commit Checklist

- [ ] Code follows TypeScript patterns
- [ ] Components use proper interfaces
- [ ] No `any` types used
- [ ] All imports resolved
- [ ] Type checking passes (`npm run type-check`)
- [ ] Linting passes (`npm run lint`)
- [ ] Build succeeds (`npm run build`)
- [ ] Documentation updated if needed

### Running Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build

# All checks
npm run type-check && npm run lint && npm run build
```

## Common Issues and Solutions

### Build Errors

**Problem**: TypeScript errors during build
- **Solution**: Run `npm run type-check` to see detailed errors
- **Check**: Props interfaces defined correctly
- **Check**: All imports exist and are typed

### tRPC Errors

**Problem**: tRPC endpoint not found
- **Solution**: Ensure router added to `_app.ts`
- **Check**: Router exported correctly
- **Check**: Client/server setup matches

### Database Errors

**Problem**: Database connection issues
- **Solution**: Check `.env` file configuration
- **Check**: `DATABASE_PROVIDER` and `DATABASE_URL` set correctly
- **Check**: Database exists and is accessible

### Component Errors

**Problem**: Component not rendering
- **Solution**: Check props interface matches usage
- **Check**: Required props provided
- **Check**: Client component has `"use client"` directive

## Best Practices

### For AI Agents

1. **Read guides before coding** - Understand patterns first
2. **Follow TypeScript patterns** - No shortcuts with `any`
3. **Use existing components** - Don't recreate layout components
4. **Validate with Zod** - Always validate tRPC inputs
5. **Handle loading states** - Use loaders for async data
6. **Update documentation** - Keep docs current with changes
7. **Test locally** - Run type-check, lint, and build before committing

### Code Quality

- **Type safety**: Leverage TypeScript fully
- **Component composition**: Reuse existing components
- **Error handling**: Always handle errors gracefully
- **Loading states**: Show loaders during async operations
- **Accessibility**: Use semantic HTML and ARIA attributes

### Documentation

- **Follow templates**: Use templates from `docs/templates/`
- **YAML front matter**: Include complete metadata
- **Link related docs**: Use `related_docs` in front matter
- **Keep updated**: Update docs when code changes

## Getting Help

### Documentation Resources

- **Guides**: Check `docs/guides/` for how-to documentation
- **Development**: Check `docs/development/` for project-specific info
- **Templates**: Check `docs/templates/` for documentation templates

### Example Code

- **Pages**: Review `app/page.tsx` and `app/project-management/page.tsx`
- **Components**: Review `components/layouts/` for examples
- **tRPC**: Review `lib/trpc/routers/` for API examples
- **Database**: Review `lib/db/schema.ts` for schema examples

### Template Project

- **PRD**: `projects/template-project/PRD.txt` - Real-world PRD example
- **Plans**: `projects/template-project/plans/` - Project planning example
- **Tasks**: `projects/template-project/tasks/` - Task management example
- **Resources**: `projects/template-project/resources/` - Resource organization

## Quick Reference

### Essential Files

```
app/layout.tsx                 # Root layout
app/page.tsx                   # Homepage
app/globals.css                # Global styles
lib/trpc/routers/_app.ts       # Main tRPC router
lib/db/schema.ts               # Database schema
components/layouts/index.ts    # Layout components
components/ui/                 # UI components
```

### Essential Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # ESLint validation
npm run db:generate  # Generate migrations
npm run db:migrate   # Run migrations
npm run db:studio    # Open database UI
```

### Essential Patterns

```typescript
// Page structure
<AppLayout title="Title" navItems={navItems}>
  <ContentSection title="Section">Content</ContentSection>
</AppLayout>

// Props interface
export interface MyProps {
  required: string;
  optional?: string;
}

// tRPC query
const { data, isLoading } = trpc.feature.getData.useQuery();

// Database query
const data = await db.select().from(table);
```

---

**This guide is your starting point.** Read the linked guides for detailed information on each topic. The project is designed to be intuitive for AI agents with comprehensive documentation throughout.
