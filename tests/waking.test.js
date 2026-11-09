// § waking (D-737): a fall wakes the hero in the last bed slept in, on the tile they lay down
// from, else the nearest open tile beside it; with none, on the woken home waystone's plate, no
// boon offered; otherwise where the journey began. Taking the bed down forgets it.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { newJourney } from '../src/core/state.js';
import { fall } from '../src/core/fall.js';
import { setDown, step, takeDown } from '../src/core/turn.js';
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
// The bed set down beside the hero in the start room and slept in at dusk; `from` is where they stood
function slept(w) {
  const bag = setDown({ ...w, bag: [{ id: 'bed', n: 1 }] }, 0, 'right');
  const bed = { x: w.hero.x + 1, y: w.hero.y };
  assert.equal(tileAt(bag.room, bed.x, bed.y).id, 'bedstead');
  return { state: step({ ...bag, turn: DUSK, line: null }, 'right'), bed };
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
  const { state, bed } = slept(wokeStone(newJourney(42, 'normal')));
  assert.deepEqual(state.bed, { place: state.place, x: bed.x, y: bed.y, from: { x: bed.x - 1, y: bed.y } });
  const woke = fall(walked(state, { x: bed.x - 1, y: bed.y - 2 }));
  assert.equal(woke.place, state.place);
  assert.deepEqual(woke.hero, { x: bed.x - 1, y: bed.y });
});

test('with something on that tile, the nearest open tile beside the bed', () => {
  const { state, bed } = slept(newJourney(42, 'normal'));
  const blocked = { ...state, items: [...state.items, { id: 'stick', x: bed.x - 1, y: bed.y }] };
  const spot = wakeSpot(blocked);
  assert.equal(spot.place, state.place);
  assert.notDeepEqual(spot.hero, { x: bed.x - 1, y: bed.y });
  assert.equal(Math.abs(spot.hero.x - bed.x) + Math.abs(spot.hero.y - bed.y), 1, 'right beside it');
  assert.equal(tileAt(state.room, spot.hero.x, spot.hero.y).solid, false);
});

test('a fall in another room wakes beside the bed in its room', () => {
  const { state, bed } = slept(newJourney(42, 'normal'));
  const there = { room: state.room, lights: state.lights, enemies: state.enemies, items: state.items, people: [], taken: [], seen: state.seen };
  const away = { ...state, ...state.elsewhere.woods, place: 'woods', elsewhere: { ...state.elsewhere, [state.place]: there }, hero: { x: 5, y: 5 }, health: 0 };
  delete away.elsewhere.woods;
  const woke = fall(away);
  assert.equal(woke.place, state.place);
  assert.deepEqual(woke.hero, { x: bed.x - 1, y: bed.y });
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
