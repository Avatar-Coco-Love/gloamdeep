// § pick: the Stone Pick, made at the workbench, and the copper vein it breaks,
// one in each Cave room from depth 3 (D-480)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, makeRoom, tileAt, FIRST_ROOM, withTile, VEIN_DEPTH } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { get } from '../src/core/registry.js';
import { makeState, makeAt, step } from '../src/core/turn.js';
import { benchMakes } from '../src/core/menu.js';
import { shownLine } from '../src/core/lines.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const count = (map, ch) => map.join('').split(ch).length - 1;

test('the Stone Pick is the bench\'s second slot: 2 Wood and 3 Stone, dim with too few', () => {
  assert.equal(get('pick').name, 'Stone Pick');
  const [, pick] = benchMakes([{ id: 'wood', n: 2 }, { id: 'stone', n: 3 }]);
  assert.deepEqual(pick, { item: 'pick', cost: [{ id: 'wood', n: 2, have: 2 }, { id: 'stone', n: 3, have: 3 }], dim: false });
  assert.equal(benchMakes([{ id: 'wood', n: 2 }])[1].dim, true);
});

test('Make takes its cost for a pick, a turn; too few or one carried is free', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM)), bag: [{ id: 'wood', n: 3 }, { id: 'stone', n: 3 }] };
  const made = makeAt(s, 'pick');
  assert.deepEqual(made.bag, [{ id: 'wood', n: 1 }]);
  assert.equal(made.tool, 'pick'); // straight into the empty Tool slot (D-552)
  assert.equal(made.turn, s.turn + 1);
  assert.equal(shownLine(made).text, 'You make a stone pick.');
  const short = makeAt({ ...s, bag: [{ id: 'wood', n: 1 }] }, 'pick');
  assert.equal(short.turn, s.turn);
  assert.equal(shownLine(short).text, 'You need 2 Wood and 3 Stone.');
  const again = makeAt({ ...made, bag: [...made.bag, { id: 'wood', n: 2 }, { id: 'stone', n: 3 }] }, 'pick');
  assert.equal(shownLine(again).text, 'You already carry a stone pick.');
});

test('every Cave room from depth 3 has one vein among its 3 boulders; depth 2 has none', () => {
  assert.equal(VEIN_DEPTH, 3);
  for (const seed of SEEDS) for (const depth of [2, 3, 4]) for (const { id } of layoutAt(seed, depth).cells) {
    const { map } = placeFor(id, seed);
    assert.equal(count(map, 'V'), depth >= 3 ? 1 : 0, `seed ${seed}, ${id}`);
    assert.equal(count(map, 'O') + count(map, 'V'), 3);
  }
  for (const depth of [5, 8]) assert.equal(count(placeFor(`depth${depth}`, 1).map, 'V'), 0);
});

// The hero at 5,11 in the first room, a vein just above
const beside = (bag = []) => ({ ...makeState(withTile(makeRoom(FIRST_ROOM), 5, 10, get('vein'))), hero: { x: 5, y: 11 }, bag });

test('without the pick a vein holds, free, with its line', () => {
  const s = step(beside(), 'up');
  assert.equal(s.turn, 0);
  assert.equal(tileAt(s.room, 5, 10).id, 'vein');
  assert.equal(shownLine(s).text, 'Too hard to break by hand.');
});

test('with the pick in the Tool slot, 4 bumps break it for a Copper Ore, a turn each', () => {
  let s = { ...beside([{ id: 'pick', n: 1 }]), tool: 'pick' };
  const said = [];
  for (let i = 0; i < 4; i++) { s = step(s, 'up'); said.push(shownLine(s).text); }
  assert.equal(s.turn, 4);
  assert.deepEqual(said, ['Your pick bites the rock.', 'Chips of rock fly.', 'The vein cracks.', 'The rock gives. You take copper ore.']);
  assert.equal(tileAt(s.room, 5, 10).id, 'floor');
  assert.deepEqual(s.bag, [{ id: 'pick', n: 1 }, { id: 'copperOre', n: 1 }]);
  assert.equal(shownLine(step(beside([{ id: 'pick', n: 1 }]), 'up')).text, 'Too hard to break by hand.'); // only in the bag, it holds (D-552)
  assert.equal(get('copperOre').max, 20);
  assert.ok(s.taken.some((t) => t.id === 'vein'));
});

test('a vein grows back after 1800 turns, slower than a deposit', () => {
  assert.equal(get('vein').regrow, 1800);
  assert.ok(get('vein').regrow > get('deposit').regrow);
});
