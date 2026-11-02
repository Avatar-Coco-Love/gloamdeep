// § sort: the bag's small SORT lines the bag up by kind in the game's own list and joins
// half stacks, full ones first, free (D-553, D-559)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY } from '../src/core/room.js';
import { makeState, sortTheBag } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { sortBag } from '../src/core/bag.js';
import { bagAt, cardAt, storeAt, sortAt, gearChosen, BAG_SORT, SORT_W } from '../src/render/bag.js';

const YARD = ['TTTTT', 'T...T', 'TTTTT'];
const at = (bag) => ({ ...makeState(makeRoom(YARD, SKY, 'woods'), { x: 2, y: 1 }), bag });

test('kinds line up in the game list, oil and healing first, made things last', () => {
  const bag = [{ id: 'chest', n: 1 }, { id: 'wood', n: 3 }, { id: 'stone', n: 2 }, { id: 'flask', n: 1 }, { id: 'herb', n: 2 }];
  assert.deepEqual(sortBag(bag).map((s) => s.id), ['flask', 'herb', 'stone', 'wood', 'chest']);
});

test('half stacks join, full ones first, the rest last, keeping the first look', () => {
  const bag = [{ id: 'oilcap', n: 12 }, { id: 'wood', n: 4, form: 2 }, { id: 'oilcap', n: 15 }, { id: 'wood', n: 5, form: 0 }];
  assert.deepEqual(sortBag(bag), [{ id: 'oilcap', n: 20 }, { id: 'oilcap', n: 7 }, { id: 'wood', n: 9, form: 2 }]);
  assert.deepEqual(sortBag([{ id: 'flask', n: 3 }, { id: 'flask', n: 4 }]), [{ id: 'flask', n: 5 }, { id: 'flask', n: 2 }]);
  assert.deepEqual(sortBag([]), []);
});

test('sorting is free and says so; a bag in order is left as it is', () => {
  const s = at([{ id: 'stone', n: 2 }, { id: 'flask', n: 1 }]), n = sortTheBag(s);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }, { id: 'stone', n: 2 }]);
  assert.equal(n.turn, s.turn);
  assert.equal(shownLine(n).text, 'You sort the bag.');
  const again = sortTheBag(n);
  assert.equal(again.bag, n.bag);
  assert.equal(shownLine(again).text, 'The bag is in order.');
});

test('SORT sits left of STORE, or in its place beside the cross, and a tap picks it', () => {
  const card = cardAt(320, 180), st = storeAt(card), near = sortAt(card, true), alone = sortAt(card, false);
  assert.ok(near.x + SORT_W < st.x - 4); // room for STORE's marker between them
  assert.ok(alone.x > near.x);
  assert.ok(alone.x + SORT_W <= card.close.x - card.close.r - 4); // clear of the cross
  assert.equal(bagAt(near.x + 2, near.y + 4, 320, 180, false, false, false, 6, false, true), 'sort');
  assert.equal(bagAt(alone.x + 2, alone.y + 4, 320, 180), 'sort');
  assert.equal(bagAt(st.x + 2, st.y + 4, 320, 180, false, false, false, 6, false, true), 'store');
  assert.equal(gearChosen(BAG_SORT), -1);
});
