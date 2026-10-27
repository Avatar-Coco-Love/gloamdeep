// § potion: Make turns 3 heartcaps into a healing potion, a turn; Drink, in
// the bag, heals 4 hearts, never above full, a turn (D-309)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, craft, eat, maxHealth } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, health) => ({ ...makeState(room), bag, health });

test('3 heartcaps make a healing potion and pass a turn', () => {
  const n = craft(carrying([{ id: 'flask', n: 1 }, { id: 'heartcap', n: 3 }], 2), 1);
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }, { id: 'potion', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make a healing potion.');
});

test('under 3 heartcaps nothing is made', () => {
  const s = carrying([{ id: 'heartcap', n: 2 }], 2);
  assert.equal(craft(s, 0), s);
});

test('with 5 full stacks of potions and no slot free the heartcaps stay and no turn passes', () => {
  const bag = [...Array.from({ length: 5 }, () => ({ id: 'potion', n: 5 })), { id: 'heartcap', n: 4 }];
  const n = craft(carrying(bag, 2), 5);
  assert.equal(n.bag, bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, "You can't carry more potions.");
});

test('a potion heals 4 hearts, never above full, with lines that take turns', () => {
  const full = maxHealth(makeState(room));
  let s = carrying([{ id: 'potion', n: 3 }], 0);
  const said = [];
  for (let i = 0; i < 3; i++) { s = eat({ ...s, health: 0 }, 0); said.push(shownLine(s).text); }
  assert.deepEqual(said, ['You drink a healing potion.', 'The potion warms you through.', 'Your wounds close.']);
  assert.equal(s.health, Math.min(full, 4));
  assert.deepEqual(s.bag, []);
  assert.equal(eat(carrying([{ id: 'potion', n: 1 }], full - 1), 0).health, full);
});

test('at full health the potion stays, free', () => {
  const s = makeState(room), bag = [{ id: 'potion', n: 1 }];
  const n = eat({ ...s, bag, health: maxHealth(s) }, 0);
  assert.equal(n.bag, bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, "You aren't hurt.");
});

test('the heartcap shows Make beside Eat; the potion says Drink', async () => {
  const { bagAt, twoButtons, cardAt, CARD } = await import('../src/render/bag.js');
  assert.ok(twoButtons(get('heartcap')));
  assert.ok(!twoButtons(get('oilcap')) && !twoButtons(get('potion')));
  assert.equal(get('potion').verb, 'DRINK');
  const { x, y } = cardAt(312, 176), fy = y + 104;
  assert.equal(bagAt(x + CARD.w - 14, fy, 312, 176, true), 'act');
  assert.equal(bagAt(x + CARD.w - 50, fy, 312, 176, true), 'make');
  assert.equal(bagAt(x + CARD.w - 50, fy, 312, 176, false), null);
});
