// § kept: nothing in the decisions or the archive is lost (D-338, H-94, D-982). At 0.3.414 one commit
// cut archive/DECISIONS-SURFACE.md from 2,566 lines to 14 and nothing noticed; the next put it back.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

test('every decision from D-001 on is kept, once: DECISIONS.md and archive/DECISIONS-*.md', () => {
  const files = ['docs/DECISIONS.md', ...readdirSync('docs/archive').filter((f) => f.startsWith('DECISIONS-')).map((f) => `docs/archive/${f}`)];
  const seen = new Map();
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/^\*\*D-(\d+) · /gm)) {
      const n = Number(m[1]);
      assert.ok(!seen.has(n), `D-${m[1]} is in both ${seen.get(n)} and ${f}`);
      seen.set(n, f);
    }
  }
  const top = Math.max(...seen.keys());
  const gone = Array.from({ length: top }, (_, i) => i + 1).filter((n) => !seen.has(n));
  assert.deepEqual(gone.map((n) => `D-${String(n).padStart(3, '0')}`), [], 'missing decisions: find them in git and put them back word for word');
});

// Against main as last fetched: no archive file goes, and none shrinks (its index, README.md, may)
test('no archive file is gone or smaller than on main', (t) => {
  let listing;
  try { listing = execFileSync('git', ['ls-tree', '-l', 'origin/main', 'docs/archive/'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch { t.skip('no origin/main to compare with'); return; }
  for (const line of listing.trim().split('\n')) {
    const [, , , size, path] = line.split(/\s+/);
    if (path.endsWith('/README.md')) continue;
    assert.ok(existsSync(path), `${path} is gone: nothing in the archive is deleted`);
    assert.ok(statSync(path).size >= Number(size), `${path} is ${statSync(path).size} bytes, ${size} on main: the archive only grows`);
  }
});
