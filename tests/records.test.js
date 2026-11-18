// § records (0.3.415): nothing kept goes missing. Old entries move to docs/archive/ word for word and
// are never deleted (D-338), so every decision, every version's changelog entry and every log entry
// from 0.1.9 on must be found in its doc or that doc's archive files. Added after a script of
// Claude's emptied an archive file by mistake and every other test still passed (0.3.414).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';

const read = (f) => readFileSync(f, 'utf8');
const archive = (prefix) => readdirSync('docs/archive').filter((f) => f.startsWith(prefix) && f.endsWith('.md')).map((f) => `docs/archive/${f}`);
const found = (files, pattern) => new Set(files.flatMap((f) => [...read(f).matchAll(pattern)].map((m) => m[1])));
const parts = (v) => v.split('.').map(Number);
const newest = read('src/core/version.js').match(/(\d+\.\d+\.\d+)/)[1];

// Every version from the first to the newest: each minor's patches run unbroken from its first to its last
// (0.0.1 to 0.0.9, then 0.1.0 on), so a hole means a lost entry
function versions(set) {
  const byMinor = {};
  for (const v of set) { const [a, b, c] = parts(v); (byMinor[`${a}.${b}`] ??= []).push(c); }
  return Object.entries(byMinor).flatMap(([m, ps]) => { const lo = Math.min(...ps), hi = Math.max(...ps); return Array.from({ length: hi - lo + 1 }, (_, i) => `${m}.${lo + i}`); });
}

test('every decision from D-001 to the newest is in DECISIONS.md or its archive', () => {
  const ids = found(['docs/DECISIONS.md', ...archive('DECISIONS')], /^\*\*D-(\d+) ·/gm);
  const nums = new Set([...ids].map(Number)), top = Math.max(...nums);
  assert.ok(top >= 972, `the newest decision found is D-${top}`);
  const missing = Array.from({ length: top }, (_, i) => i + 1).filter((n) => !nums.has(n));
  assert.deepEqual(missing.map((n) => `D-${String(n).padStart(3, '0')}`), [], 'decisions missing: restore them from git');
});

test('every version has its changelog entry, in CHANGELOG.md or its archive', () => {
  const kept = found(['CHANGELOG.md', ...archive('CHANGELOG')], /^## (\d+\.\d+\.\d+) /gm);
  assert.ok(kept.has(newest), `the version ${newest} has no changelog entry`);
  assert.ok(kept.has('0.0.1') && kept.has('0.3.414'));
  assert.deepEqual(versions(kept).filter((v) => !kept.has(v)), [], 'changelog entries missing: restore them from git');
});

test('every version from 0.1.9 has its log entry, in PROGRESS.md or its archive', () => {
  const logged = found(['docs/PROGRESS.md', 'docs/archive/PROGRESS-LOG.md'], /^- \*\*\d{4}-\d\d-\d\d, (\d+\.\d+\.\d+)/gm);
  const kept = found(['CHANGELOG.md', ...archive('CHANGELOG')], /^## (\d+\.\d+\.\d+) /gm);
  const after = (v) => { const [a, b, c] = parts(v); return a > 0 || b > 1 || (b === 1 && c >= 9); };
  assert.deepEqual(versions(kept).filter(after).filter((v) => !logged.has(v)), [], 'log entries missing: restore them from git');
});
