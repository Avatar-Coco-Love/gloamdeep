// § wood: the first wood, sticks lying in the woods (W1, D-314)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { generateWoods } from '../src/core/woods.js';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, makeWorld, step, look, itemAt } from '../src/core/turn.js';
import { spawn } from '../src/core/spawn.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';
import { bagAdd } from '../src/core/bag.js';
import { unpackJourney, packJourney } from '../src/core/save.js';

const SEEDS = Array.from({ length: 300 }, (_, i) => i + 1);
const room = makeRoom(FIRST_ROOM);
// The hero starts at 5,11, so wood on 5,10 is one step up.
const withWood = (s = makeState(room), form = 1) => {
  const n = spawn({ ...s, hero: { x: 5, y: 11 } }, 'wood', 5, 10);
  return { ...n, items: n.items.map((it) => (it.id === 'wood' ? { ...it, form } : it)) };
};
const TAKE = ['You pick up a stick.', 'A dry branch. You keep it.', 'You gather some wood.'];
const LOOK = ['Dry wood, for crafting later.', 'It snaps if you bend it.', 'Good for building.'];

test('wood goes in the bag in stacks of 3, grows back in a day, in 3 looks', () => {
  const wood = get('wood');
  assert.equal(wood.name, 'Wood');
  assert.equal(wood.bag, true);
  assert.equal(wood.forms, 3);
  assert.equal(wood.regrow, 300);
});

test('every woods room holds 3 sticks, on open tiles, off the start, each one of the 3 looks', () => {
  const forms = new Set();
  for (const seed of SEEDS) {
    const w = generateWoods(seed);
    assert.equal(w.items.length, 3, `seed ${seed}`);
    for (const it of w.items) {
      assert.equal(it.id, 'wood');
      assert.equal(w.map[it.y][it.x], '.');
      assert.ok(it.x !== w.start.x || it.y !== w.start.y);
      forms.add(it.form);
    }
    assert.equal(new Set(w.items.map((it) => `${it.x},${it.y}`)).size, 3, 'one a tile');
  }
  assert.deepEqual([...forms].sort(), [0, 1, 2]);
});

test('the sticks leave the seed\'s trees as they were, and the same seed lays the same sticks', () => {
  const a = generateWoods(41), b = generateWoods(41);
  assert.deepEqual(a, b);
});

test('walking onto a stick puts Wood in the bag, in its look, with lines in turn', () => {
  let s = makeState(room);
  const said = [];
  for (let i = 0; i < 4; i++) {
    s = step(withWood({ ...s, bag: [] }), 'up');
    said.push(shownLine(s).text);
  }
  assert.deepEqual(said, [...TAKE, TAKE[0]]);
  assert.deepEqual(s.bag, [{ id: 'wood', n: 1, form: 1 }]);
  assert.equal(itemAt(s, 5, 10), undefined);
});

test('the bag shows the look of the last stick picked', () => {
  assert.deepEqual(bagAdd([{ id: 'wood', n: 1, form: 0 }], 'wood', 2), [{ id: 'wood', n: 2, form: 2 }]);
  assert.deepEqual(bagAdd([], 'flask'), [{ id: 'flask', n: 1 }], 'others have no look');
});

test('over a full stack the stick stays on the floor, with no line', () => {
  const n = step(withWood({ ...makeState(room), bag: [{ id: 'wood', n: 3, form: 0 }] }), 'up');
  assert.deepEqual(n.bag, [{ id: 'wood', n: 3, form: 0 }]);
  assert.equal(itemAt(n, 5, 10).id, 'wood');
  assert.equal(shownLine(n), null);
});

test('choosing Wood in the bag says its look lines in turn, no turn passing', () => {
  let s = { ...makeState(room), bag: [{ id: 'wood', n: 2, form: 0 }] };
  const said = [];
  for (let i = 0; i < 4; i++) { s = look(s, 0); said.push(shownLine(s).text); }
  assert.deepEqual(said, [...LOOK, LOOK[0]]);
  assert.equal(s.turn, 0);
});

test('Wood and its look are kept in the save', () => {
  const s = { ...makeWorld('first', 3), bag: [{ id: 'wood', n: 2, form: 2 }] };
  assert.deepEqual(unpackJourney(packJourney(s)).state.bag, [{ id: 'wood', n: 2, form: 2 }]);
});
