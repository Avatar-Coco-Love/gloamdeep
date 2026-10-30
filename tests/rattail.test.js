// § rat tail: the first creature material (D-453, D-454). A beaten rat leaves one
// where it fell about 1 time in 2, seeded as a flee is; stepping on it takes it (D-474)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, step, look, itemAt } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

const room = makeRoom(FIRST_ROOM);
// The hero at 5,11 and a rat one hit from beaten on 5,10, one step up.
const withRat = (seed, s = makeState(room)) => ({ ...s, seed, hero: { x: 5, y: 11 }, items: [], enemies: [{ id: 'rat', x: 5, y: 10, health: 1, chasing: true }] });
const beat = (seed, s) => step(withRat(seed, s), 'up');
const dropped = (seed) => itemAt(beat(seed), 5, 10)?.id === 'ratTail';
const seeds = Array.from({ length: 400 }, (_, i) => i + 1);
const YES = seeds.find(dropped), NO = seeds.find((s) => !dropped(s));

test('a Rat Tail is a bag item in stacks of 20 that never grows back', () => {
  const tail = get('ratTail');
  assert.equal(tail.name, 'Rat Tail');
  assert.equal(tail.max, 20);
  assert.equal(tail.regrow, undefined);
  assert.equal(get('rat').drops, 'ratTail');
});

test('a beaten rat leaves its tail where it fell about 1 time in 2', () => {
  const n = seeds.filter(dropped).length;
  assert.ok(n > 160 && n < 240, `${n} of 400`);
  const s = beat(YES);
  assert.deepEqual(s.enemies, []);
  assert.deepEqual(s.items, [{ id: 'ratTail', x: 5, y: 10 }]);
  assert.deepEqual(beat(NO).items, []);
});

test('the same seed, turn and tile always give the same drop', () => {
  for (const seed of seeds.slice(0, 20)) assert.deepEqual(beat(seed).items, beat(seed).items);
});

test('a rat only hurt leaves nothing', () => {
  const s = step({ ...withRat(YES), enemies: [{ id: 'rat', x: 5, y: 10 }] }, 'up');
  assert.deepEqual(s.items, []);
});

test('stepping onto it puts it in the bag, with a line', () => {
  const n = step(beat(YES), 'up');
  assert.deepEqual(n.bag, [{ id: 'ratTail', n: 1 }]);
  assert.equal(itemAt(n, 5, 10), undefined);
  assert.equal(shownLine(n).text, 'You pick up the rat tail.');
});

test('with every slot a full stack it stays, with its full line', () => {
  const full = Array.from({ length: 6 }, () => ({ id: 'ratTail', n: 20 }));
  const n = step(beat(YES, { ...makeState(room), bag: full }), 'up');
  assert.deepEqual(n.bag, full);
  assert.equal(itemAt(n, 5, 10).id, 'ratTail');
  assert.equal(shownLine(n).text, "You can't carry more rat tails.");
});

test('choosing its bag slot says a look line', () => {
  const s = look({ ...makeState(room), bag: [{ id: 'ratTail', n: 1 }] }, 0);
  assert.equal(shownLine(s).text, 'A rat tail, for crafting later.');
});
