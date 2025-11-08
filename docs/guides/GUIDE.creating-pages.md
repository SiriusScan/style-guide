---
title: "Creating Pages Guide"
description: "Step-by-step guide for creating new pages in Next.js App Router with proper layout structure, navigation integration, and data fetching patterns."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["nextjs", "pages", "routing", "app-router", "layout"]
categories: ["guides", "development"]
difficulty: "beginner"
prerequisites: ["nextjs", "react", "typescript"]
related_docs:
  - "../guides/GUIDE.component-usage.md"
  - "../guides/GUIDE.trpc-api-development.md"
  - "../guides/PATTERNS.code-organization.md"
dependencies: []
llm_context: "high"
search_keywords: ["create page", "nextjs pages", "app router", "routing", "page structure"]
---

# Creating Pages Guide

## Purpose

This guide walks you through creating new pages in the Next.js App Router, ensuring proper layout structure, navigation integration, and data fetching patterns.

## Quick Start

### 1. Create Page File

Create a new file in `app/` directory following the route structure:

```typescript
// app/my-feature/page.tsx
"use client"; // Required for client-side features (tRPC, state, etc.)

import { AppLayout } from "@/components/layouts";
import { Home as HomeIcon } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
  { label: "My Feature", href: "/my-feature", icon: <MyIcon className="h-5 w-5" /> },
];

export default function MyFeaturePage() {
  return (
    <AppLayout title="My Feature" navItems={navItems}>
      {/* Page content */}
    </AppLayout>
  );
}
```

## Required Structure

### Minimum Page Structure

Every page MUST include:

1. **AppLayout wrapper** - Provides consistent header and sidebar
2. **Navigation items** - Shared navigation across pages
3. **Page title** - Displayed in header
4. **Content sections** - Organized content blocks

### Example: Basic Page

```typescript
// app/example/page.tsx
"use client";

import { AppLayout } from "@/components/layouts";
import { ContentSection } from "@/components/layouts";
import { Home as HomeIcon, Package } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
  { label: "Example", href: "/example", icon: <Package className="h-5 w-5" /> },
];

export default function ExamplePage() {
  return (
    <AppLayout title="Example Page" navItems={navItems}>
      <ContentSection title="Welcome" variant="primary">
        <p>This is an example page.</p>
      </ContentSection>
    </AppLayout>
  );
}
```

## Real-World Examples

### Example 1: Home Page with tRPC

Reference: `app/page.tsx`

```typescript
"use client";

import { trpc } from "@/lib/trpc/client";
import { ActiveConstellationV2Loader } from "@/components/loaders";
import { AppLayout } from "@/components/layouts";
import { ContentSection } from "@/components/layouts";
import { Home as HomeIcon, Package, FolderKanban } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", icon: <HomeIcon className="h-5 w-5" /> },
  { label: "Components", href: "/components-overview", icon: <Package className="h-5 w-5" /> },
  { label: "Projects", href: "/project-management", icon: <FolderKanban className="h-5 w-5" /> },
];

export default function Home() {
  const { data: greeting, isLoading: greetingLoading } =
    trpc.example.hello.useQuery({ text: "World" });
  const { data: serverTime, isLoading: timeLoading } =
    trpc.example.getServerTime.useQuery();

  return (
    <AppLayout title="Sirius Scan Style Guide" navItems={navItems}>
      <div className="space-y-6">
        <ContentSection title="Style Guide Boilerplate" variant="primary">
          <p className="text-gray-300 text-lg">
            Opinionated starter template with Sirius design system
          </p>
        </ContentSection>

        {/* Loader Demo */}
        {(greetingLoading || timeLoading) && (
          <ContentSection title="Loading">
            <div className="flex justify-center py-8">
              <ActiveConstellationV2Loader size="xl" speed={1} />
            </div>
          </ContentSection>
        )}

        {/* Content Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          <ContentSection title="tRPC Example" variant="primary">
            <p className="text-gray-300">
              {greeting?.greeting || "Loading..."}
            </p>
          </ContentSection>

          <ContentSection title="Server Time" variant="primary">
            <p className="text-gray-300">{serverTime?.time || "Loading..."}</p>
          </ContentSection>
        </div>
      </div>
    </AppLayout>
  );
}
```

### Example 2: Complex Page with Sidebar

Reference: `app/project-management/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layouts';
import { ProjectSidebar } from '@/components/project-management/ProjectSidebar';
import { TaskViewer } from '@/components/project-management/TaskViewer';
import { getRefreshIntervalPreference } from '@/lib/utils/storage-utils';
import { Home as HomeIcon, Package, FolderKanban, Layout, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Home', href: '/', icon: <HomeIcon className="h-5 w-5" /> },
  { label: 'Components', href: '/components-overview', icon: <Package className="h-5 w-5" /> },
  { label: 'Projects', href: '/project-management', icon: <FolderKanban className="h-5 w-5" /> },
  { label: 'Documentation', href: '/documentation', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Layout Demo', href: '/app-layout-demo', icon: <Layout className="h-5 w-5" /> },
];

export default function ProjectManagementPage() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const refreshInterval = getRefreshIntervalPreference();

  return (
    <AppLayout
      title="Project Management"
      navItems={navItems}
      headerActions={
        <Link href="/">
          <Button variant="outline" size="sm">
            <HomeIcon className="h-4 w-4 mr-2" />
            Home
          </Button>
        </Link>
      }
      sidebarContent={
        <ProjectSidebar
          selectedProject={selectedProject}
          onProjectSelect={setSelectedProject}
        />
      }
      contentClassName="overflow-hidden p-0"
    >
      <div className="h-full overflow-hidden">
        <TaskViewer projectName={selectedProject} refreshInterval={refreshInterval} />
      </div>
    </AppLayout>
  );
}
```

## Layout Integration

### AppLayout Props

```typescript
interface AppLayoutProps {
  /** Page title shown in header */
  title?: string;
  /** Optional header actions (buttons, dropdowns, etc.) */
  headerActions?: React.ReactNode;
  /** Navigation items for sidebar */
  navItems?: NavItem[];
  /** Whether to show sidebar (default: true) */
  showSidebar?: boolean;
  /** Whether to show header (default: true) */
  showHeader?: boolean;
  /** Custom sidebar content (overrides navItems if provided) */
  sidebarContent?: React.ReactNode;
  /** Custom header content (overrides title/headerActions if provided) */
  headerContent?: React.ReactNode;
  /** Main page content */
  children: React.ReactNode;
  /** Additional className for main content area */
  contentClassName?: string;
  /** Sidebar width (default: 256px) */
  sidebarWidth?: string;
}
```

### Navigation Items

Navigation items should be consistent across pages:

```typescript
interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
}
```

## Metadata and SEO

### Static Metadata

For server components, use Next.js metadata:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page | Sirius Scan",
  description: "Page description for SEO",
};
```

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  return {
    title: `Item ${params.id} | Sirius Scan`,
  };
}
```

## Data Fetching Patterns

### tRPC Queries

```typescript
"use client";

import { trpc } from "@/lib/trpc/client";
import { ActiveConstellationV2Loader } from "@/components/loaders";

export default function DataPage() {
  const { data, isLoading, error } = trpc.example.getData.useQuery();

  if (isLoading) {
    return (
      <AppLayout title="Data Page" navItems={navItems}>
        <div className="flex justify-center py-12">
          <ActiveConstellationV2Loader size="lg" />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout title="Data Page" navItems={navItems}>
        <ContentSection title="Error" variant="destructive">
          <p>{error.message}</p>
        </ContentSection>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Data Page" navItems={navItems}>
      <ContentSection title="Data">
        {/* Render data */}
      </ContentSection>
    </AppLayout>
  );
}
```

### Multiple Queries

```typescript
export default function MultiDataPage() {
  const { data: data1, isLoading: loading1 } = trpc.example.getData1.useQuery();
  const { data: data2, isLoading: loading2 } = trpc.example.getData2.useQuery();

  const isLoading = loading1 || loading2;

  // Handle loading state
  if (isLoading) {
    return <ActiveConstellationV2Loader />;
  }

  // Render content
}
```

## Content Organization

### Using ContentSection

```typescript
<AppLayout title="My Page" navItems={navItems}>
  <div className="space-y-6">
    <ContentSection title="Primary Section" variant="primary">
      {/* Primary content */}
    </ContentSection>

    <ContentSection title="Secondary Section">
      {/* Secondary content */}
    </ContentSection>
  </div>
</AppLayout>
```

### Using GridLayout

```typescript
<AppLayout title="My Page" navItems={navItems}>
  <GridLayout columns={{ md: 2, lg: 3 }} gap="md">
    <ContentSection title="Card 1">Content</ContentSection>
    <ContentSection title="Card 2">Content</ContentSection>
    <ContentSection title="Card 3">Content</ContentSection>
  </GridLayout>
</AppLayout>
```

## File Naming Conventions

- **Page files**: `page.tsx` (Next.js App Router convention)
- **Route segments**: Use kebab-case (e.g., `my-feature/page.tsx`)
- **Component files**: PascalCase (e.g., `MyComponent.tsx`)

## Checklist

When creating a new page, ensure:

- [ ] Page file created in `app/[route]/page.tsx`
- [ ] Uses `AppLayout` wrapper
- [ ] Includes navigation items
- [ ] Has appropriate page title
- [ ] Handles loading states
- [ ] Handles error states
- [ ] Uses `ContentSection` for content blocks
- [ ] Follows TypeScript patterns (see PATTERNS.typescript.md)
- [ ] Uses tRPC for data fetching (if needed)
- [ ] Includes proper metadata (if server component)

## Related Documentation

- [Component Usage Guide](./GUIDE.component-usage.md) - Layout and UI components
- [tRPC API Development](./GUIDE.trpc-api-development.md) - Creating and using APIs
- [Code Organization Patterns](./PATTERNS.code-organization.md) - File structure standards

---

_Follow this guide to ensure consistent page structure across the application._

