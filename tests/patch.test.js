// § F-9 (D-1003): a chop or dig in the woods repaints only its tiles, not the whole room and border
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { repaintOf } from '../src/render/patch.js';
import { get } from '../src/core/registry.js';

const L = (id) => get(id).letter, TREE = L('tree'), STUMP = L('stump'), WATER = L('water');
const woods = (rows) => ({ cols: rows[0].length, rows: rows.length, map: rows, look: 'woods' });
const ROOM = woods(['TTTTTTTTT', 'T.......T', 'T.......T', 'T...T...T', 'T.......T', 'T.......T', 'TTTTTTTTT'].map((r) => r.replaceAll('T', TREE)));
const set = (room, x, y, ch) => ({ ...room, map: room.map.map((row, j) => (j === y ? row.slice(0, x) + ch + row.slice(x + 1) : row)) });
const at = (room) => ({ room, place: 'woods:2,2', seed: 1 });

test('a tree chopped inside the woods repaints its tile and neighbours only', () => {
  assert.deepEqual(repaintOf(at(ROOM), at(set(ROOM, 4, 3, STUMP))), { x: 3, y: 2, w: 3, h: 3 });
});
test('the same tiles (the first turn\'s day) repaint nothing', () => {
  assert.equal(repaintOf(at(ROOM), at({ ...ROOM, dark: { sky: true } })), 'none');
});
test('a new room, another place, a change by the edge or another look repaint everything', () => {
  assert.equal(repaintOf(null, at(ROOM)), 'all');
  assert.equal(repaintOf(at(ROOM), { ...at(set(ROOM, 4, 3, STUMP)), place: 'woods:2,3' }), 'all');
  assert.equal(repaintOf(at(ROOM), at(set(ROOM, 1, 3, STUMP))), 'all');
  const rock = { ...ROOM, look: 'rock' };
  assert.equal(repaintOf(at(rock), at(set(rock, 4, 3, STUMP))), 'all');
});
test('a change by water repaints the room but keeps its border', () => {
  const pond = set(ROOM, 6, 4, WATER);
  assert.equal(repaintOf(at(pond), at(set(pond, 4, 3, STUMP))), 'room');
});
