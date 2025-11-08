---
description: Creates a new project folder with essential files and structure from the template.
agent: build
---

# New Project Setup

## Objective

Set up a new project folder from the template with proper directory structure, PRD template, and task file templates. **This is structure setup only** - content development happens during planning phase.

## Instructions

### 1. Copy Template Directory

```bash
cd projects/
cp -r template-project [project-name]
cd [project-name]
```

Replace `[project-name]` with your actual project name (e.g., `mobile-app-mvp`, `api-gateway`, `admin-dashboard`).

### 2. Verify Structure

Ensure the following structure exists:

```
projects/[project-name]/
├── PRD.txt              # Product Requirements Document template (DO NOT FILL OUT YET)
├── plans/               # Project planning documents directory
│   └── example-plan.md  # Example plan (keep as reference or delete)
├── resources/           # Project resources directory (diagrams, mockups, etc.)
│   └── README.md        # Resource organization guide
└── tasks/               # Task management files directory
    ├── example-tasks.json    # Full JSON Schema example (KEEP AS REFERENCE)
    └── task-list-1.json      # Empty task list to start with
```

### 3. Confirm Files

Check that these files exist and are ready:

- [ ] `PRD.txt` - Template with all section headers (empty)
- [ ] `tasks/example-tasks.json` - Complete task schema reference
- [ ] `tasks/task-list-1.json` - Empty task list ready to populate
- [ ] `plans/` directory exists
- [ ] `resources/` directory exists

### 4. Stop Here

**Do not fill out any content yet.** This is structure setup only.

## What NOT to Do

- ❌ Do not fill out PRD.txt
- ❌ Do not create tasks yet
- ❌ Do not delete example-tasks.json (it's a reference)
- ❌ Do not modify the template files

## What Happens Next

After this setup:

1. **Planning Phase**: User will fill out PRD and create tasks
2. **Development Phase**: Tasks will be executed and tracked

## Example Usage

```bash
# Create new project called "user-dashboard"
cd projects/
cp -r template-project user-dashboard

# Verify structure
ls -la user-dashboard/
# Output: PRD.txt, plans/, resources/, tasks/

# Done - ready for planning phase
```

## Reference

Full guide: `docs/development/README.new-project.md`

## Task File Format Reference

When creating tasks during planning phase, follow this minimal structure:

```json
{
  "project": {
    "name": "Project Name",
    "version": "1.0.0"
  },
  "tasks": [
    {
      "id": "1",
      "title": "Task title",
      "description": "Brief description",
      "details": "Implementation details",
      "status": "pending",
      "priority": "high",
      "dependencies": [],
      "testStrategy": "How to verify completion"
    }
  ]
}
```

See `tasks/example-tasks.json` for complete schema with all optional fields.

## Validation

After creating tasks (during planning):

```bash
# Validate task file
node scripts/validate-tasks.js projects/[project-name]/tasks/task-list-1.json
```

---

_This command sets up project structure only. Planning and content development is a separate phase._
