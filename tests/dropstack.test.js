// § drop: Drop in the bag sets the chosen stack down at the hero's feet, free, and a
// step back onto it takes it back whole (D-546); standing on a find, it joins it, never swapped (D-936)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, step, drop } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { bagAt, cardAt, DROP_W } from '../src/render/bag.js';

// The first room, nothing about, the hero at 4,10 with `bag`
const at = (bag, items = []) => ({ ...makeWorld('first', 4321, 'normal'), enemies: [], hero: { x: 4, y: 10 }, items, bag });
const piles = (s) => s.items.filter((it) => it.dropped);

test('Drop sets the whole stack down on the hero\'s tile, free, "You set it down."', () => {
  const s = at([{ id: 'flask', n: 2 }, { id: 'wood', n: 5, form: 1 }]), d = drop(s, 1);
  assert.deepEqual(d.bag, [{ id: 'flask', n: 2 }]);
  assert.deepEqual(piles(d), [{ id: 'wood', n: 5, form: 1, x: 4, y: 10, dropped: true }]);
  assert.equal(d.turn, s.turn, 'no turn passes');
  assert.equal(d.oil, s.oil);
  assert.equal(shownLine(d).text, 'You set it down.');
  assert.equal(drop(s, 4), s, 'an empty slot changes nothing');
});

test('a step back onto it takes the whole stack back, never to grow back', () => {
  const d = drop(at([{ id: 'heartcap', n: 3 }]), 0), back = step(step({ ...d, health: 1 }, 'right'), 'left');
  assert.deepEqual(back.bag, [{ id: 'heartcap', n: 3 }], 'not eaten though hurt');
  assert.equal(piles(back).length, 0);
  assert.equal((back.taken || []).some((t) => t.id === 'heartcap'), false);
});

test('with too little room, what fits goes back and the rest stays, "Your bag is full."', () => {
  const full = [1, 2, 3, 4, 5].map(() => ({ id: 'wood', n: 20 }));
  const d = drop(at([...full, { id: 'ratTail', n: 4 }]), 5);
  const away = step(d, 'right'), back = step({ ...away, bag: [...full, { id: 'ratTail', n: 18 }] }, 'left');
  assert.equal(back.bag[5].n, 20);
  assert.equal(piles(back)[0].n, 2);
  assert.equal(shownLine(back).text, 'Your bag is full.');
});

test('standing on a find, Drop sets the stack beside it, never swapped: one tile, two kinds', () => {
  const full = [1, 2, 3, 4, 5, 6].map(() => ({ id: 'wood', n: 20 }));
  const d = drop(at(full, [{ id: 'flask', x: 4, y: 10 }]), 0);
  assert.equal(d.bag.length, 5);
  assert.equal(d.bag.some((o) => o.id === 'flask'), false, 'the flask stays on the ground');
  assert.deepEqual(d.items.filter((it) => it.x === 4 && it.y === 10).map((it) => it.id), ['flask', 'wood']);
});

test('dropped onto its own kind, the stack grows: 3 Wood left over and 5 dropped make 8', () => {
  const d = drop(at([{ id: 'wood', n: 5, form: 1 }], [{ id: 'wood', n: 3, form: 1, x: 4, y: 10, once: true }]), 0);
  assert.deepEqual(d.items.filter((it) => it.id === 'wood').map((it) => it.n), [8]);
});

test('three kinds dropped on one tile all lie there, and one step back takes them all', () => {
  let d = at([{ id: 'wood', n: 5 }, { id: 'ratTail', n: 3 }, { id: 'herb', n: 4 }]);
  for (let i = 0; i < 3; i++) d = drop(d, 0);
  assert.deepEqual(piles(d).map((it) => [it.id, it.n]), [['wood', 5], ['ratTail', 3], ['herb', 4]]);
  const back = step(step(d, 'right'), 'left');
  assert.equal(piles(back).length, 0);
  assert.deepEqual(back.bag.map((o) => [o.id, o.n]).sort(), [['herb', 4], ['ratTail', 3], ['wood', 5]]);
});

test('the Drop button is at the item side\'s bottom left, only with a filled slot chosen', () => {
  for (const [vw, vh] of [[320, 180], [180, 320]]) {
    const { drop: b } = cardAt(vw, vh), x = b.x + DROP_W / 2, y = b.y + 5;
    assert.equal(bagAt(x, y, vw, vh, false, false, true), 'drop');
    assert.notEqual(bagAt(x, y, vw, vh, false, false, false), 'drop');
  }
});
