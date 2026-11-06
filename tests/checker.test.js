// § checker: every registry entry has all its pieces (D-621). Adding a creature,
// find, tile or person touches several files (docs/TECH.md, "Adding content");
// each test here names what is still missing and the file to fix, so a gap
// shows at `npm test`, not as a bug later. Drawing and sound files need a
// browser, so they are read as text.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { ALL, get, byKind } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { BEHAVIOURS } from '../src/core/behaviours.js';
import { poolAt } from '../src/core/room.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const who = (e) => `${e.name} (${e.kind} ${e.id})`;
const report = (gaps, fix) => assert.deepEqual(gaps, [], `${fix}:\n  ${gaps.join('\n  ')}`);

// § text: the keys of the object written on the line that starts with `start`
function keysOn(path, start, pattern) {
  const line = read(path).split('\n').find((l) => l.trimStart().startsWith(start));
  assert.ok(line, `${path} has no line starting "${start}"`);
  return new Set([...line.matchAll(pattern)].map((m) => m[1]));
}
const SPRITES = keysOn('src/render/sprites.js', 'export const SPRITES', /(\w+): spriteCanvas/g);
const FLASHES = keysOn('src/render/sprites.js', 'const FLASHES', /(\w+): spriteCanvas/g);
const VOICES = keysOn('src/render/sound.js', 'return { footstep', /(\w+)(?=[,:} ])/g);

// § lines: the fields of each kind that name a line in lines.js
const LINE_FIELDS = {
  enemy: ['hurt', 'stands', 'die', 'bites', 'wakes', 'settles', 'drinksSay'],
  npc: ['calls', 'digging', 'freed', 'waiting', 'leaving', 'home', 'greeting'],
  item: ['full', 'says', 'bagged', 'holds', 'away', 'eats', 'look', 'caught', 'slips', 'fits', 'wears'],
  tile: ['bump', 'arrive', 'line'],
};

test('every line an entry names is in lines.js', () => {
  const gaps = [];
  for (const e of ALL) {
    for (const f of LINE_FIELDS[e.kind] ?? []) {
      if (e[f] !== undefined && !LINES[e[f]]) gaps.push(`${who(e)}: ${f} '${e[f]}'`);
    }
  }
  report(gaps, 'Add these lines to src/core/lines.js');
});

test('every entry an entry points to exists', () => {
  const gaps = [];
  for (const e of ALL) {
    for (const f of ['drops', 'rare', 'looksLike', 'shutAs']) {
      if (e[f] !== undefined && !get(e[f])) gaps.push(`${who(e)}: ${f} '${e[f]}'`);
    }
  }
  report(gaps, 'Add these entries to the registry, or fix the name');
});

test('every creature acts in ways that exist', () => {
  const gaps = byKind('enemy').flatMap((e) => (e.ways ?? []).filter((w) => !BEHAVIOURS[w]).map((w) => `${who(e)}: way '${w}'`));
  report(gaps, 'Add these ways to src/core/behaviours.js');
});

// The words on its Bestiary page once one is beaten (D-352, D-631); the maker leaves them blank
test('every creature says how it acts', () => {
  report(byKind('enemy').filter((e) => typeof e.acts !== 'string').map(who), 'Add `acts`, how it acts in words, to these in src/core/enemies.js');
});
// And how to fight it, once 3 are beaten (D-352, D-632)
test('every creature says how to fight it', () => {
  report(byKind('enemy').filter((e) => typeof e.fights !== 'string').map(who), 'Add `fights`, how to fight it in words, to these in src/core/enemies.js');
});

test('every creature sound is in sound.js', () => {
  const gaps = [];
  for (const e of byKind('enemy')) {
    for (const f of ['sound', 'sips']) if (e[f] !== undefined && !VOICES.has(e[f])) gaps.push(`${who(e)}: ${f} '${e[f]}'`);
  }
  report(gaps, 'Add these sounds to src/render/sound.js (and the sound board)');
});

test('every creature, find and person has a sprite', () => {
  const gaps = ALL.filter((e) => ['enemy', 'item', 'npc'].includes(e.kind) && !SPRITES.has(e.id)).map(who);
  report(gaps, 'Add these to SPRITES in src/render/sprites.js');
});

test('every creature has a hit flash', () => {
  const gaps = byKind('enemy').filter((e) => !FLASHES.has(e.id)).map(who);
  report(gaps, 'Add these to FLASHES in src/render/sprites.js');
});

test('every creature lives somewhere', () => {
  const pool = new Set(poolAt(Infinity));
  const places = read('src/core/room.js') + read('src/core/cave.js');
  const gaps = byKind('enemy').filter((e) => !pool.has(e.id) && !places.includes(`'${e.id}'`)).map(who);
  report(gaps, "Add these to POOL in src/core/room.js, or place them in room.js or cave.js");
});

test('every entry is named in a test', () => {
  const tests = readdirSync(new URL('.', import.meta.url))
    .filter((f) => f.endsWith('.test.js') && f !== 'checker.test.js')
    .map((f) => read(`tests/${f}`)).join('\n');
  const gaps = ALL.filter((e) => !new RegExp(`\\b${e.id}\\b`).test(tests)).map(who);
  report(gaps, 'Name these in a test, tests/<id>.test.js for a new one');
});

// § blanks: what tools/make.js left for real numbers, words and art (D-622): a `/* blank */`
// after a value, a `// blank:` note, or a content row of `?`s. Fill each, then drop its mark.
function blanksIn(path) {
  return read(path).split('\n').flatMap((l, i) => {
    const at = `${path}:${i + 1}`, note = l.match(/\/\/ blank: (.*)/);
    if (note) return [`${note[1]} (${at})`];
    if (path.endsWith('.md')) return /^\| `(\w+)` .*\| \? \|/.test(l) ? [`${l.match(/`(\w+)`/)[1]}, its content row (${at})`] : [];
    const fields = [...l.matchAll(/(\w+): [^,{}]*?\/\* blank \*\//g)].map((m) => m[1]);
    const id = l.match(/id: '(\w+)'/)?.[1] ?? l.match(/^\s*(\w+):/)?.[1];
    return fields.length ? [`${id}: ${fields.join(', ')} (${at})`] : [];
  });
}
const walk = (dir) => readdirSync(new URL(`../${dir}`, import.meta.url), { withFileTypes: true })
  .flatMap((d) => (d.isDirectory() ? walk(`${dir}/${d.name}`) : d.name.endsWith('.js') ? [`${dir}/${d.name}`] : []));

test('nothing the maker left is still blank', () => {
  const gaps = [...walk('src'), 'docs/CONTENT.md', 'docs/CONTENT-2.md', 'docs/CONTENT-3.md'].flatMap(blanksIn);
  report(gaps, 'Fill these blanks from tools/make.js with real numbers, words and art (and their decisions)');
});

test('every entry has a row in the content index', () => {
  const docs = ['CONTENT.md', 'CONTENT-2.md', 'CONTENT-3.md'].map((f) => read(`docs/${f}`)).join('\n');
  const gaps = ALL.filter((e) => !docs.includes(e.id)).map(who);
  report(gaps, 'Add a row for these to docs/CONTENT.md (people: CONTENT-2.md; tiles and places: CONTENT-3.md)');
});
