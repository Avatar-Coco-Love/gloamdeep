// § fishing: cast, wait, pull at the home pond (D-608, D-610)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, step, wait } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { NIBBLE_CHANCE } from '../src/core/fishing.js';
import { shakeAt } from '../src/render/float.js';

// The hero at 5,11 at home, the pond's water just above, the rod held
const beside = (place = 'woods', tool = 'rod') => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('water'))), hero: { x: 5, y: 11 }, tool, place, enemies: [] });
const cast = (s = beside()) => step(s, 'up');
const untilBite = (s, next = wait) => { for (let i = 0; i < 200 && !s.float?.bite; i++) s = next(s); return s; };

test('bumping the home pond with the rod casts the line, a turn, the float on that tile', () => {
  const s = cast();
  assert.equal(s.turn, 1);
  assert.deepEqual(s.hero, { x: 5, y: 11 });
  assert.deepEqual(s.float, { x: 5, y: 10, at: 1, bite: false, nibble: false });
  assert.equal(shownLine(s).text, 'You cast the line.');
});

test('a cave pool still says its line, free; without the rod, nothing is cast', () => {
  const pool = cast(beside('first'));
  assert.equal(pool.turn, 0);
  assert.equal(pool.float, null);
  assert.equal(shownLine(pool).text, 'The water is still. Fishing comes soon.');
  assert.equal(cast(beside('woods', 'pick')).float, null);
});

test('waiting, a fish nibbles about 1 turn in 6, never on the cast\'s own turn, and always bites the turn after (D-613)', () => {
  assert.equal(NIBBLE_CHANCE, 1 / 6);
  let nibbles = 0, turns = 0;
  for (let seed = 1; seed <= 40; seed++) {
    let s = cast({ ...beside(), seed });
    assert.equal(s.float.nibble, false);
    for (let i = 0; i < 30; i++, turns++) {
      const was = s; s = wait(s);
      if (s.float.bite) assert.equal(was.float.nibble, true); // no bite without a nibble first
      if (s.float.nibble) { nibbles++; assert.equal(shownLine(s).text, 'A nibble...'); s = wait(s); assert.equal(s.float.bite, true); s = wait(s); }
    }
  }
  assert.ok(nibbles / turns > 0.08 && nibbles / turns < 0.22, `${nibbles} in ${turns}`);
});

test('bumping the water on a nibble waits, the bite still coming next turn (D-613)', () => {
  let s = cast();
  for (let i = 0; i < 200 && !s.float.nibble; i++) s = wait(s);
  const bumped = step(s, 'up');
  assert.equal(bumped.float.bite, true);
  assert.deepEqual(bumped.bag, s.bag);
});

test('the cast plops and the catch splashes, as events (D-613)', () => {
  assert.ok(cast().events.some((e) => e.type === 'cast'));
  const caught = step(untilBite(cast()), 'up');
  assert.ok(caught.events.some((e) => e.type === 'catch' && e.id === 'pondMinnow'));
  assert.ok(!step(cast(), 'up').events.some((e) => e.type === 'cast')); // a bump while waiting is no new cast
});

test('the nibbling float shakes a pixel left, right, left, then rests; held left with reduced motion', () => {
  assert.deepEqual([0, 80, 160, 240, 600].map((t) => shakeAt(t, false)), [-1, 1, -1, 0, 0]);
  assert.equal(shakeAt(500, true), -1);
});

test('a bite shows its line; bumping within its turn lands a Pond Minnow, into the bag, the line in', () => {
  const bit = untilBite(cast());
  assert.equal(shownLine(bit).text, 'Something bites!');
  const caught = step(bit, 'up');
  assert.equal(caught.turn, bit.turn + 1);
  assert.equal(caught.float, null);
  assert.deepEqual(caught.bag, [{ id: 'pondMinnow', n: 1 }]);
  assert.equal(shownLine(caught).text, 'You catch a pond minnow.');
  assert.equal(get('pondMinnow').max, 20);
});

test('too slow, it gets away and the float stays; with no room, it slips back', () => {
  const bit = untilBite(cast());
  const away = wait(bit);
  assert.deepEqual(away.float, { ...bit.float, bite: false, nibble: false });
  assert.equal(shownLine(away).text, 'It got away.');
  const full = step({ ...bit, bag: Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 })) }, 'up');
  assert.equal(full.float, null);
  assert.equal(full.bag.some((b) => b.id === 'pondMinnow'), false);
  assert.equal(shownLine(full).text, 'No room. The minnow slips away.');
});

test('walking off, or holding another tool, reels the line in', () => {
  const off = step(cast(), 'left');
  assert.equal(off.float, null);
  assert.equal(shownLine(off).text, 'You reel in the line.');
  assert.equal(wait({ ...cast(), tool: 'pick' }).float, null);
});

test('with the line out and no bite, bumping the water waits, a turn, the float where it is (D-612)', () => {
  const s = cast(), bumped = step(s, 'up');
  assert.equal(bumped.turn, s.turn + 1);
  assert.deepEqual(bumped.hero, s.hero);
  assert.equal(bumped.float.x, s.float.x); assert.equal(bumped.float.y, s.float.y); assert.equal(bumped.float.at, s.float.at);
  const byBumps = untilBite(s, (x) => step(x, 'up')), byWaits = untilBite(s);
  assert.equal(byBumps.turn, byWaits.turn); // a bump waits just as a wait does, so the bite comes on the same turn
  assert.equal(byBumps.float.bite, true);
});
