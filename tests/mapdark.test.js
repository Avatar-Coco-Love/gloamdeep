// § the round map in the dark (Q-108, D-920): it shows with the light on the hero's tile,
// 15% at none, all at full; at an ember or with the lantern off, no light near, its middle hides
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { lightHere, shownAt } from '../src/core/mapdark.js';

const ROOM = ['########', '#......#', '#......#', '#......#', '########'];
// At night (turn 210), so no daylight comes in through the mouth (D-218)
const at = (oil, lit = true) => ({ ...setOil(makeState(makeRoom(ROOM), { x: 2, y: 2 }), oil), lit, lights: [], turn: 210 });

test('a full lantern shows it all, half a tank less', () => {
  assert.equal(lightHere(at(1)).light, 1);
  const half = lightHere(at(0.5));
  assert.ok(half.light > 0.5 && half.light < 0.8);
  assert.equal(half.hide, false);
});

test('an ember or the lantern off, no light near: faint, its middle hidden', () => {
  const ember = lightHere(at(0));
  assert.ok(ember.light > 0.1 && ember.light < 0.2);
  assert.equal(ember.hide, true);
  const off = lightHere(at(1, false));
  assert.equal(off.light, 0);
  assert.equal(off.hide, true);
});

test('15% shown at no light, all at full', () => {
  assert.equal(shownAt(0), 0.15);
  assert.equal(shownAt(1), 1);
  assert.equal(shownAt(2), 1);
});

test('daylight through the mouth, near the hero, lifts it and keeps the middle', () => {
  const day = lightHere({ ...at(0), turn: 0 });
  assert.ok(day.light > 0.2);
  assert.equal(day.hide, false);
});
