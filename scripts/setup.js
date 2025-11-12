#!/usr/bin/env node

/**
 * Interactive setup script for Style Guide Boilerplate
 * 
 * This script helps new users configure their project after cloning/copying
 * the template. It prompts for configuration and automates setup steps.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`),
};

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}?${colors.reset} ${prompt}: `, resolve);
  });
}

function confirm(prompt, defaultValue = true) {
  const defaultStr = defaultValue ? 'Y/n' : 'y/N';
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}?${colors.reset} ${prompt} (${defaultStr}): `, (answer) => {
      const normalized = answer.toLowerCase().trim();
      if (normalized === '') {
        resolve(defaultValue);
      } else {
        resolve(normalized === 'y' || normalized === 'yes');
      }
    });
  });
}

async function run() {
  console.clear();
  log.title('🚀 Style Guide Boilerplate Setup');
  
  console.log('This wizard will help you set up your new project.\n');

  try {
    // 1. Get project name
    const currentName = JSON.parse(fs.readFileSync('package.json', 'utf8')).name;
    const suggestedName = path.basename(process.cwd());
    
    let projectName = await question(`Project name (${suggestedName})`);
    if (!projectName) projectName = suggestedName;
    
    // Validate project name
    if (!/^[a-z0-9-]+$/.test(projectName)) {
      log.warn('Project name should only contain lowercase letters, numbers, and hyphens');
      projectName = projectName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      log.info(`Using: ${projectName}`);
    }

    // 2. Get project description
    const projectDescription = await question('Project description (optional)');

    // 3. Database configuration
    log.title('📊 Database Configuration');
    
    const dbProviders = ['sqlite', 'postgresql', 'mysql'];
    console.log('Available database providers:');
    dbProviders.forEach((provider, index) => {
      console.log(`  ${index + 1}. ${provider}`);
    });
    
    let dbChoice = await question('Choose database provider (1-3, default: 1)');
    if (!dbChoice) dbChoice = '1';
    const dbProvider = dbProviders[parseInt(dbChoice) - 1] || 'sqlite';
    
    let dbUrl;
    if (dbProvider === 'sqlite') {
      dbUrl = './dev.db';
      log.info('Using SQLite with local file: ./dev.db');
    } else {
      dbUrl = await question(`Database URL for ${dbProvider}`);
      if (!dbUrl) {
        log.warn(`No URL provided, falling back to SQLite`);
        dbUrl = './dev.db';
      }
    }

    // 4. Ask about cleanup
    log.title('🧹 Project Cleanup');
    const removeExamples = await confirm('Remove example projects and demo content?', true);

    // 5. Perform updates
    log.title('📝 Updating project files...');

    // Update package.json
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    packageJson.name = projectName;
    if (projectDescription) {
      packageJson.description = projectDescription;
    }
    packageJson.version = '0.1.0';
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2) + '\n');
    log.success('Updated package.json');

    // Create .env file
    const envContent = `# Database Configuration
DATABASE_PROVIDER=${dbProvider}
DATABASE_URL=${dbUrl}

# Application
NODE_ENV=development

# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
    fs.writeFileSync('.env', envContent);
    log.success('Created .env file');

    // Update app metadata
    const layoutPath = 'app/layout.tsx';
    if (fs.existsSync(layoutPath)) {
      let layoutContent = fs.readFileSync(layoutPath, 'utf8');
      layoutContent = layoutContent.replace(
        /title: ".*"/,
        `title: "${projectName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}"`
      );
      if (projectDescription) {
        layoutContent = layoutContent.replace(
          /description: ".*"/,
          `description: "${projectDescription}"`
        );
      }
      fs.writeFileSync(layoutPath, layoutContent);
      log.success('Updated app/layout.tsx');
    }

    // Cleanup examples if requested
    if (removeExamples) {
      log.info('Cleaning up example content...');
      
      // Remove example projects
      if (fs.existsSync('projects/template-project')) {
        fs.rmSync('projects/template-project', { recursive: true, force: true });
        log.success('Removed template-project');
      }
      
      // Remove example tasks
      if (fs.existsSync('projects/init')) {
        fs.rmSync('projects/init', { recursive: true, force: true });
        log.success('Removed init project');
      }

      // Create empty projects directory with README
      if (!fs.existsSync('projects')) {
        fs.mkdirSync('projects', { recursive: true });
      }
      fs.writeFileSync('projects/README.md', '# Projects\n\nCreate your project directories and task files here.\n');
    }

    // 6. Database setup
    if (dbProvider === 'sqlite') {
      log.title('🗄️  Setting up database...');
      
      try {
        log.info('Running database migrations...');
        execSync('npm run db:migrate', { stdio: 'inherit' });
        log.success('Database initialized');
      } catch (error) {
        log.warn('Database migration encountered an issue (this may be normal if no migrations exist yet)');
      }
    } else {
      log.warn('Manual database setup required for non-SQLite providers');
      log.info('Run: npm run db:generate && npm run db:migrate');
    }

    // 7. Initialize git if needed
    if (!fs.existsSync('.git')) {
      const initGit = await confirm('Initialize git repository?', true);
      if (initGit) {
        try {
          execSync('git init', { stdio: 'inherit' });
          execSync('git add .', { stdio: 'inherit' });
          execSync('git commit -m "Initial commit from style-guide boilerplate"', { stdio: 'inherit' });
          log.success('Git repository initialized');
        } catch (error) {
          log.warn('Git initialization failed (git may not be installed)');
        }
      }
    }

    // 8. Success summary
    log.title('✅ Setup Complete!');
    
    console.log(`
${colors.green}Your project is ready!${colors.reset}

📁 Project: ${colors.bright}${projectName}${colors.reset}
🗄️  Database: ${colors.bright}${dbProvider}${colors.reset}
🚀 Next steps:

  ${colors.cyan}npm run dev${colors.reset}           # Start development server
  ${colors.cyan}npm run db:studio${colors.reset}     # Open database UI
  
Visit ${colors.bright}http://localhost:3000${colors.reset} to see your app!

📚 Documentation:
  - README.md - Full documentation
  - QUICKSTART.md - Quick reference
  - docs/ - Detailed guides

Need help? Check out the documentation or open an issue on GitHub.

${colors.bright}Happy coding! 🎉${colors.reset}
`);

  } catch (error) {
    log.error('Setup failed');
    console.error(error);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run setup
run();



