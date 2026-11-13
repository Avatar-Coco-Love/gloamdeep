// § spawn: the dev spawn tool's rules
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, tileAt } from '../src/core/room.js';
import { makeState, FIRST_START } from '../src/core/turn.js';
import { spawn, resetRoom } from '../src/core/spawn.js';
import { buyerAt } from '../src/core/trade.js';

const start = () => makeState(makeRoom(FIRST_ROOM));

test('a wall can be spawned on floor, and no turn passes', () => {
  const s = start();
  const n = spawn(s, 'wall', 2, 2);
  assert.equal(tileAt(n.room, 2, 2).id, 'wall');
  assert.equal(n.turn, 0);
  assert.equal(tileAt(s.room, 2, 2).id, 'floor', 'the old state is not changed');
});

test('floor can replace a wall', () => {
  assert.equal(tileAt(spawn(start(), 'floor', 4, 1).room, 4, 1).id, 'floor');
});

test('nothing changes on the hero, outside the room, for the same tile or an unknown id', () => {
  const s = start();
  assert.equal(spawn(s, 'wall', FIRST_START.x, FIRST_START.y), s);
  assert.equal(spawn(s, 'wall', -1, 0), s);
  assert.equal(spawn(s, 'wall', 11, 0), s);
  assert.equal(spawn(s, 'floor', 2, 1), s);
  assert.equal(spawn(s, 'nothing', 1, 1), s);
});

test('reset brings the room back, and the hero leaves a wall', () => {
  const s = start();
  const opened = { ...spawn(s, 'floor', 4, 1), hero: { x: 4, y: 1 } };
  const r = resetRoom(opened, s.room, FIRST_START);
  assert.equal(r.room, s.room);
  assert.deepEqual(r.hero, FIRST_START);
  const kept = resetRoom({ ...s, hero: { x: 2, y: 2 } }, s.room, FIRST_START);
  assert.deepEqual(kept.hero, { x: 2, y: 2 });
});

test('a flask spawns on floor, one per tile, never on a wall or the hero', () => {
  const s = start();
  const n = spawn(s, 'flask', 2, 2);
  assert.deepEqual(n.items, [{ id: 'flask', x: 2, y: 2, spawned: true }]);
  assert.equal(n.turn, 0);
  assert.deepEqual(s.items, [], 'the old state is not changed');
  assert.equal(spawn(n, 'flask', 2, 2), n);
  assert.equal(spawn(s, 'flask', 0, 0), s);
  assert.equal(spawn(s, 'flask', FIRST_START.x, FIRST_START.y), s);
});

test('a wall cannot cover a flask', () => {
  const n = spawn(start(), 'flask', 2, 2);
  assert.equal(spawn(n, 'wall', 2, 2), n);
});

test('reset clears spawned flasks', () => {
  const s = start();
  assert.deepEqual(resetRoom(spawn(s, 'flask', 2, 2), s.room, FIRST_START).items, []);
});

test('a torch or glow lamp light goes on a free floor tile on a stone foot, never burning out (H-49)', () => {
  const s = start();
  const n = spawn(s, 'glowLampLight', 2, 2);
  assert.equal(tileAt(n.room, 2, 2).id, 'torchStand');
  assert.deepEqual(n.lights.at(-1), { id: 'glowLampLight', x: 2, y: 2 });
  assert.equal(spawn(n, 'torch', 2, 2), n, 'one light per tile');
  assert.equal(spawn(s, 'torch', FIRST_START.x, FIRST_START.y), s, 'not on the hero');
  assert.equal(spawn(spawn(s, 'flask', 3, 2), 'torch', 3, 2).lights.length, s.lights.length, 'not on an item');
});

test('the Peddler is brought to a free floor tile, ready to trade, and taken from any other room (H-48)', () => {
  const s = { ...start(), people: [{ id: 'peddler', x: 5, y: 5 }], elsewhere: { far: { people: [{ id: 'peddler', x: 1, y: 1 }] } } };
  const n = spawn(s, 'peddler', 2, 2);
  assert.deepEqual(n.people, [{ id: 'peddler', x: 2, y: 2, home: true, greeted: true }]);
  assert.deepEqual(n.elsewhere.far.people, []);
  assert.ok(buyerAt(n, 2, 2), 'a bump opens his trade');
  assert.equal(n.turn, 0);
  assert.equal(spawn(s, 'peddler', 0, 0), s, 'not on a wall');
  assert.equal(spawn(s, 'peddler', FIRST_START.x, FIRST_START.y), s, 'not on the hero');
});
