# Flattened TypeScript File Extractor

## Overview
This script recursively scans a project directory for all `.ts` and `.tsx` files and copies them into a single directory (`repo/`). To prevent filename conflicts, it embeds the directory structure into the filename using hyphens (`-`).

## Features
- Recursively searches for `.ts` and `.tsx` files.
- Stores all files in a single `repo/` directory.
- Avoids filename conflicts by encoding directory structure into filenames.
- Skips the `node_modules` directory for performance and relevance.

## Installation & Usage
### 1. Clone or Download
Ensure you have Node.js installed on your machine, then place the script in your project directory.

### 2. Run the Script
Navigate to the script location in your terminal and run:

```sh
node script.js
```

### 3. Output
All `.ts` and `.tsx` files will be copied into `repo/` in the parent directory of the script.

## File Naming Format
Since all files are placed in a single directory, filenames are modified to prevent duplicates by encoding their original paths:

| Original Path | Flattened Filename |
|--------------|------------------|
| `src/pages/page.tsx` | `src-pages-page.tsx` |
| `components/Button.tsx` | `components-Button.tsx` |
| `utils/helpers.ts` | `utils-helpers.ts` |

## Customization
If you need to modify the output folder, change the following line in the script:

```javascript
const targetDir = path.join(startDir, '..', 'repo');
```

Modify `'repo'` to your preferred directory name.

## Notes
- The script **preserves** all `.ts` and `.tsx` files but does not maintain subdirectories.
- Works across Windows, macOS, and Linux.

## License
This script is provided under the MIT License. Feel free to modify and use it as needed.

