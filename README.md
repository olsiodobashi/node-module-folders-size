# Node Modules Size Checker

A simple Node.js CLI tool that recursively scans a directory for top-level `node_modules` folders and prints their individual and total size.

## Features

- Skips nested `node_modules` inside other `node_modules`
- Displays each folder's size in MB
- Prints total size at the end

## Usage

```bash
chmod +x check-node-modules-size.js
./check-node-modules-size.js /path/to/your/projects
```

If no path is provided, it defaults to the current working directory.

Requirements
	•	Node.js
	•	du command (Unix-based systems)
