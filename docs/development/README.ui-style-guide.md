---
title: "UI Style Guide Template"
description: "Template for documenting design system, including colors, typography, spacing, components, and design patterns. This guide serves as a starting point for project-specific style documentation."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-03"
author: "Project Team"
tags: ["ui", "design-system", "style-guide", "components", "tailwind", "shadcn"]
categories: ["development", "ui-design"]
difficulty: "intermediate"
prerequisites: ["tailwindcss", "react", "typescript"]
related_docs:
  - "ABOUT.documentation.md"
dependencies:
  - "tailwind.config.ts"
  - "app/globals.css"
llm_context: "high"
search_keywords:
  [
    "ui style guide",
    "design system",
    "components",
    "tailwind config",
    "component patterns",
    "design tokens",
  ]
---

# UI Style Guide

## Purpose

This document defines the design system for this project. It serves as the authoritative reference for developers, designers, and teams working on UI-related work. The style guide documents colors, typography, spacing, components, animations, and design patterns used throughout the application.

## When to Use

- **Before starting new UI development** - Understand the design system first
- **When creating new components** - Ensure consistency with existing patterns
- **When styling new pages** - Reference color, typography, and spacing guidelines
- **During code reviews** - Verify UI implementations match style guide
- **When building component libraries** - Use documented design tokens and patterns
- **For design decisions** - Reference established patterns before creating new ones

## How to Use

1. **Start with the Design System Overview** - Understand the design philosophy
2. **Reference Color System** - Use documented colors for consistency
3. **Follow Typography Guidelines** - Use established text styles
4. **Apply Spacing Patterns** - Use documented spacing scale
5. **Use Component Patterns** - Reference component library and custom patterns
6. **Apply Design Tokens** - Use documented values for borders, shadows, etc.

### Quick Reference

```bash
# Key files for style reference
tailwind.config.ts          # Color system and design tokens
app/globals.css             # CSS variables and custom classes
components/ui/              # Component library
```

## What It Is

### Design System Overview

[Describe your design system philosophy and core principles. Examples:]

- **Theme approach** - Light mode, dark mode, or both
- **Color philosophy** - Primary brand colors and accent colors
- **Visual style** - Minimalist, glassmorphism, material design, etc.
- **Component foundation** - ShadCN UI, Material UI, custom, etc.
- **CSS framework** - Tailwind CSS, CSS modules, styled-components, etc.

### Color System

#### Primary Color Palette

[Document your primary color scheme:]

- `primary`: [Color value and usage]
- `secondary`: [Color value and usage]
- `background`: [Color value and usage]
- `foreground`: [Color value and usage]
- `accent`: [Color value and usage]

#### CSS Variables

[Document CSS variables for theming:]

```css
:root {
  --background: [value];
  --foreground: [value];
  --primary: [value];
  --secondary: [value];
  /* Add more variables as needed */
}
```

#### Semantic Colors

[Document semantic color usage:]

- **Success States**: [Colors and usage]
- **Error/Critical States**: [Colors and usage]
- **Warning States**: [Colors and usage]
- **Info States**: [Colors and usage]

### Typography

#### Font Families

[Document font choices:]

- **Primary**: [Font stack]
- **Monospace**: [Font stack for code]

#### Type Scale

[Document text sizes:]

- **xs**: [Size] - [Usage]
- **sm**: [Size] - [Usage]
- **base**: [Size] - [Usage]
- **lg**: [Size] - [Usage]
- **xl**: [Size] - [Usage]
- **2xl**: [Size] - [Usage]
- **3xl**: [Size] - [Usage]

#### Font Weights

[Document available weights and usage:]

- **normal**: [Weight] - [Usage]
- **medium**: [Weight] - [Usage]
- **semibold**: [Weight] - [Usage]
- **bold**: [Weight] - [Usage]

### Spacing & Layout

#### Spacing Scale

[Document spacing system:]

- **xs**: [Value] - [Usage]
- **sm**: [Value] - [Usage]
- **md**: [Value] - [Usage]
- **lg**: [Value] - [Usage]
- **xl**: [Value] - [Usage]

#### Padding Patterns

[Document common padding patterns:]

- **Card Padding**: [Values]
- **Section Padding**: [Values]
- **Component Padding**: [Values]

#### Grid System

[Document grid patterns:]

- **Common Grid Patterns**: [Examples]
- **Grid Gaps**: [Values]

### Components

#### Component Library

[Document your component library foundation:]

- **Base Library**: [ShadCN UI, Material UI, etc.]
- **Custom Components**: [Location and purpose]
- **Component Patterns**: [Common usage patterns]

#### Custom Component Patterns

[Document project-specific component patterns:]

- **[Component Name]**: [Description and usage]
- **[Component Name]**: [Description and usage]

### Design Patterns

#### Card Patterns

[Document card styling patterns:]

- **Standard Cards**: [Styling approach]
- **Primary Cards**: [Styling approach]
- **Alert Cards**: [Styling approach]

#### Button Patterns

[Document button patterns:]

- **Primary Button**: [Styling]
- **Secondary Button**: [Styling]
- **Ghost Button**: [Styling]

#### Form Patterns

[Document form styling:]

- **Input Fields**: [Styling approach]
- **Select Dropdowns**: [Styling approach]
- **Form Layout**: [Layout patterns]

### Animations & Transitions

#### Custom Animations

[Document custom animations:]

- **[Animation Name]**: [Description and usage]

#### Transition Patterns

[Document transition patterns:]

- **Color Transitions**: [Approach]
- **Hover States**: [Styling]

### Design Tokens Reference

#### Border Radius

[Document border radius values:]

- **sm**: [Value] - [Usage]
- **md**: [Value] - [Usage]
- **lg**: [Value] - [Usage]

#### Shadow Values

[Document shadow system:]

- **Standard Shadows**: [Values]
- **Custom Shadows**: [Values]

#### Z-Index Scale

[Document z-index system:]

- **z-10**: [Usage]
- **z-20**: [Usage]
- **z-30**: [Usage]
- **z-50**: [Usage]

## Usage Guidelines

#### When to Use Which Component

[Guidelines for component selection:]

- **Buttons**: [When to use which variant]
- **Cards**: [When to use which type]
- **Forms**: [When to use which input type]

#### Best Practices

[Design and implementation best practices:]

- **Color Usage**: [Guidelines]
- **Spacing**: [Guidelines]
- **Typography**: [Guidelines]
- **Components**: [Guidelines]
- **Animations**: [Guidelines]

## Troubleshooting

### FAQ

**Q: Which color should I use for primary actions?**
A: [Answer with specific color values and usage]

**Q: How do I create consistent spacing?**
A: [Answer with spacing scale reference]

**Q: What component should I use for [use case]?**
A: [Answer with component selection guidance]

### Command Reference

```bash
# View Tailwind configuration
cat tailwind.config.ts

# View global styles
cat app/globals.css

# Search for component usage
grep -r "[ComponentName]" components/
```

### Common Issues and Solutions

| Issue                     | Symptoms              | Solution                                            |
| ------------------------- | --------------------- | --------------------------------------------------- |
| Colors don't match        | Inconsistent colors   | Use documented color values from tailwind.config.ts |
| Spacing inconsistent      | Uneven gaps           | Use spacing scale, avoid arbitrary values           |
| Components look different | Styling doesn't match | Check component library and verify custom classes   |

## Related Documentation

- **[ABOUT.documentation.md](../ABOUT.documentation.md)**: Documentation system standards
- **Component Library Documentation**: [Link to component docs]
- **Tailwind CSS Documentation**: [External link]

## LLM Context

This style guide documents the project's design system. Key concepts for AI understanding:

- **Design Philosophy**: [Core design principles]
- **Component Foundation**: [Base component library]
- **Design Tokens**: [Standardized values for colors, spacing, etc.]
- **Patterns**: [Common UI patterns and their usage]

When generating UI code, always reference this guide for:

- Color choices
- Spacing values
- Component selection
- Design patterns
- Animation usage

---

_This document follows the project Documentation Standard. For questions about documentation structure, see [ABOUT.documentation.md](../ABOUT.documentation.md)._



