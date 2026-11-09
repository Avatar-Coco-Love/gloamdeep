// § flyers over water: the bat, the lampmoth and the lure wisp may fly over water; one there is
// struck as on the floor, rod held or not, and its drop lies on dry ground (D-718)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile, tileAt } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';

// The first room with water at 5,9 and 5,10, the hero at 5,11 just below it
const wet = [[5, 9], [5, 10]].reduce((r, [x, y]) => withTile(r, x, y, get('water')), makeRoom(FIRST_ROOM));
const at = (enemies, more = {}) => ({ ...makeState(wet, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('the bat, the lampmoth and the lure wisp fly', () => {
  for (const id of ['bat', 'lampmoth', 'lureWisp']) assert.ok(get(id).flies, id);
});

test('a bat and a lampmoth fly over water to the lantern', () => {
  for (const id of ['bat', 'lampmoth']) {
    let s = at([{ id, x: 5, y: 8 }]);
    s = wait(s); assert.deepEqual(where(s), [[5, 9]], id);
    s = wait(s); assert.deepEqual(where(s), [[5, 10]], id);
  }
});

test('a lure wisp drifts out over water, away from the hero', () => {
  const s = wait(at([{ id: 'lureWisp', x: 5, y: 10 }, { id: 'rat', x: 5, y: 3, asleep: false }], { hero: { x: 5, y: 11 } }));
  assert.equal(tileAt(wet, ...where(s)[0]).id, 'water');
});

test('a rat chasing the hero never steps onto water', () => {
  const s = wait(at([{ id: 'rat', x: 5, y: 8, chasing: true }]));
  assert.notEqual(tileAt(wet, ...where(s)[0]).id, 'water');
});

test('a flyer over water is struck by walking into it, rod held or not, and nothing is cast', () => {
  for (const tool of [undefined, 'rod']) {
    const s = step(at([{ id: 'lampmoth', x: 5, y: 10 }], tool ? { tool } : {}), 'up');
    assert.deepEqual(s.enemies, [], String(tool));
    assert.ok(!s.float, String(tool));
    assert.deepEqual(s.hero, { x: 5, y: 11 });
  }
});

test('a flyer beaten over water leaves its drop on dry ground', () => {
  let dropped = 0;
  for (let seed = 1; seed <= 40; seed++) {
    const s = step(at([{ id: 'lampmoth', x: 5, y: 10 }], { seed }), 'up');
    for (const it of s.items) { dropped++; assert.ok(!tileAt(wet, it.x, it.y).solid, `seed ${seed}`); }
  }
  assert.ok(dropped > 0);
});
