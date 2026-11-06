// § god mode: a dev switch on the state; bites take no hearts (D-625)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { journeyText, readJourney } from '../src/core/save.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The rat sits at 2,10; 3,10 is next to it.
const at = (x, y, s = start()) => ({ ...s, hero: { x, y } });

test('a new game starts with god mode off', () => {
  assert.ok(!start().god);
});

test('in god mode the rat still bites, with its line, but takes no heart', () => {
  const n = step({ ...at(4, 10), god: true }, 'left');
  assert.equal(n.health, 5);
  assert.equal(shownLine(n).text, 'The rat bites you.');
  assert.deepEqual(n.events.find((e) => e.type === 'bite'), { type: 'bite', id: 'rat', hurt: 1 });
});

test('in god mode the hero never falls from bites', () => {
  let s = { ...at(3, 10), god: true, health: 1 };
  for (let i = 0; i < 20; i++) s = wait(s);
  assert.equal(s.health, 1);
  assert.ok(!s.events.some((e) => e.type === 'fall'));
});

test('switched off, bites hurt again', () => {
  assert.equal(wait({ ...at(3, 10), god: false }).health, 4);
});

test('god mode is kept in the save', () => {
  assert.equal(readJourney(journeyText({ ...start(), god: true })).state.god, true);
});
