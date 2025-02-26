const fs = require('fs');
const path = require('path');

const startDir = path.resolve(__dirname); // Current directory where script is executed
const targetDir = path.join(startDir, '..', 'repo'); // Flattened output folder

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Function to recursively find and copy .ts and .tsx files with a unique name
function copyTsFiles(directory, baseDir = startDir) {
  const items = fs.readdirSync(directory);

  items.forEach(item => {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    // Skip the node_modules directory
    if (stat.isDirectory() && item === 'node_modules') {
      return;
    }

    if (stat.isDirectory()) {
      copyTsFiles(itemPath, baseDir);
    } else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
      // Compute the relative path and format the new filename
      const relativePath = path.relative(baseDir, itemPath);
      const formattedName = relativePath.replace(/[\/\\]/g, '-'); // Convert path separators to dashes
      const targetPath = path.join(targetDir, formattedName);

      // Copy the file
      fs.copyFileSync(itemPath, targetPath);
      console.log(`Copied: ${itemPath} to ${targetPath}`);
    }
  });
}

// Start the process
copyTsFiles(startDir);

console.log('All .ts and .tsx files have been copied to the repo folder with unique names.');
