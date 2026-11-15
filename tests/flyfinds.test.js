// § flyers over finds (B-006, closed): a bat, lampmoth or lure wisp passes over a find lying loose
// on the floor, as every creature steps over one (D-727), and the find stays where it lies.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM } from '../src/core/room.js';
import { makeState, wait, FIRST_START } from '../src/core/turn.js';

const room = makeRoom(FIRST_ROOM);
// The first room, the hero at 5,11 with the lantern lit, a flyer at 5,8 and find `id` at 5,9 between
const at = (foe, id) => ({ ...makeState(room, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies: [{ id: foe, x: 5, y: 8 }], items: [{ id, x: 5, y: 9 }] });

for (const foe of ['bat', 'lampmoth']) {
  for (const id of ['flask', 'oilcap', 'herb', 'stone', 'duskstar']) {
    test(`a ${foe} flies over a ${id} on its way to the lantern, the ${id} left lying`, () => {
      const s = wait(wait(at(foe, id)));
      assert.deepEqual(s.enemies.map(({ x, y }) => [x, y]), [[5, 10]]);
      assert.deepEqual(s.items.map(({ id: i, x, y }) => [i, x, y]), [[id, 5, 9]]);
    });
  }
}
