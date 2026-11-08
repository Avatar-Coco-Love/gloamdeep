// § locket: biome 1's first relic (D-691): one room at depth 4, a warden guarding it (D-692), left once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { placeFor, placeAt, locketRoom, LOCKET_DEPTH, makeRoom, SKY } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { layoutAt } from '../src/core/region.js';
import { priceOf } from '../src/core/trade.js';

const near = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

test('the Lightkeeper\'s Locket is in the registry, with its lines, one carried, not sold', () => {
  const e = get('locket');
  assert.equal(e.name, 'Lightkeeper\'s Locket'); assert.equal(e.kind, 'item'); assert.equal(e.max, 1); assert.ok(e.bag);
  for (const line of ['locketTake', 'locketLook', 'locketFull']) assert.ok(LINES[line], line);
  assert.equal(priceOf('locket'), 0);
});

test('one room at depth 4 holds it, never the room with the stairs up, a warden asleep beside it, left once', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const at = locketRoom(seed);
    assert.notEqual(at, placeAt(LOCKET_DEPTH), `seed ${seed}`);
    let found = 0;
    for (const c of layoutAt(seed, LOCKET_DEPTH).cells) {
      const p = placeFor(c.id, seed), lockets = p.items.filter((i) => i.id === 'locket');
      found += lockets.length;
      if (c.id !== at) { assert.equal(lockets.length, 0, `seed ${seed} ${c.id}`); continue; }
      const [l] = lockets;
      assert.ok(l.once, `seed ${seed}`); assert.equal(p.map[l.y][l.x], '.', `seed ${seed} not on floor`);
      assert.ok(p.enemies.some((e) => e.id === 'warden' && e.asleep && near(e, l) === 1), `seed ${seed} no warden beside it`);
    }
    assert.equal(found, 1, `seed ${seed}`);
  }
  for (const depth of [3, 5]) for (const c of layoutAt(9, depth).cells) assert.ok(!placeFor(c.id, 9).items.some((i) => i.id === 'locket'));
});

test('the same seed lays it in the same spot', () => {
  const id = locketRoom(11);
  assert.deepEqual(placeFor(id, 11).items, placeFor(id, 11).items);
});

test('stepping on it puts it in the bag with its line; a second stays on the floor', () => {
  const map = ['TTTTTT', 'T....T', 'T....T', 'TTTTTT'], room = makeRoom(map, SKY, 'woods');
  const s = step(makeState(room, { x: 1, y: 1 }, [], [], [{ id: 'locket', x: 2, y: 1, once: true }]), 'right');
  assert.deepEqual(s.bag, [{ id: 'locket', n: 1 }]);
  assert.equal(s.line.id, 'locketTake');
  const again = step({ ...makeState(room, { x: 1, y: 1 }, [], [], [{ id: 'locket', x: 2, y: 1, once: true }]), bag: [{ id: 'locket', n: 1 }] }, 'right');
  assert.deepEqual(again.bag, [{ id: 'locket', n: 1 }]);
  assert.equal(again.line.id, 'locketFull'); assert.equal(again.items.length, 1);
});
