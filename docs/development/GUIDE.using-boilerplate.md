---
title: "Using the Boilerplate Guide"
description: "Step-by-step guide to start a new project from the init boilerplate, including customization checklist and deployment setup."
template: "TEMPLATE.guide"
version: "1.0.0"
last_updated: "2025-01-03"
author: "Project Team"
tags: ["guide", "boilerplate", "getting-started", "new-project"]
categories: ["development"]
difficulty: "beginner"
prerequisites: ["node", "npm", "git"]
related_docs:
  - "README.testing.md"
  - "README.task-management.md"
estimated_time: "30 minutes"
---

# Using the Boilerplate Guide

## Purpose

This guide provides step-by-step instructions for creating a new project from the init boilerplate, including customization, configuration, and deployment setup.

## When to Use This Guide

- **Starting a new project** with frontend UI components
- **Setting up a new repository** from the boilerplate
- **Customizing the boilerplate** for your specific needs
- **Deploying your project** to production

## Step-by-Step Instructions

### Step 1: Copy the Boilerplate

**Objective**: Create a copy of this entire repository for your new project

**Instructions**:

1. Fork this repository, or
2. Clone and copy the entire style-guide repository to your new project location
3. Rename the directory to your project name

```bash
# Example: Creating a new project called "my-app"
git clone <style-guide-repo-url> my-app
cd my-app
# Or copy the entire directory
cp -r style-guide my-app
cd my-app
```

**Verification**:

```bash
# Verify files are copied
ls -la
# Should see: app/, components/, lib/, package.json, etc.
```

**Troubleshooting**:

- **If copy fails**: Check permissions and disk space
- **If files missing**: Verify source directory exists

### Step 2: Update Project Configuration

**Objective**: Customize package.json and project metadata

**Instructions**:

1. Open `package.json`
2. Update `name` field to your project name
3. Update `version` to your starting version (e.g., "0.1.0")
4. Update `description` if desired
5. Review and update dependencies as needed

```json
{
  "name": "my-app",
  "version": "0.1.0",
  "description": "My new application"
}
```

**Verification**:

```bash
# Verify package.json is valid
npm install
```

**Troubleshooting**:

- **If npm install fails**: Check Node.js version (requires 20+)
- **If dependencies error**: Review package.json syntax

### Step 3: Configure Environment Variables

**Objective**: Set up environment configuration for your project

**Instructions**:

1. Copy `.env.example` to `.env`
2. Update `DATABASE_PROVIDER` if not using SQLite
3. Update `DATABASE_URL` with your database connection string
4. Add any project-specific environment variables

```bash
cp .env.example .env
# Edit .env with your configuration
```

**Verification**:

```bash
# Verify .env file exists (don't commit it!)
cat .env
```

**Troubleshooting**:

- **If database connection fails**: Verify DATABASE_URL format
- **If variables not loading**: Check .env file location and syntax

### Step 4: Customize Database Schema

**Objective**: Update database schema for your project needs

**Instructions**:

1. Open `lib/db/schema.ts`
2. Modify or add tables as needed
3. Update types and exports
4. Generate migrations

```bash
# After modifying schema.ts
npm run db:generate
npm run db:migrate
```

**Verification**:

```bash
# Check migrations were created
ls drizzle/

# Verify database structure
npm run db:studio
```

**Troubleshooting**:

- **If migrations fail**: Check schema syntax
- **If database errors**: Verify database connection

### Step 5: Customize tRPC Routers

**Objective**: Update tRPC routers for your API needs

**Instructions**:

1. Review `lib/trpc/routers/example.ts`
2. Modify or create new routers
3. Update `lib/trpc/routers/_app.ts` to include your routers
4. Test endpoints

```typescript
// lib/trpc/routers/_app.ts
export const appRouter = router({
  example: exampleRouter,
  // Add your routers here
  myRouter: myRouter,
});
```

**Verification**:

```bash
# Start dev server
npm run dev

# Test endpoint
curl http://localhost:3000/api/trpc/example.hello?input={"text":"World"}
```

**Troubleshooting**:

- **If endpoints don't work**: Check router exports and API route setup
- **If types error**: Verify TypeScript types are correct

### Step 6: Update Application Metadata

**Objective**: Customize application title, description, and metadata

**Instructions**:

1. Open `app/layout.tsx`
2. Update `metadata` object:
   - `title`: Your application name
   - `description`: Your application description
3. Update favicon and other assets if needed

```typescript
export const metadata: Metadata = {
  title: "My Application",
  description: "Description of my application",
};
```

**Verification**:

```bash
# Start dev server and check browser tab title
npm run dev
```

### Step 7: Customize UI Components

**Objective**: Add and customize UI components for your project

**Instructions**:

1. Add ShadCN components as needed:
   ```bash
   npx shadcn@latest add button
   npx shadcn@latest add card
   # Add more components as needed
   ```

2. Create custom components in `components/` directory
3. Update pages to use your components
4. Customize Tailwind theme if needed

**Verification**:

```bash
# Verify components are added
ls components/ui/

# Check components render
npm run dev
```

### Step 8: Setup Task Management

**Objective**: Create task files for your project

**Instructions**:

1. Copy example task file:
   ```bash
   cp ../../template-project/tasks/example-tasks.json tasks/my-project.json
   ```

2. Update project metadata in task file
3. Define your initial tasks
4. Validate task file:
   ```bash
   node ../../scripts/validate-tasks.js tasks/my-project.json
   ```

**Verification**:

```bash
# Validate task file
node ../../scripts/validate-tasks.js tasks/my-project.json
```

### Step 9: Update Documentation

**Objective**: Customize documentation for your project

**Instructions**:

1. Update `README.md` with your project information
2. Create project-specific documentation as needed
3. Update links and references
4. Follow documentation standards from `docs/ABOUT.documentation.md`

**Verification**:

```bash
# Check documentation structure
ls docs/

# Validate markdown
npx markdownlint-cli2 '**/*.md'
```

### Step 10: Configure Deployment

**Objective**: Set up deployment configuration

**Instructions**:

1. **For Vercel**:
   - Connect repository to Vercel
   - Set environment variables in Vercel dashboard
   - Configure build settings if needed

2. **For other platforms**:
   - Update deployment configuration
   - Set environment variables
   - Configure build commands

**Verification**:

```bash
# Test production build locally
npm run build
npm run start
```

## Customization Checklist

### Required Customizations

- [ ] Update `package.json` name and version
- [ ] Configure environment variables (`.env`)
- [ ] Update application metadata (`app/layout.tsx`)
- [ ] Customize database schema (`lib/db/schema.ts`)
- [ ] Update README with project information
- [ ] Create initial task file

### Optional Customizations

- [ ] Customize tRPC routers
- [ ] Add ShadCN UI components
- [ ] Create custom components
- [ ] Update Tailwind theme
- [ ] Add project-specific documentation
- [ ] Configure additional environment variables
- [ ] Set up custom CI/CD workflows
- [ ] Add project-specific scripts

## Deployment Configuration

### Vercel Deployment

1. **Connect Repository**:
   - Go to Vercel dashboard
   - Import your repository
   - Configure project settings

2. **Set Environment Variables**:
   - Add `DATABASE_PROVIDER`
   - Add `DATABASE_URL`
   - Add any other required variables

3. **Configure Build**:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

4. **Deploy**:
   - Push to main branch triggers deployment
   - Or deploy manually from Vercel dashboard

### Other Platforms

Follow platform-specific instructions, but ensure:
- Environment variables are set
- Build command is `npm run build`
- Node.js version is 20+
- Database is accessible from deployment platform

## Adding Components from Sirius Project

When components are ready from the Sirius project:

1. **Copy components**: Copy component files to `components/ui/`
2. **Update imports**: Update import paths if needed
3. **Test components**: Verify components work in your project
4. **Document**: Add component documentation
5. **Showcase**: Add to components overview page

## Troubleshooting

### Common Issues

**Problem**: Build fails after customization

**Solution**:
- Check TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Check environment variables are set

**Problem**: Database connection fails in production

**Solution**:
- Verify DATABASE_URL is set correctly in deployment platform
- Check database is accessible from deployment platform
- Verify database provider matches your database type

**Problem**: Components don't render

**Solution**:
- Check component imports
- Verify Tailwind CSS is configured
- Check browser console for errors

## Related Documentation

- **[README.testing.md](README.testing.md)**: Testing and validation guide
- **[README.task-management.md](README.task-management.md)**: Task management system
- **[README.md](../../README.md)**: Main project documentation

## LLM Context

This guide provides step-by-step instructions for using the boilerplate. Key concepts:

- **Copy and customize**: Start with boilerplate, customize for your needs
- **Configuration**: Update package.json, environment variables, metadata
- **Database**: Customize schema and run migrations
- **Components**: Add and customize UI components
- **Deployment**: Configure for your deployment platform

When creating a new project, follow steps in order and use checklists to ensure nothing is missed.

---

_This document follows the project Documentation Standard. For questions about documentation structure, see [ABOUT.documentation.md](../ABOUT.documentation.md)._

