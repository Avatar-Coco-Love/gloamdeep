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
