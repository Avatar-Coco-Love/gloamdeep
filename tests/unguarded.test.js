// § unguarded: about 1 flask in 4 in a made room has no rat by it, from depth 2, each
// flask of a hall rolling alone; its guard goes elsewhere in the dark, picked again
// from the pool (D-725, answers Q-075)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { placeFor, poolAt, creaturesAt, PLACES } from '../src/core/room.js';
import { layoutAt } from '../src/core/region.js';
import { unguardedOf, UNGUARDED_ODDS } from '../src/core/unguarded.js';
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const rooms = function* (depths, seeds = 30) {
  for (let seed = 1; seed <= seeds; seed++) for (const depth of depths) for (const c of layoutAt(seed, depth).cells) yield { seed, depth, c, p: placeFor(c.id, seed) };
};

test('about 1 flask in 4 rolls unguarded, the same each time for a seed', () => {
  assert.equal(UNGUARDED_ODDS, 0.25);
  const rolls = Array.from({ length: 4000 }, (_, i) => unguardedOf(i + 1, 1)[0]);
  const share = rolls.filter(Boolean).length / rolls.length;
  assert.ok(share > 0.22 && share < 0.28, `${share}`);
  assert.deepEqual(unguardedOf(77, 4), unguardedOf(77, 4));
});

test('an unguarded flask has no creature by it; a guarded one keeps its rat', () => {
  let loose = 0, rolled = 0, all = 0;
  for (const { seed, c, p } of rooms([2, 3, 5, 8])) {
    if (p.people.length) continue; // the peddler's ring moves things aside (D-586)
    const fs = p.items.filter((i) => i.id === 'flask' && !i.once), rolls = unguardedOf(c.seed, fs.length);
    fs.forEach((f, i) => {
      all++;
      const by = p.enemies.filter((e) => e.id !== 'flaskMimic' && dist(e, f) <= 2);
      if (!rolls[i]) assert.ok(by.some((e) => e.id === 'rat'), `seed ${seed} ${c.id} flask ${i} lost its rat`);
      else { rolled++; if (!by.length) loose++; } // the guard gone; another creature may still stand near by chance
    });
  }
  assert.ok(rolled / all > 0.2 && rolled / all < 0.3, `${rolled} of ${all}`);
  assert.ok(loose / rolled > 0.55, `${loose} of ${rolled} with nothing by them`);
});

test('the room keeps its count, its pool and two kinds; no marks are left on the creatures', () => {
  for (const { seed, depth, c, p } of rooms([2, 4, 6])) {
    const es = p.enemies.filter((e) => e.id !== 'flaskMimic' && e.id !== 'warden'), at = `seed ${seed} ${c.id}`;
    assert.equal(es.length >= creaturesAt(depth), true, at);
    assert.ok(es.every((e) => poolAt(depth).includes(e.id) && !('guard' in e)), at);
    assert.ok(new Set(es.map((e) => e.id)).size >= 2, at);
    assert.equal(new Set(p.enemies.map((e) => `${e.x},${e.y}`)).size, p.enemies.length, `${at} two on one tile`);
  }
});

test('the hand-made rooms keep their guard', () => {
  for (const id of Object.keys(PLACES)) if (PLACES[id].guard) assert.ok(PLACES[id].enemies.length);
  assert.ok(!('guard' in placeFor('second', 5).enemies[0]));
});
