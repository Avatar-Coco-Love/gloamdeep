// § mending: the Mending Draught (D-794), made at the mortar from 2 Mimic Leaf and 1 Herb; drunk
// from the bag, any time, a heart every 15 turns for 60 turns, 4 in all, never above full
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, wait, makeAt, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { mendLeft, mendSlept } from '../src/core/mending.js';
import { maxHealth } from '../src/core/state.js';
import { stationMakes } from '../src/core/menu.js';
import { stationFor } from '../src/core/bagmake.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });
const parts = [{ id: 'mimicLeaf', n: 3 }, { id: 'herb', n: 1 }];

test('the Mending Draught is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('mendingDraught');
  assert.equal(e.name, 'Mending Draught'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5); assert.equal(e.verb, 'DRINK');
  assert.deepEqual(e.mend, { every: 15, turns: 60 }); assert.deepEqual(e.bench.of, { mimicLeaf: 2, herb: 1 });
  for (const line of ['mendingMake', 'mendingShort', 'mendingFull', 'mendingDrink', 'mendingLook', 'mendEnds', 'mendHeld']) assert.ok(LINES[line], line);
});

test('the mortar shows it once Mimic Leaf and Herb have both been held, after Slowburn', () => {
  const tile = get('mortarStand');
  assert.deepEqual(tile.makes, ['glowDraught', 'slowburn', 'mendingDraught', 'wardDraught', 'spitproofDraught', 'shadeDraught']);
  assert.deepEqual(stationMakes(tile, parts, 6, [], new Set(['mimicLeaf'])), []);
  const [m] = stationMakes(tile, parts, 6, [], new Set(['mimicLeaf', 'herb']));
  assert.equal(m.item, 'mendingDraught'); assert.equal(m.dim, false);
});

test('made at the mortar it takes 2 Mimic Leaf and 1 Herb, a turn, with its line; too few, free', () => {
  const n = makeAt(carrying(parts), 'mendingDraught');
  assert.deepEqual(n.bag, [{ id: 'mimicLeaf', n: 1 }, { id: 'mendingDraught', n: 1 }]);
  assert.equal(n.turn, 1); assert.equal(shownLine(n).text, 'You make a Mending Draught.');
  const short = makeAt(carrying([{ id: 'mimicLeaf', n: 1 }, { id: 'herb', n: 1 }]), 'mendingDraught');
  assert.equal(short.turn, 0); assert.equal(shownLine(short).text, 'You need 2 Mimic Leaf and 1 Herb.');
});

test('a Mimic Leaf\'s card says it makes a Mending Draught at the mortar, once shown', () => {
  assert.equal(stationFor(carrying([{ id: 'mimicLeaf', n: 1 }]), 'mimicLeaf'), null);
  assert.deepEqual(stationFor(carrying(parts), 'mimicLeaf'), { into: 'mendingDraught', at: 'at the mortar' });
});

test('drunk hurt, a heart every 15 turns, 4 in all over 60 turns, then the line', () => {
  const start = carrying([{ id: 'mendingDraught', n: 2 }], { health: 1 });
  const n = eat(start, 0);
  assert.equal(mendLeft(n), 60); assert.equal(n.turn, 1); assert.equal(n.health, 1); assert.deepEqual(n.bag, [{ id: 'mendingDraught', n: 1 }]);
  let t = n, gains = [];
  for (let i = 1; i <= 60; i++) { const before = t.health; t = wait(t); if (t.health > before) gains.push(i); }
  assert.deepEqual(gains, [15, 30, 45, 60]);
  assert.equal(t.health, 5); assert.equal(mendLeft(t), 0); assert.equal(shownLine(t).text, 'The warmth fades.');
});

test('never above full, and the gold hearts of a rest are kept', () => {
  let t = carrying([], { mending: 16, health: maxHealth(carrying([])) });
  t = wait(t); assert.equal(t.health, maxHealth(t));
  let rested = carrying([], { mending: 16, health: maxHealth(carrying([])) + 1 });
  rested = wait(rested); assert.equal(rested.health, maxHealth(rested) + 1);
});

test('drunk again it goes back to 60, never more; at full health too', () => {
  assert.equal(mendLeft(eat(carrying([{ id: 'mendingDraught', n: 2 }], { mending: 30, health: 2 }), 0)), 60);
  const full = eat(carrying([{ id: 'mendingDraught', n: 1 }]), 0);
  assert.equal(mendLeft(full), 60); assert.deepEqual(full.bag, []);
});

test('a night uses its turns, and a fall ends it', () => {
  assert.equal(mendLeft(mendSlept({ mending: 50 }, 20)), 30);
  assert.equal(mendLeft(mendSlept({ mending: 50 }, 49)), 0);
  assert.equal(mendLeft(fall(carrying([], { mending: 40 }))), 0);
});
