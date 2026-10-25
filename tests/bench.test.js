// § bench: Set down puts the workbench beside the hero on the side picked, only
// under the sky, on plain floor off the edge with nothing on it, never cutting
// the room in two; a turn, with its line (WB2, D-322)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, SKY, tileAt } from '../src/core/room.js';
import { makeState, setDown, setSides, step, takeDown, panelBeside } from '../src/core/turn.js';
import { shownLine } from '../src/core/lines.js';
import { get } from '../src/core/registry.js';

// A small woods room under the sky, the hero at 2,2 and a tree at 4,1
const WOODS = ['TTTTTT', 'T...TT', 'T....T', 'T....T', 'TTTTTT'];
const outside = (map = WOODS, items = []) => ({ ...makeState(makeRoom(map, SKY, 'woods'), { x: 2, y: 2 }, [], [], items), bag: [{ id: 'workbench', n: 1 }] });

test('it goes down on the side picked, from the bag, passing a turn', () => {
  const n = setDown(outside(), 0, 'right');
  assert.equal(tileAt(n.room, 3, 2).id, 'bench');
  assert.deepEqual(n.bag, []);
  assert.equal(n.turn, 1);
  assert.equal(shownLine(n).text, 'You set down the workbench.');
  assert.ok(n.events.some((e) => e.type === 'set' && e.id === 'bench'));
});

test('set down, it blocks the way and light passes over it', () => {
  const n = setDown(outside(), 0, 'right');
  const bump = step(n, 'right');
  assert.deepEqual(bump.hero, { x: 2, y: 2 });
  assert.equal(bump.turn, n.turn);
  assert.ok(get('bench').solid);
  assert.ok(!get('bench').blocksLight);
});

test('under a roof it stays in the bag: "Only on the surface.", free', () => {
  const s = { ...makeState(makeRoom(FIRST_ROOM)), bag: [{ id: 'workbench', n: 1 }] };
  assert.deepEqual(setSides(s, 0), []);
  const n = setDown(s, 0, 'right');
  assert.equal(n.bag, s.bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, 'Only on the surface.');
});

test('only free floor off the edge, with nothing on it: else "There is no room there.", free', () => {
  // up, left and right are free floor; a stick lies on 2,3, below
  const s = outside(WOODS, [{ id: 'wood', x: 2, y: 3, form: 0 }]);
  assert.deepEqual(setSides(s, 0), ['up', 'left', 'right']);
  const n = setDown(s, 0, 'down');
  assert.equal(n.bag, s.bag);
  assert.equal(n.turn, 0);
  assert.equal(shownLine(n).text, 'There is no room there.');
  // beside a tree, toward it: no room
  assert.ok(!setSides({ ...outside(), hero: { x: 3, y: 1 } }, 0).includes('right'));
});

test('never on the room edge, and never cutting the room in two', () => {
  // A corridor: setting it down in the middle would cut the right end off
  const map = ['TTTTTTT', 'T.....T', 'TTTTTTT'];
  const s = { ...outside(map), hero: { x: 2, y: 1 } };
  assert.deepEqual(setSides(s, 0), ['left']); // 1,1 is a dead end; 3,1 would cut 4,1 and 5,1 off
  const edge = ['TTTTT', '.....', 'TTTTT']; // an opening on each side: 0,1 is on the edge
  const e = { ...outside(edge), hero: { x: 1, y: 1 } };
  assert.ok(!setSides(e, 0).includes('left'));
});

test('a set-down bench frees the bag, so another can be made', () => {
  const n = setDown({ ...outside(), bag: [{ id: 'workbench', n: 1 }, { id: 'wood', n: 3 }] }, 0, 'right');
  assert.deepEqual(n.bag, [{ id: 'wood', n: 3 }]);
});

test('items without `sets` change nothing', () => {
  const s = { ...outside(), bag: [{ id: 'wood', n: 3 }] };
  assert.equal(setDown(s, 0, 'right'), s);
  assert.deepEqual(setSides(s, 0), []);
});

// § take down (WB3, D-323): Deconstruct on the panel puts the bench back in the bag, whole
test('Deconstruct takes it back into the bag, floor where it stood, passing a turn', () => {
  const set = setDown(outside(), 0, 'right');
  assert.deepEqual(panelBeside(set, 'right'), { x: 3, y: 2 });
  assert.equal(panelBeside(set, 'left'), null);
  const n = takeDown(set, 3, 2);
  assert.equal(tileAt(n.room, 3, 2).id, 'floor');
  assert.deepEqual(n.bag, [{ id: 'workbench', n: 1 }]);
  assert.equal(n.turn, set.turn + 1);
  assert.equal(shownLine(n).text, 'You take down the workbench.');
  assert.ok(n.events.some((e) => e.type === 'take' && e.id === 'workbench'));
  assert.equal(panelBeside(n, 'right'), null);
});

test('with a workbench carried, or the bag full, it stays: its line, free', () => {
  const set = setDown(outside(), 0, 'right');
  const carried = takeDown({ ...set, bag: [{ id: 'workbench', n: 1 }] }, 3, 2);
  assert.equal(tileAt(carried.room, 3, 2).id, 'bench');
  assert.equal(carried.turn, set.turn);
  assert.equal(shownLine(carried).text, 'You already carry a workbench.');
  const six = ['flask', 'oilcap', 'heartcap', 'stone', 'wood', 'potion'].map((id) => ({ id, n: 1 }));
  const full = takeDown({ ...set, bag: six }, 3, 2);
  assert.equal(tileAt(full.room, 3, 2).id, 'bench');
  assert.equal(full.bag, six);
  assert.equal(shownLine(full).text, 'Your bag is full.');
});

test('a tile with no panel takes nothing down', () => {
  const s = outside();
  assert.equal(takeDown(s, 4, 1), s);
});
