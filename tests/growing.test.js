// § growing: garden step 4 (D-567), the sprout grows into a small gloamberry bush a day of
// turns after planting, every turn counting, on the surface too
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, plant, wait, takeDown, canPlant } from '../src/core/turn.js';
import { TAKE_ASKS } from '../src/core/menu.js';
import { DAY_TURNS } from '../src/core/daytime.js';
import { grow, growAll } from '../src/core/garden.js';
import { journeyText, readJourney } from '../src/core/save.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const home = (bag, tile = 'plot') => {
  const s = makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 });
  return { ...s, room: withTile(s.room, 3, 2, get(tile)), bag };
};
const planted = () => plant({ ...home([{ id: 'gloamberrySeed', n: 1 }]), lit: false }, 3, 2); // unlit, so the oil lasts
const waitFor = (s, n) => { for (let i = 0; i < n; i++) s = wait(s); return s; };

test('the sprout grows a day of turns after planting, beside the hero too', () => {
  assert.equal(get('sprout').grows.turns, DAY_TURNS);
  const s = planted();
  assert.equal(tileAt(waitFor(s, DAY_TURNS - 2).room, 3, 2).id, 'sprout');
  const done = waitFor(s, DAY_TURNS - 1);
  assert.equal(done.place, s.place);
  assert.equal(tileAt(done.room, 3, 2).id, 'berryBed');
  assert.deepEqual(done.planted, {});
});

test('what grew while the hero was away is there when they come back', () => {
  const s = planted(), later = grow({ ...s, turn: s.turn + DAY_TURNS });
  assert.equal(tileAt(later.room, 3, 2).id, 'berryBed');
});

test('the grown bed: solid, the same card, its note, Plant dim, the seed back taken down', () => {
  const s = home([], 'berryBed');
  assert.equal(get('berryBed').solid, true);
  assert.deepEqual(TAKE_ASKS.berryBed, ['Garden bed', 'Gloamberries grow here.']);
  assert.equal(canPlant({ ...s, bag: [{ id: 'gloamberrySeed', n: 1 }] }, 3, 2), false);
  assert.deepEqual(takeDown(s, 3, 2).bag, [{ id: 'gardenBed', n: 1 }, { id: 'gloamberrySeed', n: 1 }]);
});

test('taken down, a planted bed forgets its clock; an older save starts it now', () => {
  assert.deepEqual(takeDown(planted(), 3, 2).planted, {});
  const old = home([], 'sprout'), sown = grow(old);
  assert.deepEqual(sown.planted, { [`${old.place}:3,2`]: old.turn });
});

test('dev Grow: a planted bed here grows at once, and the clock keeps in a save', () => {
  const s = growAll(planted());
  assert.equal(tileAt(s.room, 3, 2).id, 'berryBed');
  const kept = growAll({ ...planted(), place: 'woods' });
  assert.equal(readJourney(journeyText(kept)).state.room.cols, kept.room.cols);
});
