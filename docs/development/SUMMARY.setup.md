---
title: "Style Guide Setup Summary"
description: "Summary of the opinionated boilerplate setup with Sirius design system, layout patterns, and TypeScript conventions."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["setup", "summary", "guide", "patterns"]
categories: ["project-management"]
difficulty: "beginner"
prerequisites: []
related_docs:
  - "../guides/PATTERNS.typescript.md"
  - "../guides/PATTERNS.components.md"
  - "README.ui-style-guide.md"
dependencies: []
llm_context: "high"
search_keywords: ["setup summary", "boilerplate guide", "getting started"]
---

# Style Guide Setup Summary

## What We Built

This boilerplate is now an **opinionated, production-ready starter** with:

### ✅ Sirius Design System
- **Color Scheme**: Violet/Purple gradient theme (light & dark modes)
- **Custom Animations**: Loader orbits, circuit pulses, scanning effects
- **Background Patterns**: Hex grid pattern for visual depth
- **Component Styles**: Scanner sections with backdrop blur and glow effects

### ✅ Loader Components
- **ActiveConstellationV2Loader**: Animated wolf logo with orbiting stars
- **LoaderWrapper**: Reusable wrapper with sizing and accessibility
- **Sizes**: xs, sm, md, lg, xl, full (16px to 240px)

### ✅ Layout Components (MANDATORY)
- **PageLayout**: Full-page wrapper with header and hex grid background
- **ContentSection**: Reusable content blocks with variants (default, primary, hover)
- **GridLayout**: Responsive grid container with configurable columns

### ✅ TypeScript Patterns (MANDATORY)
- **Explicit Props Interfaces**: All components must export props interfaces
- **Data Flow**: Props down, callbacks up
- **State Management**: Local state (useState), Server state (tRPC)
- **Type Safety**: No `any` types, proper nullability handling

### ✅ Component Patterns (MANDATORY)
- Standard page structure using PageLayout
- Content organization with ContentSection
- Grid-based layouts with GridLayout
- Loading states with ActiveConstellationV2Loader

## File Structure

```
style-guide/
├── app/
│   ├── globals.css           # Sirius color system + animations
│   └── page.tsx              # Demo homepage with Sirius styling
├── components/
│   ├── loaders/
│   │   ├── LoaderWrapper.tsx
│   │   ├── ActiveConstellationV2Loader.tsx
│   │   └── index.ts
│   ├── layouts/
│   │   ├── PageLayout.tsx
│   │   ├── ContentSection.tsx
│   │   ├── GridLayout.tsx
│   │   └── index.ts
│   └── ui/                  # ShadCN components
├── docs/
│   ├── guides/
│   │   ├── PATTERNS.typescript.md    # TypeScript patterns (mandatory)
│   │   └── PATTERNS.components.md    # Component patterns (mandatory)
│   └── development/
│       ├── README.ui-style-guide.md  # UI style guide
│       └── SUMMARY.setup.md          # This file
└── lib/
    ├── trpc/                # tRPC setup
    └── db/                  # Drizzle ORM setup
```

## Quick Start for Developers

### 1. Create a New Page

```typescript
import { PageLayout, ContentSection } from "@/components/layouts";

export default function MyPage() {
  return (
    <PageLayout title="My Feature" description="Feature description">
      <ContentSection title="Section 1" variant="primary">
        {/* Your content */}
      </ContentSection>
    </PageLayout>
  );
}
```

### 2. Show Loading State

```typescript
import { ActiveConstellationV2Loader } from "@/components/loaders";

{isLoading ? (
  <ActiveConstellationV2Loader size="lg" />
) : (
  <YourComponent data={data} />
)}
```

### 3. Create a Grid Layout

```typescript
import { GridLayout, ContentSection } from "@/components/layouts";

<GridLayout columns={{ md: 2, lg: 3 }} gap="md">
  <ContentSection title="Card 1">Content</ContentSection>
  <ContentSection title="Card 2">Content</ContentSection>
  <ContentSection title="Card 3">Content</ContentSection>
</GridLayout>
```

## Design Tokens

### Colors (HSL Format)

**Light Mode**:
- Background: `220 13% 100%`
- Foreground: `222.2 84% 4.9%`
- Primary: `222.2 47.4% 11.2%`
- Secondary: `238 34% 30%`
- Violet Accent: `263 70% 77%`

**Dark Mode**:
- Background: `234 26% 15%` (Deep purple)
- Foreground: `210 40% 98%`
- Primary: `210 40% 98%`
- Violet Accent: `263 70% 77%`

### Spacing Scale

```css
gap-3   /* 12px - small */
gap-6   /* 24px - medium */
gap-8   /* 32px - large */
```

### Border Radius

```css
--radius: 0.5rem     /* 8px base */
--radius-sm: 4px
--radius-md: 6px
--radius-lg: 8px
--radius-xl: 12px
```

## Animation Keyframes

```css
@keyframes loader-orbit           /* Orbit rotation for loader stars */
@keyframes circuit-pulse-strong   /* Orange circuit pulse */
@keyframes scanning               /* Horizontal scan animation */
@keyframes shimmer                /* Shimmer effect */
@keyframes pulse-glow             /* Violet glow pulse */
@keyframes fade-in-up             /* Fade in from bottom */
@keyframes icon-bounce            /* Icon bounce effect */
@keyframes scan-line              /* Vertical scan line */
```

## CSS Component Classes

```css
.hex-grid-pattern         /* Background hex grid */
.scanner-section          /* Base content section */
.scanner-section-primary  /* Primary/important section */
.scanner-section-hover    /* Interactive section */
.scanner-divider          /* Section divider */
```

## Rules & Conventions

### Component Development

1. **MUST use PageLayout** for all full-page views
2. **MUST use ContentSection** for content blocks
3. **MUST define explicit props interfaces** and export them
4. **MUST handle loading states** with ActiveConstellationV2Loader
5. **MUST type all props, state, and callbacks**

### Data Flow

1. **Props flow DOWN** from parent to child
2. **Events flow UP** via callback props
3. **Lift state** to lowest common ancestor
4. **Server state** via tRPC/React Query
5. **Local state** via useState for UI-only state

### TypeScript

1. **NO `any` types** - use proper interfaces
2. **Export all interfaces** - for type reusability
3. **Use optional chaining** - `user?.name ?? "N/A"`
4. **Type event handlers** - `(e: React.ChangeEvent<HTMLInputElement>)`
5. **Handle nullability** - explicit checks, no non-null assertions

## Testing

```bash
# Type check
npm run type-check

# Build test
npm run build

# Development server
npm run dev
```

## Next Steps

1. **Read the patterns**:
   - [TypeScript Patterns](../guides/PATTERNS.typescript.md)
   - [Component Patterns](../guides/PATTERNS.components.md)

2. **Review examples**:
   - Check `app/page.tsx` for Sirius styling example
   - Explore `components/layouts/` for usage patterns

3. **Start building**:
   - Use the layout components
   - Follow TypeScript patterns
   - Apply Sirius design tokens

---

_This is an opinionated boilerplate. Following these patterns is mandatory for consistency._


