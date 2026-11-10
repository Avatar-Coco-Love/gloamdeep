// § shade: the Shade Draught (D-806), made at the mortar from 2 Lurker Claw and 1 Duskstar;
// drunk from the bag, any time, for 60 turns a creature notices the hero only within 2 steps
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, eat, wait, makeAt, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES, shownLine } from '../src/core/lines.js';
import { shadeLeft, shadeSlept, SHADE_NEAR } from '../src/core/shade.js';
import { stationMakes } from '../src/core/menu.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, bag, ...more });
const parts = [{ id: 'lurkerClaw', n: 3 }, { id: 'duskstar', n: 1 }];
// One creature up the hero's column, `far` steps away, the lantern lit
const facing = (id, far, more) => ({ ...carrying([], more), items: [], enemies: [{ id, x: 5, y: 11 - far }] });
const after = (s) => wait(s).enemies[0];

test('the Shade Draught is a made find of 5 a stack, drunk, with its lines', () => {
  const e = get('shadeDraught');
  assert.equal(e.name, 'Shade Draught'); assert.equal(e.kind, 'item'); assert.equal(e.max, 5); assert.equal(e.verb, 'DRINK');
  assert.deepEqual(e.shade, { turns: 60 }); assert.deepEqual(e.bench.of, { lurkerClaw: 2, duskstar: 1 }); assert.equal(SHADE_NEAR, 2);
  for (const line of ['shadeMake', 'shadeShort', 'shadeFull', 'shadeDrink', 'shadeLook', 'shadeEnds', 'shadeHeld']) assert.ok(LINES[line], line);
});

test('the mortar shows it once Lurker Claw and Duskstar have both been held, last', () => {
  const tile = get('mortarStand');
  assert.equal(tile.makes.at(-1), 'shadeDraught');
  assert.deepEqual(stationMakes(tile, parts, 6, [], new Set(['lurkerClaw'])).filter((m) => m.item === 'shadeDraught'), []);
  const m = stationMakes(tile, parts, 6, [], new Set(['lurkerClaw', 'duskstar'])).find((x) => x.item === 'shadeDraught');
  assert.equal(m.dim, false);
});

test('made at the mortar it takes 2 Lurker Claw and 1 Duskstar, a turn, with its line; too few, free', () => {
  const n = makeAt(carrying(parts), 'shadeDraught');
  assert.deepEqual(n.bag, [{ id: 'lurkerClaw', n: 1 }, { id: 'shadeDraught', n: 1 }]);
  assert.equal(n.turn, 1); assert.equal(shownLine(n).text, 'You make a Shade Draught.');
  const short = makeAt(carrying([{ id: 'lurkerClaw', n: 1 }, { id: 'duskstar', n: 1 }]), 'shadeDraught');
  assert.equal(short.turn, 0); assert.equal(shownLine(short).text, 'Need 2 Lurker Claw, 1 Duskstar.');
});

test('drunk at full health it runs 60 turns, then the line; drunk again, back to 60', () => {
  const n = eat(carrying([{ id: 'shadeDraught', n: 2 }]), 0);
  assert.equal(shadeLeft(n), 60); assert.equal(n.turn, 1); assert.deepEqual(n.bag, [{ id: 'shadeDraught', n: 1 }]);
  let t = n; for (let i = 0; i < 60; i++) t = wait(t);
  assert.equal(shadeLeft(t), 0); assert.equal(shownLine(t).text, 'The shade lifts from you.');
  assert.equal(shadeLeft(eat(carrying([{ id: 'shadeDraught', n: 2 }], { shade: 30 }), 0)), 60);
});

test('a rat in the light 3 steps off notices the hero, but not while it works; 2 steps off it does', () => {
  assert.ok(after(facing('rat', 3)).chasing);
  assert.ok(!after(facing('rat', 3, { shade: 30 })).chasing);
  assert.ok(after(facing('rat', 2, { shade: 30 })).chasing);
});

test('the rim lurker notices at 3 steps, but only at 2 while it works', () => {
  assert.ok(after(facing('rimLurker', 3)).chasing);
  assert.ok(!after(facing('rimLurker', 3, { shade: 30 })).chasing);
  assert.ok(after(facing('rimLurker', 2, { shade: 30 })).chasing);
});

test('one already after the hero keeps coming', () => {
  const s = facing('rat', 4, { shade: 30 });
  const e = after({ ...s, enemies: [{ ...s.enemies[0], chasing: true }] });
  assert.ok(e.chasing); assert.equal(e.y, 8);
});

test('a night uses its turns, and a fall ends it', () => {
  assert.equal(shadeLeft(shadeSlept({ shade: 50 }, 20)), 30);
  assert.equal(shadeLeft(shadeSlept({ shade: 50 }, 49)), 0);
  assert.equal(shadeLeft(fall(carrying([], { shade: 40 }))), 0);
});
