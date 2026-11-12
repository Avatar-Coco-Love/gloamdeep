// § bag make: the bag's Make tab (D-787): its recipes from the registry, shown once each
// part has been held, their cost counted from the bag, and MAKE there making one, a turn
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeFrom, wait } from '../src/core/turn.js';
import { setOil } from '../src/core/oil.js';
import { shownLine } from '../src/core/lines.js';
import { BAG_MAKES, bagMakes, makeFor, makesWords, learn, knownOf } from '../src/core/bagmake.js';
import { FORMAT, UPGRADES } from '../src/core/save.js';

const room = makeRoom(FIRST_ROOM);
const carrying = (bag, known = []) => ({ ...setOil(makeState(room), 0.5), bag, known });

test('the recipes are every find that makes something, the two flasks side by side', () => {
  assert.deepEqual(BAG_MAKES.map((m) => m.from), ['oilcap', 'mimicGlass', 'heartcap', 'stone', 'mothDust', 'snapcapGill', 'glowGland', 'gloamberry', 'wood', 'bagCampfire']);
  assert.deepEqual(BAG_MAKES.map((m) => m.into), ['flask', 'flask', 'potion', 'mortar', 'bagTorch', 'antidote', 'glowLamp', 'gloamberrySeed', 'workbench', 'bagCampfire']);
});

test('a recipe shows once each of its parts has been held, and stays after', () => {
  assert.deepEqual(bagMakes(carrying([])), []);
  assert.deepEqual(bagMakes(carrying([{ id: 'mimicGlass', n: 1 }])).map((m) => m.from), [], 'the oilcap never held');
  const shown = bagMakes(carrying([{ id: 'mimicGlass', n: 1 }], ['oilcap']));
  assert.deepEqual(shown.map((m) => m.from), ['oilcap', 'mimicGlass']);
  assert.deepEqual(shown[0], { from: 'oilcap', item: 'flask', cost: [{ id: 'oilcap', n: 3, have: 0 }], dim: true });
});

test('its cost is counted from the whole bag', () => {
  const [m] = bagMakes(carrying([{ id: 'oilcap', n: 2 }, { id: 'stone', n: 1 }, { id: 'oilcap', n: 1 }]));
  assert.equal(m.cost[0].have, 3);
  assert.equal(m.dim, false);
});

test('MAKE on the Make tab makes it, a turn, with its line', () => {
  const n = makeFrom(carrying([{ id: 'oilcap', n: 2 }, { id: 'oilcap', n: 1 }]), 'oilcap');
  assert.deepEqual(n.bag, [{ id: 'flask', n: 1 }]);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You make an oil flask.');
  const s = carrying([{ id: 'oilcap', n: 2 }]);
  assert.equal(makeFrom(s, 'oilcap'), s, 'too few: nothing');
});

test("a find's MAKE picks its own recipe, else the first it is in", () => {
  const s = carrying([{ id: 'wood', n: 3 }, { id: 'mothDust', n: 1 }, { id: 'herb', n: 1 }], ['snapcapGill']);
  const makes = bagMakes(s).map((m) => m.from);
  assert.equal(makes[makeFor(s, 'wood')], 'wood');
  assert.equal(makes[makeFor(s, 'herb')], 'snapcapGill');
  assert.equal(makeFor(s, 'stone'), -1);
  assert.equal(makesWords('flask'), 'Makes an Oil Flask');
  assert.equal(makesWords('workbench'), 'Makes a Workbench');
});

test('a turn adds the bag\'s finds to the known, once', () => {
  const s = carrying([{ id: 'oilcap', n: 1 }]);
  const n = wait(s);
  assert.deepEqual(n.known, ['oilcap']);
  assert.equal(learn(n), n);
  assert.ok(knownOf({ known: ['wood'], bag: [{ id: 'stone', n: 1 }] }).has('stone'));
});

test('an older save knows what is in its bag and chests now (D-266)', () => {
  assert.ok(FORMAT >= 30);
  const old = { bag: [{ id: 'oilcap', n: 2 }, { id: 'wood', n: 1 }], stashes: { a: [{ id: 'stone', n: 4 }, { id: 'oilcap', n: 1 }] } };
  assert.deepEqual(UPGRADES[29](old).known, ['oilcap', 'wood', 'stone']);
});
