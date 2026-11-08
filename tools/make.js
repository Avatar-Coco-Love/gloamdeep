// § make: the maker (D-621, D-622). Not part of the game, which has no build step.
// `node tools/make.js <kind> <id> "<Name>"` writes every empty piece of a new creature, find,
// tile or person (docs/TECH-2.md, "Adding content"): its registry entry, its lines, its picture
// (the grey "?"), its sprite (and a creature's hit flash, a tile's drawing), where it lives,
// its test and its content row. What still needs the owner's numbers, words and art is a marked
// blank, `/* blank */` after a value or a `// blank:` note, and a content row of `?`s; the
// checker (tests/checker.test.js) names each one left. Nothing is invented: a blank number is 1,
// a creature lives only in the dev tools (`from: Infinity`), a line says its own name.
// `--check` changes nothing and lists what it would write. Undo with git.
//   kinds: creature, find, tile, person    id: camelCase, a to z    e.g.
//   node tools/make.js creature glowWorm "Glow worm"
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const B = '/* blank */';
const KINDS = { creature: 'enemy', find: 'item', tile: 'tile', person: 'npc' };

// § files: read and write through one map, so --check can list without writing
function files() {
  const cache = new Map();
  return {
    read: (p) => (cache.has(p) ? cache.get(p) : existsSync(ROOT + p) ? readFileSync(ROOT + p, 'utf8') : null),
    write: (p, text) => cache.set(p, text),
    all: () => [...cache],
  };
}
// put `add` into file p just before the first `before` that follows `after` (or the file's start)
function insert(f, p, after, before, add) {
  const text = f.read(p), from = after ? text.indexOf(after) : 0;
  const at = from < 0 ? -1 : text.indexOf(before, from);
  if (at < 0) throw new Error(`${p}: can't find where to write (${JSON.stringify(after ?? before)})`);
  f.write(p, text.slice(0, at) + add + text.slice(at));
}
const q = (s) => `'${s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const CONST = (id) => id.replace(/([A-Z])/g, '_$1').toUpperCase(); // glowWorm → GLOW_WORM

// § lines: one blank line each, saying whose it is and when
function addLines(f, lines) {
  const add = lines.map(([key, when, extra = '']) => `  ${key}: { text: ${q(`(${when})`)} ${B}, warn: false${extra} }, // made by tools/make.js\n`).join('');
  insert(f, 'src/core/lines.js', 'export const LINES = {', '\n};', '\n' + add.trimEnd());
}

// § art: the grey "?" picture, its sprite, a creature's hit flash
function addArt(f, id, flash) {
  const C = CONST(id);
  insert(f, 'src/render/pictures.js', null, '\nexport {', `\n// § ${id}: made by tools/make.js, the grey "?" until it is drawn (D-622)\nconst ${C} = BLANK; // blank: ${id}, its picture\n`);
  insert(f, 'src/render/pictures.js', '\nexport {', '\n};', `\n  ${C},`);
  insert(f, 'src/render/sprites.js', null, "\n} from './pictures.js';", `\n  ${C},`);
  insert(f, 'src/render/sprites.js', 'export const SPRITES = {', ' }; // keyed by registry id', `, ${id}: spriteCanvas(${C})`);
  if (flash) insert(f, 'src/render/sprites.js', 'const FLASHES = {', ' };', `, ${id}: spriteCanvas(${C}, '#ffffff')`);
}

// § test and row
function addTest(f, id, name, kind, lines) {
  const p = `tests/${id}.test.js`;
  f.write(p, `// § ${id}: made by tools/make.js (D-622); its own tests come with its numbers and ways
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

test(${q(`the ${name} is in the registry, with its lines`)}, () => {
  const e = get(${q(id)});
  assert.equal(e.name, ${q(name)}); assert.equal(e.kind, ${q(kind)});
  for (const line of ${JSON.stringify(lines).replace(/"/g, "'")}) assert.ok(LINES[line], line);
});
`);
}
function addRow(f, p, heading, id, cells) {
  const text = f.read(p), h = text.indexOf(heading);
  if (h < 0) throw new Error(`${p}: no heading "${heading}"`);
  const rows = text.slice(h).split('\n');
  let last = rows.findIndex((l) => l.startsWith('|'));
  while (rows[last + 1]?.startsWith('|')) last++;
  const at = h + rows.slice(0, last + 1).join('\n').length;
  f.write(p, text.slice(0, at) + `\n| \`${id}\` |${' ? |'.repeat(cells)}` + text.slice(at));
}

// § kinds: what each writes (docs/TECH-2.md, "Adding content")
const MAKE = {
  creature(f, id, name) {
    insert(f, 'src/core/enemies.js', 'export const ENEMIES = {', '\n};', `\n  // ${name}: made by tools/make.js (D-622); a sound of its own is optional (sound.js)\n  ${id}: { id: ${q(id)}, kind: 'enemy', name: ${q(name)}, health: 1 ${B}, bite: 1 ${B}, ways: [] ${B}, acts: '' ${B}, fights: '' ${B}, die: '${id}Die', bites: '${id}Bite' },`);
    addLines(f, [[`${id}Die`, `${name}: dies`], [`${id}Bite`, `${name}: bites`, ", kind: 'harm'"]]);
    addArt(f, id, true);
    insert(f, 'src/core/room.js', 'const POOL = [', '\n];', `\n  { id: ${q(id)}, from: Infinity ${B} }, // made by tools/make.js: only the dev tools until its depth is chosen`);
    addTest(f, id, name, 'enemy', [`${id}Die`, `${id}Bite`]);
    addRow(f, 'docs/CONTENT.md', '## Creatures', id, 5);
  },
  find(f, id, name) {
    insert(f, 'src/core/items.js', 'export const ITEMS = {', '\n};', `\n  // ${name}: made by tools/make.js (D-622)\n  // blank: ${id}, where it lies (cave.js finds, woods.js or room.js)\n  ${id}: { id: ${q(id)}, kind: 'item', name: ${q(name)}, bag: true, max: 1 ${B}, says: '${id}Take', look: '${id}Look' },`);
    addLines(f, [[`${id}Take`, `${name}: taken`], [`${id}Look`, `${name}: looked at`]]);
    addArt(f, id, false);
    addTest(f, id, name, 'item', [`${id}Take`, `${id}Look`]);
    addRow(f, 'docs/CONTENT-FINDS.md', '## Finds and things made', id, 5);
  },
  tile(f, id, name, letter) {
    insert(f, 'src/core/tiles.js', 'export const TILES = {', '\n};', `\n  // ${name}: made by tools/make.js (D-622)\n  // blank: ${id}, where it stands (cave.js, woods.js or room.js)\n  ${id}: { id: ${q(id)}, kind: 'tile', letter: ${q(letter)}, name: ${q(name)}, solid: false ${B}, blocksLight: false ${B} },`);
    addArt(f, id, false);
    insert(f, 'src/render/tiles.js', 'const DRAW = {', '  stairsDown:', `  ${id}: (c, room, x, y) => { if (!OWN_GROUND.includes(room.look)) drawFloor(c, room, x, y); drawBench(c, x, y, SPRITES.${id}); }, // blank: ${id}, its drawing\n`);
    addTest(f, id, name, 'tile', []);
    addRow(f, 'docs/CONTENT-3.md', '## Tiles', id, 4);
  },
  person(f, id, name) {
    insert(f, 'src/core/people.js', 'export const PEOPLE = {', '\n};', `\n  // ${name}: made by tools/make.js (D-622)\n  // blank: ${id}, where they stand (cave.js, like withTrapped, or room.js)\n  ${id}: { id: ${q(id)}, kind: 'npc', name: ${q(name)}, calls: '${id}Calls' },`);
    addLines(f, [[`${id}Calls`, `${name}: calls`, ", kind: 'speech'"]]);
    addArt(f, id, false);
    addTest(f, id, name, 'npc', [`${id}Calls`]);
    addRow(f, 'docs/CONTENT-2.md', '## People', id, 3);
  },
};

// § make: (kind, id, name) → the files map, or throws why not
export async function make(kind, id, name) {
  if (!MAKE[kind]) throw new Error(`kind must be one of: ${Object.keys(MAKE).join(', ')}`);
  if (!/^[a-z][a-zA-Z]*$/.test(id ?? '')) throw new Error('id must be camelCase letters, like glowWorm');
  if (!name?.trim()) throw new Error('give a name in quotes, like "Glow worm"');
  const { ALL } = await import(pathToFileURL(ROOT + 'src/core/registry.js'));
  const taken = ALL.find((e) => e.id === id || e.name.toLowerCase() === name.toLowerCase());
  if (taken) throw new Error(`${taken.id} (${taken.name}) is already in the registry`);
  const f = files();
  if (f.read(`tests/${id}.test.js`)) throw new Error(`tests/${id}.test.js already exists`);
  if (new RegExp(`\\b${CONST(id)}\\b`).test(f.read('src/render/pictures.js'))) throw new Error(`${CONST(id)} is already in pictures.js`);
  const used = new Set(ALL.filter((e) => e.kind === 'tile').map((t) => t.letter));
  const letter = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'].find((ch) => !used.has(ch));
  MAKE[kind](f, id, name.trim(), letter);
  return f;
}

// § run
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const args = process.argv.slice(2), check = args.includes('--check');
  const [kind, id, name] = args.filter((a) => a !== '--check');
  try {
    const f = await make(kind, id, name);
    for (const [p, text] of f.all()) {
      if (!check) writeFileSync(ROOT + p, text);
      console.log(`${check ? 'would write' : 'wrote'} ${p}`);
    }
    console.log(`${check ? 'Nothing written.' : 'Made'} ${id}: npm test now names each blank left (numbers, words, art, where it lives),`);
    console.log('and the tests that list every entry of a kind (registry, bag, peddler) name it too: add it there.');
  } catch (e) {
    console.error(`make: ${e.message}`);
    process.exit(1);
  }
}
