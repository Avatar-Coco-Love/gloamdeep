// § syntax: every file in src/ parses as a module, so a typo can't stop the game before its title
// (a stray bracket in screens.js did at 0.3.165; no other test loads that file). The files are
// parsed in one child Node, never run (vm.SourceTextModule only parses until linked).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync } from 'node:fs';

const files = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? files(`${dir}/${d.name}`) : d.name.endsWith('.js') ? [`${dir}/${d.name}`] : []));
const PARSE = `const vm = require('node:vm'), fs = require('node:fs'), bad = [];
for (const f of JSON.parse(process.argv[1])) { try { new vm.SourceTextModule(fs.readFileSync(f, 'utf8'), { identifier: f }); } catch (e) { bad.push(f + ': ' + e.message); } }
process.stdout.write(JSON.stringify(bad));`;

test('every file in src/ parses', () => {
  const all = files('src');
  assert.ok(all.length > 100, 'the files are found');
  const out = execFileSync(process.execPath, ['--experimental-vm-modules', '--no-warnings', '-e', PARSE, JSON.stringify(all)], { encoding: 'utf8' });
  assert.deepEqual(JSON.parse(out), []);
});
