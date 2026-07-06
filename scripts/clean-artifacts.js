const fs = require('node:fs');
const path = require('node:path');

const artifactDirectories = ['reports', 'screenshots'];
const filesToKeep = new Set(['.gitkeep']);

function ensureDirectory(directoryPath) {
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }
}

function cleanDirectory(directory) {
  const directoryPath = path.resolve(process.cwd(), directory);

  ensureDirectory(directoryPath);

  for (const entry of fs.readdirSync(directoryPath, { withFileTypes: true })) {
    if (filesToKeep.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(directoryPath, entry.name);
    fs.rmSync(entryPath, { recursive: true, force: true });
  }
}

for (const directory of artifactDirectories) {
  cleanDirectory(directory);
}

console.log('Artifacts cleaned: reports/ and screenshots/');
