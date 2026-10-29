// § bite: the rat bites when next to the hero, and the hero can fall (D-114 to D-119)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, FIRST_LIGHTS, FIRST_ENEMIES } from '../src/core/room.js';
import { makeState, step, wait, switchLantern, HERO_HEALTH, FIRST_START } from '../src/core/turn.js';
import { OIL } from '../src/core/oil.js';
import { enemyAt } from '../src/core/enemies.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';

const room = makeRoom(FIRST_ROOM);
const start = () => makeState(room, FIRST_START, FIRST_LIGHTS, FIRST_ENEMIES);
// The rat sits at 2,10; 3,10 is next to it, 4,10 is one tile away from that.
const at = (x, y, s = start()) => ({ ...s, hero: { x, y } });

test('the hero starts with 5 health', () => {
  assert.equal(start().health, 5);
  assert.equal(HERO_HEALTH, 5);
});

test('stepping next to the rat: it bites for 1 and stays put', () => {
  const n = step(at(4, 10), 'left');
  assert.deepEqual(n.hero, { x: 3, y: 10 });
  assert.equal(n.health, 4);
  assert.equal(shownLine(n).text, 'The rat bites you.');
  assert.equal(enemyAt(n, 2, 10).id, 'rat');
});

test('waiting next to the rat, it bites again', () => {
  assert.equal(wait(wait(at(3, 10))).health, 3);
});

test('a hit it survives sends it fleeing, without a bite, when the coin says flee (D-292, D-301)', () => {
  const n = step({ ...at(3, 10), seed: 5 }, 'left');
  assert.equal(n.health, 5);
  assert.equal(n.line.id, 'ratHurt');
});

test('a hurt rat with nowhere to flee bites, and the bite line replaces the hit line (D-292)', () => {
  const s = { ...at(2, 10), seed: 5, enemies: [{ id: 'rat', x: 1, y: 10, health: 2 }] }; // the wall at 0,10 behind it; it flees
  const n = step(s, 'left');
  assert.deepEqual(n.enemies.map(({ x, y, health }) => [x, y, health]), [[1, 10, 1]]);
  assert.equal(n.health, 4);
  assert.equal(n.line.id, 'ratBite');
});

test('a killed rat does not bite', () => {
  const s = { ...at(3, 10), enemies: [{ id: 'rat', x: 2, y: 10, health: 1 }] };
  const n = step(s, 'left');
  assert.equal(n.health, 5);
  assert.equal(shownLine(n).text, 'The rat squeaks and falls still.');
});

test('a rat a tile away, or only diagonal, does not bite', () => {
  assert.equal(wait(at(4, 10)).health, 5);
  assert.equal(wait(at(3, 11)).health, 5);
});

test('it bites with the lantern off too', () => {
  assert.equal(wait(switchLantern(at(3, 10))).health, 4);
});

test('the bite line replaces an oil line said on the same turn', () => {
  assert.equal(shownLine(wait({ ...at(3, 10), oil: 0.2 })).text, 'The rat bites you.');
});

test('bumping a wall passes no turn, so nothing bites', () => {
  const s = at(1, 10); // the rat is to the right, a wall to the left
  assert.equal(step(s, 'left'), s);
});

test('two rats next to the hero both bite', () => {
  assert.equal(wait(spawn(at(3, 10), 'rat', 4, 10)).health, 3);
});

test('at 0 health the hero falls and wakes at the start; the room stays as it was (D-332)', () => {
  let s = spawn(at(3, 10), 'flask', 6, 6);
  s = { ...s, health: 1, oil: 0.1, enemies: [{ id: 'rat', x: 2, y: 10 }, { id: 'rat', x: 6, y: 8 }] };
  s = { ...s, seen: s.seen.map(() => 1) };
  const n = wait(s);
  assert.deepEqual(n.hero, FIRST_START);
  assert.equal(n.health, 5);
  assert.equal(n.oil, OIL.start);
  assert.deepEqual(n.enemies.map((e) => [e.x, e.y]), [[2, 10], [6, 8]], 'the rats stay where they were');
  assert.deepEqual(n.items, s.items, 'a spawned flask stays');
  assert.equal(n.seen, s.seen, 'the map stays remembered');
  assert.equal(n.turn, s.turn + 1);
  assert.equal(shownLine(n).text, 'You fall, and wake again.');
});

test('a fall with no way to play picked keeps the bag, as Gentle (D-247, D-342)', () => {
  const s = { ...at(3, 10), health: 1, bag: [{ id: 'flask', n: 2 }], enemies: [{ id: 'rat', x: 2, y: 10 }] };
  assert.deepEqual(wait(s).bag, [{ id: 'flask', n: 2 }]);
});

test('a fall keeps what stash chests keep, and the seed (D-332)', () => {
  const stashes = { 'woods:3,2': [{ id: 'wood', n: 3 }] };
  const s = { ...at(3, 10), health: 1, stashes, enemies: [{ id: 'rat', x: 2, y: 10 }] }, n = wait(s);
  assert.equal(n.stashes, stashes);
  assert.equal(n.seed, s.seed);
});

test('a fall keeps the room as the hero fell in it, to be shown before they wake (D-234)', () => {
  const s = { ...at(3, 10), health: 1, enemies: [{ id: 'rat', x: 2, y: 10 }] };
  const n = wait(s);
  assert.deepEqual(n.fell.hero, { x: 3, y: 10 });
  assert.equal(n.fell.health, 0);
  assert.equal(n.fell.room, s.room);
  assert.equal(n.fell.enemies.length, 1);
  assert.equal(n.fell.enemies[0].x, 2);
});

test('a creature standing where the hero wakes steps aside to the nearest free tile (D-426)', () => {
  const s = { ...at(3, 10), health: 1, enemies: [{ id: 'rat', x: 2, y: 10 }, { id: 'rat', x: FIRST_START.x, y: FIRST_START.y }] };
  const n = wait(s), moved = n.enemies[1];
  assert.deepEqual(n.hero, FIRST_START);
  assert.notDeepEqual([moved.x, moved.y], [FIRST_START.x, FIRST_START.y]);
  assert.equal(Math.abs(moved.x - FIRST_START.x) + Math.abs(moved.y - FIRST_START.y), 1, 'one step away');
  assert.equal(room.map[moved.y][moved.x], '.');
  assert.deepEqual([n.enemies[0].x, n.enemies[0].y], [2, 10], 'the others stay where they were');
});
