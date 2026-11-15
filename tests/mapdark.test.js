// § the round map in the dark (Q-108, D-920): it shows with the light on the hero's tile,
// 15% at none, all at full, evenly: no dark spot round the hero (D-931)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { makeRoom } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { lightHere, shownAt } from '../src/core/mapdark.js';

const ROOM = ['########', '#......#', '#......#', '#......#', '########'];
// At night (turn 210), so no daylight comes in through the mouth (D-218)
const at = (oil, lit = true) => ({ ...setOil(makeState(makeRoom(ROOM), { x: 2, y: 2 }), oil), lit, lights: [], turn: 210 });

test('a full lantern shows it all, half a tank less', () => {
  assert.equal(lightHere(at(1)), 1);
  const half = lightHere(at(0.5));
  assert.ok(half > 0.5 && half < 0.8);
});

test('an ember or the lantern off, no light near: faint', () => {
  const ember = lightHere(at(0));
  assert.ok(ember > 0.1 && ember < 0.2);
  assert.equal(lightHere(at(1, false)), 0);
});

test('15% shown at no light, all at full', () => {
  assert.equal(shownAt(0), 0.15);
  assert.equal(shownAt(1), 1);
  assert.equal(shownAt(2), 1);
});

test('daylight through the mouth, near the hero, lifts it', () => {
  assert.ok(lightHere({ ...at(0), turn: 0 }) > 0.2);
});

test('in the dark the round map fades evenly, nothing wiped round the hero (B-008, D-931)', () => {
  const src = readFileSync(new URL('../src/render/map.js', import.meta.url), 'utf8');
  const dark = src.slice(src.indexOf('function inTheDark'), src.indexOf('// The Explorer'));
  assert.ok(!dark.includes('destination-out') && !dark.includes('Gradient'));
});
