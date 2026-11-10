// § slowburn: Slowburn (D-792), made at the mortar from 2 Tick Shell and 1 Oilcap; drunk from
// the bag, any time, the lantern burns slower for 60 turns, a full tank lasting 70, not 60
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, wait, makeAt, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { slowLeft, slowSlept } from '../src/core/slowburn.js';
import { OIL } from '../src/core/oil.js';
import { stationMakes } from '../src/core/menu.js';
import { stationFor } from '../src/core/bagmake.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });
const parts = [{ id: 'tickShell', n: 3 }, { id: 'oilcap', n: 1 }];

test('Slowburn is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('slowburn');
  assert.equal(e.name, 'Slowburn'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5); assert.equal(e.verb, 'DRINK');
  assert.deepEqual(e.slow, { burn: 6 / 7, turns: 60 }); assert.deepEqual(e.bench.of, { tickShell: 2, oilcap: 1 });
  for (const line of ['slowburnMake', 'slowburnShort', 'slowburnFull', 'slowburnDrink', 'slowburnLook', 'slowEnds', 'slowHeld']) assert.ok(LINES[line], line);
});

test('the mortar shows it once Tick Shell and Oilcap have both been held, after the Glow Draught', () => {
  const tile = get('mortarStand');
  assert.deepEqual(tile.makes, ['glowDraught', 'slowburn', 'mendingDraught', 'wardDraught', 'spitproofDraught', 'shadeDraught']);
  assert.deepEqual(stationMakes(tile, parts, 6, [], new Set(['tickShell'])), []);
  const [m] = stationMakes(tile, parts, 6, [], new Set(['tickShell', 'oilcap']));
  assert.equal(m.item, 'slowburn'); assert.equal(m.dim, false);
});

test('made at the mortar it takes 2 Tick Shell and 1 Oilcap, a turn, with its line; too few, free', () => {
  const n = makeAt(carrying(parts), 'slowburn');
  assert.deepEqual(n.bag, [{ id: 'tickShell', n: 1 }, { id: 'slowburn', n: 1 }]);
  assert.equal(n.turn, 1); assert.equal(shownLine(n).text, 'You make a Slowburn.');
  const short = makeAt(carrying([{ id: 'tickShell', n: 1 }, { id: 'oilcap', n: 1 }]), 'slowburn');
  assert.equal(short.turn, 0); assert.equal(shownLine(short).text, 'You need 2 Tick Shell and 1 Oilcap.');
});

test('a Tick Shell\'s card says it makes Slowburn at the mortar, once shown', () => {
  assert.equal(stationFor(carrying([{ id: 'tickShell', n: 1 }]), 'tickShell'), null);
  assert.deepEqual(stationFor(carrying(parts), 'tickShell'), { into: 'slowburn', at: 'at the mortar' });
});

test('drunk, a lit turn burns 6/7 of its oil for 60 turns, then the line, then the old burn', () => {
  const n = eat(carrying([{ id: 'slowburn', n: 2 }]), 0);
  assert.equal(slowLeft(n), 60); assert.equal(n.turn, 1); assert.deepEqual(n.bag, [{ id: 'slowburn', n: 1 }]);
  const one = wait(n);
  assert.ok(Math.abs((n.oil - one.oil) - OIL.burn * 6 / 7) < 1e-9);
  let t = one;
  for (let i = 0; i < 59; i++) t = wait(t);
  assert.equal(slowLeft(t), 0); assert.equal(shownLine(t).text, 'The flame burns hungry again.');
  const after = wait(t);
  assert.ok(Math.abs((t.oil - after.oil) - OIL.burn) < 1e-9);
});

test('a full tank lasts 70 turns with it', () => {
  let t = carrying([], { slowburn: 1000 }), turns = 0;
  while (t.oil > 0) { t = wait(t); turns++; }
  assert.equal(turns, 70);
});

test('drunk again it goes back to 60, never more; at full health or with the lantern empty too', () => {
  assert.equal(slowLeft(eat(carrying([{ id: 'slowburn', n: 2 }], { slowburn: 30 }), 0)), 60);
  assert.equal(slowLeft(eat(carrying([{ id: 'slowburn', n: 1 }], { oil: 0 }), 0)), 60);
});

test('a night uses its turns, and a fall ends it', () => {
  assert.equal(slowLeft(slowSlept({ slowburn: 50 }, 20)), 30);
  assert.equal(slowLeft(slowSlept({ slowburn: 50 }, 49)), 0);
  assert.equal(slowLeft(fall(carrying([], { slowburn: 40 }))), 0);
});
