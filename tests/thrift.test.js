// § thrift: Hands' row 2 upgrade, 1 ember, once; about 1 making in 4 keeps 1 of the part its
// recipe uses most of, by the seeded dice, with its own line (D-814, D-818)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, FIRST_START } from '../src/core/turn.js';
import { makeFrom, makeAt } from '../src/core/bagturn.js';
import { carried } from '../src/core/bag.js';
import { upgradeAt } from '../src/core/growth.js';
import { shownLine } from '../src/core/lines.js';
import { keptOf, thrifts } from '../src/core/thrift.js';
import { UPGRADES } from '../src/core/upgrades.js';

const room = makeRoom(FIRST_ROOM);
const at = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), bag, ...more });

test('Thrift is Hands\' row 2 upgrade, 1 ember, once, a log', () => {
  const u = UPGRADES.thrift;
  assert.equal(upgradeAt({ col: 2, row: 1, slot: 0 }), u);
  assert.deepEqual([u.cost, u.most, u.look, u.words], [1, 1, 'log', 'Making something keeps 1 part about 1 time in 4.']);
});

test('the part kept is the one used most of, the first on a tie', () => {
  assert.equal(keptOf({ stone: 4, wood: 1 }), 'stone');
  assert.equal(keptOf({ wood: 3, stone: 3 }), 'wood');
  assert.equal(keptOf({ moleClaw: 1, wood: 2, stone: 2 }), 'wood');
  assert.equal(keptOf({ oilcap: 3 }), 'oilcap');
});

test('without Thrift the whole cost goes; with it about 1 in 4 keeps 1 Stone of the Mortar, with its line, the same each time', () => {
  let kept = 0;
  for (let seed = 1; seed <= 600; seed++) {
    const s = at([{ id: 'stone', n: 4 }, { id: 'wood', n: 1 }], { seed });
    assert.equal(carried(makeFrom(s, 'stone').bag, 'stone'), 0);
    const g = { ...s, grown: { thrift: 1 } }, n = makeFrom(g, 'stone');
    assert.equal(carried(n.bag, 'mortar'), 1);
    assert.equal(carried(n.bag, 'wood'), 0, 'only the most-used part is kept');
    if (carried(n.bag, 'stone') === 1) { kept++; assert.equal(shownLine(n).text, 'You keep 1 Stone.'); }
    else assert.equal(shownLine(n).text, 'You make a mortar and pestle.');
    assert.deepEqual(makeFrom(g, 'stone').bag, n.bag, 'the same each time');
  }
  assert.ok(kept > 110 && kept < 190, `about 1 in 4: ${kept} of 600`);
});

test('a one-part recipe from its slot keeps 1 of it: 3 oilcaps leave 1', () => {
  const seeds = [...Array(200)].map((_, i) => i + 1).filter((seed) => thrifts(at([], { seed, grown: { thrift: 1 } })));
  assert.ok(seeds.length > 0);
  const n = makeFrom(at([{ id: 'oilcap', n: 3 }], { seed: seeds[0], grown: { thrift: 1 } }), 'oilcap');
  assert.deepEqual([carried(n.bag, 'oilcap'), carried(n.bag, 'flask')], [1, 1]);
  assert.equal(shownLine(n).text, 'You keep 1 Oilcap.');
});

test('at the bench the full cost is still needed, and a kept part stays: the chest keeps 1 Wood', () => {
  const seed = [...Array(200)].map((_, i) => i + 1).find((sd) => thrifts(at([], { seed: sd, grown: { thrift: 1 } })));
  const short = makeAt(at([{ id: 'wood', n: 2 }, { id: 'stone', n: 3 }], { seed, grown: { thrift: 1 } }), 'chest');
  assert.equal(carried(short.bag, 'chest'), 0, 'too few, nothing made');
  const n = makeAt(at([{ id: 'wood', n: 3 }, { id: 'stone', n: 3 }], { seed, grown: { thrift: 1 } }), 'chest');
  assert.deepEqual([carried(n.bag, 'chest'), carried(n.bag, 'wood'), carried(n.bag, 'stone')], [1, 1, 0]);
  assert.equal(shownLine(n).text, 'You keep 1 Wood.');
});

test('the Pouch keeps a part too, and the bag still grows', () => {
  const seed = [...Array(200)].map((_, i) => i + 1).find((sd) => thrifts(at([], { seed: sd, grown: { thrift: 1 } })));
  const n = makeAt(at([{ id: 'ratTail', n: 4 }, { id: 'spiderSilk', n: 2 }], { seed, grown: { thrift: 1 } }), 'pouch');
  assert.deepEqual([n.bagSlots, carried(n.bag, 'ratTail'), carried(n.bag, 'spiderSilk')], [9, 1, 0]);
});
