---
title: "Component Patterns Guide"
description: "Mandatory component patterns and usage examples for consistent UI development using Sirius design system."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-08"
author: "Project Team"
tags: ["components", "patterns", "layouts", "ui", "react"]
categories: ["development", "ui-design"]
difficulty: "beginner"
prerequisites: ["react", "typescript"]
related_docs:
  - "PATTERNS.typescript.md"
  - "README.ui-style-guide.md"
dependencies: []
llm_context: "high"
search_keywords: ["component patterns", "layout patterns", "ui components", "sirius design"]
---

# Component Patterns Guide

## Purpose

This document defines **mandatory** component usage patterns for this project. All UI development must follow these patterns.

## Layout Components

### PageLayout

**Use for all full-page views.**

```typescript
import { PageLayout } from "@/components/layouts";

export default function DashboardPage() {
  return (
    <PageLayout 
      title="Dashboard"
      description="View your scanner metrics and recent activity"
    >
      {/* Page content */}
    </PageLayout>
  );
}
```

### ContentSection

**Use for content blocks within pages.**

```typescript
import { PageLayout, ContentSection } from "@/components/layouts";

export default function MetricsPage() {
  return (
    <PageLayout title="Metrics">
      <ContentSection 
        title="Recent Scans"
        description="Your last 10 vulnerability scans"
        variant="primary"
      >
        {/* Content */}
      </ContentSection>
      
      <ContentSection title="Statistics">
        {/* More content */}
      </ContentSection>
    </PageLayout>
  );
}
```

### GridLayout

**Use for grid-based layouts.**

```typescript
import { GridLayout, ContentSection } from "@/components/layouts";

export default function CardsPage() {
  return (
    <PageLayout title="Overview">
      <GridLayout columns={{ md: 2, lg: 3 }} gap="md">
        <ContentSection title="Card 1">Content</ContentSection>
        <ContentSection title="Card 2">Content</ContentSection>
        <ContentSection title="Card 3">Content</ContentSection>
      </GridLayout>
    </PageLayout>
  );
}
```

## Loader Components

### ActiveConstellationV2Loader

**Use for all loading states.**

```typescript
import { ActiveConstellationV2Loader } from "@/components/loaders";

// Full-page loading
<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
  <ActiveConstellationV2Loader size="xl" />
</div>

// Section loading
<ContentSection>
  {isLoading ? (
    <ActiveConstellationV2Loader size="lg" />
  ) : (
    <DataDisplay data={data} />
  )}
</ContentSection>
```

## Complete Page Example

```typescript
import { PageLayout, ContentSection, GridLayout } from "@/components/layouts";
import { ActiveConstellationV2Loader } from "@/components/loaders";
import { trpc } from "@/lib/trpc/client";

export default function ScansPage() {
  const { data: scans, isLoading } = trpc.scans.list.useQuery();

  return (
    <PageLayout 
      title="Vulnerability Scans"
      description="Manage and monitor your security scans"
    >
      {/* Summary Section */}
      <ContentSection 
        title="Overview"
        variant="primary"
      >
        <p>Total Scans: {scans?.length ?? 0}</p>
      </ContentSection>

      {/* Scans Grid */}
      <ContentSection title="Recent Scans" className="mt-6">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <ActiveConstellationV2Loader size="lg" />
          </div>
        ) : (
          <GridLayout columns={{ md: 2, lg: 3 }}>
            {scans?.map(scan => (
              <ScanCard key={scan.id} scan={scan} />
            ))}
          </GridLayout>
        )}
      </ContentSection>
    </PageLayout>
  );
}
```

## CSS Classes

### Scanner Sections

```css
/* Base section */
.scanner-section

/* Primary/important section */
.scanner-section-primary

/* Interactive/hoverable section */
.scanner-section-hover

/* Divider between sections */
.scanner-divider
```

### Background Pattern

```css
/* Hex grid pattern background */
.hex-grid-pattern
```

## Animation Classes

```css
@keyframes loader-orbit     /* Orbital rotation */
@keyframes circuit-pulse-strong  /* Pulsing circuit */
@keyframes scanning         /* Scanning animation */
@keyframes shimmer         /* Shimmer effect */
@keyframes pulse-glow      /* Glowing pulse */
@keyframes fade-in-up      /* Fade in from bottom */
```

---

_All components must follow these patterns for consistency._


