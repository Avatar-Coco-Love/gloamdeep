// Night creatures in the woods: a lampmoth and a bat each night in each woods room round home (D-778, D-779),
// and a rare gloamling in one of them (D-780)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { nightfall, nightOf, darkOut, dayOf, NIGHT_KINDS, DAY_KINDS, HOME_KINDS, RARE_KIND, rareRoom, RARE_DAY_KIND, rareDayRoom } from '../src/core/nightfall.js';
import { passTime } from '../src/core/daytime.js';
import { makeWorld, wait } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { ROUND_HOME, HOME_ID, isMountain } from '../src/core/hearthwood.js';
import { litAt } from '../src/core/sight.js';

const at = (place, turns) => ({ ...passTime(goToPlace(makeWorld('first', 4127), place), turns), lit: true });
const moths = (s) => s.enemies.filter((e) => e.night);
const ROOM = ROUND_HOME.find((id) => ![0, 1].some((n) => id === rareRoom(4127, n) || id === rareDayRoom(4127, n))); // no gloamling these nights, no herb mimic these days

test('the lampmoth and the bat come out at night, from halfway through dusk to halfway through dawn', () => {
  assert.deepEqual(NIGHT_KINDS, ['lampmoth', 'bat']);
  assert.equal(darkOut(184), false);
  assert.equal(darkOut(186), true);
  assert.equal(darkOut(284), true);
  assert.equal(darkOut(286), false);
  assert.equal(nightOf(220), 0);
  assert.equal(nightOf(520), 1);
});

test('a lampmoth and a bat come out at night in a woods room round home, out of sight, apart', () => {
  const day = nightfall(at(ROOM, 100));
  assert.equal(nightfall(day), day);
  const night = nightfall(at(ROOM, 220)), out = moths(night);
  assert.deepEqual(out.map((m) => m.id), ['lampmoth', 'bat']);
  assert.equal(night.room.night, 0);
  for (const m of out) {
    assert.equal(litAt(night, m.x, m.y), false);
    assert.equal(night.room.map[m.y][m.x], '.');
  }
  assert.notDeepEqual([out[0].x, out[0].y], [out[1].x, out[1].y]);
});

test('a night bat brings no guano', () => {
  const before = at(ROOM, 220), night = nightfall(before);
  assert.equal(night.items.length, before.items.length);
});

test('never at home nor in a mountain room', () => {
  assert.equal(moths(nightfall(at(HOME_ID, 220))).length, 0);
  assert.ok(!ROUND_HOME.includes(HOME_ID));
  assert.ok(ROUND_HOME.every((id) => !isMountain(id)));
  const mountain = ['woods:0,0', 'woods:1,0', 'woods:2,0'].find(isMountain);
  assert.equal(moths(nightfall(at(mountain, 220))).length, 0);
});

test('one a night: one beaten stays beaten till the next night', () => {
  const night = nightfall(at(ROOM, 220)), beaten = { ...night, enemies: night.enemies.filter((e) => !e.night) };
  assert.equal(moths(nightfall(beaten)).length, 0);
  const next = nightfall({ ...beaten, turn: 520 });
  assert.equal(moths(next).length, 2);
  assert.equal(next.room.night, 1);
});

test('by day, any still standing are gone', () => {
  const night = nightfall(at(ROOM, 220)), day = nightfall({ ...night, turn: 290 });
  assert.equal(moths(day).length, 0);
  assert.equal(day.enemies.filter((e) => !e.day).length, night.enemies.length - 2);
});

test('the same seed and night give the same tile', () => {
  assert.deepEqual(moths(nightfall(at(ROOM, 220))), moths(nightfall(at(ROOM, 230))));
});

test('a turn passed in the woods at night brings it out', () => {
  assert.equal(moths(wait(at(ROOM, 220))).length, 2);
});

// The rare gloamling: one woods room round home a night, picked by the seed (D-780)
test('each night the seed picks one woods room round home for the gloamling', () => {
  const rooms = new Set();
  for (let n = 0; n < 40; n++) {
    const id = rareRoom(4127, n);
    assert.ok(ROUND_HOME.includes(id));
    assert.equal(rareRoom(4127, n), id);
    rooms.add(id);
  }
  assert.equal(rooms.size, ROUND_HOME.length);
});

test('the gloamling comes out only in its room, beside the lampmoth and the bat', () => {
  const room = rareRoom(4127, 0);
  const night = nightfall(at(room, 220)), out = moths(night);
  assert.deepEqual(out.map((m) => m.id), ['lampmoth', 'bat', RARE_KIND]);
  assert.equal(new Set(out.map((m) => `${m.x},${m.y}`)).size, 3);
  for (const other of ROUND_HOME.filter((id) => id !== room)) {
    assert.ok(!moths(nightfall(at(other, 220))).some((m) => m.id === RARE_KIND));
  }
  assert.ok(!moths(nightfall(at(HOME_ID, 220))).some((m) => m.id === RARE_KIND));
});

// Day creatures: a mole each day in each woods room round home (D-781)
const moles = (s) => s.enemies.filter((e) => e.day && e.id === 'mole');
const bunnies = (s) => s.enemies.filter((e) => e.day && e.id === 'bunny');

test('a day runs from halfway through dawn to halfway through dusk', () => {
  assert.deepEqual(DAY_KINDS, ['mole', 'bunny']);
  assert.deepEqual(HOME_KINDS, ['bunny']);
  assert.equal(dayOf(0), 0);
  assert.equal(dayOf(184), 0);
  assert.equal(dayOf(285), 1);
  assert.equal(dayOf(484), 1);
});

test('a mole comes out by day in a woods room round home, on open grass, 4 steps or more from the hero', () => {
  const s = at(ROOM, 100), day = nightfall(s), out = moles(day);
  assert.deepEqual(out.map((m) => m.id), ['mole']);
  assert.equal(day.room.day, 0);
  const m = out[0];
  assert.equal(day.room.map[m.y][m.x], '.');
  assert.ok(Math.max(Math.abs(m.x - s.hero.x), Math.abs(m.y - s.hero.y)) >= 4);
  assert.deepEqual(moles(nightfall(at(ROOM, 120))), out, 'the same seed and day give the same tile');
});

test('never a day mole at home nor in a mountain room', () => {
  assert.equal(moles(nightfall(at(HOME_ID, 100))).length, 0);
  const mountain = ['woods:0,0', 'woods:1,0', 'woods:2,0'].find(isMountain);
  assert.equal(moles(nightfall(at(mountain, 100))).length, 0);
});

test('one beaten stays beaten till the next day; by night it is gone', () => {
  const day = nightfall(at(ROOM, 100)), beaten = { ...day, enemies: day.enemies.filter((e) => !e.day) };
  assert.equal(moles(nightfall(beaten)).length, 0);
  const night = nightfall({ ...day, turn: 220 });
  assert.equal(moles(night).length, 0);
  assert.equal(moths(night).length, 2);
  assert.equal(bunnies(night).length, 0, 'the day\'s bunny is gone too');
  const next = nightfall({ ...beaten, turn: 400 });
  assert.equal(moles(next).length, 1);
  assert.equal(next.room.day, 1);
});

// The audit's bug fixes (D-783)
const steps = (s, m) => Math.max(Math.abs(m.x - s.hero.x), Math.abs(m.y - s.hero.y));

test('B1: an earlier night\'s creatures still standing go before the new night\'s come out', () => {
  const first = nightfall(at(ROOM, 220)), next = nightfall({ ...first, turn: 520 });
  assert.deepEqual(moths(next).map((m) => m.id), ['lampmoth', 'bat']);
  const day = nightfall(at(ROOM, 100)), later = nightfall({ ...day, turn: 400 });
  assert.equal(moles(later).length, 1, 'and an earlier day\'s mole');
});

test('B2: night creatures leave before any creature acts, so none bites on waking', () => {
  const night = nightfall(at(ROOM, 220)), { x, y } = night.hero, moth = { ...moths(night)[0], x: x + 1, y };
  const woke = wait({ ...night, enemies: [moth], turn: 599 }); // the turn passes into the half dawn
  assert.equal(moths(woke).length, 0);
  assert.equal(woke.health, night.health);
});

test('B3: night creatures come out 4 steps or more from the hero, even with the lantern out', () => {
  for (const room of ROUND_HOME) for (let n = 0; n < 10; n++) {
    const s = { ...at(room, 220 + 600 * n), lit: false }, night = nightfall(s); // every tile is out of sight
    for (const m of moths(night)) assert.ok(steps(s, m) >= 4, `${room}, night ${n}`);
  }
});

// The second day creature: a bunny, beside each woods room's mole and in the home room (D-784)
test('a bunny comes out by day beside the mole, on open grass, 4 steps or more from the hero', () => {
  const s = at(ROOM, 100), day = nightfall(s), [b] = bunnies(day), [m] = moles(day);
  assert.ok(b && m);
  assert.ok(b.x !== m.x || b.y !== m.y, 'apart');
  assert.equal(day.room.map[b.y][b.x], '.');
  assert.ok(steps(s, b) >= 4);
});

test('one bunny comes out by day in the home room, the only creature there; none by night', () => {
  const s = at(HOME_ID, 100), day = nightfall(s);
  assert.deepEqual(day.enemies.map((e) => e.id), ['bunny']);
  assert.ok(steps(s, day.enemies[0]) >= 4);
  const night = nightfall({ ...day, turn: 220 });
  assert.equal(night.enemies.length, 0, 'gone by night, and nothing comes out at home');
  const beaten = nightfall({ ...day, enemies: [] });
  assert.equal(beaten.enemies.length, 0, 'one beaten stays beaten till the next day');
  assert.equal(bunnies(nightfall({ ...beaten, turn: 400 })).length, 1);
});

test('never a bunny in a mountain room', () => {
  const mountain = ['woods:0,0', 'woods:1,0', 'woods:2,0'].find(isMountain);
  assert.equal(bunnies(nightfall(at(mountain, 100))).length, 0);
});

// The third day creature: a rare herb mimic, in one woods room round home a day (D-793)
test('each day the seed picks one woods room round home for the herb mimic', () => {
  assert.equal(RARE_DAY_KIND, 'herbMimic');
  const rooms = new Set();
  for (let n = 0; n < 40; n++) {
    const id = rareDayRoom(4127, n);
    assert.ok(ROUND_HOME.includes(id));
    assert.equal(rareDayRoom(4127, n), id);
    rooms.add(id);
  }
  assert.ok(rooms.size > 1, 'not the same room every day');
});

test('the herb mimic comes out only in its room, asleep, beside the mole and the bunny', () => {
  const room = rareDayRoom(4127, 0), s = at(room, 100), day = nightfall(s);
  const out = day.enemies.filter((e) => e.day);
  assert.deepEqual(out.map((m) => m.id), ['mole', 'bunny', RARE_DAY_KIND]);
  const [m] = out.filter((e) => e.id === RARE_DAY_KIND);
  assert.equal(m.asleep, true, 'looking like a herb');
  assert.equal(day.room.map[m.y][m.x], '.');
  assert.ok(steps(s, m) >= 4);
  for (const other of ROUND_HOME.filter((id) => id !== room))
    assert.ok(!nightfall(at(other, 100)).enemies.some((e) => e.id === RARE_DAY_KIND));
  assert.ok(!nightfall(at(HOME_ID, 100)).enemies.some((e) => e.id === RARE_DAY_KIND), 'never home');
  assert.ok(!nightfall({ ...day, turn: 220 }).enemies.some((e) => e.id === RARE_DAY_KIND), 'gone by night');
});
