// § docs: every doc a conversation may read stays under its size cap (D-336); docs/archive/ has none.
// The caps and the list of docs live in tools/audit.js (D-982).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { KB, CAPS, CAP, docs, report } from '../tools/audit.js';

test('every doc is under its cap: 8 KB, DECISIONS.md 12 KB, PROGRESS.md 4 KB', () => {
  const files = docs('.');
  assert.ok(files.includes('CLAUDE.md') && files.includes('CHANGELOG.md'));
  for (const f of files) {
    const size = statSync(f).size, cap = CAPS[f] ?? CAP;
    assert.ok(size <= cap, `${f} is ${(size / KB).toFixed(1)} KB, over ${cap / KB} KB: archive or split it`);
  }
});

test('the archive index names every archive file', () => {
  const index = readdirSync('docs/archive').filter((f) => f !== 'README.md');
  const text = readFileSync('docs/archive/README.md', 'utf8');
  for (const f of index) assert.ok(text.includes(`\`${f}\``), `${f} is missing from docs/archive/README.md`);
});

test('node tools/audit.js: one line each, ending with the bytes read at start (D-982)', () => {
  const lines = report('.');
  assert.match(lines.at(-1), /^read at start: \d+ bytes, about [\d.]+k tokens \(CLAUDE\.md, /);
  assert.match(lines.at(-2), /^\d+ doc\(s\) near their caps$/);
});
