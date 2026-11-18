// § the arena (the Lampeater, step 1, D-940): depth 8's way ends in a hallway and, straight above
// it, the arena, both empty; the 4 braziers lit sink the sealed door before the stairs down
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { layoutAt } from '../src/core/region.js';
import { placeFor, tileAt, stoneRoom, runeWallAt, vaultAt } from '../src/core/room.js';
import { ARENA_DEPTH, ARENA_DOWN } from '../src/core/arena.js';
import { coolVault } from '../src/core/vault.js';
import { makeWorld, kindle } from '../src/core/turn.js';
import { goToPlace } from '../src/core/stairs.js';
import { UPGRADES, FORMAT } from '../src/core/save.js';
import { rearena } from '../src/core/fixups/refloor.js';

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const count = (map, id) => map.join('').split(get(id).letter).length - 1;
const ends = (seed) => { const { cells } = layoutAt(seed, ARENA_DEPTH); return { cells, arena: cells.find((c) => c.arena), hall: cells.find((c) => c.hall) }; };

test('the pillar and the seal stone: one solid and shadowing, one floor to walk on', () => {
  const p = get('pillar'), s = get('sealStone');
  assert.deepEqual([p.name, p.solid, p.blocksLight], ['Pillar', true, true]);
  assert.deepEqual([s.name, s.solid, s.blocksLight], ['Seal stone', false, false]);
});

test('on depth 8 only: the arena straight above the hallway, at the way\'s end, joined to nothing else', () => {
  for (const seed of SEEDS) {
    const { cells, arena, hall } = ends(seed);
    assert.ok(arena && hall, `seed ${seed}`);
    assert.equal(cells.filter((c) => c.arena).length, 1); assert.equal(cells.filter((c) => c.hall).length, 1);
    assert.ok(arena.down && [arena.w, arena.h, hall.w, hall.h].every((n) => n === 1));
    assert.deepEqual([arena.x, arena.y], [hall.x, hall.y - 1], `seed ${seed}`);
    assert.deepEqual(arena.doors.map((d) => [d.dir, d.to]), [['down', hall.id]], `seed ${seed}`);
    assert.equal(hall.doors.length, 2); assert.ok(hall.doors.some((d) => d.dir === 'up' && d.to === arena.id));
    assert.deepEqual({ x: arena.down.x, y: arena.down.y }, ARENA_DOWN);
    for (const d of [7, 9, 12]) assert.ok(layoutAt(seed, d).cells.every((c) => !c.arena && !c.hall), `seed ${seed} depth ${d}`);
    assert.ok(![stoneRoom(seed, 8), runeWallAt(seed, 8)?.id, vaultAt(seed, 8)].some((id) => id === arena.id || id === hall.id), `seed ${seed}`);
  }
});

test('the arena: the seal hall, the Lampeater and a gloamling beside each brazier in it (D-971), the stairs down behind its sealed door in the old seal', () => {
  for (const seed of SEEDS.slice(0, 20)) {
    const { arena } = ends(seed), p = placeFor(arena.id, seed), at = arena.doors[0].at;
    assert.deepEqual([p.map[0].length, p.map.length], [13, 15]);
    assert.equal(p.map[14][at], '.'); assert.deepEqual(p.start, { x: at, y: 13 });
    assert.deepEqual([p.enemies, p.items, p.people, p.lights], [[{ id: 'lampeater', x: 6, y: 6 }, ...[{ id: 'gloamling', x: 1, y: 5, met: true, ash: { x: 2, y: 5, turn: -1 } }, { id: 'gloamling', x: 11, y: 5, met: true, ash: { x: 10, y: 5, turn: -1 } }, { id: 'gloamling', x: 1, y: 11, met: true, ash: { x: 2, y: 11, turn: -1 } }, { id: 'gloamling', x: 11, y: 11, met: true, ash: { x: 10, y: 11, turn: -1 } }]], [], [], []], `seed ${seed}`); // D-941, D-971
    assert.deepEqual([count(p.map, 'brazier'), count(p.map, 'pillar'), count(p.map, 'sealedDoor'), count(p.map, 'sealStone'), count(p.map, 'stairsDown')], [4, 4, 1, 8, 1]);
    assert.equal(p.map[2][6], '>'); assert.equal(p.map[4][6], get('sealedDoor').letter);
    assert.equal(p.look, 'dungeon');
  }
});

test('the hallway: a road from its way in to the open door into the arena, empty, its braziers where it starts', () => {
  for (const seed of SEEDS) {
    const { hall } = ends(seed), p = placeFor(hall.id, seed), out = hall.doors.find((d) => d.dir === 'up'), into = hall.doors.find((d) => d !== out);
    assert.equal(p.map[0][out.at], get('openDoor').letter, `seed ${seed}`);
    assert.deepEqual([p.enemies, p.items, p.people], [[], [], []]);
    assert.equal(count(p.map, 'brazier'), 2, `seed ${seed} ${into.dir}`); assert.ok(count(p.map, 'pillar') >= 4);
    // the way in reaches the door over open ground, along the seal stones
    const { cols, rows } = p.map.length ? { cols: p.map[0].length, rows: p.map.length } : {};
    const seen = new Set([`${p.start.x},${p.start.y}`]), todo = [p.start];
    while (todo.length) {
      const { x, y } = todo.pop();
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const t = { x: x + dx, y: y + dy };
        if (t.x < 0 || t.y < 0 || t.x >= cols || t.y >= rows || seen.has(`${t.x},${t.y}`) || tileAt({ ...p, cols, rows }, t.x, t.y).solid) continue;
        seen.add(`${t.x},${t.y}`); todo.push(t);
      }
    }
    assert.ok(seen.has(`${out.at},0`), `seed ${seed}`);
    assert.equal(tileAt({ ...p, cols, rows }, p.start.x, p.start.y).id, 'sealStone');
  }
});

test('the 4 braziers lit no longer sink the door (D-953); left sealed, the lit ones go cold again', () => {
  const seed = 3, { arena } = ends(seed);
  let s = { ...goToPlace(makeWorld('first', seed), arena.id), oil: 100 };
  const spots = []; s.room.map.forEach((row, y) => [...row].forEach((ch, x) => ch === get('brazier').letter && spots.push({ x, y })));
  for (const { x, y } of spots.slice(0, 3)) s = kindle(s, x, y);
  assert.equal(tileAt(s.room, 6, 4).id, 'sealedDoor');
  assert.equal(tileAt(coolVault(s.room), spots[0].x, spots[0].y).id, 'brazier');
  s = kindle(s, spots[3].x, spots[3].y);
  assert.equal(tileAt(s.room, 6, 4).id, 'sealedDoor'); // only beating the Lampeater opens it (D-953)
});

test('an older save: every generated room from depth 8 down is made again, once; those above kept', () => {
  assert.ok(FORMAT >= 36); assert.equal(UPGRADES[35], rearena);
  const seed = 5, s3 = goToPlace(makeWorld('first', seed), 'depth3'), s9 = goToPlace(goToPlace(s3, 'depth8'), 'depth9');
  assert.ok(s9.elsewhere.depth3 && s9.elsewhere.depth8);
  const s = rearena(s9);
  assert.equal(s.place, 'depth9');
  assert.ok(s.elsewhere.depth3, 'the floors above kept');
  assert.ok(!s.elsewhere.depth8, 'made again when next walked into');
});
