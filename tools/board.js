// § board: a record-keeping tool for the big planning run (D-996), not part of the game.
// `node tools/board.js <out.html>` turns docs/planning/'s idea, check and recommendation lines into the planning
// board's cards and writes the page (tools/board.html with the cards put in). It reads only the
// lines PLANNING.md names, so building the board needs no reading of the ideas. Without an out
// path it prints the counts and any problem, one line each. Changes nothing in the repo.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HORIZONS = { 'Now': 'now', 'Next': 'next', 'Toward publishing': 'publish', 'Someday': 'someday' };
const IDEA = /^- \*\*(\d\.\d\d) (.+?)\*\* · (.+)$/;
const CHECK = /^- (\d\.\d\d) · ([SML]) · (.+)$/;
const REC = /^- (\d\.\d\d) · (Keep|Maybe|Drop) · (.+)$/;

// § parse: the cards, and a list of problems (empty when every idea has one check and one
// recommendation, Claude's, from RECS-*.md, and the reverse)
export function parse(root) {
  const dir = `${root}/docs/planning`, files = readdirSync(dir), cards = [], problems = [], areas = {};
  for (const f of files.filter((f) => /^\d-.+\.md$/.test(f)).sort()) {
    const lines = readFileSync(`${dir}/${f}`, 'utf8').split('\n');
    areas[f[0]] = lines[0].replace(/^# Area \d: /, '');
    let horizon = null;
    for (const line of lines) {
      const h = line.match(/^## (.+)$/);
      if (h) { horizon = HORIZONS[h[1].trim()] ?? null; continue; }
      const m = line.match(IDEA);
      if (!m) { if (/^- \*\*\d/.test(line)) problems.push(`${f}: an idea line in the wrong shape`); continue; }
      if (!horizon) problems.push(`${f}: ${m[1]} is under no horizon`);
      const parts = m[3].split(' · ');
      const wild = parts[0].trim() === 'wild';
      if (wild) parts.shift();
      const tag = parts.shift().trim(), text = parts.join(' · ').trim();
      cards.push({ id: m[1], area: f[0], name: m[2].trim(), horizon, wild, tag, text, size: null, verdicts: [], rec: null });
    }
  }
  const byId = new Map(cards.map((c) => [c.id, c]));
  if (byId.size !== cards.length) problems.push('two ideas share an id');
  for (const f of files.filter((f) => /^CHECK-\d\.md$/.test(f)).sort()) {
    for (const line of readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
      if (/^Notes:/.test(line)) break;
      const m = line.match(CHECK);
      if (!m) continue;
      const card = byId.get(m[1]);
      if (!card) { problems.push(`${f}: a check for ${m[1]}, which is no idea`); continue; }
      if (card.size) problems.push(`${f}: a second check for ${m[1]}`);
      card.size = m[2];
      card.verdicts = m[3].trim() === 'ok' ? [] : m[3].split('; ').map((v) => v.trim());
    }
  }
  for (const f of files.filter((f) => /^RECS-\d\.md$/.test(f)).sort()) {
    for (const line of readFileSync(`${dir}/${f}`, 'utf8').split('\n')) {
      if (/^Notes:/.test(line)) break;
      const m = line.match(REC);
      if (!m) { if (/^- \d\.\d\d /.test(line)) problems.push(`${f}: a line in the wrong shape`); continue; }
      const card = byId.get(m[1]);
      if (!card) { problems.push(`${f}: a recommendation for ${m[1]}, which is no idea`); continue; }
      if (card.rec) problems.push(`${f}: a second recommendation for ${m[1]}`);
      card.rec = { pick: m[2].toLowerCase(), why: m[3].trim() };
    }
  }
  for (const c of cards) if (!c.size) problems.push(`${c.id} has no check`);
  for (const c of cards) if (!c.rec) problems.push(`${c.id} has no recommendation`);
  return { cards, areas, problems };
}

// § counts: one line each, for the CLI and the test
export function counts({ cards, areas }) {
  const val = (c, k) => (k === 'recPick' ? c.rec?.pick : c[k]);
  const by = (k) => Object.entries(cards.reduce((o, c) => ((o[val(c, k)] = (o[val(c, k)] ?? 0) + 1), o), {}))
    .map(([v, n]) => `${v} ${n}`).join(', ');
  return [
    `${cards.length} cards from ${Object.keys(areas).length} areas`,
    `by area: ${by('area')}`, `by horizon: ${by('horizon')}`, `by size: ${by('size')}`,
    `wild: ${cards.filter((c) => c.wild).length}, flagged by the check: ${cards.filter((c) => c.verdicts.length).length}`,
    `Claude recommends: ${by('recPick')}`,
  ];
}

// § page: the template with the cards put in (`</` escaped so no text can close the script)
export function page(root) {
  const data = parse(root);
  const json = JSON.stringify({ cards: data.cards, areas: data.areas }).replace(/<\//g, '<\\/');
  const html = readFileSync(`${root}/tools/board.html`, 'utf8').replace('/*CARDS*/null', json);
  return { html, ...data };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const root = fileURLToPath(new URL('..', import.meta.url));
  const out = process.argv[2], data = out ? page(root) : parse(root);
  for (const line of [...counts(data), ...data.problems.map((p) => `problem: ${p}`)]) console.log(line);
  if (out) { writeFileSync(out, data.html); console.log(`wrote ${out}, ${data.html.length} bytes`); }
  if (data.problems.length) process.exitCode = 1;
}
