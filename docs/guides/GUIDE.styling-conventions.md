---
title: "Styling Conventions Guide"
description: "Comprehensive guide to Tailwind CSS usage, color system, typography, spacing, and dark mode styling in the Sirius design system."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["styling", "tailwind", "css", "design-system", "colors"]
categories: ["guides", "ui-design"]
difficulty: "beginner"
prerequisites: ["tailwindcss", "css"]
related_docs:
  - "../guides/GUIDE.component-usage.md"
  - "../development/README.ui-style-guide.md"
dependencies: []
llm_context: "high"
search_keywords: ["styling", "tailwind", "css", "colors", "typography", "spacing", "dark mode"]
---

# Styling Conventions Guide

## Purpose

This guide covers Tailwind CSS usage patterns, color system, typography scale, spacing conventions, and dark mode considerations for the Sirius design system.

## Tailwind CSS Usage

### Utility-First Approach

Use Tailwind utility classes directly in components:

```typescript
<div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
  <h2 className="text-xl font-semibold text-white">Title</h2>
  <Button>Action</Button>
</div>
```

### Custom Classes

When patterns repeat, create custom classes in `app/globals.css`:

```css
.custom-card {
  @apply bg-gray-800 rounded-lg p-6 border border-violet-500/30;
}
```

## Color System

### Primary Colors

The Sirius design system uses a violet/purple color scheme:

```typescript
// Violet accent colors
className="bg-violet-500 text-white"
className="text-violet-400"
className="border-violet-500/50"

// Gradient backgrounds
className="bg-gradient-to-r from-violet-600 to-purple-600"
```

### CSS Variables

Use CSS variables for theme-aware colors:

```typescript
// Background colors
className="bg-background"      // Main background
className="bg-card"            // Card background
className="bg-primary"         // Primary color
className="bg-secondary"       // Secondary color
className="bg-muted"           // Muted background

// Text colors
className="text-foreground"    // Main text
className="text-muted-foreground"  // Muted text
className="text-primary-foreground"  // Text on primary
```

### Color Usage Patterns

```typescript
// Primary actions
<Button className="bg-violet-600 hover:bg-violet-700">Primary</Button>

// Secondary actions
<Button className="bg-gray-800 border border-violet-500/30">Secondary</Button>

// Destructive actions
<Button className="bg-red-600 hover:bg-red-700">Delete</Button>

// Accent elements
<div className="border-violet-500/50 bg-violet-500/10">Accent</div>
```

## Typography Scale

### Font Families

```typescript
// Sans-serif (default)
className="font-sans"

// Monospace
className="font-mono"
```

### Font Sizes

```typescript
className="text-xs"    // 12px
className="text-sm"    // 14px
className="text-base"  // 16px (default)
className="text-lg"    // 18px
className="text-xl"    // 20px
className="text-2xl"   // 24px
className="text-3xl"   // 30px
className="text-4xl"   // 36px
```

### Font Weights

```typescript
className="font-light"    // 300
className="font-normal"   // 400
className="font-medium"   // 500
className="font-semibold" // 600
className="font-bold"     // 700
```

### Typography Patterns

```typescript
// Page titles
<h1 className="text-3xl font-bold text-white">Page Title</h1>

// Section headings
<h2 className="text-xl font-semibold text-gray-200">Section</h2>

// Body text
<p className="text-base text-gray-300">Body text content</p>

// Muted text
<p className="text-sm text-muted-foreground">Helper text</p>

// Code
<code className="text-sm font-mono bg-violet-500/20 px-2 py-1 rounded">
  code
</code>
```

## Spacing Conventions

### Padding and Margin

```typescript
// Padding
className="p-1"   // 4px
className="p-2"   // 8px
className="p-4"   // 16px
className="p-6"   // 24px
className="p-8"   // 32px

// Margin
className="m-4"   // 16px
className="mt-4"  // margin-top
className="mb-4"  // margin-bottom
className="mx-4"  // margin horizontal
className="my-4"  // margin vertical
```

### Gap (for flex/grid)

```typescript
className="gap-2"  // 8px
className="gap-4"  // 16px
className="gap-6"  // 24px
className="gap-8"  // 32px
```

### Spacing Patterns

```typescript
// Card spacing
<div className="p-6 space-y-4">
  <h3>Title</h3>
  <p>Content</p>
</div>

// Section spacing
<div className="space-y-6">
  <ContentSection>Section 1</ContentSection>
  <ContentSection>Section 2</ContentSection>
</div>

// Grid spacing
<GridLayout columns={{ md: 2 }} gap="md">
  {/* Cards */}
</GridLayout>
```

## Dark Mode

### Default Dark Theme

The application uses dark mode by default:

```typescript
// Root layout sets dark class
<html lang="en" className="dark">
```

### Dark Mode Colors

```typescript
// Dark backgrounds
className="bg-gray-900"      // Darkest
className="bg-gray-800"      // Dark
className="bg-gray-700"      // Medium dark

// Dark text
className="text-white"       // Primary text
className="text-gray-200"    // Secondary text
className="text-gray-300"    // Tertiary text
className="text-gray-400"    // Muted text
```

### Opacity Patterns

Use opacity for subtle effects:

```typescript
className="bg-violet-500/10"      // 10% opacity
className="bg-violet-500/20"      // 20% opacity
className="border-violet-500/50"   // 50% opacity
className="text-gray-400/80"      // 80% opacity
```

## Shadows

### Shadow Patterns

```typescript
// Subtle shadow
className="shadow-sm"

// Default shadow
className="shadow-md"

// Large shadow
className="shadow-lg"

// Colored shadows (violet theme)
className="shadow-lg shadow-violet-500/20"
className="shadow-xl shadow-violet-500/30"
```

## Borders

### Border Patterns

```typescript
// Standard border
className="border border-gray-700"

// Violet accent border
className="border border-violet-500/50"

// Rounded corners
className="rounded-md"   // 6px
className="rounded-lg"   // 8px
className="rounded-xl"   // 12px
className="rounded-full" // Full circle
```

## Responsive Design

### Breakpoints

```typescript
// Mobile first approach
className="text-sm md:text-base lg:text-lg"

// Responsive grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Responsive spacing
className="p-4 md:p-6 lg:p-8"
```

### Common Responsive Patterns

```typescript
// Responsive text
<h1 className="text-2xl md:text-3xl lg:text-4xl">Title</h1>

// Responsive layout
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Left</div>
  <div className="w-full md:w-1/2">Right</div>
</div>

// Responsive visibility
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

## Custom Component Styling

### Component Variants

Use `class-variance-authority` for component variants:

```typescript
import { cva } from "class-variance-authority";

const cardVariants = cva(
  "rounded-lg p-6", // Base classes
  {
    variants: {
      variant: {
        default: "bg-gray-800 border border-gray-700",
        primary: "bg-violet-500/10 border border-violet-500/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
```

### Custom CSS Variables

Define custom variables in `app/globals.css`:

```css
:root {
  --custom-spacing: 1.5rem;
  --custom-radius: 0.75rem;
}
```

Use in components:

```typescript
<div style={{ padding: 'var(--custom-spacing)' }}>
  Content
</div>
```

## Animation Classes

### Transition Patterns

```typescript
// Smooth transitions
className="transition-all duration-200"

// Hover effects
className="hover:bg-violet-500/10 transition-colors"

// Focus states
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
```

### Custom Animations

Reference animation classes from `app/globals.css`:

```css
@keyframes loader-orbit
@keyframes circuit-pulse-strong
@keyframes scanning
@keyframes shimmer
@keyframes pulse-glow
@keyframes fade-in-up
```

## Best Practices

1. **Use Tailwind utilities** - Prefer utility classes over custom CSS
2. **Follow color system** - Use violet/purple theme consistently
3. **Consistent spacing** - Use spacing scale (4px increments)
4. **Dark mode first** - Design for dark mode by default
5. **Responsive design** - Mobile-first approach
6. **Semantic colors** - Use CSS variables for theme-aware colors
7. **Opacity for subtlety** - Use opacity for layered effects
8. **Shadows for depth** - Use colored shadows matching theme

## Related Documentation

- [Component Usage Guide](./GUIDE.component-usage.md) - Component styling patterns
- [UI Style Guide](../development/README.ui-style-guide.md) - Design system reference

---

_Follow these conventions for consistent styling across the application._



