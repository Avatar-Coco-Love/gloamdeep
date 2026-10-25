// § lost bag: in Normal, a fall leaves the bag where the hero fell, to fetch (MO3, D-334, D-345)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, step, wait } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { floorPlan } from '../src/core/map.js';

// A Normal journey in the first room, the hero at 3,10 about to fall to the rat at 2,10
function fallen(bag = [{ id: 'flask', n: 2 }, { id: 'wood', n: 5, form: 1 }], mode = 'normal') {
  const w = makeWorld('first', 4321, mode);
  return wait({ ...w, hero: { x: 3, y: 10 }, health: 1, bag, held: 'knife', enemies: [{ id: 'rat', x: 2, y: 10 }] });
}
const bagsIn = (s) => s.items.filter((it) => it.id === 'lostbag');
// The fallen state with the rat gone and the hero beside the bag, at 4,10
const beside = (s) => ({ ...s, enemies: [], hero: { x: 4, y: 10 } });

test('a Normal fall leaves the bag where the hero fell, holding its stacks; the hand keeps its weapon', () => {
  const n = fallen();
  assert.deepEqual(n.bag, []);
  assert.equal(n.held, 'knife');
  assert.deepEqual(bagsIn(n), [{ id: 'lostbag', x: 3, y: 10, holds: [{ id: 'flask', n: 2 }, { id: 'wood', n: 5, form: 1 }] }]);
  assert.equal(shownLine(n).text, 'You fall, and wake again.');
  assert.equal(bagsIn(n.fell).length, 1, 'shown beside the hero as they fall');
});

test('an empty bag is not left; Gentle keeps the bag', () => {
  assert.equal(bagsIn(fallen([])).length, 0);
  const g = fallen(undefined, 'gentle');
  assert.equal(bagsIn(g).length, 0);
  assert.equal(g.bag.length, 2);
});

test('walking onto it puts everything back: "You take back your bag."', () => {
  const n = step(beside(fallen()), 'left');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 2 }, { id: 'wood', n: 5, form: 1 }]);
  assert.equal(bagsIn(n).length, 0);
  assert.equal(shownLine(n).text, 'You take back your bag.');
});

test('what does not fit stays in it: "Your bag is full."; kinds top up their stacks first', () => {
  const full = [{ id: 'flask', n: 4 }, { id: 'stone', n: 1 }, { id: 'stone', n: 1 }, { id: 'stone', n: 1 }, { id: 'stone', n: 1 }, { id: 'stone', n: 1 }];
  const n = step({ ...beside(fallen()), bag: full }, 'left');
  assert.equal(n.bag[0].n, 5);
  assert.deepEqual(bagsIn(n)[0].holds, [{ id: 'flask', n: 1 }, { id: 'wood', n: 5, form: 1 }]);
  assert.equal(shownLine(n).text, 'Your bag is full.');
});

test('every fall leaves its own bag', () => {
  const once = fallen(), w = { ...once, hero: { x: 6, y: 6 }, health: 1, bag: [{ id: 'stone', n: 3 }], enemies: [{ id: 'rat', x: 5, y: 6 }] };
  const twice = wait(w);
  assert.equal(bagsIn(twice).length, 2);
});

test('the map marks each bag where you fell until it is taken back', () => {
  const n = fallen(), plan = floorPlan(n), room = plan.rooms.find((r) => r.id === n.place);
  assert.deepEqual(plan.bags, [{ x: room.x + 3, y: room.y + 10 }]);
  assert.deepEqual(floorPlan(step(beside(n), 'left')).bags, []);
});
