---
description: Start a brand new application using this boilerplate template. This is the FIRST command for new developers.
agent: build
priority: high
---

# Use This Template - Start Your New App

## What This Does

**This is the command for starting a NEW standalone application from this boilerplate.**

If you're here to create your own app (not a sub-project within the boilerplate), this is the right place!

## Quick Start (Recommended)

### Method 1: GitHub Template (Easiest)

1. **Click "Use this template" button** at the top of the GitHub repository
2. **Name your new repository** (e.g., "my-saas-app", "customer-portal")
3. **Clone your new repository**:
   ```bash
   git clone https://github.com/your-username/your-new-app.git
   cd your-new-app
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Run setup wizard**:
   ```bash
   npm run setup
   ```
   
   The wizard will ask you:
   - Project name
   - Description
   - Database choice (SQLite, PostgreSQL, MySQL)
   - Whether to remove example content

6. **Start development**:
   ```bash
   npm run dev
   ```

7. **Visit** [http://localhost:3000](http://localhost:3000) 🎉

### Method 2: Degit (For Power Users)

```bash
# Download template without git history
npx degit your-org/style-guide my-new-app
cd my-new-app

# Install and setup
npm install
npm run setup

# Start coding
npm run dev
```

### Method 3: Manual Clone

```bash
# Clone the repository
git clone https://github.com/your-org/style-guide.git my-new-app
cd my-new-app

# Remove git history and start fresh
rm -rf .git
git init

# Install and setup
npm install
npm run setup

# Start coding
npm run dev
```

## What You Get

Your new application comes with:

✅ **Next.js 16** - Latest App Router  
✅ **TypeScript** - Fully configured  
✅ **tRPC** - Type-safe APIs  
✅ **Drizzle ORM** - Database with multiple provider support  
✅ **ShadCN UI** - Complete component library  
✅ **Tailwind CSS 4** - Modern styling  
✅ **Pre-commit Hooks** - Code quality automation  
✅ **Dashboard Components** - Metrics, charts, tables ready to use  

## Setup Process Details

The `npm run setup` script will:

1. ✨ **Prompt for configuration**
   - Your project name
   - Project description
   - Database provider choice

2. 📝 **Update project files**
   - `package.json` name and description
   - `app/layout.tsx` metadata
   - Create `.env` file

3. 🗄️ **Initialize database**
   - Run migrations for SQLite (automatic)
   - Show instructions for PostgreSQL/MySQL

4. 🧹 **Clean up examples** (optional)
   - Remove demo projects
   - Remove example content
   - Keep only what you need

5. 🎉 **Ready to code!**

## After Setup

### Explore Your New App

```bash
# Start development server
npm run dev

# Open database UI
npm run db:studio

# Run type checking
npm run type-check

# Build for production
npm run build
```

### Key Pages

- **Home**: [http://localhost:3000](http://localhost:3000)
- **Components**: [http://localhost:3000/components-overview](http://localhost:3000/components-overview)
- **Documentation**: [http://localhost:3000/documentation](http://localhost:3000/documentation)
- **Project Management**: [http://localhost:3000/project-management](http://localhost:3000/project-management)

### Next Steps

1. **Customize branding**
   - Edit `app/layout.tsx` for title/description
   - Update `app/favicon.ico`
   - Modify color scheme in `app/globals.css`

2. **Set up your database**
   - For SQLite: Already done! ✅
   - For PostgreSQL/MySQL: Update `.env` and run `npm run db:migrate`

3. **Create your first page**
   - Add new route in `app/your-page/page.tsx`
   - See `docs/guides/GUIDE.creating-pages.md`

4. **Add your components**
   - Use existing components from `components/ui/`
   - Create custom components in `components/`
   - See `docs/guides/GUIDE.component-usage.md`

5. **Build your API**
   - Add routers in `lib/trpc/routers/`
   - See `docs/guides/GUIDE.trpc-api-development.md`

6. **Configure database schema**
   - Edit `lib/db/schema.ts`
   - Run `npm run db:generate` to create migrations
   - Run `npm run db:migrate` to apply changes
   - See `docs/guides/GUIDE.database-development.md`

## Important Notes

### What This Command Does NOT Do

❌ This is NOT about creating sub-projects within the boilerplate  
❌ This is NOT about the `projects/` directory organization  
❌ This is NOT about PRD or task management setup  

For organizing multiple projects WITHIN your app, see `@create-subproject` command.

### The `projects/` Directory

After setup, you'll see a `projects/` directory. This is optional and used for:
- Organizing multiple initiatives within your app
- Project planning and task management
- PRD templates

**You can:**
- Use it for project organization (see `@create-subproject`)
- Remove it entirely if you don't need it

## Verification

After setup, verify everything works:

```bash
# Run verification script
npm run verify

# Check that dev server starts
npm run dev

# Check database connection
npm run db:studio
```

Expected output:
- ✅ All dependencies installed
- ✅ Configuration files created
- ✅ Database initialized
- ✅ Development server runs on port 3000

## Troubleshooting

### Port 3000 already in use
```bash
npx kill-port 3000
# Or use different port
PORT=3001 npm run dev
```

### Setup wizard fails
```bash
# Manual setup
cp .env.example .env
# Edit .env with your settings
npm run db:migrate
```

### Database errors
```bash
# Reset SQLite database
rm dev.db dev.db-journal
npm run db:migrate
```

### Node version issues
```bash
node --version  # Should be 20.x or higher
# Update at https://nodejs.org/
```

## Documentation

- 📚 **[QUICKSTART.md](../../QUICKSTART.md)** - Quick reference guide
- 📖 **[README.md](../../README.md)** - Full documentation
- 🔧 **[GUIDE.using-boilerplate.md](../../docs/development/GUIDE.using-boilerplate.md)** - Detailed setup guide
- 🤖 **[AGENTS.md](../../AGENTS.md)** - AI assistance guide

## Related Commands

- **`@create-subproject`** - Create project folders within your app (for project organization)
- **`@setup-database`** - Database configuration help (coming soon)
- **`@add-component`** - Add ShadCN components (coming soon)

## Example Workflow

```bash
# 1. Use GitHub template or degit
npx degit your-org/style-guide my-saas-app
cd my-saas-app

# 2. Install dependencies
npm install

# 3. Run interactive setup
npm run setup

# Setup wizard prompts:
# ? Project name: my-saas-app
# ? Project description: My awesome SaaS application
# ? Choose database provider: 1 (SQLite)
# ? Remove example projects? Yes

# 4. Start coding!
npm run dev

# 5. Open browser to http://localhost:3000
# 6. Start building your app! 🚀
```

## Success Metrics

After running this command successfully:

- ⏱️ **Time to first run**: < 5 minutes
- ✅ **Setup completion**: No errors
- 🚀 **Ready to code**: Development server running
- 📊 **Database ready**: Migrations applied
- 🎨 **Components available**: Full UI library ready

## Summary

**This Command Is For:**
✅ Starting a brand new application  
✅ First-time users of this boilerplate  
✅ Creating standalone apps  

**This Command Is NOT For:**
❌ Creating sub-project folders  
❌ Project organization within an existing app  
❌ Adding features to the boilerplate itself  

---

**Time to productivity**: ~5 minutes  
**Difficulty**: Beginner-friendly  
**Prerequisites**: Node.js 20+, npm, git  

**Happy coding! 🎉**

_For questions or issues, see [README.md](../../README.md) or open a GitHub issue._



