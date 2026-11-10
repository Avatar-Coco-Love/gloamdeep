// § look words: a material's first look line says "good for making things" once a recipe uses it,
// "for crafting later" only while none does (D-677, Doc E of D-660's list)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALL } from '../src/core/registry.js';
import { LINES } from '../src/core/lines.js';

const used = new Set(ALL.flatMap((e) => [e.craft, e.bench].filter((r) => r && r.of).flatMap((r) => Object.keys(r.of))));
const first = (e) => (e.look && LINES[e.look] ? LINES[e.look].texts[0] : '');

test('a material a recipe uses never says "for crafting later"', () => {
  const stale = ALL.filter((e) => used.has(e.id) && first(e).includes('for crafting later')).map((e) => e.id);
  assert.deepEqual(stale, []);
});

test('"good for making things" only on a material a recipe uses', () => {
  const wrong = ALL.filter((e) => !used.has(e.id) && first(e).includes('good for making things')).map((e) => e.id);
  assert.deepEqual(wrong, []);
  const all = ALL.filter((e) => first(e).endsWith(', good for making things.')).map((e) => e.id).sort();
  assert.deepEqual(all, ['copperOre', 'duskstar', 'gloamWisp', 'mimicHeart', 'mimicLeaf', 'moleFur', 'mothDust', 'ratTail', 'snapcapGill', 'spiderSilk', 'stone', 'tickShell', 'wispGlass']); // Duskstar and Wisp Glass with the Glow Draught (D-791), Tick Shell with Slowburn (D-792), Mimic Leaf with the Mending Draught (D-794)
});
