// § audit: a record-keeping tool (D-982, H-97), not part of the game. `node tools/audit.js` prints, one
// line each, the docs near their size caps (less than a twentieth left) and the bytes a conversation reads
// at its start (CLAUDE.md, PROGRESS.md, PR-CHECKLIST.md, DECISIONS.md, H-87). Changes nothing.
// tests/docs.test.js reads the caps from here, so they live in one place (D-336).
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const KB = 1024;
export const CAPS = { 'docs/DECISIONS.md': 12 * KB, 'docs/PROGRESS.md': 4 * KB };
export const CAP = 8 * KB;
export const START = ['CLAUDE.md', 'docs/PROGRESS.md', 'docs/PR-CHECKLIST.md', 'docs/DECISIONS.md'];
const NEAR = 1 / 20;

// § docs: every .md file but the archive's, from the repo's top folder down
export function docs(root, dir = '.') {
  return readdirSync(`${root}/${dir}`, { withFileTypes: true }).flatMap((d) => {
    const path = dir === '.' ? d.name : `${dir}/${d.name}`;
    if (d.isDirectory()) return ['.git', 'node_modules', 'docs/archive'].includes(path) ? [] : docs(root, path);
    return path.endsWith('.md') ? [path] : [];
  });
}

// § report: the lines to print
export function report(root) {
  const size = (f) => statSync(`${root}/${f}`).size;
  const near = docs(root).map((f) => ({ f, size: size(f), cap: CAPS[f] ?? CAP }))
    .filter((d) => d.cap - d.size < d.cap * NEAR).sort((a, b) => (a.cap - a.size) - (b.cap - b.size));
  const start = START.reduce((sum, f) => sum + size(f), 0);
  return [
    ...near.map((d) => `near cap: ${d.f} ${d.size} of ${d.cap} bytes, ${d.cap - d.size} left`),
    `${near.length} doc(s) near their caps`,
    `read at start: ${start} bytes, about ${Math.round(start / 4 / 100) / 10}k tokens (${START.join(', ')})`,
  ];
}

// § run
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  for (const line of report(fileURLToPath(new URL('..', import.meta.url)))) console.log(line);
}
