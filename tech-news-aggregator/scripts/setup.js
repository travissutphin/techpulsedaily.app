#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function setup() {
  console.log('🚀 Welcome to TechPulse Daily Setup!\n');
  console.log('This script will help you configure your AI-powered tech news aggregator.\n');

  try {
    // Get Claude API key
    const claudeApiKey = await askQuestion('Enter your Claude API key: ');
    
    // Get site configuration
    console.log('\n📝 Site Configuration:');
    const siteName = await askQuestion('Site name (default: TechPulse Daily): ') || 'TechPulse Daily';
    const siteDescription = await askQuestion('Site description: ') || 'AI-curated tech news for busy professionals. Get quality insights for meaningful conversations.';
    const siteUrl = await askQuestion('Site URL (e.g., https://your-domain.com): ') || 'https://your-domain.com';
    
    // Get admin password
    const adminPassword = await askQuestion('Admin dashboard password: ') || 'change_this_password_123';

    // Update configurations
    console.log('\n⚙️  Updating configuration files...');

    // Update Claude config
    const claudeConfigPath = path.join(__dirname, '..', 'config', 'claude.json');
    const claudeConfig = JSON.parse(fs.readFileSync(claudeConfigPath, 'utf8'));
    claudeConfig.apiKey = claudeApiKey;
    fs.writeFileSync(claudeConfigPath, JSON.stringify(claudeConfig, null, 2));

    // Update site config
    const siteConfigPath = path.join(__dirname, '..', 'config', 'site.json');
    const siteConfig = JSON.parse(fs.readFileSync(siteConfigPath, 'utf8'));
    siteConfig.site.name = siteName;
    siteConfig.site.description = siteDescription;
    siteConfig.site.url = siteUrl;
    siteConfig.admin.password = adminPassword;
    fs.writeFileSync(siteConfigPath, JSON.stringify(siteConfig, null, 2));

    // Create .env file
    const envContent = `
# Claude API Configuration
CLAUDE_API_KEY=${claudeApiKey}

# Site Configuration
SITE_URL=${siteUrl}
ADMIN_PASSWORD=${adminPassword}

# Environment
NODE_ENV=development
`;

    fs.writeFileSync(path.join(__dirname, '..', '.env.local'), envContent.trim());

    console.log('\n✅ Setup completed successfully!');
    console.log('\n📋 Next Steps:');
    console.log('1. Run: npm run dev');
    console.log('2. Visit: http://localhost:3000 to see your site');
    console.log('3. Visit: http://localhost:3000/admin to manage articles');
    console.log('4. Trigger manual scraping from the admin panel');
    console.log('\n🔧 Configuration files updated:');
    console.log('   - config/claude.json');
    console.log('   - config/site.json');
    console.log('   - .env.local');
    
    console.log('\n📖 Documentation:');
    console.log('   - README.md - Full setup and usage guide');
    console.log('   - config/ - All configuration files');
    console.log('\n🎉 Your AI news aggregator is ready to use!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

setup();