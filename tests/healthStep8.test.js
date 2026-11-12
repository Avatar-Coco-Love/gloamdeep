// § health check step 8 (D-872): a spit grub leaves a scorpion's rest alone (H-05); a drink warns of the oil (H-11)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';

const room = makeRoom(FIRST_ROOM);
const at = (enemies, oil = 1) => ({ ...makeState(room, FIRST_START, FIRST_LIGHTS, []), hero: { x: 5, y: 11 }, enemies, oil });
const rests = (s) => s.enemies.find((e) => e.id === 'scorpion').rests;

test('a scorpion resting near a spit grub counts down 1 a turn, as alone (H-05)', () => {
  const scorpion = { id: 'scorpion', x: 5, y: 8, rests: 2 };
  assert.equal(rests(wait(at([scorpion]))), 1, 'alone');
  assert.equal(rests(wait(at([scorpion, { id: 'spitGrub', x: 3, y: 8 }]))), 1, 'with a spit grub');
});

test("a tick's drink under the low mark says the low line, over its own, with the sputter (H-11)", () => {
  const n = wait(at([{ id: 'oilTick', x: 5, y: 10 }], 0.23));
  assert.ok(n.oil < 0.2 && n.oil > 0);
  assert.equal(n.line.id, 'oilLow');
  assert.ok(n.events.some((e) => e.type === 'oilLow'));
  assert.ok(n.events.some((e) => e.type === 'drink'), 'the drink still sounds');
});

test("a tick's drink to empty says the lantern gutters, with its sound, once (H-11)", () => {
  const n = wait(at([{ id: 'oilTick', x: 5, y: 10 }], 0.045));
  assert.equal(n.oil, 0);
  assert.equal(n.line.id, 'oilEmpty');
  assert.equal(n.events.filter((e) => e.type === 'oilOut').length, 1);
});

test('a drink that stays above the low mark keeps its own line', () => {
  assert.equal(wait(at([{ id: 'oilTick', x: 5, y: 10 }], 0.8)).line.id, 'oilTickDrinks');
});
