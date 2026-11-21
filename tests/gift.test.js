// § gift (D-1016): the Peddler at home gives one Homestone on his first bump with room, once
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom } from '../src/core/room.js';
import { makeState, step } from '../src/core/turn.js';
import { shownLine, LINES } from '../src/core/lines.js';
import { carried } from '../src/core/bag.js';
import { eventsSince, has } from '../src/core/events.js';

const home = (bag = [], p = {}) => ({ ...makeState(makeRoom(['#####', '#...#', '#####']), { x: 1, y: 1 }), bag, people: [{ id: 'peddler', x: 2, y: 1, home: true, ...p }] });
const full = (n = 6) => Array.from({ length: n }, (_, i) => ({ id: i % 2 ? 'stone' : 'duskstar', n: 20 }));

test('his first bump at home with room gives one Homestone, his gift line, free, a take event, once', () => {
  const s = home(), one = step(s, 'right');
  assert.equal(carried(one.bag, 'homestone'), 1);
  assert.equal(one.turn, s.turn);
  assert.equal(shownLine(one).text, LINES.peddlerGift.text);
  assert.equal(has(eventsSince(s, one), 'take'), true);
  assert.equal(one.people[0].gifted, true);
  const two = step(one, 'right');
  assert.equal(carried(two.bag, 'homestone'), 1);
  assert.equal(shownLine(two).text, LINES.peddlerHome.texts[0]);
});

test('a full bag: his waiting line, nothing given, the gift kept; with room later, given then', () => {
  const s = home(full()), one = step(s, 'right');
  assert.equal(carried(one.bag, 'homestone'), 0);
  assert.equal(shownLine(one).text, LINES.peddlerGiftWaits.text);
  assert.equal(has(eventsSince(s, one), 'take'), false);
  assert.notEqual(one.people[0].gifted, true);
  const roomy = step({ ...one, bag: full(5) }, 'right');
  assert.equal(carried(roomy.bag, 'homestone'), 1);
  assert.equal(roomy.people[0].gifted, true);
});

test('3 Homestones carried is no room: he waits; under 3, it joins their stack in a full bag', () => {
  const three = step(home([...full(5), { id: 'homestone', n: 3 }]), 'right');
  assert.equal(carried(three.bag, 'homestone'), 3);
  assert.equal(shownLine(three).text, LINES.peddlerGiftWaits.text);
  const two = step(home([...full(5), { id: 'homestone', n: 2 }]), 'right');
  assert.equal(carried(two.bag, 'homestone'), 3);
  assert.equal(two.people[0].gifted, true);
});

test('only at home: trapped behind rubble or freed and waiting, no gift', () => {
  const waiting = step({ ...home(), people: [{ id: 'peddler', x: 2, y: 1, leaves: 99 }] }, 'right');
  assert.equal(carried(waiting.bag, 'homestone'), 0);
});
