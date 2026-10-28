// § walk: a tap or held finger walks around walls (src/core/walk.js, D-219, D-406, D-408)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom } from '../src/core/room.js';
import { makeState } from '../src/core/turn.js';
import { wayTo, cameIntoView, stopsWalk } from '../src/core/walk.js';

const room = makeRoom([
  '#######',
  '#..#..#',
  '#..#..#',
  '#.....#',
  '#..>..#',
  '#######',
]);
const all = (s) => ({ ...s, seen: new Uint8Array(s.seen.length).fill(1) });
const at = (x, y, enemies = [], items = []) => all(makeState(room, { x, y }, [], enemies, items));

const tiles = (way) => way.map((t) => `${t.x},${t.y}`).join(' ');

test('the way goes around a wall, each tile of it in order', () => {
  assert.equal(tiles(wayTo(at(1, 1), 4, 1)), '1,2 1,3 2,3 3,3 4,3 4,2 4,1', 'the wall at x 3 blocks the straight way');
  assert.equal(wayTo(at(2, 3), 4, 1)[0].x, 3);
});

test('the way uses only remembered tiles, and goes as far as remembered ground goes', () => {
  const s = makeState(room, { x: 1, y: 1 }), seen = s.seen.slice();
  for (const [x, y] of [[1, 1], [1, 2], [1, 3], [2, 3]]) seen[y * room.cols + x] = 1;
  assert.equal(tiles(wayTo({ ...s, seen }, 2, 3)), '1,2 1,3 2,3');
  assert.equal(tiles(wayTo({ ...s, seen }, 5, 3)), '1,2 1,3 2,3', 'the dark past 2,3 is not walked');
  assert.deepEqual(wayTo({ ...s, seen }, 1, 0), [], 'nothing remembered is nearer than the hero');
});

test('to a wall or a creature it goes beside it; none to the hero\'s own tile or past an enemy filling the gap', () => {
  assert.equal(tiles(wayTo(at(1, 1), 3, 1)), '2,1');
  assert.equal(tiles(wayTo(at(1, 3, [{ id: 'rat', x: 4, y: 3 }]), 4, 3)), '2,3 3,3');
  assert.deepEqual(wayTo(at(1, 1), 1, 1), []);
  const narrow = makeRoom(['#####', '#.#.#', '#...#', '#####']);
  const s = all(makeState(narrow, { x: 1, y: 1 }, [], [{ id: 'rat', x: 2, y: 2 }]));
  assert.deepEqual(wayTo(s, 3, 1), [], 'no tile it can reach is nearer than the hero');
});

test('stairs are walked onto only as the goal', () => {
  assert.equal(tiles(wayTo(at(2, 4), 3, 4)), '3,4');
  assert.equal(wayTo(at(2, 4), 4, 4)[0].y, 3, 'the stairs between are walked around');
});

test('a creature or item coming into view is noticed', () => {
  const s = at(1, 1, [{ id: 'rat', x: 5, y: 4 }], [{ id: 'flask', x: 1, y: 2 }]);
  const dark = { ...s, lit: false, items: [], enemies: [] };
  assert.equal(cameIntoView(s, s), false, 'nothing new');
  assert.equal(cameIntoView(dark, s), true);
});

test('Stop walking: On sight stops for a creature coming into view; When noticed for one more that has noticed the hero (D-407, D-408)', () => {
  const s = at(1, 1, [{ id: 'rat', x: 1, y: 3 }]), none = { ...s, enemies: [] };
  assert.equal(stopsWalk(none, s, 'sight'), true);
  assert.equal(stopsWalk(none, s, 'noticed'), true, 'a rat in the light with a clear line notices the hero');
  assert.equal(stopsWalk(s, s, 'noticed'), false, 'no more have noticed than before');
  const find = at(1, 1, [], [{ id: 'flask', x: 1, y: 2 }]);
  assert.equal(stopsWalk({ ...find, items: [] }, find, 'noticed'), true, 'a find stops it either way');
});

test('a bite stops the walk, whichever Stop walking choice (D-410)', () => {
  const s = at(1, 1, [{ id: 'rat', x: 1, y: 3 }]), bitten = { ...s, events: [{ type: 'bite', id: 'rat', hurt: 1 }] };
  assert.equal(stopsWalk(s, s, 'noticed'), false, 'nothing new, no bite');
  assert.equal(stopsWalk(s, bitten, 'noticed'), true);
  assert.equal(stopsWalk(s, bitten, 'sight'), true);
});
