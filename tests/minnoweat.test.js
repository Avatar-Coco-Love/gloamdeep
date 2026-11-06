// § minnow eat: a Pond Minnow eaten from the bag heals 1 heart, a turn, with its line;
// its Eat sits left of its Pour, and E eats it (D-615)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { secondText, twoButtons } from '../src/render/bag.js';

const room = makeRoom(FIRST_ROOM);
const hurt = (bag, health) => ({ ...makeState(room), bag, health });

test('a minnow eaten heals 1 heart, a turn, one from the stack', () => {
  const s = hurt([{ id: 'pondMinnow', n: 3 }], 2), n = eat(s, 0);
  assert.equal(n.health, 3);
  assert.equal(n.turn, s.turn + 1);
  assert.deepEqual(n.bag, [{ id: 'pondMinnow', n: 2 }]);
  assert.equal(LINES.minnowEat.text, 'You eat the minnow. Cold, but filling.');
});

test('at full health a minnow stays, free', () => {
  const s = makeState(room), full = { ...s, bag: [{ id: 'pondMinnow', n: 1 }] }, n = eat(full, 0);
  assert.equal(n.turn, full.turn);
  assert.deepEqual(n.bag, full.bag);
});

test('a minnow shows Eat beside Pour; a heartcap Make beside Eat', () => {
  assert.equal(secondText(get('pondMinnow')), 'EAT');
  assert.equal(secondText(get('heartcap')), 'MAKE');
  assert.equal(twoButtons(get('flask')), false);
  assert.equal(twoButtons(get('gloamberry')), true);
});
