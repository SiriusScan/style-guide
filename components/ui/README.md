# UI Components

This directory contains ShadCN UI components integrated from the Sirius UI project.

## Integrated Components

All 22 ShadCN UI components have been successfully ported from Sirius UI:

- **Alert** - Alert messages with variants
- **Avatar** - User avatar with image and fallback
- **Badge** - Status badges with multiple variants
- **Button** - Button component with multiple variants and sizes
- **Card** - Card container with header, content, and footer
- **Checkbox** - Checkbox input component
- **Context Menu** - Right-click context menu
- **Dialog** - Modal dialog component
- **Dropdown Menu** - Dropdown menu component
- **Form** - Form components with React Hook Form integration
- **Input** - Text input field
- **Label** - Form label component
- **Popover** - Popover component
- **Select** - Select dropdown component
- **Skeleton** - Loading skeleton component
- **Slider** - Range slider component
- **Sonner** - Toast notification component
- **Switch** - Toggle switch component
- **Table** - Table component with header, body, and footer
- **Tabs** - Tab navigation component
- **Textarea** - Multi-line text input
- **Tooltip** - Tooltip component

## Component Showcase

View all components in action at `/components-overview` page.

## Usage

Import components from `@/components/ui`:

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

## Dependencies

These components require the following dependencies (check `package.json`):

### Required Radix UI Packages

- `@radix-ui/react-avatar`
- `@radix-ui/react-checkbox`
- `@radix-ui/react-context-menu`
- `@radix-ui/react-dialog`
- `@radix-ui/react-dropdown-menu`
- `@radix-ui/react-label`
- `@radix-ui/react-popover`
- `@radix-ui/react-select`
- `@radix-ui/react-slider`
- `@radix-ui/react-slot`
- `@radix-ui/react-switch`
- `@radix-ui/react-tabs`
- `@radix-ui/react-tooltip`

### Other Required Packages

- `react-hook-form` (for Form components)
- `sonner` (for Sonner toast notifications)
- `lucide-react` (for icons)
- `class-variance-authority` (for variant management)
- `clsx` and `tailwind-merge` (for className utilities)

## Installation

If dependencies are missing, install them:

```bash
npm install @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover @radix-ui/react-select @radix-ui/react-slider @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip react-hook-form sonner
```

## Custom Components

Project-specific custom components should be placed in `components/` directory (not in `ui/`).

---

_All components have been integrated from Sirius UI and are ready to use. Visit `/components-overview` to see them in action._
