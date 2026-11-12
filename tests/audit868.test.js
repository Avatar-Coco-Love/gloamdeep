// § the fifteenth audit (D-868): the history loaded on opening, the events list whole, main.js's sounds moved
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { HISTORY, historyLoaded, loadHistory } from '../src/core/history.js';
import { VERSION } from '../src/core/version.js';
import { packScript } from '../tools/pack.js';

test('the Version history loads only when asked, once, newest first (H-23)', async () => {
  assert.equal(HISTORY.length, 0);
  assert.equal(historyLoaded(), false);
  await Promise.all([loadHistory(), loadHistory()]); // two opens at once fill it once
  assert.equal(historyLoaded(), true);
  assert.equal(HISTORY[0].v, VERSION);
  assert.equal(new Set(HISTORY.map((e) => e.v)).size, HISTORY.length);
});

test('nothing loaded at boot imports a version history file but history-all.js (H-23)', () => {
  const src = (d) => readdirSync(new URL(`../src/${d}`, import.meta.url), { recursive: true }).filter((f) => f.endsWith('.js')).map((f) => `src/${d}${f}`);
  const using = [...src(''), ...src('core/')].filter((f) => !/history-/.test(f) && /from '\.\/history-|from '\.\.\/core\/history-/.test(readFileSync(new URL(`../${f}`, import.meta.url), 'utf8')));
  assert.deepEqual(using, []);
});

test('the playtest packs the history loaded later, handing it over at once', () => {
  const { code } = packScript('src/main.js');
  assert.match(code, /Promise\.resolve\(__gd\['src\/core\/history-all\.js'\]\)/);
  assert.ok(code.indexOf("__gd['src/core/history-all.js'] =") > 0);
});

test('every kind of event the rules note is in events.js\'s list (H-31)', () => {
  const dir = new URL('../src/core/', import.meta.url), list = readFileSync(new URL('events.js', dir), 'utf8');
  const kinds = new Set();
  for (const f of readdirSync(dir).filter((f) => f.endsWith('.js'))) {
    for (const [, k] of readFileSync(new URL(f, dir), 'utf8').matchAll(/note\([\w.]+, '(\w+)'/g)) kinds.add(k);
  }
  const missing = [...kinds].filter((k) => !new RegExp(`^//   ${k}\\b`, 'm').test(list));
  assert.deepEqual(missing, []);
});

test('main.js leaves the sounds of play to hearing.js', () => {
  const main = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');
  assert.doesNotMatch(main, /function hear\(/);
  assert.match(main, /createHearing\(app, sound, spoken\)/);
  assert.match(readFileSync(new URL('../src/hearing.js', import.meta.url), 'utf8'), /function hear\(events\)/);
});
