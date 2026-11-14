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

test('the stash chest card draws the rows under the name, ending left of STORE beside it (D-906)', async () => {
  const { chestNumbers } = await import('../src/render/chestpanel.js');
  const rule = (y, st, foot) => {
    const rects = [], c = { fillStyle: '', fillRect: (x, ry, w) => rects.push({ ry, w, s: c.fillStyle }), drawImage: () => {} };
    const next = chestNumbers(c, 'spear', 0, y, 200, st, foot);
    return { next, w: rects.filter((r) => r.s === 'rgba(239,230,204,.16)').map((r) => r.w) };
  };
  assert.deepEqual(rule(0, { x: 160, y: 300 }, 400).w, [200]);
  assert.deepEqual(rule(0, { x: 160, y: 20 }, 400).w, [154]);
  assert.deepEqual(rule(0, { x: 160, y: 20 }, 10), { next: 0, w: [] });
  assert.equal(chestNumbers({}, 'wood', 0, 7, 200, { x: 160, y: 300 }, 400), 7);
});

test("a weapon's hits on the grid: this one and the one held, the lantern's 1 with none (D-907)", async () => {
  const { weaponHits } = await import('../src/core/numbers.js');
  const tiles = (r) => r.tiles.map((t) => (t.knock ? '>' : `-${t.hit}`)).join(' ');
  const of = (id, held) => weaponHits(ITEMS[id], held && ITEMS[held]).map((r) => `${r.label}: ${tiles(r)}`);
  assert.deepEqual(of('spear', 'knife'), ['This one: -2 -1', 'Held now: -2']);
  assert.deepEqual(of('wardenFist', null), ['This one: > -2', 'Held now: -1']);
  assert.deepEqual(of('spear', 'spear'), ['Held now: -2 -1']);
  assert.deepEqual(of('potion', 'knife'), []);
});

test('the picture goes between the rows and their rule, and is left out where it would reach below', async () => {
  const { drawNumbers, numbersH } = await import('../src/render/numbers.js');
  const rows = itemNumbers(ITEMS.spear), c = { fillStyle: '', fillRect: () => {}, drawImage: () => {} };
  let drawnAt = null;
  const h = drawNumbers(c, rows, 0, 0, 200, { h: 50, draw: (y) => { drawnAt = y; } });
  assert.equal(h, numbersH(rows, 200, 50));
  assert.ok(drawnAt >= numbersH(rows, 200) - 4, `under the rows: ${drawnAt}`);
});

test('hearts or oil now and after: the real amounts, a boon counted, what passes the top lost (D-908)', async () => {
  const { refills } = await import('../src/core/numbers.js');
  const hero = (health, oil, boon = null) => ({ health, oil, boon, grown: {} });
  const of = (st, id) => refills(st, ITEMS[id]).map((r) => `${r.kind} ${+r.now.toFixed(2)}>${+r.after.toFixed(2)} lost ${+r.lost.toFixed(2)}`);
  assert.deepEqual(of(hero(2, 0.3), 'herb'), ['hearts 2>4 lost 0']);
  assert.deepEqual(of(hero(3, 0.3), 'potion'), ['hearts 3>5 lost 2']);
  assert.deepEqual(of(hero(5, 0.3), 'herb'), ['hearts 5>5 lost 2']); // full: eating heals nothing
  assert.deepEqual(of(hero(2, 0.3, 'kindHerbs'), 'herb'), ['hearts 2>5 lost 0']);
  assert.deepEqual(of(hero(3, 0.75), 'flask'), ['oil 0.75>1 lost 0.2']);
  assert.deepEqual(of(hero(2, 0.3), 'pondMinnow'), ['hearts 2>3 lost 0', 'oil 0.3>0.45 lost 0']);
  assert.deepEqual(of(hero(2, 0.3), 'knife'), []);
});

test("oil after: a pour's turn burns first, as the real pour does; Quick Pour's flask burns nothing (F-2, D-912)", async () => {
  const { refills } = await import('../src/core/numbers.js');
  const { makeWorld, pour } = await import('../src/core/turn.js');
  const s = { ...makeWorld('first', 5), oil: 0.467, bag: [{ id: 'flask', n: 1 }, { id: 'pondMinnow', n: 1 }] };
  const after = (st, id) => refills(st, ITEMS[id]).find((r) => r.kind === 'oil').after;
  assert.ok(s.lit, 'the lantern burns');
  assert.ok(Math.abs(after(s, 'flask') - pour(s, 0).oil) < 1e-9, 'a flask');
  assert.ok(Math.abs(after(s, 'pondMinnow') - pour(s, 1).oil) < 1e-9, 'a minnow');
  const quick = { ...s, grown: { ...s.grown, quickPour: 1 } };
  assert.ok(Math.abs(after(quick, 'flask') - pour(quick, 0).oil) < 1e-9, 'Quick Pour: no turn');
  assert.ok(Math.abs(after(quick, 'pondMinnow') - pour(quick, 1).oil) < 1e-9, 'Quick Pour: a minnow still takes its turn');
});

test("the hearts-and-oil picture: side by side where they fit, one under the other where they don't", async () => {
  const { refills } = await import('../src/core/numbers.js');
  const { drawRefill, refillH, refillW } = await import('../src/render/refill.js');
  const c = { fillStyle: '', fillRect: () => {}, save: () => {}, restore: () => {}, translate: () => {}, scale: () => {} };
  const rows = refills({ health: 2, oil: 0.3, grown: {} }, ITEMS.pondMinnow);
  assert.ok(refillW(rows, 400) > refillW(rows, 120), 'narrower when stacked');
  assert.ok(refillH(rows, 120) > refillH(rows, 400), 'taller when stacked');
  assert.equal(drawRefill(c, rows, 0, 0, 400), refillH(rows, 400));
  assert.equal(refillH([], 400), 0);
});

test("a draught's turns now and after: its mark's rim, dark with none working, full after (D-909)", async () => {
  const { draughtTurns } = await import('../src/core/numbers.js');
  const { drawSips, sipsH, sipsW } = await import('../src/render/sips.js');
  assert.deepEqual(draughtTurns({ mending: 0 }, ITEMS.mendingDraught), { key: 'mending', now: 0, after: 1 });
  assert.deepEqual(draughtTurns({ glow: 30 }, ITEMS.glowDraught), { key: 'glow', now: 0.5, after: 1 });
  assert.equal(draughtTurns({ slowburn: 15 }, ITEMS.slowburn).now, 0.25);
  for (const id of ['wardDraught', 'spitproofDraught', 'shadeDraught']) assert.ok(sipsH(draughtTurns({}, ITEMS[id])) > 0, id);
  assert.equal(draughtTurns({}, ITEMS.potion), null);
  assert.equal(draughtTurns({}, ITEMS.knife), null);
  const c = { fillStyle: '', globalAlpha: 1, fillRect: () => {}, save: () => {}, restore: () => {}, translate: () => {}, scale: () => {} };
  const sips = draughtTurns({ shade: 20 }, ITEMS.shadeDraught);
  assert.equal(drawSips(c, sips, 0, 0), sipsH(sips));
  assert.ok(sipsW(sips) > 0 && sipsH(null) === 0);
});
