const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build command
execSync('npm run build', { stdio: 'inherit' });

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log('dist directory found:', fs.readdirSync(distPath));
} else {
  console.error('dist directory not found');
  process.exit(1);
}
