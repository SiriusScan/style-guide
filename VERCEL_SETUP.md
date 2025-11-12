# Vercel Setup Quick Reference

## Repository Information
- **GitHub Repository**: `git@github.com:SiriusScan/style-guide.git`
- **Branch**: `main`
- **Framework**: Next.js (auto-detected)

## Vercel Import Settings

### 1. Import Project
- Go to [Vercel Dashboard](https://vercel.com/new)
- Select "Import Git Repository"
- Choose `SiriusScan/style-guide`

### 2. Configure Project

#### Build & Development Settings
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `.` (project root)
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

#### Environment Variables (Required)

Add these in Vercel project settings → Environment Variables:

```env
DATABASE_PROVIDER=sqlite
DATABASE_URL=./dev.db
NODE_ENV=production
```

#### Environment Variables (Optional)

```env
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### 3. Deploy

Click **Deploy** and wait for the build to complete.

## Post-Deployment

### Verify Deployment

1. Check deployment URL (e.g., `https://style-guide.vercel.app`)
2. Visit homepage to confirm it loads
3. Check the project management page: `/project-management`
4. Check the components overview: `/components-overview`

### Database Migration (if needed)

If using PostgreSQL or MySQL:

```bash
# Pull environment variables
vercel env pull .env.local

# Run migrations
npm run db:migrate

# Push schema
npm run db:generate
```

## GitHub Integration

The project includes GitHub Actions workflows:

- ✅ Automatic deployment on push to `main`
- ✅ Build and lint checks on pull requests
- ✅ Deployment URL posted in PR comments

## Domains

### Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all dependencies are listed in `package.json`
- Run `npm run build` locally to test

### Database Connection Issues
- Verify `DATABASE_URL` environment variable
- For PostgreSQL/MySQL, ensure database is accessible from Vercel
- Check database provider firewall settings

### Environment Variable Issues
- Ensure all required variables are set in Vercel
- For `NEXT_PUBLIC_*` variables, redeploy after adding them
- Variables are not accessible in the browser without `NEXT_PUBLIC_` prefix

## Project Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Backend**: tRPC for type-safe APIs
- **Database**: Drizzle ORM (supports SQLite, PostgreSQL, MySQL)
- **UI**: ShadCN UI + Tailwind CSS
- **State Management**: TanStack Query

## Useful Commands

```bash
# View deployment logs
vercel logs

# Pull environment variables locally
vercel env pull

# Deploy from CLI
vercel --prod

# Link local project to Vercel
vercel link
```

## Resources

- [Vercel Next.js Deployment](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/environment-variables)
- [Custom Domains](https://vercel.com/docs/custom-domains)
- [Project README](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**Status**: ✅ Repository configured and pushed to GitHub
**Next Step**: Import project in Vercel Dashboard




