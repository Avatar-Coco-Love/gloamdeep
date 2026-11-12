// § your own campfire (D-853): a fire the hero built is three twins of the campfire's levels,
// the same pictures and rules, its own words on the card; cold, Take up puts it back in the bag whole
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, SKY, tileAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { makeState, setDown, kindle, sit, stoke, takeDown } from '../src/core/turn.js';
import { TAKE_ASKS, kindleMenu } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';
import { askCardAt } from '../src/render/askcard.js';

const OWN = ['ownCampfire', 'ownEmbers', 'ownAshes'], FOUND = ['campfire', 'campfireEmbers', 'campfireAshes'];
const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const set = (bag = [{ id: 'bagCampfire', n: 1 }]) => setDown({ ...makeState(makeRoom(WOODS, SKY, 'woods'), { x: 2, y: 2 }), bag }, 0, 'right');

test('the three twins keep the found levels\' rules, each leading to its own twin', () => {
  OWN.forEach((id, i) => {
    const own = get(id), found = get(FOUND[i]), strip = ({ id: _, letter: __, sits, stokes, kindles, takes, ...rest }) => rest;
    assert.deepEqual(strip(own), strip(found));
    assert.equal(own.sits?.heal, found.sits?.heal); assert.equal(own.sits?.warm, found.sits?.warm);
  });
  assert.equal(get('ownCampfire').sits.into, 'ownEmbers');
  assert.equal(get('ownEmbers').sits.into, 'ownAshes');
  assert.equal(get('ownEmbers').stokes.into, 'ownCampfire');
  assert.equal(get('ownAshes').kindles.into, 'ownEmbers');
  assert.equal(get('ownCampfire').takes, undefined); assert.equal(get('ownEmbers').takes, undefined); // a burning one burns down first
});

test('its own words: found fires keep theirs', () => {
  assert.deepEqual(TAKE_ASKS.ownAshes, ['Light the fire?', 'You laid these stones.']);
  assert.deepEqual(TAKE_ASKS.ownEmbers, ['Campfire', 'Your fire still glows.']);
  assert.deepEqual(TAKE_ASKS.ownCampfire, ['Campfire', 'Your fire burns well.']);
  assert.deepEqual(TAKE_ASKS.campfireAshes, ['Light the fire?', 'No one has sat here for a long time.']);
});

test('your cold ashes\' card: Yes, Take up, No, and three buttons on the ask card', () => {
  assert.deepEqual(kindleMenu(true, true).map((l) => l.id), ['kindle', 'take', 'no']);
  assert.deepEqual(kindleMenu(true).map((l) => l.id), ['kindle', 'no']);
  assert.equal(kindleMenu(false, true)[0].dim, true);
  const menu = kindleMenu(true, true), hits = new Set();
  for (let x = 0; x < 272; x++) { const at = askCardAt(x, 160 + 36 - 12 - 6, 272, 320, ...TAKE_ASKS.ownAshes, menu); if (at?.line !== undefined) hits.add(at.line); }
  assert.deepEqual([...hits].sort(), [0, 1, 2]);
});

test('set down, lit, sat by and fed, it stays your own', () => {
  let s = set();
  assert.equal(tileAt(s.room, 3, 2).id, 'ownAshes');
  s = kindle(s, 3, 2); assert.equal(tileAt(s.room, 3, 2).id, 'ownEmbers');
  s = stoke({ ...s, bag: [{ id: 'wood', n: 1 }] }, 3, 2); assert.equal(tileAt(s.room, 3, 2).id, 'ownCampfire');
  s = sit({ ...s, health: 1 }, 3, 2); assert.equal(tileAt(s.room, 3, 2).id, 'ownEmbers');
});

test('Take up puts the Campfire back in the bag whole, a turn; with one carried, free', () => {
  const s = set(), up = takeDown(s, 3, 2);
  assert.deepEqual(up.bag, [{ id: 'bagCampfire', n: 1 }]);
  assert.equal(tileAt(up.room, 3, 2).id, 'floor');
  assert.equal(up.turn, s.turn + 1);
  assert.equal(shownLine(up).text, 'You take up the stones.');
  const full = takeDown({ ...s, bag: [{ id: 'bagCampfire', n: 1 }] }, 3, 2);
  assert.equal(shownLine(full).text, 'You already carry a campfire.');
  assert.equal(full.turn, s.turn); assert.equal(tileAt(full.room, 3, 2).id, 'ownAshes');
});
