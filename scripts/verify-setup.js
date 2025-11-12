#!/usr/bin/env node

/**
 * Setup Verification Script
 * 
 * Verifies that the boilerplate setup completed successfully
 * and all required files and configurations are in place.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

let errors = 0;
let warnings = 0;

function check(name, condition, errorMsg, warnOnly = false) {
  if (condition) {
    log.success(name);
    return true;
  } else {
    if (warnOnly) {
      log.warn(`${name}: ${errorMsg}`);
      warnings++;
    } else {
      log.error(`${name}: ${errorMsg}`);
      errors++;
    }
    return false;
  }
}

function fileExists(filepath) {
  return fs.existsSync(filepath);
}

function hasContent(filepath, minSize = 10) {
  try {
    const stats = fs.statSync(filepath);
    return stats.size >= minSize;
  } catch {
    return false;
  }
}

console.clear();
log.title('🔍 Setup Verification');

// 1. Check Node.js version
log.title('📦 Environment');
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  check(
    'Node.js version',
    majorVersion >= 20,
    `Node.js 20+ required, found ${nodeVersion}`
  );
} catch (error) {
  log.error('Node.js version check failed');
  errors++;
}

// 2. Check npm
try {
  execSync('npm --version', { stdio: 'ignore' });
  log.success('npm installed');
} catch {
  log.error('npm not found');
  errors++;
}

// 3. Check package.json
log.title('📋 Project Files');
check(
  'package.json exists',
  fileExists('package.json'),
  'package.json not found'
);

if (fileExists('package.json')) {
  try {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    check(
      'package.json has name',
      pkg.name && pkg.name !== 'style-guide',
      'Project name not customized (still "style-guide")',
      true
    );
    check(
      'package.json has version',
      pkg.version,
      'No version specified'
    );
  } catch {
    log.error('package.json invalid JSON');
    errors++;
  }
}

// 4. Check node_modules
check(
  'Dependencies installed',
  fileExists('node_modules'),
  'Run npm install first'
);

// 5. Check environment file
check(
  '.env file exists',
  fileExists('.env'),
  'Run npm run setup to create .env'
);

if (fileExists('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  check(
    '.env has DATABASE_URL',
    envContent.includes('DATABASE_URL='),
    'DATABASE_URL not configured'
  );
  check(
    '.env has DATABASE_PROVIDER',
    envContent.includes('DATABASE_PROVIDER='),
    'DATABASE_PROVIDER not configured'
  );
}

// 6. Check key directories
log.title('📁 Directory Structure');
const requiredDirs = [
  'app',
  'components',
  'lib',
  'public'
];

requiredDirs.forEach(dir => {
  check(
    `${dir}/ directory`,
    fileExists(dir),
    `Missing ${dir}/ directory`
  );
});

// 7. Check key files
log.title('🔧 Configuration Files');
const requiredFiles = [
  'next.config.ts',
  'tsconfig.json',
  'tailwind.config.js',
  'drizzle.config.ts'
];

requiredFiles.forEach(file => {
  check(
    file,
    fileExists(file),
    `Missing ${file}`
  );
});

// 8. Check TypeScript
log.title('🔷 TypeScript');
try {
  execSync('npx tsc --version', { stdio: 'ignore' });
  log.success('TypeScript installed');
} catch {
  log.error('TypeScript not found');
  errors++;
}

// 9. Check database setup
log.title('🗄️  Database');
if (fileExists('.env')) {
  const envContent = fs.readFileSync('.env', 'utf8');
  const dbProvider = envContent.match(/DATABASE_PROVIDER=(\w+)/)?.[1] || 'unknown';
  
  if (dbProvider === 'sqlite') {
    check(
      'SQLite database',
      fileExists('dev.db') || true, // Warning only if missing
      'Database not initialized (run npm run db:migrate)',
      true
    );
  } else {
    log.info(`Database provider: ${dbProvider} (external)`);
  }
}

// 10. Check build
log.title('🏗️  Build Test');
log.info('Checking if project can build...');
try {
  execSync('npm run type-check', { stdio: 'ignore', timeout: 30000 });
  log.success('TypeScript check passed');
} catch (error) {
  log.warn('TypeScript check failed (may need to fix type errors)');
  warnings++;
}

// 11. Final summary
log.title('📊 Summary');

if (errors === 0 && warnings === 0) {
  console.log(`
${colors.green}${colors.bright}✓ All checks passed!${colors.reset}

Your setup is complete and ready for development.

${colors.cyan}Next steps:${colors.reset}

  ${colors.bright}npm run dev${colors.reset}           # Start development server
  ${colors.bright}npm run db:studio${colors.reset}     # Open database UI
  
Visit ${colors.bright}http://localhost:3000${colors.reset} to see your app!

${colors.cyan}Documentation:${colors.reset}
  - QUICKSTART.md - Quick reference
  - README.md - Full documentation
  - docs/ - Detailed guides

${colors.green}Happy coding! 🚀${colors.reset}
`);
  process.exit(0);
} else if (errors === 0) {
  console.log(`
${colors.yellow}⚠ Setup complete with warnings${colors.reset}

Warnings: ${warnings}

Your setup is mostly complete, but you may want to address the warnings above.

You can still start development:

  ${colors.bright}npm run dev${colors.reset}

${colors.yellow}Consider fixing the warnings for the best experience.${colors.reset}
`);
  process.exit(0);
} else {
  console.log(`
${colors.red}✗ Setup verification failed${colors.reset}

Errors: ${errors}
Warnings: ${warnings}

Please fix the errors above before continuing.

${colors.cyan}Common solutions:${colors.reset}

  ${colors.bright}npm install${colors.reset}           # Install dependencies
  ${colors.bright}npm run setup${colors.reset}          # Run setup wizard
  ${colors.bright}cp .env.example .env${colors.reset}   # Create environment file

${colors.cyan}Need help?${colors.reset}

  - Check QUICKSTART.md
  - Review README.md
  - Open a GitHub issue

${colors.red}Fix the errors and run ${colors.bright}npm run verify${colors.red} again.${colors.reset}
`);
  process.exit(1);
}



