// § make: the maker, tools/make.js (D-622), run in a copy of the game in a temporary folder:
// one of each kind made, the checker there passes all but its blanks, and names each one
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const dir = mkdtempSync(join(tmpdir(), 'gloamdeep-make-'));
for (const p of ['src', 'tests', 'docs', 'tools', 'package.json']) cpSync(join(ROOT, p), join(dir, p), { recursive: true });
const { NODE_TEST_CONTEXT, ...env } = process.env; // so a test run inside a test prints its own results
const run = (...args) => spawnSync(process.execPath, args, { cwd: dir, encoding: 'utf8', env });
const make = (...args) => run('tools/make.js', ...args);
const MADE = [['creature', 'glowWorm', 'Glow worm'], ['find', 'glowStone', 'Glow stone'], ['tile', 'mossPatch', 'Moss patch'], ['person', 'oldMiner', 'Old miner']];

test('--check lists what it would write and writes nothing', () => {
  const before = readFileSync(join(dir, 'src/core/enemies.js'), 'utf8'), out = make('creature', 'glowWorm', 'Glow worm', '--check');
  assert.equal(out.status, 0, out.stderr);
  assert.match(out.stdout, /would write src\/core\/enemies\.js/);
  assert.equal(readFileSync(join(dir, 'src/core/enemies.js'), 'utf8'), before);
});

test('it makes a creature, a find, a tile and a person', () => {
  for (const args of MADE) { const out = make(...args); assert.equal(out.status, 0, out.stderr); }
});

test('it refuses an id or name already taken, a bad id and a missing name', () => {
  for (const args of [['creature', 'glowWorm', 'Glow worm two'], ['find', 'rock', 'Rat'], ['find', 'Glow', 'Glow'], ['tile', 'mossy'], ['beast', 'ox', 'Ox']]) {
    assert.equal(make(...args).status, 1, args.join(' '));
  }
});

test('the checker there passes all but its blanks, and names each made thing in them', () => {
  const out = run('--test', 'tests/checker.test.js').stdout;
  const failed = [...out.matchAll(/^not ok \d+ - (.*)$/gm)].map((m) => m[1]);
  assert.deepEqual(failed, ['nothing the maker left is still blank']);
  for (const [, id] of MADE) assert.match(out, new RegExp(`${id}, its picture`), id);
  assert.match(out, /glowWorm: health, bite, ways, acts, fights \(src\/core\/enemies\.js:\d+\)/);
  assert.match(out, /glowWorm: from \(src\/core\/room\.js:\d+\)/);
  assert.match(out, /mossPatch, its drawing/);
  assert.match(out, /oldMiner, its content row \(docs\/CONTENT-2\.md:\d+\)/);
});

test('its own made tests pass, and its lines can be drawn', () => {
  const out = run('--test', ...MADE.map(([, id]) => `tests/${id}.test.js`), 'tests/lines.test.js');
  assert.equal(out.status, 0, out.stdout.split('\n').filter((l) => l.startsWith('not ok')).join('\n'));
  rmSync(dir, { recursive: true, force: true });
});
