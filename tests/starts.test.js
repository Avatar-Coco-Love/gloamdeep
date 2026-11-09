// § starts (D-735): a new journey begins in a south woods room, the hero in its middle, the
// lantern off; the start's goal rules; a fall wakes where the journey began (until step 3)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newJourney, startRoom } from '../src/core/state.js';
import { STARTS, START, startOf } from '../src/core/starts.js';
import { STARTS as LISTED, byLetter } from '../src/core/registry.js';
import { mouthOf } from '../src/core/mouth.js';
import { fall } from '../src/core/fall.js';
import { goalsAfter, goalLine, questRows, GOALS, howOf } from '../src/core/goals.js';
import { inDaylight } from '../src/core/daytime.js';

const SOUTH = ['woods:0,2', 'woods:1,2', 'woods:2,2'];

test('the start is one entry in the registry, the south woods', () => {
  assert.equal(LISTED, STARTS);
  assert.equal(START, 'southWoods');
  assert.equal(STARTS.southWoods.lit, false);
  assert.deepEqual(STARTS.southWoods.goals, { skip: ['home'], now: ['stone'], how: { stone: 'Home is in the middle of the woods.' } });
  assert.equal(startOf({ start: 'southWoods' }), STARTS.southWoods);
  assert.equal(startOf({}), null, 'a journey begun in the crypt has none');
});

test('the room: one of the south row, never the cave mouth\'s, each picked by some seed', () => {
  const seen = new Set();
  for (let seed = 1; seed <= 200; seed++) {
    const id = startRoom(seed);
    assert.ok(SOUTH.includes(id), id);
    assert.notEqual(id, mouthOf(seed).from);
    assert.equal(startRoom(seed), id, 'the same seed, the same room');
    seen.add(id);
  }
  assert.equal(seen.size, 3);
});

test('a new journey: in that room by day, the lantern off, the hero on an open tile near its middle', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const w = newJourney(seed, 'normal'), { x, y } = w.hero;
    assert.equal(w.place, startRoom(seed));
    assert.equal(w.start, 'southWoods');
    assert.equal(w.lit, false);
    assert.ok(inDaylight(w));
    assert.deepEqual(w.found, [w.place]);
    assert.equal(byLetter(w.room.map[y][x]).solid, false);
    assert.ok(![...w.items, ...w.lights, ...w.enemies].some((t) => t.x === x && t.y === y), 'nothing on it');
    assert.ok(Math.abs(x - (w.room.cols - 1) / 2) + Math.abs(y - (w.room.rows - 1) / 2) <= 6, `seed ${seed}: ${x},${y}`);
    assert.deepEqual(w.home.hero, w.hero);
    assert.equal(w.home.place, w.place);
  }
});

test('a Normal fall wakes where the journey began, on its tile', () => {
  const w = newJourney(42, 'normal'), away = { ...w, place: 'first', room: w.home.places.first.room, hero: { x: 5, y: 11 }, health: 0 };
  const woke = fall({ ...away, elsewhere: { ...w.elsewhere, [w.place]: { room: w.room, lights: w.lights, enemies: w.enemies, items: w.items, people: [], taken: [], seen: w.seen } } });
  assert.equal(woke.place, w.place);
  assert.deepEqual(woke.hero, w.hero);
});

test('the start\'s goals: "Find the waystone" from the first turn with its words, "Go home" never', () => {
  const w = newJourney(42, 'normal'), after = goalsAfter({}, 0, {}, [], { ...w, turn: 1 }, w);
  assert.deepEqual(after.goals, { stone: { done: false } });
  assert.deepEqual(goalLine(after.goals, null, 1, w.place, w), { id: 'stone', goal: 'Find the waystone', how: 'Home is in the middle of the woods.', done: false });
  assert.equal(questRows(after.goals, w.place, w.start)[0].how, 'Home is in the middle of the woods.');
  const ratDone = goalsAfter({ rat: { done: true, paid: 'flask' } }, 0, {}, [], { ...w, turn: 2 }, w);
  assert.equal(ratDone.goals.home, undefined, 'skipped');
  const crypt = GOALS.find((g) => g.id === 'stone');
  assert.equal(howOf(crypt, 'first'), 'Old standing stones, near home.', 'a crypt journey keeps its words');
});
