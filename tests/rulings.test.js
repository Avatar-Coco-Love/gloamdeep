// § the owner's rulings, health check step 10 (D-874): travel keeps the countdowns (H-04), the
// night uses poison's turns (Q-098), a mole beside the hero as it notices never digs (H-06), and
// one warden beaten shows how to fight it (H-46)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeWorld, makeState, wait, sleepOut, FIRST_START } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { stoneAt, withTile, makeRoom, FIRST_ROOM, SKY } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { travel } from '../src/core/travel.js';
import { stoneHome } from '../src/core/mouth.js';
import { sleep, RESTED } from '../src/core/sleep.js';
import { maxHealth } from '../src/core/state.js';
import { pageOf } from '../src/core/bestiary.js';

const SEED = 5;
const plate = (room) => { for (let y = 0; y < room.rows; y++) { const x = room.map[y].search(/[ZA]/); if (x >= 0) return { x, y }; } return null; };
function onStone(s, place) {
  const there = goToPlace(s, place), at = plate(there.room);
  return { ...there, room: withTile(there.room, at.x, at.y, get('wokenPlate')), hero: at, enemies: [] };
}

test('travel: poison, stiff and the draughts keep their turns, and poison takes no heart (H-04)', () => {
  const both = onStone(onStone(makeWorld('first', SEED), stoneHome(SEED)), stoneAt(SEED).id);
  const s = { ...both, poisoned: 4, stiff: 3, glow: 5 }, out = travel(s, stoneHome(SEED));
  assert.equal(out.place, stoneHome(SEED));
  assert.deepEqual([out.poisoned, out.stiff, out.glow, out.health], [4, 3, 5, s.health]);
  assert.ok(!out.events.some((e) => e.type === 'poison'));
});

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (more) => ({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), turn: 250, oil: 0.5, line: null, ...more });

test('sleeping out: the night uses poison\'s turns, and takes its hearts (Q-098)', () => {
  const n = sleepOut(outside({ health: 3, poisoned: 6 }));
  assert.equal(n.poisoned ?? 0, 0);
  assert.equal(n.health, 1);
  assert.ok(n.events.some((e) => e.type === 'poison' && e.hurt === 2), 'its heart flashes on waking');
  const s = outside({ health: 2, poisoned: 6 });
  assert.notEqual(sleepOut(s).fell, s.fell, 'the last heart: the hero falls');
  const god = sleepOut(outside({ health: 2, poisoned: 6, god: true }));
  assert.equal(god.health, 2);
});

test('the bed: the night ends poison, and the hero wakes healed (Q-098)', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM), FIRST_START, [], []), turn: 250, health: 1, poisoned: 6 };
  const n = sleep(s, s.hero.x, s.hero.y);
  assert.equal(n.poisoned ?? 0, 0);
  assert.equal(n.health, maxHealth(s) + RESTED);
});

test('a mole beside the hero as it notices never digs, even once the hero steps off (H-06)', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM), FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: 'mole', x: 5, y: 10 }] };
  const n = wait(s);
  assert.ok(n.enemies[0].dug, 'marked');
  const off = wait({ ...n, hero: { x: 5, y: 13 } });
  assert.ok(!off.enemies[0].under, 'it chases on foot');
});

test('one warden beaten shows how to fight it; others still need 3 (H-46)', () => {
  assert.equal(pageOf({ warden: { met: 1, beaten: 0 } }, 'warden').fights, 'Beat 1 to learn how to fight it.');
  assert.equal(pageOf({ warden: { met: 1, beaten: 1 } }, 'warden').fights, get('warden').fights);
  assert.equal(pageOf({ rat: { met: 1, beaten: 1 } }, 'rat').fights, 'Beat 2 more to learn how to fight it.');
});

test('taking the locket wakes its warden, as a bump does, with its line and sound (D-874)', async () => {
  const { RELIC_GUARD } = await import('../src/core/relic.js');
  const { step } = await import('../src/core/turn.js');
  const base = { ...makeState(makeRoom(FIRST_ROOM), FIRST_START, [], []), hero: { x: 5, y: 11 } };
  const s = { ...base, items: [{ id: 'locket', x: 6, y: 11, once: true }], enemies: [{ id: RELIC_GUARD, x: 7, y: 11, asleep: true }] };
  const n = step(s, 'right');
  assert.ok(n.bag.some((b) => b.id === 'locket'));
  assert.ok(!n.enemies[0].asleep);
  assert.equal(n.line.id, 'wardenWakes');
  assert.ok(n.events.some((e) => e.type === 'wake' && e.id === RELIC_GUARD));
  assert.equal(n.health, s.health, 'it stirs, no bite on the turn it wakes');
  const after = wait(n);
  assert.ok(after.enemies[0].awake > 0 && after.enemies[0].chasing, 'then it chases');
  const full = step({ ...s, bag: Array.from({ length: 30 }, (_, i) => ({ id: 'stone', n: 1, k: i })) }, 'right');
  assert.ok(!full.bag.some((b) => b.id === 'locket') && full.enemies[0].asleep, 'the locket left on the floor, with no room: it sleeps on');
});
