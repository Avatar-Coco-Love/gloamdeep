// Night creatures in the woods: a lampmoth each night in each woods room round home (D-778)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nightfall, nightOf, darkOut, NIGHT_KINDS } from '../src/core/nightfall.js';
import { passTime } from '../src/core/daytime.js';
import { makeWorld, wait } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { ROUND_HOME, HOME_ID, isMountain } from '../src/core/hearthwood.js';
import { litAt } from '../src/core/sight.js';

const at = (place, turns) => ({ ...passTime(goToPlace(makeWorld('first', 4127), place), turns), lit: true });
const moths = (s) => s.enemies.filter((e) => e.night);
const ROOM = ROUND_HOME[0];

test('the lampmoth comes out at night, from halfway through dusk to halfway through dawn', () => {
  assert.deepEqual(NIGHT_KINDS, ['lampmoth']);
  assert.equal(darkOut(184), false);
  assert.equal(darkOut(186), true);
  assert.equal(darkOut(284), true);
  assert.equal(darkOut(286), false);
  assert.equal(nightOf(220), 0);
  assert.equal(nightOf(520), 1);
});

test('one lampmoth comes out at night in a woods room round home, out of sight', () => {
  const day = at(ROOM, 100);
  assert.equal(nightfall(day), day);
  const night = nightfall(at(ROOM, 220)), [m] = moths(night);
  assert.equal(moths(night).length, 1);
  assert.equal(m.id, 'lampmoth');
  assert.equal(night.room.night, 0);
  assert.equal(litAt(night, m.x, m.y), false);
  assert.equal(night.room.map[m.y][m.x], '.');
});

test('never at home nor in a mountain room', () => {
  assert.equal(moths(nightfall(at(HOME_ID, 220))).length, 0);
  assert.ok(!ROUND_HOME.includes(HOME_ID));
  assert.ok(ROUND_HOME.every((id) => !isMountain(id)));
  const mountain = ['woods:0,0', 'woods:1,0', 'woods:2,0'].find(isMountain);
  assert.equal(moths(nightfall(at(mountain, 220))).length, 0);
});

test('one a night: one beaten stays beaten till the next night', () => {
  const night = nightfall(at(ROOM, 220)), beaten = { ...night, enemies: night.enemies.filter((e) => !e.night) };
  assert.equal(moths(nightfall(beaten)).length, 0);
  const next = nightfall({ ...beaten, turn: 520 });
  assert.equal(moths(next).length, 1);
  assert.equal(next.room.night, 1);
});

test('by day, any still standing are gone', () => {
  const night = nightfall(at(ROOM, 220)), day = nightfall({ ...night, turn: 290 });
  assert.equal(moths(day).length, 0);
  assert.equal(day.enemies.length, night.enemies.length - 1);
});

test('the same seed and night give the same tile', () => {
  const a = moths(nightfall(at(ROOM, 220)))[0], b = moths(nightfall(at(ROOM, 230)))[0];
  assert.deepEqual(a, b);
});

test('a turn passed in the woods at night brings it out', () => {
  assert.equal(moths(wait(at(ROOM, 220))).length, 1);
});
