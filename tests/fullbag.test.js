// § a full bag: a find with no room always says why (H-02, H-18, D-864)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, itemAt, drop } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { fetchBag } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const tails = (k) => Array.from({ length: k }, () => ({ id: 'ratTail', n: 20 }));
// The hero starts at 5,11, so a find on 5,10 is one step up.
const onto = (bag, id) => step(spawn({ ...makeState(room), bag }, id, 5, 10), 'up');

test('with no slot free and none of its kind carried, a find stays with "Your bag is full."', () => {
  for (const id of ['wood', 'oilcap', 'stone', 'flask', 'locket', 'herb']) {
    const n = onto(tails(6), id);
    assert.equal(itemAt(n, 5, 10)?.id, id, id);
    assert.equal(shownLine(n)?.text, 'Your bag is full.', id);
  }
});

test('with its kind carried, a find keeps its own line', () => {
  assert.equal(shownLine(onto([...tails(5), { id: 'oilcap', n: 20 }], 'oilcap')).text, "You can't carry more oilcaps.");
  assert.equal(shownLine(onto([{ id: 'locket', n: 1 }], 'locket')).text, 'You already have the locket.');
});

test('a second workbench from the lost bag says its own line while the bag has room', () => {
  const s = { ...makeState(room), bag: [{ id: 'workbench', n: 1 }] };
  const n = fetchBag(s, { id: 'lostbag', x: 0, y: 0, holds: [{ id: 'workbench', n: 1 }, { id: 'wood', n: 3 }] });
  assert.deepEqual(n.bag, [{ id: 'workbench', n: 1 }, { id: 'wood', n: 3 }]);
  assert.equal(shownLine(n).text, 'You already carry a workbench.');
  const full = fetchBag({ ...s, bag: [{ id: 'workbench', n: 1 }, ...tails(5)] }, { id: 'lostbag', x: 0, y: 0, holds: [{ id: 'workbench', n: 1 }] });
  assert.equal(shownLine(full).text, 'Your bag is full.', 'a bag really full says so');
});

test('a dropped workbench taken back with one carried says its own line', () => {
  const s = drop({ ...makeState(room), bag: [{ id: 'workbench', n: 1 }] }, 0);
  const n = step({ ...s, bag: [{ id: 'workbench', n: 1 }] }, 'up');
  const back = step(n, 'down');
  assert.equal(back.items.some((it) => it.id === 'workbench'), true);
  assert.equal(shownLine(back).text, 'You already carry a workbench.');
});
