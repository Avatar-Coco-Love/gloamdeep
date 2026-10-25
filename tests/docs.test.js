// § docs: every doc a conversation may read stays under its size cap (D-336); docs/archive/ has none
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';

const KB = 1024;
const CAPS = { 'docs/DECISIONS.md': 12 * KB, 'docs/PROGRESS.md': 4 * KB };

// Every .md file but the archive's, from the repo's top folder down
function docs(dir = '.') {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const path = dir === '.' ? d.name : `${dir}/${d.name}`;
    if (d.isDirectory()) return ['.git', 'node_modules', 'docs/archive'].includes(path) ? [] : docs(path);
    return path.endsWith('.md') ? [path] : [];
  });
}

test('every doc is under its cap: 8 KB, DECISIONS.md 12 KB, PROGRESS.md 4 KB', () => {
  const files = docs();
  assert.ok(files.includes('CLAUDE.md') && files.includes('CHANGELOG.md'));
  for (const f of files) {
    const size = statSync(f).size, cap = CAPS[f] ?? 8 * KB;
    assert.ok(size <= cap, `${f} is ${(size / KB).toFixed(1)} KB, over ${cap / KB} KB: archive or split it`);
  }
});

test('the archive index names every archive file', () => {
  const index = readdirSync('docs/archive').filter((f) => f !== 'README.md');
  const text = readFileSync('docs/archive/README.md', 'utf8');
  for (const f of index) assert.ok(text.includes(`\`${f}\``), `${f} is missing from docs/archive/README.md`);
});
