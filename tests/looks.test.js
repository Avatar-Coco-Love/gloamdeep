// § looks: the cloak's colours (P3), the eyes (P4), the trim (P5), the clothes (P6), and the look card with a tab each (D-521)
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CLOAKS, CLOAK_IDS, DEFAULT_CLOAK, cloakOf, EYES, EYE_IDS, DEFAULT_EYES, eyesOf, TRIMS, TRIM_IDS, DEFAULT_TRIM, trimOf, CLOTHES, CLOTHES_IDS, DEFAULT_CLOTHES, clothesOf, LOOK_TABS, LOOK_PADS, moveLook } from '../src/core/looks.js';
import { lookCardAt } from '../src/render/cloak.js';
import { cardAt } from '../src/render/bag.js';
import { CLOAKS as REGISTERED, EYES as REGISTERED_EYES, TRIMS as REGISTERED_TRIMS, CLOTHES as REGISTERED_CLOTHES, get } from '../src/core/registry.js';

test('six cloaks, teal first, each with four shades; the registry has them', () => {
  assert.deepEqual(CLOAK_IDS, ['teal', 'moss', 'heather', 'rust', 'indigo', 'sand']);
  assert.equal(REGISTERED, CLOAKS);
  for (const k of Object.values(CLOAKS)) {
    assert.equal(k.kind, 'cloak');
    assert.equal(k.shades.length, 4, k.id);
    for (const h of k.shades) assert.match(h, /^#[0-9a-f]{6}$/, k.id);
    assert.equal(get(k.id), undefined, k.id); // not a thing in the world, so no clash with one
  }
  assert.deepEqual(CLOAKS.teal.shades, ['#a6e0e4', '#58a8b4', '#2f6a7c', '#1c3e4e']); // the study's
});

test('a profile from before P3, or with an unknown cloak, wears teal', () => {
  assert.equal(DEFAULT_CLOAK, 'teal');
  assert.equal(cloakOf({ look: {} }), 'teal');
  assert.equal(cloakOf({ look: { cloak: 'plaid' } }), 'teal');
  assert.equal(cloakOf(undefined), 'teal');
  assert.equal(cloakOf({ look: { cloak: 'heather' } }), 'heather');
});

test('six eye colours, bone first; the registry has them; none kept out', () => {
  assert.deepEqual(EYE_IDS, ['bone', 'ice', 'moss', 'sky', 'silver', 'brown']);
  assert.equal(REGISTERED_EYES, EYES);
  assert.equal(EYES.bone.colour, '#efe6cc'); // the study's
  for (const e of Object.values(EYES)) {
    assert.equal(e.kind, 'eyes');
    assert.match(e.colour, /^#[0-9a-f]{6}$/, e.id);
    assert.ok(!['#e8786a', '#ffd66b', '#a58ce0', '#0e0c16'].includes(e.colour), e.id); // enemies, lantern, stairs, outline
  }
});

test('a profile from before P4, or with unknown eyes, has bone eyes', () => {
  assert.equal(DEFAULT_EYES, 'bone');
  assert.equal(eyesOf({ look: { cloak: 'rust' } }), 'bone');
  assert.equal(eyesOf({ look: { eyes: 'plaid' } }), 'bone');
  assert.equal(eyesOf(undefined), 'bone');
  assert.equal(eyesOf({ look: { eyes: 'sky' } }), 'sky');
});

test('six trims, brass first, each a cap and a base shade; the registry has them; none kept out', () => {
  assert.deepEqual(TRIM_IDS, ['brass', 'iron', 'copper', 'silver', 'verdigris', 'blackened']);
  assert.equal(REGISTERED_TRIMS, TRIMS);
  assert.deepEqual(TRIMS.brass.shades, ['#e8d5a0', '#a8642c']); // the study's
  for (const t of Object.values(TRIMS)) {
    assert.equal(t.kind, 'trim');
    assert.equal(t.shades.length, 2, t.id);
    for (const s of t.shades) {
      assert.match(s, /^#[0-9a-f]{6}$/, t.id);
      assert.ok(!['#e8786a', '#ffd66b', '#f39a3b', '#a58ce0', '#0e0c16'].includes(s), t.id); // enemies, flame, stairs, outline
    }
  }
});

test('a profile from before P5, or with an unknown trim, has brass', () => {
  assert.equal(DEFAULT_TRIM, 'brass');
  assert.equal(trimOf({ look: { cloak: 'rust', eyes: 'sky' } }), 'brass');
  assert.equal(trimOf({ look: { trim: 'gold' } }), 'brass');
  assert.equal(trimOf(undefined), 'brass');
  assert.equal(trimOf({ look: { trim: 'verdigris' } }), 'verdigris');
});

test('four clothes, the cloak first; the registry has them', () => {
  assert.deepEqual(CLOTHES_IDS, ['cloak', 'belted', 'short', 'tattered']);
  assert.equal(REGISTERED_CLOTHES, CLOTHES);
  for (const k of Object.values(CLOTHES)) assert.equal(k.kind, 'clothes');
  assert.deepEqual(CLOTHES_IDS.map((id) => CLOTHES[id].name), ['Cloak', 'Belted', 'Short', 'Tattered']);
});

test('a profile from before P6, or with unknown clothes, wears the cloak', () => {
  assert.equal(DEFAULT_CLOTHES, 'cloak');
  assert.equal(clothesOf({ look: { cloak: 'rust', eyes: 'sky', trim: 'iron' } }), 'cloak');
  assert.equal(clothesOf({ look: { clothes: 'armour' } }), 'cloak');
  assert.equal(clothesOf(undefined), 'cloak');
  assert.equal(clothesOf({ look: { clothes: 'tattered' } }), 'tattered');
});

// § the look card (D-521)
const keyOf = (tab, id) => LOOK_PADS[tab].findIndex((k) => !k.tab && k.id === id);
const tabKey = (tab) => LOOK_PADS.cloak.findIndex((k) => k.tab && k.id === tab);
test('the look card: four tabs first on every pad, then the choices three to a row, then OK', () => {
  assert.deepEqual(LOOK_TABS.map((t) => t.id), ['cloak', 'eyes', 'trim', 'clothes']);
  for (const t of LOOK_TABS) {
    const pad = LOOK_PADS[t.id];
    assert.deepEqual(pad.slice(0, 4).map((k) => [k.id, k.tab, k.row, k.col]), LOOK_TABS.map((u, col) => [u.id, true, 0, col]), t.id);
    assert.deepEqual(pad.filter((k) => !k.tab && k.id !== 'ok').map((k) => k.id), t.ids, t.id);
    assert.equal(pad[pad.length - 1].id, 'ok');
  }
  assert.deepEqual(LOOK_PADS.clothes.slice(4).map(({ row, col }) => [row, col]), [[1, 0], [1, 1], [1, 2], [2, 0], [3, 0]]);
});

test('the arrows walk the look card: Up from a choice to the open tab, Down from a tab to the pick', () => {
  assert.equal(moveLook('cloak', keyOf('cloak', 'teal'), 'right'), keyOf('cloak', 'moss'));
  assert.equal(moveLook('cloak', keyOf('cloak', 'heather'), 'right'), keyOf('cloak', 'heather')); // the row's end
  assert.equal(moveLook('cloak', keyOf('cloak', 'moss'), 'down'), keyOf('cloak', 'indigo'));
  assert.equal(moveLook('cloak', keyOf('cloak', 'indigo'), 'down'), keyOf('cloak', 'ok'));
  assert.equal(moveLook('cloak', keyOf('cloak', 'ok'), 'down'), keyOf('cloak', 'ok')); // no Back: the cross goes back (D-399)
  assert.equal(moveLook('cloak', keyOf('cloak', 'ok'), 'up'), keyOf('cloak', 'rust'));
  assert.equal(moveLook('eyes', keyOf('eyes', 'silver'), 'up'), keyOf('eyes', 'ice'));
  assert.equal(moveLook('eyes', keyOf('eyes', 'bone'), 'up'), tabKey('eyes')); // the open tab, not CLOAK above it
  assert.equal(moveLook('trim', keyOf('trim', 'brass'), 'up'), tabKey('trim'));
  assert.equal(moveLook('eyes', tabKey('eyes'), 'down', 'moss'), keyOf('eyes', 'moss')); // the picked choice
  assert.equal(moveLook('eyes', tabKey('eyes'), 'right'), tabKey('trim'));
  assert.equal(moveLook('clothes', tabKey('clothes'), 'right'), tabKey('clothes')); // the row's end
  assert.equal(moveLook('cloak', tabKey('cloak'), 'up'), tabKey('cloak'));
  assert.equal(moveLook('clothes', keyOf('clothes', 'belted'), 'down'), keyOf('clothes', 'tattered'));
  assert.equal(moveLook('clothes', keyOf('clothes', 'tattered'), 'down'), keyOf('clothes', 'ok'));
});

test('a tap on the look card picks a tab, a choice, OK, the cross, or nothing; outside it is out', () => {
  const vw = 195, vh = 422, card = cardAt(vw, vh), { button, close } = card;
  assert.equal(lookCardAt(2, 2, vw, vh), 'out');
  assert.equal(lookCardAt(close.x, close.y, vw, vh), 'close');
  for (const tab of ['cloak', 'clothes']) assert.deepEqual(lookCardAt(button.x + 2, button.y + 2, vw, vh, tab), { key: keyOf(tab, 'ok') });
  const tabsY = card.y + 20 + 7, hit = (x, y, tab = 'cloak') => lookCardAt(x, y, vw, vh, tab)?.key;
  const across = []; for (let x = card.x; x < card.x + card.w; x++) { const k = hit(x, tabsY); if (k !== undefined && !across.includes(k)) across.push(k); }
  assert.deepEqual(across, [0, 1, 2, 3]); // the four tabs left to right
  assert.equal(lookCardAt(card.x + 3, tabsY + 40, vw, vh), null); // the glass beside the big hero
});

test('the look card fits: the tabs, the big hero, then both rows clear of OK upright; the hero at their left sideways', () => {
  const column = (x, vw, vh, tab) => { const hits = []; for (let y = 0; y < vh; y++) { const h = lookCardAt(x, y, vw, vh, tab); if (h?.key !== undefined) hits.push([y, LOOK_PADS[tab][h.key]]); } return hits; };
  for (const [vw, vh] of [[195, 422], [176, 221]]) { // a phone upright, and the smallest upright view
    const mid = Math.floor(vw / 2), { y, button } = cardAt(vw, vh);
    for (const tab of ['cloak', 'eyes', 'trim', 'clothes']) {
      const hits = column(mid, vw, vh, tab), tabs = hits.filter(([, k]) => k.tab), boxes = hits.filter(([, k]) => !k.tab && k.id !== 'ok');
      assert.ok(tabs.length && tabs[tabs.length - 1][0] < y + 40, `${vw}x${vh} ${tab}: the tabs under the rule`);
      assert.ok(boxes[0][0] > tabs[tabs.length - 1][0] + 70, `${vw}x${vh} ${tab}: the big hero's room above the boxes`);
      assert.ok(boxes[boxes.length - 1][0] < button.y - 2, `${vw}x${vh} ${tab}: the boxes clear of OK`);
    }
  }
  const vw = 420, vh = 221, card = cardAt(vw, vh);
  assert.ok(column(Math.floor(vw / 2) + 20, vw, vh, 'cloak').some(([, k]) => !k.tab && k.id !== 'ok'));
  assert.equal(column(card.x + 60, vw, vh, 'cloak').filter(([, k]) => !k.tab).length, 0); // the big hero at their left
});
