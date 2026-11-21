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
  assert.equal(shownLine(two).text, LINES.peddlerChat.texts[0]); // then his talk box's lines (D-1017)
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

// § later gifts (D-1018): one of his wares each 3 days from the last, in his talk box
const given = (p = {}, more = {}) => ({ ...home([], { gifted: true, giftAt: 0, ...p }), ...more });
const wares = ['flask', 'bagTorch'];
const got = (s) => wares.reduce((n, id) => n + carried(s.bag, id), 0);

test('3 days after his last gift, a bump gives one of his wares with its line, free, a take event', () => {
  const s = given({}, { turn: 900 }), one = step(s, 'right');
  assert.equal(got(one), 1);
  assert.equal(one.turn, s.turn);
  assert.ok([LINES.peddlerGiftFlask.text, LINES.peddlerGiftTorch.text].includes(shownLine(one).text));
  assert.equal(has(eventsSince(s, one), 'take'), true);
  assert.equal(one.people[0].giftAt, 900);
  assert.equal(one.people[0].given, 1);
  const two = step(one, 'right');
  assert.equal(got(two), 1); // the next waits 3 days more
  assert.equal(shownLine(two).text, LINES.peddlerChat.texts[0]);
});

test('before 3 days, no gift: his talk lines', () => {
  const one = step(given({}, { turn: 899 }), 'right');
  assert.equal(got(one), 0);
});

test('a full bag: his waiting line, kept, the same ware given later with room', () => {
  const s = given({}, { turn: 1000, bag: full() }), one = step(s, 'right');
  assert.equal(shownLine(one).text, LINES.peddlerGiftWaits.text);
  assert.equal(one.people[0].given, undefined);
  const roomy = step({ ...one, bag: [] }, 'right'), again = step({ ...s, bag: [] }, 'right');
  assert.deepEqual(roomy.bag, again.bag);
  assert.equal(got(roomy), 1);
});

test('the seed picks each gift; over many, both wares come', () => {
  let s = given({}, { turn: 900 }); const seen = new Set();
  for (let k = 0; k < 12; k++) { const was = s.bag; s = step({ ...s, bag: [], turn: s.turn + 900 }, 'right'); seen.add(s.bag[0]?.id); assert.notEqual(s.bag, was); }
  assert.deepEqual([...seen].sort(), ['bagTorch', 'flask']);
});

test('a save from before, gifted with no time kept: a gift waits at once', () => {
  const one = step(home([], { gifted: true }), 'right');
  assert.equal(got(one), 1);
});

test('dev Grow brings his next gift due, no turn passing; none before his first', async () => {
  const { giftsDue, giftReady } = await import('../src/core/gift.js');
  const s = given({}, { turn: 50 }), due = giftsDue(s);
  assert.equal(giftReady(due, due.people[0]), true);
  assert.equal(due.turn, 50);
  assert.equal(giftsDue(home()).people[0].giftAt, undefined);
});
