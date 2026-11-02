// § planting: garden step 3 (D-566), a Gloamberry Seed planted from the garden bed's card,
// a sprout showing; taken down, the seed comes back when it fits
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt, withTile } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, plant, canPlant, takeDown, panelBeside } from '../src/core/turn.js';
import { TAKE_ASKS, gardenMenu } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { askCardAt } from '../src/render/askcard.js';

const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const home = (bag, tile = 'plot') => {
  const s = makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 });
  return { ...s, room: withTile(s.room, 3, 2, get(tile)), bag };
};

test('Plant puts one seed in the bed, a sprout showing, a turn, with its line', () => {
  const s = home([{ id: 'gloamberrySeed', n: 2 }]), done = plant(s, 3, 2);
  assert.equal(tileAt(done.room, 3, 2).id, 'sprout');
  assert.deepEqual(done.bag, [{ id: 'gloamberrySeed', n: 1 }]);
  assert.equal(done.turn, s.turn + 1);
  assert.equal(shownLine(done).text, 'You plant a gloamberry seed.');
  assert.ok(done.events.some((e) => e.type === 'plant' && e.id === 'gloamberrySeed'));
});

test('with no seed, or a seed already in, Plant is dim and changes nothing', () => {
  const none = home([{ id: 'wood', n: 1 }]);
  assert.equal(canPlant(none, 3, 2), false);
  assert.equal(plant(none, 3, 2), none);
  const grown = home([{ id: 'gloamberrySeed', n: 1 }], 'sprout');
  assert.equal(canPlant(grown, 3, 2), false);
  assert.equal(plant(grown, 3, 2), grown);
  assert.deepEqual(gardenMenu(false).map((l) => [l.text, !!l.dim]), [['Plant', true], ['Deconstruct', false]]);
  assert.deepEqual(gardenMenu(true).map((l) => !!l.dim), [false, false]);
});

test('the planted bed is solid, opens the same card, its note A sprout grows here.', () => {
  const grown = home([], 'sprout');
  assert.equal(get('sprout').solid, true);
  assert.deepEqual(panelBeside(grown, 'right'), { x: 3, y: 2 });
  assert.deepEqual(TAKE_ASKS.sprout, ['Garden bed', 'A sprout grows here.']);
});

test('taken down, the bed and its seed come back; with no room for the seed, only the bed', () => {
  const back = takeDown(home([], 'sprout'), 3, 2);
  assert.deepEqual(back.bag, [{ id: 'gardenBed', n: 1 }, { id: 'gloamberrySeed', n: 1 }]);
  assert.equal(tileAt(back.room, 3, 2).id, 'floor');
  assert.equal(shownLine(back).text, 'You take down the garden bed.');
  const fill = Array.from({ length: 5 }, (_, i) => ({ id: ['wood', 'stone', 'flask', 'herb', 'oilcap'][i], n: 1 }));
  const tight = takeDown(home(fill, 'sprout'), 3, 2);
  assert.deepEqual(tight.bag.map((s) => s.id), [...fill.map((s) => s.id), 'gardenBed']);
});

test('the card widens for DECONSTRUCT, its two buttons side by side', () => {
  const at = (x) => askCardAt(x, 117, 422, 195, ...TAKE_ASKS.plot, gardenMenu(true));
  const hits = []; for (let x = 0; x < 422; x++) { const a = at(x); if (a?.line !== undefined) hits.push(a.line); }
  assert.equal(hits[0], 0); assert.equal(hits.at(-1), 1);
});
