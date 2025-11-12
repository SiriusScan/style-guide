---
title: "Component Usage Guide"
description: "Comprehensive guide to using layout components, UI components, loaders, and form patterns in the Sirius design system."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["components", "ui", "layouts", "forms", "loaders"]
categories: ["guides", "ui-design"]
difficulty: "beginner"
prerequisites: ["react", "typescript"]
related_docs:
  - "../guides/PATTERNS.components.md"
  - "../guides/GUIDE.creating-pages.md"
  - "../guides/GUIDE.styling-conventions.md"
dependencies: []
llm_context: "high"
search_keywords: ["components", "ui components", "layout components", "loaders", "forms"]
---

# Component Usage Guide

## Purpose

This guide explains when and how to use each component in the Sirius design system, including layout components, UI components, loaders, and form patterns.

## Layout Components

### AppLayout

**Use for all pages that need header and sidebar navigation.**

```typescript
import { AppLayout } from "@/components/layouts";

export default function MyPage() {
  return (
    <AppLayout 
      title="My Page"
      navItems={navItems}
      headerActions={<Button>Action</Button>}
    >
      {/* Page content */}
    </AppLayout>
  );
}
```

**Key Features:**
- Responsive sidebar navigation
- Header with title and actions
- Mobile-friendly hamburger menu
- Custom sidebar content support

**Props:**
- `title` - Page title in header
- `navItems` - Navigation items array
- `headerActions` - Optional header buttons/actions
- `sidebarContent` - Custom sidebar (overrides navItems)
- `showSidebar` - Toggle sidebar visibility
- `showHeader` - Toggle header visibility
- `contentClassName` - Custom content area styling

### PageLayout

**Use for standalone pages without navigation.**

```typescript
import { PageLayout } from "@/components/layouts";

export default function StandalonePage() {
  return (
    <PageLayout 
      title="Standalone Page"
      description="Page description"
    >
      {/* Content */}
    </PageLayout>
  );
}
```

### ContentSection

**Use for organizing content into sections.**

```typescript
import { ContentSection } from "@/components/layouts";

<ContentSection 
  title="Section Title"
  description="Optional description"
  variant="primary" // "primary" | "default"
  className="custom-class"
>
  {/* Section content */}
</ContentSection>
```

**Variants:**
- `default` - Standard section styling
- `primary` - Emphasized section with different background

### GridLayout

**Use for responsive grid layouts.**

```typescript
import { GridLayout } from "@/components/layouts";

<GridLayout 
  columns={{ md: 2, lg: 3 }} 
  gap="md" // "sm" | "md" | "lg"
>
  <ContentSection>Card 1</ContentSection>
  <ContentSection>Card 2</ContentSection>
  <ContentSection>Card 3</ContentSection>
</GridLayout>
```

## UI Components

### Button

**Standard button component with variants.**

```typescript
import { Button } from "@/components/ui/button";

<Button variant="default" size="default">
  Click Me
</Button>

<Button variant="outline" size="sm">
  Outline Button
</Button>

<Button variant="destructive" size="lg">
  Delete
</Button>
```

**Variants:**
- `default` - Primary violet gradient button
- `destructive` - Red button for dangerous actions
- `outline` - Outlined button with violet border
- `secondary` - Gray button with violet accent
- `ghost` - Transparent button with hover effects
- `link` - Link-style button

**Sizes:**
- `sm` - Small button
- `default` - Default size
- `lg` - Large button
- `icon` - Square icon button

### Card

**Container for grouped content.**

```typescript
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Input

**Text input fields.**

```typescript
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="Enter email" />
</div>
```

### Select

**Dropdown select component.**

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Dialog

**Modal dialogs.**

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content</p>
  </DialogContent>
</Dialog>
```

### Table

**Data tables.**

```typescript
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>john@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Loader Components

### ActiveConstellationV2Loader

**Use for all loading states.**

```typescript
import { ActiveConstellationV2Loader } from "@/components/loaders";

// Full-page loading
<div className="flex min-h-screen items-center justify-center">
  <ActiveConstellationV2Loader size="xl" speed={1} />
</div>

// Section loading
{isLoading ? (
  <div className="flex justify-center py-12">
    <ActiveConstellationV2Loader size="lg" />
  </div>
) : (
  <DataDisplay data={data} />
)}
```

**Sizes:**
- `sm` - Small loader
- `md` - Medium loader
- `lg` - Large loader
- `xl` - Extra large loader

**Props:**
- `size` - Loader size
- `speed` - Animation speed (default: 1)

### LoaderWrapper

**Wrapper for loading states with error handling.**

```typescript
import { LoaderWrapper } from "@/components/loaders";

<LoaderWrapper 
  isLoading={isLoading}
  error={error}
  empty={!data}
  emptyMessage="No data available"
>
  <DataDisplay data={data} />
</LoaderWrapper>
```

## Form Patterns

### React Hook Form Integration

**Standard form pattern with validation.**

```typescript
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Handle form submission
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Component Composition Patterns

### Combining Layout Components

```typescript
<AppLayout title="Dashboard" navItems={navItems}>
  <div className="space-y-6">
    <ContentSection title="Overview" variant="primary">
      <GridLayout columns={{ md: 2, lg: 4 }}>
        <MetricCard label="Total" value={100} />
        <MetricCard label="Active" value={50} />
        <MetricCard label="Pending" value={30} />
        <MetricCard label="Completed" value={20} />
      </GridLayout>
    </ContentSection>

    <ContentSection title="Recent Activity">
      <Table>
        {/* Table content */}
      </Table>
    </ContentSection>
  </div>
</AppLayout>
```

### Loading States Pattern

```typescript
export default function DataPage() {
  const { data, isLoading, error } = trpc.data.list.useQuery();

  return (
    <AppLayout title="Data" navItems={navItems}>
      {isLoading ? (
        <div className="flex justify-center py-12">
          <ActiveConstellationV2Loader size="lg" />
        </div>
      ) : error ? (
        <ContentSection title="Error" variant="destructive">
          <p>{error.message}</p>
        </ContentSection>
      ) : !data || data.length === 0 ? (
        <ContentSection title="No Data">
          <p>No items found</p>
        </ContentSection>
      ) : (
        <ContentSection title="Data">
          {/* Render data */}
        </ContentSection>
      )}
    </AppLayout>
  );
}
```

## Best Practices

1. **Always use AppLayout** for pages with navigation
2. **Use ContentSection** to organize content into logical sections
3. **Use GridLayout** for responsive card layouts
4. **Handle loading states** with ActiveConstellationV2Loader
5. **Use form components** from `@/components/ui/form` with react-hook-form
6. **Follow variant patterns** - use appropriate button variants
7. **Compose components** - combine layout and UI components effectively

## Related Documentation

- [Component Patterns](./PATTERNS.components.md) - Mandatory component patterns
- [Creating Pages](./GUIDE.creating-pages.md) - Page structure guide
- [Styling Conventions](./GUIDE.styling-conventions.md) - Styling guidelines

---

_Follow these patterns for consistent component usage across the application._



