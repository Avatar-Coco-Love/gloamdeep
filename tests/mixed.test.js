// § mixed creatures: 2, 3 or 4 a room, from each depth's pool, at least two
// kinds, the rat by the flask kept a rat (D-534)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, poolAt, creaturesAt } from '../src/core/room.js';
import { generateRoom } from '../src/core/cave.js';
import { layoutAt } from '../src/core/region.js';
const SEEDS = Array.from({ length: 40 }, (_, i) => i + 1);
const DEPTHS = [2, 3, 4, 5, 6, 8, 12];
const kinds = (id, seed) => placeFor(id, seed).enemies.filter((e) => e.id !== 'flaskMimic');

test('the pool: rat, lampmoth, cave spider and snapcap at depth 2, the scorpion, the bat and the herb mimic from 3, the gloamling and the mole from 5, none ever leaving', () => {
  assert.deepEqual(poolAt(2), ['rat', 'lampmoth', 'caveSpider', 'snapcap']); // (D-535, D-543)
  assert.deepEqual(poolAt(3), ['rat', 'lampmoth', 'caveSpider', 'scorpion', 'bat', 'snapcap', 'herbMimic']); // (D-537, D-549)
  assert.deepEqual(poolAt(4), ['rat', 'lampmoth', 'caveSpider', 'scorpion', 'bat', 'snapcap', 'herbMimic']);
  assert.deepEqual(poolAt(5), ['rat', 'lampmoth', 'caveSpider', 'scorpion', 'bat', 'gloamling', 'mole', 'snapcap', 'herbMimic']); // (D-541)
  assert.deepEqual(poolAt(12), poolAt(5));
});

test('every room: its count, all from the pool, at least two kinds, a rat first', () => {
  for (const seed of SEEDS) for (const depth of DEPTHS) for (const c of layoutAt(seed, depth).cells) {
    if (placeFor(c.id, seed).map.length !== 20) continue; // the rare fallback room keeps its one rat
    const es = kinds(c.id, seed), ids = es.map((e) => e.id), at = `seed ${seed} ${c.id}`;
    assert.equal(es.length, creaturesAt(depth), at);
    assert.equal(ids[0], 'rat', at);
    assert.ok(ids.every((id) => poolAt(depth).includes(id)), at);
    assert.ok(new Set(ids).size >= 2, at);
    assert.equal(new Set(es.map((e) => `${e.x},${e.y}`)).size, es.length, `${at} two on one tile`);
  }
});

test('the mix leaves the room and the creatures\' tiles where the seed put them', () => {
  for (const seed of SEEDS.slice(0, 10)) for (const c of layoutAt(seed, 3).cells) {
    const p = placeFor(c.id, seed), plain = generateRoom(c.seed, 'chambers', { ...c, rats: 3, deposits: 3, veins: 1, pool: true });
    assert.deepEqual(p.enemies.filter((e) => e.id !== 'flaskMimic').map(({ x, y }) => [x, y]), plain.enemies.map(({ x, y }) => [x, y]));
  }
});

test('the same seed gives the same mix, and every kind turns up deep down', () => {
  const seen = new Set();
  for (const seed of SEEDS) for (const c of layoutAt(seed, 6).cells) {
    assert.deepEqual(kinds(c.id, seed), kinds(c.id, seed));
    kinds(c.id, seed).forEach((e) => seen.add(e.id));
  }
  assert.deepEqual([...seen].sort(), ['bat', 'caveSpider', 'gloamling', 'herbMimic', 'lampmoth', 'mole', 'rat', 'scorpion', 'snapcap']);
});
