// § sized: halls and large rooms hold twice and four times a one-cell room's finds and creatures, a set a cell (D-651)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, creaturesAt, poolAt, locketRoom, LOCKET_DEPTH } from '../src/core/room.js';
import { layoutAt, sizeAt } from '../src/core/region.js';

const plain = (p) => p.items.filter((i) => !i.once); // the dead end's cache aside (D-650)
const of = (list, id) => list.filter((i) => i.id === id);

test('a hall holds 2 flasks, herbs and oilcaps, a large room 4; their creatures twice and four times', () => {
  let halls = 0, larges = 0;
  for (let seed = 1; seed <= 25; seed++) for (const depth of [2, 4, 5, 7, 8, 9]) for (const c of layoutAt(seed, depth).cells) {
    const n = c.w * c.h, p = placeFor(c.id, seed), at = `seed ${seed} ${c.id}`;
    if (n === 2) halls++; if (n === 4) larges++;
    for (const id of ['flask', 'herb', 'oilcap']) assert.equal(of(plain(p), id).length, n, `${at} ${id}`);
    assert.ok(of(plain(p), 'heartcap').length <= n, at);
    assert.equal(p.enemies.filter((e) => e.id !== 'flaskMimic').length, creaturesAt(depth) * n + (depth === LOCKET_DEPTH && c.id === locketRoom(seed) ? 1 : 0), at); // the locket's rat as well (D-691)
    assert.ok(p.enemies.every((e) => e.id === 'flaskMimic' || poolAt(depth).includes(e.id)), at);
    const spots = [p.start, ...p.items, ...p.enemies, ...p.people].map(({ x, y }) => `${x},${y}`);
    assert.equal(new Set(spots).size, spots.length, `${at} two on one tile`);
    for (const t of [...p.items, ...p.enemies]) assert.equal(p.map[t.y][t.x], t.id === 'flaskMimic' ? p.map[t.y][t.x] : '.', `${at} not on floor`);
  }
  assert.ok(halls > 100 && larges > 20, `${halls} halls, ${larges} large rooms`);
});

test('each cell of a hall or large room holds a flask, as a rule', () => {
  let cells = 0, held = 0;
  for (let seed = 1; seed <= 40; seed++) for (const depth of [3, 6, 8]) for (const c of layoutAt(seed, depth).cells) {
    if (c.w * c.h < 2) continue;
    const { cols, rows } = sizeAt(depth), flasks = of(plain(placeFor(c.id, seed)), 'flask');
    const cellOf = (t) => Math.floor(t.x / (cols + 1)) + c.w * Math.floor(t.y / (rows + 1));
    const have = new Set(flasks.map(cellOf));
    cells += c.w * c.h; held += have.size;
  }
  assert.ok(held / cells > 0.95, `${held} of ${cells} cells`);
});

test('a hall\'s extra creatures are a mix: a rat by each extra flask, the rest of the depth\'s kinds', () => {
  const seen = new Set();
  for (let seed = 1; seed <= 30; seed++) for (const c of layoutAt(seed, 6).cells) {
    if (c.w * c.h < 2) continue;
    const p = placeFor(c.id, seed), extra = p.enemies.filter((e) => e.id !== 'flaskMimic').slice(creaturesAt(6));
    extra.forEach((e) => seen.add(e.id));
    for (const f of of(plain(p), 'flask').slice(1)) {
      assert.ok(p.enemies.some((e) => e.id === 'rat' && Math.abs(e.x - f.x) + Math.abs(e.y - f.y) <= 2), `seed ${seed} ${c.id} no rat by a flask`);
    }
  }
  assert.ok(seen.size >= 5, [...seen].join());
});

test('a hall or large room is the same each time it is made', () => {
  const c = layoutAt(3, 8).cells.find((x) => x.w * x.h === 4) || layoutAt(3, 8).cells.find((x) => x.w * x.h === 2);
  assert.deepEqual(placeFor(c.id, 3), placeFor(c.id, 3));
});
