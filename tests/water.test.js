// § water: a still pool in about 1 grey-rock Cave room in 2, 5 to 9 tiles, solid until
// swimming, light passing over it, never cutting a room in two (D-500)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, makeRoom, tileAt, FIRST_ROOM, withTile } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { get } from '../src/core/registry.js';
import { makeState, step } from '../src/core/turn.js';
import { clearLine } from '../src/core/sight.js';
import { POOL_MIN, POOL_MAX, POOL_CLEAR } from '../src/core/cave.js';
import { markAt } from '../src/core/map.js';

const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const wet = (map) => map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === '~' ? [{ x, y }] : [])));
const rooms = () => SEEDS.flatMap((seed) => [2, 3, 4].flatMap((depth) => layoutAt(seed, depth).cells.map(({ id }) => ({ seed, id, p: placeFor(id, seed) }))));

// Every tile the hero could stand on joins up; a person trapped in rubble stands apart (D-490)
function joined(room, people = []) {
  const open = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (!tileAt(room, x, y).solid && !people.some((p) => p.x === x && p.y === y)) open.push({ x, y });
  const seen = new Set([`${open[0].x},${open[0].y}`]), queue = [open[0]];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy }, k = `${n.x},${n.y}`;
      if (n.x < 0 || n.y < 0 || n.x >= room.cols || n.y >= room.rows || tileAt(room, n.x, n.y).solid || seen.has(k)) continue;
      seen.add(k); queue.push(n);
    }
  }
  return seen.size === open.length;
}

test('about 1 grey-rock room in 2 holds a pool of 5 to 9 tiles', () => {
  const all = rooms(), pooled = all.filter(({ p }) => wet(p.map).length);
  const share = pooled.length / all.length;
  assert.ok(share > 0.35 && share < 0.65, `share ${share}`);
  for (const { p } of pooled) { const n = wet(p.map).length; assert.ok(n >= POOL_MIN && n <= POOL_MAX, `${n} tiles`); }
});

test('a pool keeps off the edge, the stairs and what lies, stands or starts there, and never cuts the room in two', () => {
  for (const { seed, id, p } of rooms()) {
    const room = makeRoom(p.map), things = [p.start, ...p.items, ...p.enemies, ...p.people];
    const stairs = p.map.flatMap((row, y) => [...row].flatMap((ch, x) => (ch === '<' || ch === '>' ? [{ x, y }] : [])));
    for (const w of wet(p.map)) {
      assert.ok(w.x > 0 && w.y > 0 && w.x < room.cols - 1 && w.y < room.rows - 1, `seed ${seed}, ${id}`);
      assert.ok(!things.some((o) => o.x === w.x && o.y === w.y), `seed ${seed}, ${id}`);
      assert.ok(stairs.every((s) => Math.abs(s.x - w.x) + Math.abs(s.y - w.y) >= POOL_CLEAR), `seed ${seed}, ${id}`);
    }
    assert.ok(joined(room, p.people), `seed ${seed}, ${id}`);
  }
});

test('pools are only in the grey rock, and a seed always makes the same one', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const depth of [5, 6, 8]) for (const { id } of layoutAt(seed, depth).cells) assert.equal(wet(placeFor(id, seed).map).length, 0);
  assert.deepEqual(placeFor('depth3', 4127).map, placeFor('depth3', 4127).map);
});

test('water is solid: the hero bumps it and stays, no turn, and light passes over it', () => {
  const entry = get('water');
  assert.equal(entry.kind, 'tile');
  assert.equal(entry.solid, true);
  assert.equal(entry.blocksLight, false);
  // The hero starts at 5,11 in the first room; water on 5,10 is just above.
  const room = withTile(makeRoom(FIRST_ROOM), 5, 10, entry), s = { ...makeState(room), hero: { x: 5, y: 11 } };
  const n = step(s, 'up');
  assert.deepEqual(n.hero, { x: 5, y: 11 });
  assert.equal(n.turn, s.turn);
  assert.ok(clearLine(room, { x: 5, y: 11 }, { x: 5, y: 9 }));
});

test('the map shows a pool as water, not wall, once it is seen (D-502)', () => {
  const { p } = rooms().find((r) => wet(r.p.map).length);
  const room = makeRoom(p.map, undefined, 'rock'), [w] = wet(p.map), seen = new Uint8Array(room.cols * room.rows);
  assert.equal(markAt(room, null, w.x, w.y), 'water');
  assert.equal(markAt(room, seen, w.x, w.y), null);
});
