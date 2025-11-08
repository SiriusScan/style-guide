# Deployment Guide

## Vercel Deployment

This project is configured for deployment on Vercel with automatic builds from the GitHub repository.

### Prerequisites

- GitHub repository: `git@github.com:SiriusScan/style-guide.git`
- Vercel account connected to GitHub

### Automatic Deployment

The project includes GitHub Actions workflows that will:

1. **Build and Lint** (`.github/workflows/build-and-lint.yml`)
   - Runs on every push and pull request
   - Validates TypeScript, ESLint, and build

2. **Deploy to Vercel** (`.github/workflows/deploy-vercel.yml`)
   - Automatically deploys to Vercel on push to main
   - Posts deployment URL in PR comments

### Environment Variables

Configure these environment variables in your Vercel project settings:

#### Required
- `DATABASE_PROVIDER` - Database type (default: `sqlite`)
  - Options: `sqlite`, `postgresql`, `mysql`
- `DATABASE_URL` - Database connection string
  - For SQLite (default): `./dev.db`
  - For PostgreSQL: `postgresql://user:password@host:5432/dbname`
  - For MySQL: `mysql://user:password@host:3306/dbname`

#### Optional
- `NEXT_PUBLIC_APP_URL` - Public URL of your application
  - Vercel will automatically set this, but you can override
- `NODE_ENV` - Environment mode (automatically set to `production` by Vercel)

### Manual Deployment Steps

If you prefer manual deployment:

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Database Configuration for Production

#### Option 1: SQLite (Default)
- Works out of the box on Vercel
- Data is ephemeral (resets on deployments)
- Good for demos and testing

#### Option 2: PostgreSQL (Recommended for Production)
- Use Vercel Postgres or external provider
- Update `DATABASE_PROVIDER=postgresql`
- Set `DATABASE_URL` to your PostgreSQL connection string

#### Option 3: MySQL
- Use PlanetScale, Railway, or other provider
- Update `DATABASE_PROVIDER=mysql`
- Set `DATABASE_URL` to your MySQL connection string

### Running Migrations

After deployment, run database migrations:

```bash
npm run db:migrate
```

Or via Vercel CLI:

```bash
vercel env pull .env.local
npm run db:migrate
```

### Build Configuration

The project uses:
- **Framework**: Next.js 16
- **Node Version**: 20.x (specified in `.nvmrc`)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Monitoring

- Check build logs in Vercel dashboard
- View deployment status in GitHub Actions
- Monitor runtime logs in Vercel

### Troubleshooting

#### Build Failures
- Check that all dependencies are in `package.json`
- Ensure TypeScript compilation succeeds locally
- Review build logs in Vercel dashboard

#### Database Connection Issues
- Verify `DATABASE_URL` is correctly set
- Check database provider credentials
- Ensure database is accessible from Vercel

#### Runtime Errors
- Check Vercel function logs
- Verify environment variables are set
- Review error messages in browser console

### CI/CD Workflow

The deployment workflow:

1. Push to `main` branch
2. GitHub Actions runs build and lint checks
3. If checks pass, deploys to Vercel
4. Vercel builds and deploys the application
5. Deployment URL is posted in PR comments (if applicable)

### Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Drizzle ORM with Vercel](https://orm.drizzle.team/docs/get-started-postgresql)

---

_For questions or issues with deployment, check the GitHub repository issues or Vercel support._

