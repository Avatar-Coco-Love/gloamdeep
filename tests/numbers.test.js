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

test('the Make tab, workbench and mortar cards draw the rows under the costs (look A)', async () => {
  const { drawMakeWords } = await import('../src/render/benchpanel.js');
  const rules = (id, cost) => {
    const rects = [], c = { fillStyle: '', fillRect: (x, y, w) => rects.push({ y, w, s: c.fillStyle }), drawImage: () => {} };
    drawMakeWords(c, { cost }, ITEMS[id], 0, 0, 200, () => ({}), {}, 200);
    return rects.filter((r) => r.s === 'rgba(239,230,204,.16)' && r.w === 200).map((r) => r.y);
  };
  const [y] = rules('flask', [{ id: 'oilcap', n: 3, have: 5 }, { id: 'herb', n: 1, have: 0 }]);
  assert.ok(y > 12 + 2 * 18, `the rule under the rows is below both costs: ${y}`);
  assert.deepEqual(rules('workbench', [{ id: 'wood', n: 5, have: 5 }]), []);
});

test("the peddler's card shows the rows, but for Sells for, his own line saying it", async () => {
  const { tradeNumbers } = await import('../src/render/tradepanel.js');
  const of = (id) => tradeNumbers(id).map((r) => `${r.label} ${r.value}`.trim());
  assert.deepEqual(of('flask'), ['Fills the lantern 45%']);
  assert.deepEqual(of('pondMinnow'), ['Heals 1 heart', 'Fills the lantern 15%']);
  assert.ok(Object.values(ITEMS).every((e) => tradeNumbers(e.id).every((r) => r.icon !== 'coin')));
});
