// § vault (L1, D-891, D-892): from depth 2, one one-cell dead end a floor is a vault: 2 cold
// braziers and a sealed door in the wall before a small vault, turned away from its opening, drawn
// in the crypt's bricks, nothing else in it; its two layouts checked by hand
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { get } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';
import { layoutAt } from '../src/core/region.js';
import { placeFor, vaultAt, peddlerRoom, locketRoom, stoneRoom, PEDDLER_DEPTH, LOCKET_DEPTH, makeRoom, tileAt } from '../src/core/room.js';
import { vaultLayout, VAULT_FROM } from '../src/core/vault.js';
import { steps } from '../src/core/cache.js';

const count = (map, ch) => map.join('').split(ch).length - 1;

test('the Brazier and the Sealed door: solid, the brazier letting light pass, the door not; each says its words', () => {
  const b = get('brazier'), d = get('sealedDoor');
  assert.equal(b.name, 'Brazier'); assert.equal(d.name, 'Sealed door');
  assert.ok(b.solid && !b.blocksLight); assert.ok(d.solid && d.blocksLight);
  assert.deepEqual(LINES[b.bump].texts, ['A cold stone brazier.', 'Old ash lies in its bowl.']);
  assert.deepEqual(LINES[d.bump].texts, ['A sealed stone door.', 'A flame rune is cut into it.']);
});

test('the two layouts, by hand: the vault above for an opening at the bottom, beside for one at the left', () => {
  assert.deepEqual(vaultLayout(11, 13, { dir: 'down', at: 5 }).map, ['###########', '#.........#', '#.........#', '#.........#',
    '#####k#####', '#.........#', '#.j.....j.#', '#.........#', '#.........#', '#.........#', '#.........#', '#.........#', '#####.#####']);
  assert.deepEqual(vaultLayout(11, 13, { dir: 'left', at: 6 }).map, ['###########', '#.....#...#', '#.....#...#', '#..j..#...#',
    '#.....#...#', '#.....#...#', '......k...#', '#.....#...#', '#.....#...#', '#..j..#...#', '#.....#...#', '#.....#...#', '###########']);
  // the top and right are these turned over; from depth 8 the outer room is bigger, the vault the same
  assert.deepEqual(vaultLayout(11, 13, { dir: 'up', at: 5 }).map, vaultLayout(11, 13, { dir: 'down', at: 5 }).map.slice().reverse());
  assert.deepEqual(vaultLayout(11, 13, { dir: 'right', at: 6 }).map, vaultLayout(11, 13, { dir: 'left', at: 6 }).map.map((r) => [...r].reverse().join('')));
  const big = vaultLayout(13, 15, { dir: 'down', at: 6 });
  assert.deepEqual(big.map.slice(0, 7), ['#############', '#...........#', '#...........#', '#...........#', '######k######', '#...........#', '#.j.......j.#']);
});

test('every facing and size: the gap at the opening, the outer room whole, the vault reached only through the door', () => {
  for (const [cols, rows] of [[11, 13], [13, 15]]) for (const dir of ['up', 'down', 'left', 'right']) {
    const len = dir === 'up' || dir === 'down' ? cols : rows;
    for (let at = 2; at <= len - 3; at++) {
      const v = vaultLayout(cols, rows, { dir, at }), why = `${cols}×${rows} ${dir} ${at}`;
      assert.equal(count(v.map, 'j'), 2, why); assert.equal(count(v.map, 'k'), 1, why);
      assert.equal(v.map[v.start.y][v.start.x], '.', why);
      const outer = steps(v.map, v.start), floor = count(v.map, '.');
      const behind = steps(v.map, v.prize);
      assert.equal(outer.size + behind.size, floor, why); // every floor tile is outside the door or behind it
      assert.ok(!outer.has(`${v.prize.x},${v.prize.y}`), why);
      assert.equal(behind.size, (dir === 'up' || dir === 'down' ? cols - 2 : rows - 2) * 3, why); // the vault, 3 deep
      for (const b of v.braziers) assert.ok([[1, 0], [-1, 0], [0, 1], [0, -1]].every(([dx, dy]) => v.map[b.y + dy][b.x + dx] === '.'), why); // open all round
    }
  }
});

test('one vault a floor from depth 2, in a one-cell dead end, never the peddler\'s, the locket\'s or a waystone\'s room', () => {
  let floors = 0, vaults = 0;
  for (let seed = 1; seed <= 60; seed++) {
    assert.equal(vaultAt(seed, 1), null);
    for (let depth = VAULT_FROM; depth <= 9; depth++) {
      const cells = layoutAt(seed, depth).cells, id = vaultAt(seed, depth), ends = cells.filter((c) => c.end && c.w === 1 && c.h === 1);
      floors++;
      if (!id) { assert.ok(ends.every((c) => [peddlerRoom(seed), locketRoom(seed), stoneRoom(seed, depth)].includes(c.id)), `${seed} ${depth}`); continue; }
      vaults++;
      assert.ok(ends.some((c) => c.id === id));
      if (depth === PEDDLER_DEPTH) assert.notEqual(id, peddlerRoom(seed));
      if (depth === LOCKET_DEPTH) assert.notEqual(id, locketRoom(seed));
      assert.notEqual(id, stoneRoom(seed, depth));
    }
  }
  assert.ok(vaults / floors > 0.8, `${vaults} of ${floors}`);
});

test('the vault room: its cell\'s size, the crypt\'s look, the gap at its opening, nothing else in it', () => {
  for (let seed = 1; seed <= 30; seed++) for (const depth of [2, 5, 8]) {
    const id = vaultAt(seed, depth);
    if (!id) continue;
    const c = layoutAt(seed, depth).cells.find((x) => x.id === id), p = placeFor(id, seed), room = makeRoom(p.map, undefined, p.look), d = c.doors[0];
    assert.deepEqual([p.map[0].length, p.map.length], [c.cols, c.rows]);
    assert.equal(p.look, 'crypt');
    assert.deepEqual([p.items, p.enemies, p.people, p.lights], [[], [], [], []]);
    const edge = { up: [d.at, 0], down: [d.at, c.rows - 1], left: [0, d.at], right: [c.cols - 1, d.at] }[d.dir];
    assert.equal(tileAt(room, ...edge).id, 'floor', `${seed} ${id}`);
    assert.deepEqual(placeFor(id, seed), p); // the same each time, from the seed
  }
});
