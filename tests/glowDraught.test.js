// § glowDraught: the Glow Draught (D-786, D-791), made at the mortar from 2 Duskstar and 1 Wisp
// Glass; drunk from the bag, any time, the lantern reaches 1 tile farther for 60 turns
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, wait, makeAt, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { glowLeft, glowReach, glowSlept } from '../src/core/glow.js';
import { lanternReach } from '../src/core/boon.js';
import { stationMakes } from '../src/core/menu.js';
import { stationFor } from '../src/core/bagmake.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });
const parts = [{ id: 'duskstar', n: 3 }, { id: 'wispGlass', n: 1 }];

test('the Glow Draught is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('glowDraught');
  assert.equal(e.name, 'Glow Draught'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5); assert.equal(e.verb, 'DRINK');
  assert.deepEqual(e.glow, { reach: 1, turns: 60 }); assert.deepEqual(e.bench.of, { duskstar: 2, wispGlass: 1 });
  for (const line of ['glowDraughtMake', 'glowDraughtShort', 'glowDraughtFull', 'glowDraughtDrink', 'glowDraughtLook', 'glowEnds', 'glowHeld']) assert.ok(LINES[line], line);
});

test('the mortar shows it once Duskstar and Wisp Glass have both been held', () => {
  const tile = get('mortarStand');
  assert.deepEqual(stationMakes(tile, parts, 6, [], new Set(['duskstar'])), []);
  const [m] = stationMakes(tile, parts, 6, [], new Set(['duskstar', 'wispGlass']));
  assert.equal(m.item, 'glowDraught'); assert.equal(m.dim, false);
  assert.equal(stationMakes(tile, [{ id: 'duskstar', n: 1 }], 6, [], new Set(['duskstar', 'wispGlass']))[0].dim, true);
});

test('made at the mortar it takes 2 Duskstar and 1 Wisp Glass, a turn, with its line; too few, free', () => {
  const n = makeAt(carrying(parts), 'glowDraught');
  assert.deepEqual(n.bag, [{ id: 'duskstar', n: 1 }, { id: 'glowDraught', n: 1 }]);
  assert.equal(n.turn, 1); assert.equal(shownLine(n).text, 'You make a Glow Draught.');
  const s = carrying([{ id: 'duskstar', n: 1 }, { id: 'wispGlass', n: 1 }]), short = makeAt(s, 'glowDraught');
  assert.equal(short.turn, 0); assert.equal(shownLine(short).text, 'You need 2 Duskstar and 1 Wisp Glass.');
});

test('a Duskstar\'s card says it makes the draught at the mortar, once shown', () => {
  assert.equal(stationFor(carrying([{ id: 'duskstar', n: 1 }]), 'duskstar'), null);
  assert.deepEqual(stationFor(carrying(parts), 'duskstar'), { into: 'glowDraught', at: 'at the mortar' });
});

test('drunk, the light reaches 1 tile farther for 60 turns, then fades with its line', () => {
  const s = carrying([{ id: 'glowDraught', n: 2 }]), n = eat(s, 0);
  assert.equal(glowLeft(n), 60); assert.equal(n.turn, 1);
  assert.deepEqual(n.bag, [{ id: 'glowDraught', n: 1 }]);
  assert.equal(lanternReach(n), lanternReach({ ...n, glow: 0 }) + 16);
  let t = n;
  for (let i = 0; i < 59; i++) t = wait(t);
  assert.equal(glowLeft(t), 1); assert.equal(glowReach(t), 1);
  t = wait(t);
  assert.equal(glowLeft(t), 0); assert.equal(glowReach(t), 0);
  assert.equal(shownLine(t).text, 'The glow fades.');
});

test('drunk again it goes back to 60, never more; at full health or with the lantern empty too', () => {
  const s = carrying([{ id: 'glowDraught', n: 2 }], { glow: 30 });
  assert.equal(glowLeft(eat(s, 0)), 60);
  const empty = eat(carrying([{ id: 'glowDraught', n: 1 }], { oil: 0 }), 0);
  assert.equal(glowLeft(empty), 60);
  assert.equal(lanternReach(empty), lanternReach({ ...empty, glow: 0 })); // an empty lantern gets nothing
});

test('a night uses its turns, and a fall ends it', () => {
  assert.equal(glowLeft(glowSlept({ glow: 50 }, 20)), 30);
  assert.equal(glowLeft(glowSlept({ glow: 50 }, 49)), 0);
  assert.equal(glowLeft(fall(carrying([], { glow: 40 }))), 0);
});
