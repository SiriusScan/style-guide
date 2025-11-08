# Quick Start Guide

Get your new project up and running in under 5 minutes.

## Prerequisites

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** 10.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

## 3-Step Setup

### Step 1: Create Your Project

Click the **"Use this template"** button at the top of this repository, or:

```bash
# Option A: Using GitHub template (recommended)
# Click "Use this template" button on GitHub

# Option B: Using degit
npx degit your-org/style-guide my-new-app
cd my-new-app

# Option C: Clone and copy
git clone https://github.com/your-org/style-guide.git my-new-app
cd my-new-app
rm -rf .git  # Remove git history
git init     # Start fresh
```

### Step 2: Run Setup Script

```bash
npm install
npm run setup
```

The setup script will:
- ✅ Prompt for your project name
- ✅ Update package.json
- ✅ Create .env file
- ✅ Initialize database
- ✅ Run initial migrations
- ✅ Verify setup

### Step 3: Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

## What's Included

Your new project comes with:

- ✅ **Next.js 16** with App Router
- ✅ **TypeScript** fully configured
- ✅ **tRPC** for type-safe APIs
- ✅ **Drizzle ORM** with SQLite (easily switch to PostgreSQL/MySQL)
- ✅ **ShadCN UI** component library
- ✅ **Tailwind CSS 4** for styling
- ✅ **Pre-commit hooks** (linting, formatting, type-checking)
- ✅ **Database UI** (Drizzle Studio)
- ✅ **Complete dashboard components** (metrics, charts, tables)

## Next Steps

### Explore the Components

Visit [http://localhost:3000/components-overview](http://localhost:3000/components-overview) to see all available UI components.

### View Database

```bash
npm run db:studio
```

Opens Drizzle Studio at [https://local.drizzle.studio](https://local.drizzle.studio)

### Customize Your App

1. **Update branding** in `app/layout.tsx`
2. **Modify database schema** in `lib/db/schema.ts`
3. **Add API routes** in `lib/trpc/routers/`
4. **Create pages** in `app/`
5. **Add components** in `components/`

### Run Tests

```bash
npm run type-check  # TypeScript check
npm run lint        # ESLint check
npm run build       # Production build test
```

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:generate      # Generate migrations
npm run db:migrate       # Run migrations
npm run db:studio        # Open database UI

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript check
```

## Troubleshooting

### Port 3000 already in use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
PORT=3001 npm run dev
```

### Database errors

```bash
# Reset database
rm dev.db dev.db-journal
npm run db:migrate
```

### Node version issues

```bash
# Check version
node --version  # Should be 20.x or higher

# Update Node.js
# Visit https://nodejs.org/
```

### Install failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## Need Help?

- 📚 **Full Documentation**: See [README.md](./README.md)
- 🔧 **Setup Guide**: See [docs/development/GUIDE.using-boilerplate.md](./docs/development/GUIDE.using-boilerplate.md)
- 🤖 **AI Assistance**: See [AGENTS.md](./AGENTS.md)
- 💬 **Issues**: [GitHub Issues](https://github.com/your-org/style-guide/issues)

## What's Next?

Once you're up and running:

1. ✅ Remove example content (see cleanup guide)
2. ✅ Configure your database for production
3. ✅ Set up deployment (Vercel, Railway, etc.)
4. ✅ Customize components and styling
5. ✅ Build your features!

---

**Time to first run**: ~5 minutes  
**Time to production**: ~30 minutes  
**Learning curve**: Gentle (built on familiar tools)

Happy coding! 🚀

