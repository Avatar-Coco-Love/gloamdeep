// § release: the record-keeping tool (D-571, D-572). Not part of the game, which has no build step.
// By hand: the new top entry of CHANGELOG.md (`## 0.3.33 (date)` and its lines) and the new top
// entry of docs/PROGRESS.md's log (`- **date, 0.3.33, its title.** ...`). Then
// `node tools/release.js` does the rest: VERSION, the in-game history, the 3 newest changelog
// entries and log entries (older ones move to the archive word for word, D-338), and a warning
// when DECISIONS.md nears its cap. Safe to run again (after playtest tweaks).
// `node tools/release.js --check` changes nothing, lists what it would do, and exits 1 if anything.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const KEEP = 3;                     // CHANGELOG.md entries and PROGRESS.md log entries kept
const DECISIONS_WARN = 11 * 1024;   // the cap is 12 KB (tests/docs.test.js)
const TOOL = '`tools/release.js`';

// § files: read and write through one map, so --check can compare without writing
function files() {
  const cache = new Map();
  return {
    read: (p) => (cache.has(p) ? cache.get(p) : (existsSync(ROOT + p) ? readFileSync(ROOT + p, 'utf8') : null)),
    write: (p, text) => cache.set(p, text),
    list: (dir) => readdirSync(ROOT + dir),
    changed: () => [...cache].filter(([p, t]) => (existsSync(ROOT + p) ? readFileSync(ROOT + p, 'utf8') : null) !== t),
  };
}

// § changelog: entries are the blocks from a `## x.y.z (date)` heading to the next one
const HEAD = /^## (\d+\.\d+\.\d+) \((\d{4}-\d\d-\d\d)\)$/;
function entries(text) {
  const lines = text.split('\n'), heads = [];
  let fence = false;
  lines.forEach((l, i) => { if (l.startsWith('```')) fence = !fence; else if (!fence && HEAD.test(l)) heads.push(i); });
  return { lines, heads };
}
// An entry's changelog lines, as tests/history.test.js reads them: a bullet and its indented lines make one
function bullets(block) {
  const out = [];
  for (const l of block.slice(1)) {
    if (l.startsWith('- ')) out.push(l.slice(2).trim());
    else if (l.startsWith('  ') && l.trim() && out.length) out[out.length - 1] += ` ${l.trim()}`;
  }
  return out;
}
const minorOf = (v) => v.split('.').slice(0, 2).join('.');
const num = (v) => v.split('.').map(Number);
const newer = (a, b) => { const x = num(a), y = num(b); return x[0] - y[0] || x[1] - y[1] || x[2] - y[2]; };

// § log: PROGRESS.md's log entries, each a `- **` line and the indented lines under it
const LOG = /^- \*\*(\d{4}-\d\d-\d\d), (\d+\.\d+\.\d+), (.+?)\.\*\*/;
function logEntries(lines, from) {
  const out = [];
  for (let i = from; i < lines.length && (lines[i].startsWith('- **') || lines[i].startsWith('  ')); i++) {
    if (lines[i].startsWith('- **')) out.push({ start: i, end: i + 1 }); else out[out.length - 1].end = i + 1;
  }
  return out;
}

// § plan: every change, worked out in memory; returns the notes to print
export function plan(fs) {
  const notes = [], warn = [];
  const log = fs.read('CHANGELOG.md');
  const { lines, heads } = entries(log);
  if (!heads.length) throw new Error('CHANGELOG.md has no `## x.y.z (date)` entry');
  const [, v, date] = lines[heads[0]].match(HEAD);
  const top = bullets(lines.slice(heads[0], heads[1] ?? lines.length));
  if (!top.length) throw new Error(`CHANGELOG.md's ${v} has no lines`);

  // The title, from the PROGRESS.md log entry for this version
  const prog = fs.read('docs/PROGRESS.md').split('\n');
  const logAt = prog.findIndex((l) => l.startsWith('## Log'));
  const logs = logEntries(prog, logAt + 1);
  const m = logs.length && prog[logs[0].start].match(LOG);
  if (!m || m[2] !== v) throw new Error(`the top log entry in docs/PROGRESS.md must be "- **${date}, ${v}, its title.**"`);
  const title = m[3][0].toUpperCase() + m[3].slice(1);

  // VERSION
  const vf = 'src/core/version.js', vt = fs.read(vf);
  const vNew = vt.replace(/export const VERSION = '[^']*';/, `export const VERSION = '${v}';`);
  if (vNew !== vt) { fs.write(vf, vNew); notes.push(`VERSION set to ${v}`); }

  // The in-game history: this version's block at the top of history-<minor>.js, replaced if there
  const hf = `src/core/history-${minorOf(v)}.js`, ht = fs.read(hf);
  if (ht === null) throw new Error(`${hf} doesn't exist: a new minor version needs its history file made by hand`);
  const hl = ht.split('\n');
  const q = (s) => `'${s.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
  const block = [`  { v: '${v}', date: '${date}', title: ${q(title)}, lines: [`,
    ...top.map((l) => `    ${JSON.stringify(l.replaceAll('`', ''))},`), '  ] },'];
  const at = hl.findIndex((l) => l.startsWith(`  { v: '${v}',`));
  if (at >= 0) hl.splice(at, hl.indexOf('  ] },', at) - at + 1, ...block);
  else {
    const prev = hl.find((l) => l.startsWith("  { v: '"))?.match(/v: '([^']+)'/)[1];
    if (prev && newer(v, prev) <= 0) throw new Error(`${v} is not newer than the history's ${prev}`);
    hl.splice(hl.findIndex((l) => /^export const HISTORY_\w+ = \[$/.test(l)) + 1, 0, ...block);
  }
  if (hl.join('\n') !== ht) { fs.write(hf, hl.join('\n')); notes.push(`${hf}: ${v} "${title}"`); }

  // CHANGELOG.md keeps its newest 3; older ones go to the top of their stage's archive file
  if (heads.length > KEEP) {
    const moved = lines.slice(heads[KEEP]).join('\n').replace(/\n*$/, '\n');
    fs.write('CHANGELOG.md', lines.slice(0, heads[KEEP]).join('\n').replace(/\n*$/, '\n'));
    const byMinor = new Map();
    const { lines: ml, heads: mh } = entries(moved);
    mh.forEach((h, i) => {
      const mv = ml[h].match(HEAD)[1];
      byMinor.set(minorOf(mv), [...(byMinor.get(minorOf(mv)) ?? []), ml.slice(h, mh[i + 1] ?? ml.length)]);
    });
    for (const [minor, blocks] of byMinor) archiveChangelog(fs, minor, blocks, v, notes);
  }

  // PROGRESS.md's log keeps 3; older entries go to the top of archive/PROGRESS-LOG.md
  if (logs.length > KEEP) {
    const old = prog.slice(logs[KEEP].start, logs[logs.length - 1].end);
    prog.splice(logs[KEEP].start, old.length);
    fs.write('docs/PROGRESS.md', prog.join('\n'));
    const pf = 'docs/archive/PROGRESS-LOG.md', pl = fs.read(pf).split('\n');
    pl.splice(pl.findIndex((l) => l.startsWith('- **')), 0, ...old);
    fs.write(pf, pl.join('\n'));
    notes.push(`${logs.length - KEEP} log entr${logs.length - KEEP > 1 ? 'ies' : 'y'} moved to ${pf}`);
  }

  // DECISIONS.md: only a suggestion; grouping decisions by topic is for Claude to propose (D-572)
  const dt = fs.read('docs/DECISIONS.md');
  if (Buffer.byteLength(dt) > DECISIONS_WARN) {
    const ids = dt.split('\n').filter((l) => /^\*\*D-\d+ · /.test(l)).map((l) => l.match(/D-\d+/)[0]);
    const sup = dt.split(/\n(?=\*\*D-\d+ · )/).filter((b) => /superseded by/i.test(b) && /^\*\*D-/.test(b)).map((b) => b.match(/D-\d+/)[0]);
    warn.push(`docs/DECISIONS.md is ${(Buffer.byteLength(dt) / 1024).toFixed(1)} KB, near its 12 KB cap: propose a move to the archive.`
      + ` Superseded: ${sup.join(', ') || 'none'}. Oldest: ${ids.slice(0, 6).join(', ')}.`);
  }
  return { notes, warn };
}

// § archive: moved entries go word for word under the file's header, newest first
function archiveChangelog(fs, minor, blocks, v, notes) {
  const name = fs.list('docs/archive').filter((f) => f.startsWith(`CHANGELOG-STAGE-${minor}-`)).sort().pop()
    ?? `CHANGELOG-STAGE-${minor}-1.md`;
  const af = `docs/archive/${name}`;
  let text = fs.read(af);
  if (text === null) {
    text = `# Changelog: stage ${minor}, part 1 (from ${minor}.0)\n\nMoved unchanged from \`CHANGELOG.md\`.\nNewest first. Grep for a version; never read this whole.\n`;
    const rf = 'docs/archive/README.md', rl = fs.read(rf).split('\n');
    const last = rl.findLastIndex((l) => l.startsWith('| `CHANGELOG-'));
    rl.splice(last + 1, 0, `| \`${name}\` | ${minor}.0 to ${minor}.0 (moved from ${v} by ${TOOL}) |`);
    fs.write(rf, rl.join('\n'));
  }
  const al = text.split('\n');
  // The header says once that the tool moves each version from now on (a pointer, D-338)
  const said = al.findIndex((l) => l.startsWith('Moved unchanged'));
  if (!al[said].includes('tools/release.js')) al.splice(said + 1, 0, `From ${v} on, ${TOOL} moves each version here once ${KEEP} newer ones are in \`CHANGELOG.md\` (D-572).`);
  const first = al.findIndex((l) => HEAD.test(l));
  const add = blocks.flatMap((b) => [...b.slice(0, b.length - (b[b.length - 1] === '' ? 1 : 0)), '']);
  if (first < 0) al.push('', ...add); else al.splice(first, 0, ...add);
  fs.write(af, al.join('\n').replace(/\n*$/, '\n'));
  // The index row: its range ends at the newest version now in the file
  const newest = blocks[0][0].match(HEAD)[1];
  const rf = 'docs/archive/README.md', rt = fs.read(rf);
  const row = rt.split('\n').find((l) => l.startsWith(`| \`${name}\``));
  let nr = row.replace(new RegExp(`(\\| ${minor.replace('.', '\\.')}\\.\\d+ to )${minor.replace('.', '\\.')}\\.\\d+`), `$1${newest}`);
  if (!nr.includes('tools/release.js')) nr = nr.replace(/\) \|$/, `, then each by ${TOOL}) |`);
  fs.write(rf, rt.replace(row, nr));
  notes.push(`${blocks.map((b) => b[0].match(HEAD)[1]).join(', ')} moved to ${af}`);
}

// § run
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const check = process.argv.includes('--check');
  const fs = files();
  try {
    const { notes, warn } = plan(fs);
    for (const w of warn) console.log(`note: ${w}`);
    const changed = fs.changed();
    if (check) {
      for (const n of notes) console.log(`to do: ${n}`);
      console.log(changed.length ? `release: ${changed.length} file(s) out of step; run node tools/release.js` : 'release: all in step');
      process.exit(changed.length ? 1 : 0);
    }
    for (const [p, t] of changed) writeFileSync(ROOT + p, t);
    for (const n of notes) console.log(n);
    console.log(changed.length ? `release: ${changed.length} file(s) updated` : 'release: all in step');
  } catch (e) {
    console.error(`release: ${e.message}`);
    process.exit(2);
  }
}
