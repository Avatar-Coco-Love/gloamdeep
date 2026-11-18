// § the escape (D-963 to D-967): beaten, the Lampeater's door sinks open and the old seal stones
// round the stairs down stand; no floor gives way in the boss fight (D-967), so the hero walks
// through the door, over the stones, onto the stairs. The floor giving way is kept, unused, for
// another place (beaten.js, floorGives), and still works when called.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { newJourney } from '../src/core/state.js';
import { bench } from '../src/core/bossbench.js';
import { step, leap } from '../src/core/turn.js';
import { LAMPEATER_AT, ARENA_DOWN } from '../src/core/arena.js';
import { shownLine } from '../src/core/lines.js';
import { floorGives, doorAfterLeap } from '../src/core/beaten.js';

const count = (s, id) => s.room.map.reduce((n, row) => n + row.split(get(id).letter).length - 1, 0);
// The last blow from below the Lampeater (further off), or from the tile before the door (near)
const beatenFrom = (y, way, seed = 1) => {
  const s = bench(newJourney(seed), 'middling'), boss = s.enemies.find((e) => e.id === 'lampeater');
  const beat = step({ ...s, hero: { x: LAMPEATER_AT.x, y }, enemies: [{ ...boss, health: 1, met: true }] }, way);
  return doorAfterLeap(step(beat, way)); // Leap's find taken where it fell, its card closed (D-992)
};
const door = { x: ARENA_DOWN.x, y: ARENA_DOWN.y + 2 }, before = { x: door.x, y: door.y + 1 };
const beatenFar = () => beatenFrom(LAMPEATER_AT.y + 1, 'up');
const beaten = () => beatenFrom(before.y, 'down');
const gaveWay = (s) => s.events.some((e) => e.type === 'giveWay');

test('before the last blow the seal stones stand and there is no gap', () => {
  const s = bench(newJourney(1), 'middling');
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap')], [8, 0]);
});

test('beaten further off, the door sinks open and the seal stones stand (D-967)', () => {
  const s = beatenFar();
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap')], [8, 0]);
  assert.ok(s.leap);
  assert.equal(shownLine(s).text, 'The stone door sinks open.');
  assert.ok(!gaveWay(s));
});

test('beaten from near the stairs, the stones stand too, said with the door (D-967)', () => {
  const s = beaten();
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap')], [8, 0]);
  assert.equal(s.line.id, 'vaultOpens');
  assert.ok(!gaveWay(s));
});

test('walking up to the door, onto it and over the stones, nothing gives way, and the stairs take the hero down', () => {
  const far = beatenFar();
  let s = { ...far, hero: { x: before.x, y: before.y + 1 }, enemies: [] };
  s = step(s, 'up'); assert.deepEqual(s.hero, before);
  s = step(s, 'up'); assert.deepEqual(s.hero, door);
  s = step(s, 'up'); assert.deepEqual(s.hero, { x: door.x, y: door.y - 1 });
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap')], [8, 0]);
  assert.ok(!gaveWay(s));
  const down = step(s, 'up');
  assert.notEqual(down.place, s.place);
});

test('a leap from the door over a seal stone lands on the stairs and takes them', () => {
  const s = { ...beatenFar(), hero: door, enemies: [] }, next = leap(s, 'up');
  assert.notEqual(next.place, s.place);
  assert.ok(next.events.some((e) => e.type === 'leap'));
});

// § kept, unused (D-967): the floor giving way, called by hand, still turns the stones to the Gap
test('the kept floor giving way still works when called', () => {
  const s = floorGives({ ...beatenFar(), hero: before, enemies: [] });
  assert.deepEqual([count(s, 'sealStone'), count(s, 'gap')], [0, 8]);
  assert.equal(s.line.id, 'floorGives');
  assert.ok(gaveWay(s));
  const bumped = step({ ...s, hero: door }, 'up');
  assert.deepEqual(bumped.hero, door);
  assert.equal(bumped.line.id, bumped.leap ? 'gapLeap' : 'gapBump');
});

test('light passes over the gap', () => {
  assert.equal(get('gap').blocksLight, false);
});
