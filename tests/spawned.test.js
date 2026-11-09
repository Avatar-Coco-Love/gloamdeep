// § spawned (D-720): a creature or flask the dev tools spawn counts in no Records,
// Feat or Bestiary beaten count; experience and drops still come
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, step, pour, FIRST_START } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { spawn } from '../src/core/spawn.js';
import { counted } from '../src/core/record.js';
import { booked } from '../src/core/bestiary.js';
import { newProfile } from '../src/core/profile.js';

const room = makeRoom(FIRST_ROOM);
const empty = () => makeState(room, FIRST_START, FIRST_LIGHTS, []);
const up = { x: FIRST_START.x, y: FIRST_START.y - 1 };
const records = newProfile().records;
const beatOf = (s) => step({ ...s, held: 'knife' }, 'up').events.find((e) => e.type === 'beat');

test('a spawned creature is marked, and its beat says so', () => {
  const s = spawn(empty(), 'rat', up.x, up.y);
  assert.equal(s.enemies[0].spawned, true);
  const one = { ...s, enemies: [{ ...s.enemies[0], health: 1 }] };
  const beat = beatOf(one);
  assert.equal(beat.spawned, true);
  assert.deepEqual(counted(records, [beat]), records, 'Beaten stays');
  assert.deepEqual(booked({}, [beat]), { rat: { met: 1, beaten: 0 } }, 'met, never beaten');
  assert.ok(step({ ...one, held: 'knife' }, 'up').xp > one.xp, 'experience still comes');
});

test('a creature not spawned still counts', () => {
  const s = makeState(room, FIRST_START, FIRST_LIGHTS, [{ id: 'rat', ...up, health: 1 }]);
  const beat = beatOf(s);
  assert.equal(beat.spawned, undefined);
  assert.equal(counted(records, [beat]).beaten, 1);
});

test('a spawned flask, picked up and poured, counts in no Flasks poured', () => {
  const s = step(spawn(setOil(empty(), 0.25), 'flask', up.x, up.y), 'up');
  assert.equal(s.devFlasks, 1);
  const n = pour(s, 0), e = n.events.find((x) => x.type === 'pour');
  assert.equal(e.spawned, true);
  assert.equal(n.devFlasks, 0);
  assert.equal(counted(records, n.events).poured, 0);
});

test('with one spawned flask and one found, only one pour is marked', () => {
  const s = step(spawn(setOil(empty(), 0.1), 'flask', up.x, up.y), 'up');
  const two = { ...s, bag: [{ id: 'flask', n: 2 }] };
  const a = pour(two, 0), b = pour({ ...a, oil: 0.1 }, 0);
  const marks = [a, b].map((x) => x.events.find((e) => e.type === 'pour').spawned);
  assert.deepEqual(marks, [true, undefined]);
  assert.equal(counted(records, b.events).poured, 1);
});

test('a found flask poured is not marked', () => {
  const n = pour({ ...setOil(empty(), 0.25), bag: [{ id: 'flask', n: 1 }] }, 0);
  assert.equal(n.events.find((e) => e.type === 'pour').spawned, undefined);
  assert.equal(n.devFlasks, undefined);
});
