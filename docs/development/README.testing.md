---
title: "Development Testing Guide"
description: "Guide for testing the boilerplate locally, validation checklists, and troubleshooting common issues."
template: "TEMPLATE.documentation-standard"
version: "1.0.0"
last_updated: "2025-01-03"
author: "Project Team"
tags: ["testing", "validation", "development", "checklist"]
categories: ["development", "testing"]
difficulty: "beginner"
prerequisites: ["node", "npm"]
related_docs:
  - "README.task-management.md"
  - "ABOUT.documentation.md"
dependencies: []
llm_context: "medium"
search_keywords:
  [
    "testing",
    "validation",
    "checklist",
    "development",
    "local testing",
  ]
---

# Development Testing Guide

## Purpose

This guide provides instructions for testing the boilerplate locally, validation checklists for new projects, and solutions for common issues.

## When to Use

- **Before committing changes** - Validate your work locally
- **When setting up new project** - Verify boilerplate works correctly
- **When troubleshooting** - Find solutions to common problems
- **During development** - Ensure code quality and functionality

## How to Use

1. **Run validation checklist** before committing
2. **Test locally** using provided commands
3. **Check for common issues** if something doesn't work
4. **Follow troubleshooting steps** for specific problems

## Testing the Boilerplate

### Initial Setup Validation

```bash
# Navigate to project root
cd /path/to/style-guide

# Install dependencies
npm install

# Verify installation
npm list --depth=0

# Check TypeScript configuration
npm run type-check

# Run linting
npm run lint

# Test build
npm run build
```

### Development Server Testing

```bash
# Start development server
npm run dev

# Verify server starts
# Visit http://localhost:3000

# Check tRPC endpoints
# Visit http://localhost:3000/api/trpc/example.hello?input={"text":"World"}
```

### Database Testing

```bash
# Generate migrations (if schema changed)
npm run db:generate

# Run migrations
npm run db:migrate

# Open Drizzle Studio
npm run db:studio
# Verify database connection and schema
```

### Component Testing

```bash
# Verify ShadCN UI is initialized
ls components/ui/

# Check component structure
cat components/ui/README.md

# Test adding a component
npx shadcn@latest add button
```

## Validation Checklist

### Pre-Commit Checklist

- [ ] **Type checking passes**: `npm run type-check`
- [ ] **Linting passes**: `npm run lint`
- [ ] **Build succeeds**: `npm run build`
- [ ] **Task files valid**: Task JSON files pass validation
- [ ] **Documentation updated**: Docs reflect code changes
- [ ] **No console errors**: Check browser console
- [ ] **Environment variables set**: `.env` file configured

### Project Setup Checklist

- [ ] **Dependencies installed**: `npm install` completed successfully
- [ ] **Environment configured**: `.env` file created from `.env.example`
- [ ] **Database configured**: Database provider and URL set
- [ ] **Development server starts**: `npm run dev` works
- [ ] **Build succeeds**: `npm run build` completes without errors
- [ ] **tRPC endpoints work**: API routes respond correctly
- [ ] **Database connection works**: Can connect to database
- [ ] **Components render**: UI components display correctly

### Documentation Checklist

- [ ] **YAML front matter complete**: All required fields present
- [ ] **Template followed**: Documentation follows appropriate template
- [ ] **Links valid**: All internal links work
- [ ] **Examples work**: Code examples are tested
- [ ] **Formatting consistent**: Markdown formatting is correct

### Task Management Checklist

- [ ] **Task file valid**: JSON Schema validation passes
- [ ] **Required fields present**: All required fields included
- [ ] **Status values valid**: Only valid status values used
- [ ] **Dependencies exist**: All dependency IDs reference existing tasks
- [ ] **No circular dependencies**: Dependency chains don't loop
- [ ] **IDs unique**: No duplicate task IDs

## Common Issues and Solutions

### Build Errors

**Problem**: TypeScript errors during build

**Solution**:
```bash
# Check TypeScript errors
npm run type-check

# Fix type errors
# Common issues:
# - Missing type definitions
# - Incorrect import paths
# - Type mismatches
```

### Database Connection Issues

**Problem**: Cannot connect to database

**Solution**:
1. Check `DATABASE_URL` environment variable
2. Verify database provider matches database type
3. For PostgreSQL/MySQL: Ensure database server is running
4. For SQLite: Check file path is correct
5. Verify database credentials (if applicable)

### tRPC Errors

**Problem**: tRPC endpoints not working

**Solution**:
1. Verify tRPC provider is set up in `app/layout.tsx`
2. Check API route exists at `/app/api/trpc/[trpc]/route.ts`
3. Verify router is exported correctly
4. Check browser console for errors
5. Verify client setup in `app/providers.tsx`

### Linting Errors

**Problem**: ESLint errors

**Solution**:
```bash
# Run linting with auto-fix
npm run lint -- --fix

# Check specific file
npx eslint path/to/file.ts

# Review ESLint configuration
cat eslint.config.mjs
```

### Pre-commit Hook Failures

**Problem**: Pre-commit hooks fail

**Solution**:
1. Check what failed (linting, formatting, validation)
2. Fix the issues locally
3. Run the command manually to verify fix
4. Try committing again

### Task Validation Errors

**Problem**: Task file validation fails

**Solution**:
```bash
# Validate task file manually
node scripts/validate-tasks.js projects/[project]/tasks/[file].json

# Check for common issues:
# - Missing required fields
# - Invalid status values
# - Missing dependency references
# - Invalid JSON syntax
```

## Integration Testing

### Testing Complete Workflow

1. **Start fresh**: Clean install
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Configure environment**: Set up `.env`
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run migrations**: Set up database
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

4. **Start server**: Verify everything works
   ```bash
   npm run dev
   ```

5. **Test endpoints**: Verify API works
   - Visit homepage
   - Check tRPC endpoints
   - Verify database queries

6. **Test build**: Ensure production build works
   ```bash
   npm run build
   npm run start
   ```

## Performance Testing

### Build Performance

```bash
# Measure build time
time npm run build

# Check bundle size
npm run build
# Review .next/analyze for bundle analysis
```

### Runtime Performance

- Use browser DevTools to check:
  - Page load time
  - Time to interactive
  - Network requests
  - Memory usage

## Troubleshooting

### Getting Help

1. **Check documentation**: Review relevant docs
2. **Check error messages**: Read error output carefully
3. **Validate configuration**: Verify environment and config files
4. **Test incrementally**: Isolate the problem
5. **Check logs**: Review console and server logs

### Debugging Steps

1. **Verify prerequisites**: Node version, dependencies installed
2. **Check configuration**: Environment variables, config files
3. **Test components**: Isolate problematic components
4. **Review logs**: Check console and server output
5. **Simplify**: Remove complexity to isolate issue

## Related Documentation

- **[README.task-management.md](README.task-management.md)**: Task management system
- **[ABOUT.documentation.md](../ABOUT.documentation.md)**: Documentation standards
- **[README.md](../../README.md)**: Main project documentation

## LLM Context

This testing guide provides validation checklists and troubleshooting for the boilerplate. Key concepts:

- **Validation**: Pre-commit and setup checklists ensure quality
- **Testing**: Local testing procedures verify functionality
- **Troubleshooting**: Common issues and solutions documented
- **Integration**: Complete workflow testing procedures

When testing the boilerplate, follow checklists systematically and use troubleshooting steps for issues.

---

_This document follows the project Documentation Standard. For questions about documentation structure, see [ABOUT.documentation.md](../ABOUT.documentation.md)._

