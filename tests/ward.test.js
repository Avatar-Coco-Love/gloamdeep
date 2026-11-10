// § ward: the Ward Draught (D-795), made at the mortar from 2 Centipede Leg and 1 Herb; drunk
// from the bag, any time, it ends poisoned and for 60 turns a bite never poisons
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, wait, makeAt, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { wardLeft, wardSlept } from '../src/core/ward.js';
import { stationMakes } from '../src/core/menu.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });
const parts = [{ id: 'centipedeLeg', n: 3 }, { id: 'herb', n: 1 }];
// A centipede beside the hero, awake and chasing, one step up
const bitten = (s) => wait({ ...s, items: [], enemies: [{ id: 'centipede', x: 5, y: 10, health: 2, chasing: true }] });

test('the Ward Draught is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('wardDraught');
  assert.equal(e.name, 'Ward Draught'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5); assert.equal(e.verb, 'DRINK');
  assert.deepEqual(e.ward, { turns: 60 }); assert.deepEqual(e.bench.of, { centipedeLeg: 2, herb: 1 });
  for (const line of ['wardMake', 'wardShort', 'wardFull', 'wardDrink', 'wardLook', 'wardEnds', 'wardHeld']) assert.ok(LINES[line], line);
});

test('the mortar shows it once Centipede Leg and Herb have both been held, last', () => {
  const tile = get('mortarStand');
  assert.equal(tile.makes.at(-1), 'wardDraught');
  assert.deepEqual(stationMakes(tile, parts, 6, [], new Set(['centipedeLeg'])), []);
  const [m] = stationMakes(tile, parts, 6, [], new Set(['centipedeLeg', 'herb']));
  assert.equal(m.item, 'wardDraught'); assert.equal(m.dim, false);
});

test('made at the mortar it takes 2 Centipede Leg and 1 Herb, a turn, with its line; too few, free', () => {
  const n = makeAt(carrying(parts), 'wardDraught');
  assert.deepEqual(n.bag, [{ id: 'centipedeLeg', n: 1 }, { id: 'wardDraught', n: 1 }]);
  assert.equal(n.turn, 1); assert.equal(shownLine(n).text, 'You make a Ward Draught.');
  const short = makeAt(carrying([{ id: 'centipedeLeg', n: 1 }, { id: 'herb', n: 1 }]), 'wardDraught');
  assert.equal(short.turn, 0); assert.equal(shownLine(short).text, 'You need 2 Centipede Leg and 1 Herb.');
});

test('drunk, it ends poisoned at once, healing nothing, and runs 60 turns, then the line', () => {
  const n = eat(carrying([{ id: 'wardDraught', n: 2 }], { poisoned: 4, health: 3 }), 0);
  assert.equal(n.poisoned, 0); assert.equal(n.health, 3); assert.equal(wardLeft(n), 60); assert.equal(n.turn, 1);
  assert.deepEqual(n.bag, [{ id: 'wardDraught', n: 1 }]);
  let t = n;
  for (let i = 0; i < 60; i++) t = wait(t);
  assert.equal(wardLeft(t), 0); assert.equal(shownLine(t).text, 'The ward wears off.');
});

test('while it works a centipede\'s bite still hurts but never poisons; without it, it does', () => {
  const plain = bitten(carrying([], { health: 5 }));
  assert.ok(plain.poisoned > 0); assert.ok(plain.health < 5);
  const ward = bitten(carrying([], { health: 5, ward: 30 }));
  assert.equal(ward.poisoned ?? 0, 0); assert.ok(ward.health < 5); assert.equal(wardLeft(ward), 29);
});

test('drunk again it goes back to 60, never more; not poisoned too', () => {
  assert.equal(wardLeft(eat(carrying([{ id: 'wardDraught', n: 2 }], { ward: 30 }), 0)), 60);
  const free = eat(carrying([{ id: 'wardDraught', n: 1 }]), 0);
  assert.equal(wardLeft(free), 60); assert.deepEqual(free.bag, []);
});

test('a night uses its turns, and a fall ends it', () => {
  assert.equal(wardLeft(wardSlept({ ward: 50 }, 20)), 30);
  assert.equal(wardLeft(wardSlept({ ward: 50 }, 49)), 0);
  assert.equal(wardLeft(fall(carrying([], { ward: 40 }))), 0);
});
