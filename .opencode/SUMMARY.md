# OpenCode Commands Summary

## Quick Command Reference

### For New Users

- **`@use-template`** ⭐ **START HERE** - Use this boilerplate to create your new application
  - First command for new developers
  - Guides through GitHub template or degit usage
  - Runs setup wizard
  - Gets you coding in < 5 minutes

### For Existing Users

- **`@create-subproject`** (formerly `@new-project`) - Create project folders for organization
  - Organize multiple initiatives within your app
  - Set up PRD and task management
  - Internal project structure only

## Command Details

### `@use-template` - Start New Application

**When to use**: You want to create a brand new standalone application

**What it does**:

1. Guides through template usage (GitHub/degit/clone)
2. Explains `npm install && npm run setup`
3. Shows verification steps
4. Links to customization guides

**Output**: A fully configured new application ready for development

**Time**: ~5 minutes

---

### `@create-subproject` - Organize Projects Within App

**When to use**: You want to organize multiple projects/initiatives within your existing app

**What it does**:

1. Copies `projects/template-project/` to new name
2. Verifies directory structure
3. Explains PRD and task file setup
4. Links to planning documentation

**Output**: A project folder with PRD template, task files, and resources directory

**Time**: ~2 minutes

---

## Command Decision Tree

```
Are you starting a new application?
├─ YES → Use @use-template
│         (First time using this boilerplate)
│
└─ NO → Do you need project organization folders?
          ├─ YES → Use @create-subproject
          │         (Already have an app, need to organize work)
          │
          └─ NO → Check documentation:
                    - README.md for general info
                    - docs/ for guides
                    - QUICKSTART.md for quick reference
```

## Common Scenarios

### Scenario 1: "I want to build a SaaS app"

**Command**: `@use-template`  
**Why**: You need the entire boilerplate as your starting point

### Scenario 2: "I'm building multiple features in my app"

**Command**: `@create-subproject`  
**Why**: Organize each feature as a separate project with its own tasks

### Scenario 3: "I want to add a component"

**Command**: None yet (manual process)  
**See**: `docs/guides/GUIDE.component-usage.md`

### Scenario 4: "I want to deploy"

**Command**: None yet (manual process)  
**See**: `DEPLOYMENT.md` and `VERCEL_SETUP.md`

## File Locations

```
.opencode/
├── SUMMARY.md              # This file
└── command/
    ├── use-template.md     # For starting new applications
    └── new-project.md      # For creating sub-projects (renamed purpose)
```

## Related Documentation

- **[QUICKSTART.md](../QUICKSTART.md)** - Quick start guide
- **[README.md](../README.md)** - Full documentation
- **[STARTER_TEMPLATE_ANALYSIS.md](../STARTER_TEMPLATE_ANALYSIS.md)** - Template usage analysis
- **[docs/development/GUIDE.using-boilerplate.md](../docs/development/GUIDE.using-boilerplate.md)** - Detailed setup guide
- **[projects/README.md](../projects/README.md)** - Project organization guide

## Future Commands (Planned)

- `@setup-database` - Database configuration wizard
- `@add-component` - Add ShadCN UI components
- `@generate-api` - Generate tRPC router scaffolding
- `@deploy` - Deployment preparation checklist

---

_This summary helps developers quickly find the right command for their use case._
