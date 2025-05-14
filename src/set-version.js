const { execSync } = require('child_process');
const fs = require('fs');

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();
const timestamp = new Date().toISOString();

const version = `${commitHash}-${timestamp}`;
const envContent = `REACT_APP_VERSION=${version}\n`;

fs.writeFileSync('.env.production.local', envContent);
console.log(`Build version set: ${version}`);
