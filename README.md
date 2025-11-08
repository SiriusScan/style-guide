# Style Guide Boilerplate

A living, breathing style guide web application that serves as a starter boilerplate template for new projects with frontend UI components within the Sirius project ecosystem.

## Purpose

This project is designed to be a **"create-react-app" style starter boilerplate** for new projects. The architectural decisions made here are automatically opted into by users, making this less of a style guide website and more of a comprehensive starter template.

## Project Structure

```
style-guide/
├── docs/                    # Documentation system
│   ├── ABOUT.documentation.md
│   ├── templates/          # Document templates
│   └── development/        # Development documentation
├── projects/               # Project directories
│   ├── template-project/   # Example project templates
│   │   ├── plans/         # Example project plans
│   │   ├── resources/     # Example resources
│   │   └── tasks/         # Example task files
│   └── init/              # Init project (boilerplate)
│       ├── app/           # Next.js App Router
│       ├── components/    # React components
│       ├── lib/           # Utilities and configurations
│       └── tasks/         # Task management files
├── scripts/               # Utility scripts
│   └── validate-tasks.js # Task validation script
├── .github/               # GitHub Actions workflows
│   └── workflows/         # CI/CD workflows
├── AGENTS.md              # AI agent guidance
└── README.md              # This file
```

## Key Features

### Documentation System

- **Self-updating**: Connected to CI workflows with AI agent runners
- **LLM-optimized**: Structured for maximum AI context and understanding
- **Template-based**: Consistent structure across all documentation
- **Machine-readable**: YAML front matter for automated processing

See [docs/ABOUT.documentation.md](docs/ABOUT.documentation.md) for complete documentation standards.

### Task Management System

- **JSON Schema compliant**: Industry-standard task format
- **Structured tracking**: Status, dependencies, priorities, metadata
- **AI-friendly**: Designed for AI agent interaction
- **Validation**: Automated validation of task files

See [docs/development/README.task-management.md](docs/development/README.task-management.md) for complete task management guide.

### Init Project Boilerplate

This repository itself is a complete Next.js full-stack boilerplate:

- **Next.js 16** with App Router and TypeScript
- **tRPC** for type-safe API communication
- **Drizzle ORM** with multi-provider support (SQLite, PostgreSQL, MySQL)
- **ShadCN UI** component library foundation
- **Tailwind CSS** for styling
- **CI/CD workflows** for automated testing and deployment
- **Pre-commit hooks** for code quality

The application code is in the root directory (`app/`, `components/`, `lib/`, etc.).

## Quick Start

### Using the Boilerplate

1. **Fork or copy this repository**: Use this entire repository as your starting point
2. **Update configuration**: Modify `package.json`, environment variables, etc.
3. **Customize**: Add your features and components
4. **Deploy**: Follow deployment instructions in the migration guide

### Setting Up Documentation

1. **Review documentation standards**: Read [docs/ABOUT.documentation.md](docs/ABOUT.documentation.md)
2. **Use templates**: Copy templates from `docs/templates/`
3. **Follow structure**: Maintain consistent documentation structure
4. **Update automatically**: CI workflows will help keep docs current

### Task Management

1. **Create task file**: Use `projects/template-project/tasks/example-tasks.json` as template
2. **Define tasks**: Follow JSON Schema format
3. **Track progress**: Update task status as work progresses
4. **Validate**: Use `scripts/validate-tasks.js` to validate task files

## Documentation

### Core Documentation

- **[ABOUT.documentation.md](docs/ABOUT.documentation.md)**: Documentation system standards
- **[README.task-management.md](docs/development/README.task-management.md)**: Task management guide
- **[README.ui-style-guide.md](docs/development/README.ui-style-guide.md)**: UI style guide template
- **[AGENTS.md](AGENTS.md)**: AI agent guidance and workflows

### Project Documentation

- **[Migration Guide](docs/development/GUIDE.using-boilerplate.md)**: Step-by-step guide to use this boilerplate
- **[Template Project Examples](projects/template-project/)**: Example PRD, tasks, plans

## CI/CD Workflows

### GitHub Actions

- **AI Documentation Update**: Automatically updates documentation when code changes
- **Build and Lint**: Validates code before merging
- **Deploy to Vercel**: Automated deployment to Vercel

See `.github/workflows/` for workflow configurations.

## Development Workflow

1. **Check tasks**: Review task files in `projects/[project-name]/tasks/`
2. **Start work**: Update task status to `in_progress`
3. **Make changes**: Follow project standards and best practices
4. **Test**: Run validation and tests
5. **Update tasks**: Mark tasks as `completed` when finished
6. **Commit**: Pre-commit hooks validate code automatically

See [AGENTS.md](AGENTS.md) for detailed development workflow guidance.

## Component Library

The component library structure is ready for integration:

- **Location**: `components/ui/`
- **Foundation**: ShadCN UI
- **Integration**: Components will be added by separate development team
- **Documentation**: Components will be showcased on overview page

## Technology Stack

### Init Project Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: Next.js API Routes, tRPC
- **Database**: Drizzle ORM (SQLite, PostgreSQL, MySQL)
- **UI**: ShadCN UI, Tailwind CSS
- **State**: TanStack Query
- **Validation**: Zod

## Contributing

### For AI Agents

See [AGENTS.md](AGENTS.md) for complete guidance on:
- Reading and updating tasks
- Following documentation standards
- Using CI/CD workflows
- Development best practices

### For Developers

1. Follow documentation standards
2. Use task management system
3. Maintain code quality (linting, type checking)
4. Update documentation as code changes
5. Follow project structure conventions

## License

This is a boilerplate template. Customize as needed for your project.

---

_This style guide boilerplate provides a comprehensive foundation for new projects with modern tooling, best practices, and AI-friendly workflows._

