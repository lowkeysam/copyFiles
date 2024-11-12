// Import necessary modules
const fs = require('fs');
const path = require('path');

// Define the starting directory and target directory
const startDir = path.resolve(__dirname); // Current directory where script is executed
const targetDir = path.join(startDir, '..', 'repo'); // Repo folder in the parent directory

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Function to recursively search and copy .ts and .tsx files
function copyTsFiles(directory) {
  // Read the contents of the current directory
  const items = fs.readdirSync(directory);

  // Iterate over each item in the directory
  items.forEach(item => {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    // Skip the node_modules directory
    if (stat.isDirectory() && item === 'node_modules') {
      return;
    }

    // If the item is a directory, recursively search it
    if (stat.isDirectory()) {
      copyTsFiles(itemPath);
    }
    // If the item is a .ts or .tsx file, copy it to the target directory
    else if (stat.isFile() && (item.endsWith('.ts') || item.endsWith('.tsx'))) {
      const targetPath = path.join(targetDir, path.basename(item));
      fs.copyFileSync(itemPath, targetPath);
      console.log(`Copied: ${itemPath} to ${targetPath}`);
    }
  });
}

// Start the process
copyTsFiles(startDir);

console.log('All .ts and .tsx files have been copied to the repo folder.');
