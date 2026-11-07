// § stand-ins, part of the sweep (D-585): split from standin.test.js at the tenth audit,
// so the three files run side by side; the same check, depths 12 to 15
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { layoutAt } from '../src/core/region.js';
import { placeFor } from '../src/core/room.js';

const count = (map, ch) => map.join('').split(ch).length - 1;
const fits = (seed, c) => {
  const p = placeFor(c.id, seed);
  return p.map.length === c.rows && p.map[0].length === c.cols && count(p.map, '<') === (c.up ? 1 : 0) && count(p.map, '>') === (c.down ? 1 : 0);
};

test('no dungeon room falls back, seeds 1 to 300, depths 12 to 15', () => {
  for (let depth = 12; depth <= 15; depth++) for (let seed = 1; seed <= 300; seed++) {
    for (const c of layoutAt(seed, depth).cells) assert.ok(fits(seed, c), `depth ${depth} seed ${seed} ${c.id}`);
  }
});
