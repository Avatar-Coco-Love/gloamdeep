// § release: the record-keeping tool (D-572) has been run: nothing is out of step; and it moves word for word
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { plan } from '../tools/release.js';

test('node tools/release.js --check: VERSION, history, changelog and log all in step', () => {
  let out = '';
  try { out = execFileSync('node', ['tools/release.js', '--check'], { encoding: 'utf8' }); }
  catch (e) { assert.fail(`${e.stdout}${e.stderr}`.trim()); }
  assert.match(out, /all in step/);
});

// A tiny repo in memory
function memory(start) {
  const disk = { ...start };
  return { disk, read: (p) => disk[p] ?? null, write: (p, t) => { disk[p] = t; },
    list: (dir) => Object.keys(disk).filter((p) => p.startsWith(`${dir}/`)).map((p) => p.slice(dir.length + 1)) };
}
const entry = (v, line) => `## ${v} (2026-11-02)\n- ${line}\n  more of it.\n- Decisions: none.\n`;
const repo = () => memory({
  'CHANGELOG.md': `# Changelog\n\n\`\`\`\n## 0.0.2 (2026-10-18)\n- Example.\n\`\`\`\n\n${['9 nine', '8 eight', '7 seven', '6 six'].map((s) => entry(`0.9.${s[0]}`, s)).join('\n')}`,
  'docs/PROGRESS.md': '# Progress\n\n## Log (last 3)\n- **2026-11-02, 0.9.9, the ninth.** A.\n  b.\n- **2026-11-02, 0.9.8, x.** C.\n- **2026-11-02, 0.9.7, y.** D.\n- **2026-11-02, 0.9.6, z.** E.\n  f.\n\n## End\n',
  'docs/archive/PROGRESS-LOG.md': '# Log\n\n- **2026-11-02, 0.9.5, w.** G.\n',
  'docs/archive/CHANGELOG-STAGE-0.9-1.md': '# Changelog: 0.9\n\nMoved unchanged from `CHANGELOG.md`: 0.9.0 to 0.9.5.\nNewest first.\n\n## 0.9.5 (2026-11-01)\n- Old.\n',
  'docs/archive/README.md': '| `CHANGELOG-STAGE-0.9-1.md` | 0.9.0 to 0.9.5 (moved at 0.9.6) |\n',
  'docs/DECISIONS.md': '# Decisions\n',
  'src/core/version.js': "export const VERSION = '0.9.8';\n",
  'src/core/history-0.9.js': "export const HISTORY_09 = [\n  { v: '0.9.8', date: '2026-11-02', title: 'X', lines: [\n    \"8 eight more of it.\",\n  ] },\n];\n",
});

test('it sets VERSION, adds the history, keeps 3 of each and moves the rest word for word', () => {
  const fs = repo();
  plan(fs);
  const d = fs.disk;
  assert.match(d['src/core/version.js'], /'0\.9\.9'/);
  assert.match(d['src/core/history-0.9.js'], /^export const HISTORY_09 = \[\n {2}\{ v: '0\.9\.9', date: '2026-11-02', title: 'The ninth', lines: \[\n {4}"9 nine more of it\.",\n {4}"Decisions: none\.",\n {2}\] \},\n {2}\{ v: '0\.9\.8'/);
  assert.ok(!d['CHANGELOG.md'].includes('0.9.6') && d['CHANGELOG.md'].includes('## 0.0.2'));
  assert.ok(d['docs/archive/CHANGELOG-STAGE-0.9-1.md'].includes(`Newest first.\n\n${entry('0.9.6', '6 six')}\n## 0.9.5`));
  assert.match(d['docs/archive/README.md'], /0\.9\.0 to 0\.9\.6 \(moved at 0\.9\.6, then each by `tools\/release\.js`\)/);
  assert.ok(!d['docs/PROGRESS.md'].includes('0.9.6') && d['docs/PROGRESS.md'].includes('\n\n## End'));
  assert.ok(d['docs/archive/PROGRESS-LOG.md'].includes('- **2026-11-02, 0.9.6, z.** E.\n  f.\n- **2026-11-02, 0.9.5'));
  // Run again: nothing more changes
  const once = JSON.stringify(d);
  plan(fs);
  assert.equal(JSON.stringify(fs.disk), once);
});

test('it stops when the log entry is missing, and warns as DECISIONS.md nears its cap', () => {
  const fs = repo();
  fs.write('docs/PROGRESS.md', fs.read('docs/PROGRESS.md').replace('0.9.9, the ninth', '0.9.8, the ninth'));
  assert.throws(() => plan(fs), /top log entry/);
  const big = repo();
  big.write('docs/DECISIONS.md', `**D-001 · d · t** x\n\n**D-002 · d · t** *Superseded by D-003.*\n${'.'.repeat(12000)}`);
  assert.match(plan(big).warn[0], /Superseded: D-002\. Oldest: D-001, D-002/);
});
