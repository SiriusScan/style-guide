# Use Case Analysis: Two Different Workflows

## The Problem

The current documentation and commands conflate two distinct use cases:

### Use Case 1: **Starting a New Application** (Primary)
**What**: Developer wants to create a new standalone application using this boilerplate  
**Action**: Clone/copy the ENTIRE repository and customize it  
**Files**: Everything (`app/`, `components/`, `lib/`, etc.)  
**Result**: A brand new application (e.g., "my-saas-app", "customer-portal")

### Use Case 2: **Creating Sub-Projects** (Secondary/Internal)
**What**: Developer working WITHIN the boilerplate wants to organize multiple sub-projects  
**Action**: Copy `projects/template-project/` to create project folders  
**Files**: Just `projects/[name]/` directory  
**Result**: A project folder with PRD and tasks (organizational structure)

## Current State Confusion

### What `new-project.md` Currently Does
- ✅ Describes Use Case 2 (sub-project creation)
- ❌ Named as if it's Use Case 1 (new application)
- ❌ No guidance for Use Case 1 (the primary use case!)

### What Developers Actually Need First
1. **Use Case 1**: "How do I use this as a boilerplate for my new app?"
2. **Use Case 2**: "How do I organize multiple projects within my app?"

## Recommendation

### Option A: Rename and Create Two Commands (RECOMMENDED)

**New Command Structure:**
```
.opencode/command/
├── use-template.md          # NEW: How to use this repo as a boilerplate (Use Case 1)
└── create-subproject.md      # RENAMED: How to create project folders (Use Case 2)
```

**Benefits:**
- Crystal clear separation of concerns
- Primary use case gets prominence
- No confusion about what "new project" means

### Option B: Update `new-project.md` for Primary Use Case

Make `new-project.md` about Use Case 1, create separate command for Use Case 2

**Benefits:**
- "New project" matches what developers expect
- Simpler (one command does the main thing)

**Drawbacks:**
- Existing sub-project workflow loses its command
- Need to update all references

## Recommended Implementation

### 1. Create `use-template.md` (Primary Command)

**Purpose**: Guide developers through using this repository as their application boilerplate

**Content:**
- GitHub Template button instructions
- Or: `npx degit` command
- Run `npm install && npm run setup`
- Customize configuration
- Start building

**Target User**: Someone starting a brand new application

### 2. Rename `new-project.md` → `create-subproject.md`

**Purpose**: Guide developers through creating project organization folders WITHIN their app

**Content:**
- Copy `projects/template-project/`
- Set up PRD and task files
- Organize multiple initiatives

**Target User**: Someone already using the boilerplate who wants to organize work

### 3. Update Documentation Cross-References

**Files to Update:**
- `README.md` - Add prominent "Getting Started" section
- `QUICKSTART.md` - Already exists (good!)
- `projects/README.md` - Clarify this is for sub-project organization
- `docs/development/README.new-project.md` - Rename or clarify scope

## Decision Matrix

| Aspect | Use Case 1 (Application) | Use Case 2 (Sub-Project) |
|--------|-------------------------|--------------------------|
| **Frequency** | Once per app | Multiple times per app |
| **Importance** | Critical (first impression) | Optional (organizational) |
| **Complexity** | Medium (setup required) | Low (just copy folder) |
| **User Type** | New users | Experienced users |
| **Command Name** | `@use-template` or `@start-app` | `@create-subproject` |

## Proposed File Changes

### Create: `.opencode/command/use-template.md`

```markdown
---
description: Start a new application using this boilerplate template
agent: build
---

# Use This Template

## What This Does

Guides you through creating a NEW standalone application from this boilerplate.
This is the FIRST command you run when starting a new project.

## Steps

1. **Create from Template**
   - Click "Use this template" on GitHub
   - Or: `npx degit org/style-guide my-app`
   - Or: Clone and remove git history

2. **Install Dependencies**
   ```bash
   cd my-app
   npm install
   ```

3. **Run Setup Wizard**
   ```bash
   npm run setup
   ```
   
4. **Start Development**
   ```bash
   npm run dev
   ```

See QUICKSTART.md for details.
```

### Rename: `.opencode/command/new-project.md` → `create-subproject.md`

Update the description to clarify this is for INTERNAL project organization.

### Update: `README.md`

Add clear section at the top:

```markdown
## 🚀 Quick Start

### For New Users: Using This as Your App Boilerplate

1. Click "Use this template" button above
2. Clone your new repository
3. Run: `npm install && npm run setup`
4. Start coding: `npm run dev`

See [QUICKSTART.md](QUICKSTART.md) for detailed instructions.

### For Existing Users: Creating Sub-Projects

Need to organize multiple projects within your app?
See [projects/README.md](projects/README.md) for project folder setup.
```

## Impact Analysis

### Files Affected
- `.opencode/command/new-project.md` → rename or update
- `.opencode/command/use-template.md` → create new
- `README.md` → add clarity at top
- `projects/README.md` → clarify purpose
- `docs/development/README.new-project.md` → update or rename

### Breaking Changes
- None (additive changes)
- Command rename is non-breaking (old command still works)

### User Experience Improvement
- ⭐ Clear primary path for new users
- ⭐ No confusion about "what is a new project?"
- ⭐ Better onboarding flow
- ⭐ Professional first impression

## Conclusion

The `new-project` command is currently optimized for Use Case 2 (sub-project organization),
but developers arriving at this repository need Use Case 1 (application boilerplate) first.

**Recommendation**: Create `use-template.md` as the primary command, rename `new-project.md`
to `create-subproject.md`, and update README to clarify both workflows.

This gives developers a clear, obvious path for the most common use case while maintaining
the organizational features for power users.

