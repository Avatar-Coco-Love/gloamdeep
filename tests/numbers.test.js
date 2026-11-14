// § numbers (D-902): every item's rows on the bag card come from its registry entry
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ITEMS } from '../src/core/items.js';
import { itemNumbers } from '../src/core/numbers.js';

globalThis.document = { createElement: () => ({ getContext: () => ({}) }) };
const { ICON_NAMES } = await import('../src/render/numbers.js');
const words = (id) => itemNumbers(ITEMS[id]).map((r) => `${r.label} ${r.value}`.trim());

test('weapons say how hard they hit, and what else they do', () => {
  assert.deepEqual(words('knife'), ['Hits for 2']);
  assert.deepEqual(words('spear'), ['Hits for 2', 'And the one behind 1']);
  assert.deepEqual(words('wardenFist'), ['Hits for 2', 'Knocks it back 1 tile']);
});

test('healing, oil, draughts and worn things say their numbers', () => {
  assert.deepEqual(words('potion'), ['Heals 4 hearts']);
  assert.deepEqual(words('flask'), ['Fills the lantern 45%']);
  assert.deepEqual(words('pondMinnow'), ['Heals 1 heart', 'Fills the lantern 15%', 'Sells for 1 coin']);
  assert.deepEqual(words('mendingDraught'), ['A heart every 15 turns', 'For 60 turns']);
  assert.deepEqual(words('heartCharm'), ['Full lantern lasts 70 turns']);
  assert.deepEqual(words('copperWick'), ['Full lantern lasts 75 turns']);
  assert.deepEqual(words('ratVest'), ['Bites glance off 1 in 4']);
  assert.deepEqual(words('shadeDraught'), ['Noticed only within 2 steps', 'For 60 turns']);
});

test('things with no numbers have no rows, and every row has a drawn icon', () => {
  assert.deepEqual(words('workbench'), []);
  for (const e of Object.values(ITEMS)) for (const r of itemNumbers(e)) assert.ok(ICON_NAMES.includes(r.icon), `${e.id}: ${r.icon}`);
});
