// Past a small room's edge its rock or trees go on, a passage straight out from each doorway (D-403)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { widen } from '../src/core/openings.js';
import { makeRoom, tileAt, isWall } from '../src/core/room.js';

const ROOM = ['#.#', '#..', '###'];

test('past the edge is rock, but straight out from a doorway', () => {
  const wide = widen(makeRoom(ROOM), [{ x: 1, y: 0, dir: 'up' }, { x: 2, y: 1, dir: 'right' }]);
  for (const y of [-1, -5]) assert.equal(tileAt(wide, 1, y).id, 'floor');
  for (const x of [3, 9]) assert.equal(tileAt(wide, x, 1).id, 'floor');
  assert.ok(isWall(wide, 0, -1) && isWall(wide, 2, -1) && isWall(wide, 3, 0) && isWall(wide, 1, 3) && isWall(wide, -1, 1));
});

test('the room itself is unchanged, and only the widened copy goes on', () => {
  const room = makeRoom(ROOM), wide = widen(room, [{ x: 1, y: 0, dir: 'up' }]);
  for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) assert.equal(tileAt(wide, x, y).id, tileAt(room, x, y).id);
  assert.equal(tileAt(room, 1, -1).id, 'wall');
});

test('past the woods edge, trees go on', () => {
  const woods = { ...makeRoom(['T.T', 'T.T']), look: 'woods' };
  const wide = widen(woods, [{ x: 1, y: 1, dir: 'down' }]);
  assert.equal(tileAt(wide, -1, 0).id, 'tree');
  assert.equal(tileAt(wide, 1, 4).id, 'floor');
});

test('no passage behind the cave mouth', () => {
  const woods = { ...makeRoom(['M..', 'T.T']), look: 'woods' };
  assert.equal(tileAt(widen(woods, [{ x: 0, y: 0, dir: 'left' }]), -1, 0).id, 'tree');
});

// § outside: past the crypt's doorway out, the woods room itself, as it is now (D-438)
import { outside, doorways } from '../src/core/openings.js';
import { mouthOf } from '../src/core/mouth.js';
import { makeWorld } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { withTile, letterAt } from '../src/core/room.js';
import { get } from '../src/core/registry.js';
import { seenCells, CELL } from '../src/core/light.js';

const OUT = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const inCrypt = (seed) => { const m = mouthOf(seed), s = makeWorld('first', seed); return m.room === 'first' ? s : goToPlace(s, m.room); };

test('past the doorway out, the woods lie with their cave mouth just past it', () => {
  for (let seed = 1; seed <= 60; seed++) {
    const m = mouthOf(seed), s = inCrypt(seed), past = outside(s), wide = widen(s.room, doorways(s.place, s.room, seed), past);
    const [dx, dy] = OUT[past.dir], woods = past.there.room;
    assert.equal(tileAt(wide, m.gap.x + dx, m.gap.y + dy).id, 'caveMouth');
    for (let y = 0; y < woods.rows; y++) for (let x = 0; x < woods.cols; x++) assert.equal(letterAt(wide, x + past.x, y + past.y), woods.map[y][x]);
    const [ex, ey] = { up: [0, -woods.rows - 2], down: [0, woods.rows + 2], left: [-woods.cols - 2, 0], right: [woods.cols + 2, 0] }[past.dir];
    assert.equal(tileAt(wide, m.gap.x + ex, m.gap.y + ey).id, 'tree'); // past the woods' own edge, trees go on
  }
});

test('only the room with the doorway out shows the woods, and the other sides keep their brick', () => {
  const seed = 2, m = mouthOf(seed), s = inCrypt(seed), past = outside(s), wide = widen(s.room, [], past);
  const [dx, dy] = OUT[past.dir];
  assert.equal(tileAt(wide, m.gap.x - dx * (s.room.cols + 2), m.gap.y - dy * (s.room.rows + 2)).id, 'wall'); // the far side
  assert.equal(outside(goToPlace(s, 'woods')), null);
  assert.equal(outside(goToPlace(s, m.room === 'first' ? 'second' : 'first')), null);
});

test('the woods past the doorway are as play left them: a felled tree is a stump there', () => {
  const seed = 2, s = inCrypt(seed), w = goToPlace(s, 'woods'), woods = w.room;
  let at = null;
  for (let y = 0; y < woods.rows && !at; y++) for (let x = 0; x < woods.cols && !at; x++) if (tileAt(woods, x, y).id === 'tree') at = { x, y };
  const back = goToPlace({ ...w, room: withTile(woods, at.x, at.y, get('stump')) }, s.place), past = outside(back);
  assert.equal(tileAt(widen(back.room, [], past), at.x + past.x, at.y + past.y).id, 'stump');
  assert.equal(outside(s).there, outside(s).there); // never visited: the woods as they begin, made once
});

test('a light in the crypt reaches the woods only out through the doorway', () => {
  const seed = 2, m = mouthOf(seed), s = inCrypt(seed), past = outside(s), seen = widen(s.room, [], past).past.seenFrom;
  const [dx, dy] = OUT[past.dir], T = 16;
  const lx = (m.gap.x - dx) * T + 8, ly = (m.gap.y - dy) * T + 8; // a light a tile inside the doorway
  const cells = seenCells(seen, lx - past.x * T, ly - past.y * T, 6 * T, new Uint8Array(seen.cols * seen.rows * 16));
  const cell = (tx, ty) => cells[(((ty - past.y) * T + 8) / CELL | 0) * (seen.cols * 4) + (((tx - past.x) * T + 8) / CELL | 0)];
  const mx = m.gap.x + dx, my = m.gap.y + dy;
  assert.equal(cell(mx, my), 1); // the cave mouth, just past the doorway
  assert.equal(cell(mx + dx + dy * 3, my + dy + dx * 3), 0); // behind the crypt's wall, beside the doorway
});
