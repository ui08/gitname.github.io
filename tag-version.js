// tag-version.js
const { execSync } = require('child_process');
const fs = require('fs');

// Get version from package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const version = packageJson.version;
const tagName = `v${version}`;

try {
  // Check if tag already exists
  const existingTags = execSync('git tag').toString().split('\n');
  if (existingTags.includes(tagName)) {
    console.log(`Tag ${tagName} already exists. Skipping tag creation.`);
  } else {
    // Create and push tag
    execSync(`git tag ${tagName}`);
    execSync(`git push origin ${tagName}`);
    console.log(`Tag ${tagName} created and pushed.`);
  }
} catch (err) {
  console.error('Error creating or pushing tag:', err.message);
  process.exit(1);
}
