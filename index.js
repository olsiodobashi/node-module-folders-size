#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const visited = new Set();
let totalSize = 0;

function getFolderSize(folderPath) {
  try {
    const output = execSync(`du -sk "${folderPath}"`).toString();
    const sizeKb = parseInt(output.split('\t')[0], 10);
    return sizeKb * 1024; // in bytes
  } catch (err) {
    console.error(`Error reading size of ${folderPath}`);
    return 0;
  }
}

function shouldIgnore(dirPath) {
  return dirPath.includes(`node_modules${path.sep}`);
}

function scan(dir) {
  if (visited.has(dir)) return;
  visited.add(dir);

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' && !shouldIgnore(fullPath)) {
        const size = getFolderSize(fullPath);
        console.log(`${fullPath} - ${(size / (1024 * 1024)).toFixed(2)} MB`);
        totalSize += size;
        continue; // don't recurse into node_modules
      }
      if (entry.name !== 'node_modules') {
        scan(fullPath);
      }
    }
  }
}

const root = process.argv[2] || process.cwd();
scan(root);

console.log(`\nTotal size: ${(totalSize / (1024 * 1024)).toFixed(2)} MB`);

