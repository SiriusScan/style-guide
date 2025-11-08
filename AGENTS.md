# AGENTS

This document provides guidance for AI agents working on this project. It covers project structure, documentation system, task management, and development workflows.

## Project Overview

This is a **style guide boilerplate project** that serves as a starter template for new projects with frontend UI components. The project includes:

- Comprehensive documentation system
- Task management system using JSON Schema
- Next.js full-stack application template
- CI/CD workflows with AI-powered documentation updates
- Component library structure

## Documentation System

### Core Documentation

- **[ABOUT.documentation.md](docs/ABOUT.documentation.md)**: Documentation standards and conventions
- **[README.ui-style-guide.md](docs/development/README.ui-style-guide.md)**: UI style guide template
- **[README.task-management.md](docs/development/README.task-management.md)**: Task management system guide

### Documentation Standards

All documentation follows a structured format with YAML front matter:

- **Required fields**: `title`, `description`, `template`, `version`, `last_updated`
- **Optional fields**: `tags`, `categories`, `related_docs`, `llm_context`, `search_keywords`
- **Templates**: Located in `docs/templates/` directory

### Using Documentation

1. **Before creating docs**: Review [ABOUT.documentation.md](docs/ABOUT.documentation.md)
2. **Choose template**: Select appropriate template from `docs/templates/`
3. **Follow structure**: Use template structure for consistency
4. **Add front matter**: Include complete YAML metadata
5. **Link documents**: Establish relationships via `related_docs`

### AI Documentation Updates

The project includes CI/CD workflows that automatically update documentation:

- **Trigger**: On code changes (excludes docs/ directory)
- **Process**: AI analyzes changes and updates relevant documentation
- **Commit**: Documentation updates are automatically committed
- **Workflow**: `.github/workflows/ai-documentation-update.yml`

## Task Management System

### Overview

Tasks are managed using JSON Schema-compliant JSON files located in `projects/[project-name]/tasks/` directories.

### Task File Structure

Tasks follow a structured JSON format with:
- Unique IDs (string format)
- Status tracking (pending, in-progress, completed, blocked)
- Dependencies between tasks
- Metadata (title, description, priority, etc.)
- Test strategies for verification

### Reading Tasks

1. **Locate task file**: Check `projects/[project-name]/tasks/` directory
2. **Read task structure**: Understand JSON Schema format
3. **Check status**: Identify pending tasks with completed dependencies
4. **Review details**: Read task description, details, and test strategy

### Updating Tasks

1. **Change status**: Update `status` field as work progresses
   - `pending` → `in_progress` when starting
   - `in_progress` → `completed` when finished
   - `in_progress` → `blocked` if blocked
2. **Update metadata**: Add notes, update timestamps if needed
3. **Validate**: Ensure JSON Schema compliance
4. **Commit**: Include task updates with code changes

### Task Status Values

- **pending**: Task not started (default)
- **in_progress**: Currently being worked on
- **completed**: Finished successfully
- **blocked**: Cannot proceed (waiting for dependency)

### Task Dependencies

- Check `dependencies` array before starting work
- Only work on tasks with all dependencies completed
- Update dependent tasks when completing work
- Validate dependency references exist

### Documentation

See [README.task-management.md](docs/development/README.task-management.md) for complete task management documentation.

## Project Structure

### Directory Layout

```
style-guide/
├── app/                    # Next.js App Router
├── components/             # React components
├── lib/                    # Utilities and configurations
├── docs/                   # Documentation system
│   ├── ABOUT.documentation.md
│   ├── templates/          # Document templates
│   └── development/        # Development docs
├── projects/               # Example project templates
│   └── template-project/   # Example project templates
├── scripts/                # Utility scripts
├── package.json            # Dependencies and scripts
└── AGENTS.md              # This file
```

### Projects Directory

The `projects/` directory contains example project templates. Each project follows this structure:

```
projects/[project-name]/
├── plans/          # Project plans and milestones
├── resources/       # Project resources (diagrams, assets)
└── tasks/          # Task management files
    └── [task-file].json
```

**Note**: The actual Next.js application code is in the root directory, not in `projects/init/`.

## Development Workflow

### Starting Work

1. **Check current tasks**: Review task files in `projects/[project-name]/tasks/` (for example projects) or create your own task files
2. **Identify available tasks**: Find tasks with `pending` status and completed dependencies
3. **Select task**: Choose highest priority available task
4. **Update status**: Change task status to `in_progress`
5. **Begin work**: Follow task details and requirements

### During Development

1. **Follow task details**: Implement according to task requirements
2. **Test implementation**: Use task test strategy for verification
3. **Update documentation**: Keep docs current with changes
4. **Commit regularly**: Include task status updates in commits

### Completing Work

1. **Verify completion**: Ensure all task requirements met
2. **Run tests**: Execute test strategy from task
3. **Update task**: Change status to `completed`
4. **Check dependencies**: Review tasks that depend on this one
5. **Commit changes**: Include code and task updates

### Git Integration

- **Commit messages**: Reference task IDs when relevant
- **Task updates**: Commit task file changes with code changes
- **Branch naming**: Use descriptive branch names
- **PR descriptions**: Include task completion status

## CI/CD Workflows

### AI Documentation Updates

**Workflow**: `.github/workflows/ai-documentation-update.yml`

- **Trigger**: Push to main branch
- **Filters**: Excludes docs/ directory changes
- **Process**: AI analyzes code changes and updates documentation
- **Output**: Commits documentation updates automatically

### Build and Lint

**Workflow**: `.github/workflows/build-and-lint.yml`

- **Trigger**: Pre-commit validation
- **Checks**: TypeScript, ESLint, Prettier, build test
- **Purpose**: Prevent build errors before deployment

### Deployment

**Workflow**: `.github/workflows/deploy-vercel.yml`

- **Trigger**: Push to main branch
- **Process**: Validates, builds, and deploys to Vercel
- **Output**: Posts deployment URL in PR comments

## Code Standards

### TypeScript/React

- **TypeScript**: Strict mode enabled
- **React**: Server Components by default
- **Formatting**: Prettier with project config
- **Linting**: ESLint with Next.js rules

### File Organization

- **Components**: `components/` directory (root level)
- **UI Components**: `components/ui/` (ShadCN components)
- **Utilities**: `lib/` directory (root level)
- **API Routes**: `app/api/` directory (root level)
- **Pages**: `app/` directory (App Router, root level)

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: SCREAMING_SNAKE_CASE
- **Files**: kebab-case for utilities, PascalCase for components

## Testing

### Validation Checklist

Before marking tasks as complete:

- [ ] Code follows project standards
- [ ] Tests pass according to test strategy
- [ ] Documentation is updated
- [ ] Task status is updated
- [ ] Dependencies are satisfied
- [ ] No linting errors
- [ ] Build succeeds

### Running Tests

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build test
npm run build
```

## Common Commands

### Documentation

```bash
# Validate documentation
npx markdownlint-cli2 'docs/**/*.md'

# Check YAML front matter
yamllint docs/**/*.md
```

### Development

```bash
# Start development server
npm run dev

# Build project
npm run build

# Run linting
npm run lint

# Type check
npm run type-check
```

### Database

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio
npm run db:studio
```

### Tasks

```bash
# Validate task files
node scripts/validate-tasks.js

# View task structure
cat projects/[project-name]/tasks/[task-file].json
```

## Troubleshooting

### Task Issues

**Problem**: Task file not found
- **Solution**: Check `projects/[project-name]/tasks/` directory

**Problem**: Invalid task status
- **Solution**: Use only: `pending`, `in_progress`, `completed`, `blocked`

**Problem**: Circular dependencies
- **Solution**: Review dependency chain and restructure

### Documentation Issues

**Problem**: Missing front matter
- **Solution**: Add complete YAML front matter with required fields

**Problem**: Broken links
- **Solution**: Validate links with `markdown-link-check`

### Development Issues

**Problem**: Build errors
- **Solution**: Run `npm run type-check` and `npm run lint` locally

**Problem**: Database connection issues
- **Solution**: Check `.env` file and database provider configuration

## Getting Help

### Documentation

- Review [ABOUT.documentation.md](docs/ABOUT.documentation.md) for documentation questions
- Check [README.task-management.md](docs/development/README.task-management.md) for task questions
- See [README.ui-style-guide.md](docs/development/README.ui-style-guide.md) for UI questions

### Task Management

- Review task file structure and examples
- Check task dependencies before starting work
- Update task status as work progresses
- Reference task IDs in commit messages

### Code Issues

- Check project README for setup instructions
- Review error messages and logs
- Validate configuration files
- Test locally before committing

## Best Practices

### For AI Agents

1. **Always check tasks first**: Review task files before starting work
2. **Update task status**: Keep task status current with work progress
3. **Follow documentation standards**: Use templates and maintain consistency
4. **Validate before committing**: Run checks locally
5. **Reference tasks**: Include task IDs in commit messages
6. **Update documentation**: Keep docs current with code changes
7. **Respect dependencies**: Only work on tasks with completed dependencies

### Code Quality

- Write clear, maintainable code
- Follow TypeScript best practices
- Use consistent formatting
- Add comments for complex logic
- Test thoroughly before committing

### Documentation

- Use appropriate templates
- Include complete front matter
- Link related documents
- Keep examples current
- Update as code evolves

---

_This document provides essential guidance for AI agents working on this project. Keep it updated as workflows evolve._
