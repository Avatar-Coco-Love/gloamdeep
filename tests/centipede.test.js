// § centipede: biome 1's 15th kind, whose bite leaves the hero poisoned (D-654)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, poolAt } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { POISON, poisonLeft, poisonTick } from '../src/core/poison.js';
import { fall } from '../src/core/fall.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 and the creatures given
const at = (enemies, more = {}) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });
const centipede = (x, y) => ({ id: 'centipede', x, y });
// n waits with no one about, each turn's state kept
const waits = (s, n) => { const out = []; for (let i = 0; i < n; i++) out.push(s = wait(s)); return out; };

test('a centipede has 2 hearts, a bite of 1 that poisons, only chases, and drops a Centipede Leg or rarely a Venom Sac', () => {
  const m = get('centipede');
  assert.equal(m.name, 'Centipede'); assert.equal(m.health, 2); assert.equal(m.bite, 1); assert.equal(m.poisons, true);
  assert.deepEqual(m.ways, ['chases']);
  assert.equal(m.drops, 'centipedeLeg'); assert.equal(m.rare, 'venomSac');
  for (const id of [m.hurt, m.die, m.bites, 'poisonEnds', 'poisonHeld']) assert.ok(LINES[id], id);
  assert.ok(m.acts && m.fights);
  const leg = get('centipedeLeg');
  assert.equal(leg.name, 'Centipede Leg'); assert.equal(leg.sells, 1); assert.equal(leg.max, 20);
});

test('it joins the pool from depth 3, never leaving, and not before', () => {
  assert.ok(!poolAt(2).includes('centipede'));
  for (const d of [3, 4, 5, 9]) assert.ok(poolAt(d).includes('centipede'), d);
});

test('its bite takes a heart and leaves the hero poisoned for 6 turns, with its line', () => {
  const s = at([centipede(5, 10)]), n = wait(s);
  assert.equal(n.health, s.health - 1);
  assert.equal(poisonLeft(n), POISON.turns); assert.equal(POISON.turns, 6); assert.equal(POISON.every, 3);
  assert.equal(n.line.id, 'centipedeBite');
});

test('poisoned takes a heart every 3 turns, 2 in all, then wears off with its line', () => {
  const s = { ...at([]), health: 5, poisoned: 6 }, turns = waits(s, 7);
  assert.deepEqual(turns.map((t) => t.health), [5, 5, 4, 4, 4, 3, 3]);
  assert.deepEqual(turns.map(poisonLeft), [5, 4, 3, 2, 1, 0, 0]);
  assert.deepEqual(turns.map((t) => t.events.filter((e) => e.type === 'poison').map((e) => e.hurt)), [[], [], [1], [], [], [1], []]);
  assert.equal(turns[5].line.id, 'poisonEnds');
});

test('it never takes the last heart', () => {
  const turns = waits({ ...at([]), health: 2, poisoned: 6 }, 6);
  assert.deepEqual(turns.map((t) => t.health), [2, 2, 1, 1, 1, 1]);
  assert.deepEqual(turns[5].events.filter((e) => e.type === 'poison'), [{ type: 'poison', hurt: 0 }]);
});

test('a new bite starts the count again and never stacks', () => {
  const s = at([centipede(5, 10)], { poisoned: 2 }), n = wait(s);
  assert.equal(poisonLeft(n), POISON.turns);
});

test("no bite leaves no poison, and a bite's own turn takes nothing more from it", () => {
  assert.equal(poisonLeft(wait(at([]))), 0);
  const n = wait(at([centipede(5, 10)]));
  assert.ok(!n.events.some((e) => e.type === 'poison'));
});

test('in god mode poison takes no heart, though its event says what it would', () => {
  const turns = waits({ ...at([]), health: 5, poisoned: 6, god: true }, 6);
  assert.ok(turns.every((t) => t.health === 5));
  assert.deepEqual(turns[2].events.filter((e) => e.type === 'poison'), [{ type: 'poison', hurt: 1 }]);
});

test('a fall ends it', () => {
  assert.equal(poisonLeft(fall({ ...at([]), health: 0, poisoned: 4 })), 0);
  assert.equal(poisonTick(at([])).poisoned, undefined); // none held: as it was
});
