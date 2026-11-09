// § waking (D-737): a fall wakes the hero in the last bed slept in, on the tile they lay down
// from, else the nearest open tile beside it; with none, on the woken home waystone's plate, no
// boon offered; otherwise where the journey began. Taking the bed down forgets it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newJourney } from '../src/core/state.js';
import { fall } from '../src/core/fall.js';
import { setDown, step, takeDown } from '../src/core/turn.js';
import { setSides } from '../src/core/bagturn.js';
import { tileAt } from '../src/core/room.js';
import { DUSK } from '../src/core/daytime.js';
import { wakeSpot } from '../src/core/waking.js';
import { offersBoons } from '../src/core/boon.js';
import { stoneHome } from '../src/core/mouth.js';

// The home waystone woken, in the cave mouth's room (D-753): its plate letter turned to the woken one
const wokeStone = (w) => {
  const id = stoneHome(w.seed), home = w.elsewhere[id], map = home.room.map.map((line) => line.replace('Z', 'A'));
  return { ...w, elsewhere: { ...w.elsewhere, [id]: { ...home, room: { ...home.room, map } } } };
};
// The bed set down beside the hero in the start room and slept in at dusk; `from` is where they stood.
// On the first side it fits, as a thick woods start room may have no room on the right (D-756).
const SIDE = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };
function slept(w0) {
  const w = { ...w0, bag: [{ id: 'bed', n: 1 }] }, dir = setSides(w, 0)[0], bag = setDown(w, 0, dir);
  const from = { x: w.hero.x, y: w.hero.y }, bed = { x: from.x + SIDE[dir][0], y: from.y + SIDE[dir][1] };
  assert.equal(tileAt(bag.room, bed.x, bed.y).id, 'bedstead');
  return { state: step({ ...bag, turn: DUSK, line: null }, dir), bed, from };
}
const walked = (s, hero) => ({ ...s, hero, health: 0 });

test('with no bed and the home waystone asleep, a fall wakes where the journey began', () => {
  const w = newJourney(42, 'normal');
  assert.deepEqual(wakeSpot(w), { place: w.place, hero: w.hero });
});

test('with the home waystone woken, a fall wakes on its plate, no boon offered', () => {
  const w = wokeStone(newJourney(42, 'normal')), woke = fall({ ...w, health: 0 });
  assert.equal(woke.place, stoneHome(w.seed)); // the cave mouth's room (D-753)
  assert.equal(tileAt(woke.room, woke.hero.x, woke.hero.y).id, 'wokenPlate');
  assert.ok(!woke.boon);
  assert.equal(offersBoons(woke), true, 'the plate offers only once stepped onto again (main.js skips it on a fall)');
});

test('the bed slept in is remembered; a fall wakes on the tile lain down from, before the waystone', () => {
  const { state, bed, from } = slept(wokeStone(newJourney(42, 'normal')));
  assert.deepEqual(state.bed, { place: state.place, x: bed.x, y: bed.y, from: from });
  const woke = fall(walked(state, { x: from.x, y: from.y - 2 }));
  assert.equal(woke.place, state.place);
  assert.deepEqual(woke.hero, from);
});

test('with something on that tile, the nearest open tile beside the bed', () => {
  const { state, bed, from } = slept(newJourney(42, 'normal'));
  const blocked = { ...state, items: [...state.items, { id: 'stick', ...from }] };
  const spot = wakeSpot(blocked);
  assert.equal(spot.place, state.place);
  assert.notDeepEqual(spot.hero, from);
  assert.equal(Math.abs(spot.hero.x - bed.x) + Math.abs(spot.hero.y - bed.y), 1, 'right beside it');
  assert.equal(tileAt(state.room, spot.hero.x, spot.hero.y).solid, false);
});

test('a fall in another room wakes beside the bed in its room', () => {
  const { state, bed, from } = slept(newJourney(42, 'normal'));
  const there = { room: state.room, lights: state.lights, enemies: state.enemies, items: state.items, people: [], taken: [], seen: state.seen };
  const away = { ...state, ...state.elsewhere.woods, place: 'woods', elsewhere: { ...state.elsewhere, [state.place]: there }, hero: { x: 5, y: 5 }, health: 0 };
  delete away.elsewhere.woods;
  const woke = fall(away);
  assert.equal(woke.place, state.place);
  assert.deepEqual(woke.hero, from);
});

test('taking the bed down forgets it until slept in again', () => {
  const w = newJourney(42, 'normal'), { state, bed } = slept(w);
  const back = takeDown({ ...state, bag: [] }, bed.x, bed.y);
  assert.equal(back.bed, null);
  assert.deepEqual(wakeSpot(back), { place: w.place, hero: w.hero });
});

test('a Hardcore fall still begins the world again', () => {
  const { state } = slept(newJourney(42, 'hardcore'));
  const woke = fall({ ...state, health: 0 });
  assert.equal(woke.bed, undefined);
});
