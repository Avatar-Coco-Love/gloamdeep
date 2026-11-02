// § craft from chests: the workbench reads the chests in STORE's reach, one total on its
// card, paying from the bag first, then the nearest chest (D-553, D-560)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY } from '../src/core/room.js';
import { makeState, makeAt } from '../src/core/turn.js';
import { stashAt, nearStacks } from '../src/core/chest.js';
import { benchMakes } from '../src/core/menu.js';

// C: a stash chest, at 3,1 (1 away), 8,1 (6 away) and 10,1 (8 away, out of reach)
const YARD = ['TTTTTTTTTTTT', 'T..C....C.CT', 'T..........T', 'TTTTTTTTTTTT'];
const at = (bag, stashes = {}, dark = SKY) => {
  const s = makeState(makeRoom(YARD, dark, 'woods'), { x: 2, y: 2 });
  const kept = {};
  for (const [xy, st] of Object.entries(stashes)) kept[`${s.place}:${xy}`] = st;
  return { ...s, bag, stashes: kept };
};

test('the card counts the bag and the chests in reach as one total', () => {
  const s = at([{ id: 'wood', n: 1 }], { '3,1': [{ id: 'wood', n: 1 }, { id: 'stone', n: 2 }], '8,1': [{ id: 'stone', n: 1 }], '10,1': [{ id: 'wood', n: 9 }] });
  const [chest] = benchMakes(s.bag, 6, nearStacks(s));
  assert.deepEqual(chest.cost.map((c) => c.have), [2, 3]); // the chest 8 away is out of reach
  assert.equal(chest.dim, true);
  const [lit] = benchMakes(s.bag, 6, nearStacks(at(s.bag, { '3,1': [{ id: 'wood', n: 2 }, { id: 'stone', n: 3 }] })));
  assert.equal(lit.dim, false);
});

test('Make takes from the bag first, then the nearest chest, then the next', () => {
  const s = at([{ id: 'wood', n: 1 }], { '3,1': [{ id: 'wood', n: 1 }, { id: 'stone', n: 2 }], '8,1': [{ id: 'wood', n: 5 }, { id: 'stone', n: 4 }] });
  const n = makeAt(s, 'chest'); // 3 Wood, 3 Stone
  assert.equal(n.turn, s.turn + 1);
  assert.deepEqual(n.bag, [{ id: 'chest', n: 1 }]);
  assert.deepEqual(stashAt(n, 3, 1), []);
  assert.deepEqual(stashAt(n, 8, 1), [{ id: 'wood', n: 4 }, { id: 'stone', n: 3 }]);
});

test('under a roof, or with too few in all, nothing is taken', () => {
  const stashes = { '3,1': [{ id: 'wood', n: 3 }, { id: 'stone', n: 3 }] };
  const dark = at([], stashes, { ...SKY, sky: false });
  assert.deepEqual(makeAt(dark, 'chest').stashes, dark.stashes);
  const few = at([{ id: 'wood', n: 1 }], { '3,1': [{ id: 'stone', n: 3 }] });
  const n = makeAt(few, 'chest');
  assert.equal(n.turn, few.turn);
  assert.deepEqual(n.stashes, few.stashes);
});

test('a bag upgrade is paid from the chests too', () => {
  const s = at([], { '3,1': [{ id: 'ratTail', n: 4 }, { id: 'spiderSilk', n: 2 }] });
  const n = makeAt(s, 'pouch');
  assert.equal(n.bagSlots, 9);
  assert.deepEqual(stashAt(n, 3, 1), []);
});
