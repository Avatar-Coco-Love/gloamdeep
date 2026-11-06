// § fishing: cast, wait, pull at the home pond and the cave pools (D-608, D-610, D-618)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, step, wait } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { NIBBLE_CHANCE, STRIKE_ZONE, STRIKE_PASSES, STRIKE_PASS_MS, needleAt, inZone, strikeFish, zoneWidth } from '../src/core/fishing.js';
import { shakeAt } from '../src/render/float.js';

// The hero at 5,11 at home, the pond's water just above, the rod held
const beside = (place = 'woods', tool = 'rod') => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('water'))), hero: { x: 5, y: 11 }, tool, place, enemies: [] });
const cast = (s = beside()) => step(s, 'up');
const hit = (s) => strikeFish(s, s.float.strike + zoneWidth(s.float) / 2); // a strike in the middle of the zone
const untilBite = (s, next = wait) => { for (let i = 0; i < 200 && !s.float?.bite; i++) s = next(s); return s; };

test('bumping the home pond with the rod casts the line, a turn, the float on that tile', () => {
  const s = cast();
  assert.equal(s.turn, 1);
  assert.deepEqual(s.hero, { x: 5, y: 11 });
  assert.deepEqual(s.float, { x: 5, y: 10, at: 1, bite: false, nibble: false, fish: 'pondMinnow' });
  assert.equal(shownLine(s).text, 'You cast the line.');
});

test('a cave pool is fished too, its fish the Blind Cavefish; without the rod, nothing is cast (D-618)', () => {
  const pool = cast(beside('first'));
  assert.equal(pool.turn, 1);
  assert.equal(pool.float.fish, 'blindCavefish');
  assert.equal(shownLine(pool).text, 'You cast the line.');
  assert.equal(cast(beside('woods', 'pick')).float, null);
});

test('a cave pool\'s strike zone is a fifth, and a strike in it lands a Blind Cavefish (D-618)', () => {
  const pulled = step(untilBite(cast(beside('first'))), 'up');
  assert.equal(zoneWidth(pulled.float), 1 / 5);
  assert.ok(pulled.float.strike >= 0 && pulled.float.strike <= 1 - 1 / 5);
  const caught = hit(pulled);
  assert.deepEqual(caught.bag, [{ id: 'blindCavefish', n: 1 }]);
  assert.equal(shownLine(caught).text, 'You catch a blind cavefish.');
  assert.ok(caught.events.some((e) => e.type === 'catch' && e.id === 'blindCavefish'));
  assert.equal(shownLine(strikeFish(pulled, pulled.float.strike + 0.21)).text, 'It got away.'); // just past a fifth
  const full = hit({ ...pulled, bag: Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 })) });
  assert.equal(shownLine(full).text, 'No room. The cavefish slips away.');
});

test('a float cast before fish were kept is the pond\'s, a quarter zone (D-618)', () => {
  assert.equal(zoneWidth({ x: 1, y: 1 }), STRIKE_ZONE);
});

test('the Blind Cavefish: 20% oil, 1 heart, 2 coins, stacks of 20, by hand only (D-618)', () => {
  const c = get('blindCavefish');
  assert.deepEqual([c.name, c.oil, c.heal, c.sells, c.max, c.byHand], ['Blind Cavefish', 0.2, 1, 2, 20, true]);
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
  const caught = hit(step(untilBite(cast()), 'up'));
  assert.ok(caught.events.some((e) => e.type === 'catch' && e.id === 'pondMinnow'));
  assert.ok(!step(cast(), 'up').events.some((e) => e.type === 'cast')); // a bump while waiting is no new cast
});

test('the nibbling float shakes a pixel left, right, left, then rests; held left with reduced motion', () => {
  assert.deepEqual([0, 80, 160, 240, 600].map((t) => shakeAt(t, false)), [-1, 1, -1, 0, 0]);
  assert.equal(shakeAt(500, true), -1);
});

test('a bite shows its line; pulling it, a turn, opens the strike meter, its zone placed by the seed (D-614)', () => {
  const bit = untilBite(cast());
  assert.equal(shownLine(bit).text, 'Something bites!');
  const pulled = step(bit, 'up');
  assert.equal(pulled.turn, bit.turn + 1);
  assert.equal(pulled.float.bite, false);
  assert.ok(pulled.float.strike >= 0 && pulled.float.strike <= 1 - STRIKE_ZONE);
  assert.equal(step(bit, 'up').float.strike, pulled.float.strike); // the same seed, the same zone
  assert.deepEqual(pulled.bag, bit.bag);
});

test('a strike in the zone lands a Pond Minnow, free, into the bag, the line in (D-614)', () => {
  const pulled = step(untilBite(cast()), 'up'), caught = hit(pulled);
  assert.equal(caught.turn, pulled.turn);
  assert.equal(caught.float, null);
  assert.deepEqual(caught.bag, [{ id: 'pondMinnow', n: 1 }]);
  assert.equal(shownLine(caught).text, 'You catch a pond minnow.');
  assert.equal(get('pondMinnow').max, 20);
});

test('a strike missed, or the needle run out, gets away and the line comes in, with no splash (D-614)', () => {
  const pulled = step(untilBite(cast()), 'up'), z = pulled.float.strike;
  for (const n of [z > 0.5 ? 0 : 1, null]) {
    const missed = strikeFish(pulled, n);
    assert.equal(missed.float, null);
    assert.deepEqual(missed.bag, pulled.bag);
    assert.equal(shownLine(missed).text, 'It got away.');
    assert.ok(!missed.events.some((e) => e.type === 'catch'));
  }
  assert.equal(wait(pulled).float, null); // a turn passing under the meter, as after loading: gone
});

test('the needle sweeps left to right, back, and again, a second a pass, then is done; the zone a quarter', () => {
  assert.equal(STRIKE_ZONE, 1 / 4); assert.equal(STRIKE_PASSES, 3); assert.equal(STRIKE_PASS_MS, 1000);
  assert.deepEqual([0, 500, 1000, 1500, 2000, 2500].map(needleAt), [0, 0.5, 1, 0.5, 0, 0.5]);
  assert.equal(needleAt(3000), null);
  assert.ok(inZone(0.5, 0.5) && inZone(0.5, 0.75) && !inZone(0.5, 0.76) && !inZone(0.5, null));
});

test('too slow on a bite, it gets away and the float stays; a strike with no room slips back', () => {
  const bit = untilBite(cast());
  const away = wait(bit);
  assert.deepEqual(away.float, { ...bit.float, bite: false, nibble: false });
  assert.equal(shownLine(away).text, 'It got away.');
  const full = hit(step({ ...bit, bag: Array.from({ length: 6 }, () => ({ id: 'stone', n: 20 })) }, 'up'));
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
