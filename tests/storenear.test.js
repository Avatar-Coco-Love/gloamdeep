// § store nearby: the bag's small STORE, on the surface with a stash chest within 6 tiles,
// sends each bag stack to the chests in reach holding its kind, nearest first, free (D-555, D-558)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { chestsNear, storeNearby, stashAt, CHEST_SLOTS } from '../src/core/chest.js';
import { bagAt, cardAt, storeAt, gearChosen, BAG_STORE } from '../src/render/bag.js';

// C: a stash chest, at 3,1 (1 away), 8,1 (6 away) and 10,1 (8 away, out of reach)
const YARD = ['TTTTTTTTTTTT', 'T..C....C.CT', 'T..........T', 'TTTTTTTTTTTT'];
const at = (bag, stashes = {}, dark = SKY) => {
  const s = makeState(makeRoom(YARD, dark, 'woods'), { x: 2, y: 2 });
  const kept = {};
  for (const [xy, st] of Object.entries(stashes)) kept[`${s.place}:${xy}`] = st;
  return { ...s, bag, stashes: kept };
};

test('the chests in reach are a 13 by 13 square round the hero, nearest first, none under a roof', () => {
  assert.deepEqual(chestsNear(at([])), [{ x: 3, y: 1 }, { x: 8, y: 1 }]);
  assert.deepEqual(chestsNear(at([], {}, { ...SKY, sky: false })), []);
});

test('each stack goes to the chests in reach holding its kind, free, counted once', () => {
  const s = at([{ id: 'wood', n: 3 }, { id: 'stone', n: 2 }, { id: 'oilcap', n: 4 }], { '3,1': [{ id: 'wood', n: 1 }], '8,1': [{ id: 'stone', n: 1 }], '10,1': [{ id: 'oilcap', n: 1 }] });
  const n = storeNearby(s);
  assert.deepEqual(n.bag, [{ id: 'oilcap', n: 4 }]); // the chest 8 away is out of reach
  assert.deepEqual(stashAt(n, 3, 1), [{ id: 'wood', n: 4 }]);
  assert.deepEqual(stashAt(n, 8, 1), [{ id: 'stone', n: 3 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You store 2 stacks.');
  assert.equal(shownLine(storeNearby(at([{ id: 'flask', n: 1 }], { '3,1': [{ id: 'wood', n: 1 }] }))).text, 'Nothing to store.');
});

test('the nearest chest fills first, the rest going on; what fits nowhere stays: "Chests full."', () => {
  const eleven = Array.from({ length: CHEST_SLOTS - 1 }, () => ({ id: 'workbench', n: 1 }));
  const s = at([{ id: 'wood', n: 50 }, { id: 'workbench', n: 1 }], { '3,1': [...eleven, { id: 'wood', n: 1 }], '8,1': [...eleven, { id: 'wood', n: 1 }] });
  const n = storeNearby(s), max = stashAt(n, 3, 1).at(-1).n;
  assert.equal(stashAt(n, 8, 1).at(-1).n, max);
  assert.deepEqual(n.bag, [{ id: 'wood', n: 50 + 2 - 2 * max }, { id: 'workbench', n: 1 }]); // no room for it in either
  assert.equal(shownLine(n).text, 'You store 1 stack. Chests full.');
});

test('with one chest in reach, "The chest is full."', () => {
  const twelve = Array.from({ length: CHEST_SLOTS }, () => ({ id: 'workbench', n: 1 }));
  const one = { ...at([{ id: 'workbench', n: 1 }], { '3,1': twelve }), hero: { x: 1, y: 2 } }; // 8,1 is 7 away
  assert.deepEqual(chestsNear(one), [{ x: 3, y: 1 }]);
  assert.equal(shownLine(storeNearby(one)).text, 'The chest is full.');
});

test('the STORE sits left of the cross; a tap on it, only when shown, stores', () => {
  const vw = 360, vh = 176, st = storeAt(cardAt(vw, vh));
  assert.ok(st.x + 30 < cardAt(vw, vh).close.x);
  assert.equal(bagAt(st.x + 3, st.y + 3, vw, vh, false, false, false, 6, false, true), 'store');
  assert.notEqual(bagAt(st.x + 3, st.y + 3, vw, vh), 'store');
  assert.equal(gearChosen(BAG_STORE), -1);
});
