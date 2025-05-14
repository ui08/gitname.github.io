const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Bump type: 'patch', 'minor', or 'major'
const bumpType = process.argv[2] || 'patch';

function bumpVersion(version, type) {
  const parts = version.split('.').map(Number);
  switch (type) {
    case 'major':
      parts[0]++;
      parts[1] = 0;
      parts[2] = 0;
      break;
    case 'minor':
      parts[1]++;
      parts[2] = 0;
      break;
    case 'patch':
    default:
      parts[2]++;
      break;
  }
  return parts.join('.');
}

// Read and update package.json
const packageJsonPath = path.resolve('./package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const newVersion = bumpVersion(packageJson.version, bumpType);
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Updated version to ${newVersion}`);

const tagName = `v${newVersion}`;

try {
  // Commit the version change
  execSync('git add package.json');
  execSync(`git commit -m "chore(release): bump version to ${newVersion}"`);
  execSync('git push');

  // Tag and push
  const existingTags = execSync('git tag').toString().split('\n');
  if (existingTags.includes(tagName)) {
    console.log(`Tag ${tagName} already exists. Skipping tag creation.`);
  } else {
    execSync(`git tag ${tagName}`);
    execSync(`git push origin ${tagName}`);
    console.log(`Tag ${tagName} created and pushed.`);
  }
} catch (err) {
  console.error('Error updating version, creating or pushing tag:', err.message);
  process.exit(1);
}
