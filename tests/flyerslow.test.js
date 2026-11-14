// § flyers over low things: the bat, the lampmoth and the lure wisp fly over what stands low (the
// registry's `low`: what the hero built, bushes, fallen branches, rubble, plinths, braziers), never
// trees, rock or walls; one there is struck as on the floor (D-900)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { makeRoom, FIRST_ROOM, withTile } from '../src/core/room.js';
import { makeState, step, wait, FIRST_START } from '../src/core/turn.js';
import { get } from '../src/core/registry.js';
import { TILES } from '../src/core/tiles.js';

// The first room with `a` at 5,9 and `b` at 5,10, the hero at 5,11 just below them
const room = (a, b = a) => withTile(withTile(makeRoom(FIRST_ROOM), 5, 9, get(a)), 5, 10, get(b));
const at = (r, enemies, more = {}) => ({ ...makeState(r, FIRST_START, [], []), hero: { x: 5, y: 11 }, enemies, ...more });
const where = (s) => s.enemies.map(({ x, y }) => [x, y]);

test('the low tiles are the ones D-900 names, every built thing among them, and water', () => {
  const low = Object.values(TILES).filter((t) => t.low).map((t) => t.id).sort();
  const named = ['water', 'branch', 'berryBush', 'bareBush', 'rubble', 'brazier', 'brazierLit', 'plinth', 'plinthEmber', 'plinthBare'];
  const made = Object.values(TILES).filter((t) => t.made).map((t) => t.id);
  assert.deepEqual(low, [...named, ...made].sort());
  for (const id of low) assert.ok(TILES[id].solid, id);
});

test('a bat flies over a bush and a chest to the lantern', () => {
  let s = at(room('berryBush', 'stash'), [{ id: 'bat', x: 5, y: 8 }]);
  s = wait(s); assert.deepEqual(where(s), [[5, 9]]);
  s = wait(s); assert.deepEqual(where(s), [[5, 10]]);
});

test('a lampmoth flies over rubble, a plinth and a brazier', () => {
  for (const id of ['rubble', 'plinth', 'brazierLit']) {
    const s = wait(at(room(id), [{ id: 'lampmoth', x: 5, y: 8 }]));
    assert.deepEqual(where(s), [[5, 9]], id);
  }
});

test('a tree, rock or a wall still stops a flyer', () => {
  for (const id of ['tree', 'outcrop', 'wall', 'deposit', 'lamppost']) {
    const s = wait(at(room(id), [{ id: 'lampmoth', x: 5, y: 8 }]));
    assert.notDeepEqual(where(s), [[5, 9]], id);
  }
});

test('a rat never steps onto a low thing', () => {
  const s = wait(at(room('branch'), [{ id: 'rat', x: 5, y: 8, chasing: true }]));
  assert.notDeepEqual(where(s), [[5, 9]]);
});

test('a flyer over rubble or a workbench is struck by walking into it; the tile stays', () => {
  for (const id of ['rubble', 'bench']) {
    const s = step(at(room(id), [{ id: 'lampmoth', x: 5, y: 10 }]), 'up');
    assert.deepEqual(s.enemies, [], id);
    assert.deepEqual(s.hero, { x: 5, y: 11 }, id);
    assert.equal(s.room.map[10][5], get(id).letter, id);
  }
});
