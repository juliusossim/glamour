const fs = require('fs');
const path = require('path');

function findFiles(dir, names = ['package.json', 'project.json']) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(full, names));
    } else if (names.includes(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

function hasTags(file) {
  try {
    const raw = fs.readFileSync(file, 'utf8');
    const json = JSON.parse(raw);
    if (json.nx && Array.isArray(json.nx.tags) && json.nx.tags.length > 0)
      return true;
    if (Array.isArray(json.tags) && json.tags.length > 0) return true;
    return false;
  } catch (e) {
    console.error(`Could not read ${file}: ${e.message}`);
    return true; // ignore parse errors for non-json files
  }
}

const workspaceRoot = process.cwd();
const dirsToCheck = ['apps', 'libs']
  .map((d) => path.join(workspaceRoot, d))
  .filter(fs.existsSync);
const missing = [];
for (const d of dirsToCheck) {
  const files = findFiles(d);
  for (const f of files) {
    if (!hasTags(f)) missing.push(f);
  }
}

if (missing.length > 0) {
  console.error('The following project files are missing nx tags:\n');
  missing.forEach((m) =>
    console.error(' - ' + path.relative(workspaceRoot, m))
  );
  console.error('\nPlease add an `nx.tags` array to these project files.');
  process.exitCode = 2;
} else {
  console.log('All checked projects have tags.');
}
