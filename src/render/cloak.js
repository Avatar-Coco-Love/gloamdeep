// § the look card (D-399, D-517, D-521; were dark pages, P3 to P6): choosing a profile's look,
// a glass card like the name card (D-398) on the title's scene. LOOK in ember at its top; under
// its rule the hero big on a lit floor, the profile's name over it and the open tab's choice
// under it (D-520). Under that four tabs, CLOAK, EYES, TRIM and CLOTHES, as wide as the boxes
// under them (D-523), the open one filled in ember and framed in gold when the arrows are on
// it; then the tab's choices three to a row, each the whole hero 1× in it with its name, the picked one framed in
// gold; sideways the big hero sits at the left of the tabs and boxes. The hero is as big as the card has
// room for, 3× to 6× (D-523). RANDOM and OK are one row of two big buttons across the card's foot
// (D-522, D-523), ember when the arrows are on one; the round cross goes back, as Back did.
// heroIn (sprites.js) comes from frame.js, as the slots card's heroes do, so tests can load this.
import { LOOK_PADS, tabOf } from '../core/looks.js';
import { cardAt, drawCard, drawButton, inCard, onCross, isTall, PAD } from './bag.js';
import { drawText, textWidth, FONT_H } from './font.js';

const GOLD = '#ffd66b', DIM = '#4a4458', CORE = '#efe6cc', GREY = '#9790a4', EMBER = '#f39a3b', K = '#0e0c16';
const BOX_W = 46, BOX_H = 30, GAP = 4, ROW_GAP = 2; // a hero's framed box, the hero 1× and its name (D-520); boxes' spacing
const ZOOM_MIN = 3, ZOOM_MAX = 6; // the big hero's zoom, as big as fits (D-523)
const stageW = (z) => 16 * z + 16, stageH = (z) => 16 * z + 4; // its lit floor at zoom z
const LINE = FONT_H + 2; // a line of text and the gap under it
const RULE = 20; // the card's rule under its heading, from its top
const TAB_H = 11, TAB_GAP = 2, TAB_PAD = 8; // a tab's height, the space between tabs, and its width past its name
const TABS_H = TAB_H + 3; // the tabs' row with the space under it
const ROW_H = 18, ROW_TEXT = 2, ROW_MAX_W = 80, ROW_SPLIT = 6, ROW_FOOT = 8; // the big buttons: height, letters' size, widest, gap between, inset from the card's foot (D-523)

// § the foot row: RANDOM then OK, two equal buttons across the card's foot, centred (D-523)
export function lookRowAt(vw, vh) {
  const card = cardAt(vw, vh), w = Math.min(ROW_MAX_W, Math.floor((card.w - 2 * PAD - ROW_SPLIT) / 2));
  const x = card.x + Math.floor((card.w - 2 * w - ROW_SPLIT) / 2), y = card.y + card.h - ROW_FOOT - ROW_H;
  return { random: { x, y, w, h: ROW_H }, ok: { x: x + w + ROW_SPLIT, y, w, h: ROW_H } };
}

const ROWS = 2, COLS = 3;
// § layout: the boxes' top left on a view `vw` × `vh`, the tabs over them, and the big hero's
// stage over both upright, or at their left sideways, all in the space above the buttons
// The tabs from x, at y, across `w`: each its name's width, the room left shared out (D-523)
function tabsAt(x, y, w) {
  const tabs = LOOK_PADS.cloak.filter((k) => k.tab), ws = tabs.map((k) => textWidth(tabOf(k.id).name) + TAB_PAD);
  const spare = Math.max(0, w - ws.reduce((a, v) => a + v, 0) - (tabs.length - 1) * TAB_GAP), each = Math.floor(spare / tabs.length);
  return tabs.map((k, i) => {
    const tw = ws[i] + each + (i === tabs.length - 1 ? spare - each * tabs.length : 0), t = { id: k.id, x, y, w: tw, h: TAB_H };
    x += tw + TAB_GAP; return t;
  });
}
function boxesAt(vw, vh) {
  const card = cardAt(vw, vh), w = COLS * BOX_W + (COLS - 1) * GAP, h = ROWS * BOX_H + (ROWS - 1) * ROW_GAP;
  const row = lookRowAt(vw, vh), top = card.y + RULE + 2, room = row.ok.y - 4 - top; // the card stops over the buttons
  const tall = isTall(vw, vh), at = { card, row }, H = TABS_H + h; // the tabs and the boxes under them
  const place = (bx, by) => ({ ...at, x: bx, y: by + TABS_H, tabs: tabsAt(bx, by, w) });
  const standH = (z) => LINE + stageH(z) + LINE; // the name, the hero, the choice's name
  const fits = (z) => (tall ? stageW(z) <= card.w - 2 * PAD && standH(z) + 2 + H <= room : stageW(z) + 12 + w <= card.w - 2 * PAD && standH(z) <= room);
  let z = ZOOM_MAX; while (z > ZOOM_MIN && !fits(z)) z--;
  const sw = stageW(z), sh = standH(z);
  if (tall) {
    const y = top + Math.max(0, Math.floor((room - sh - 2 - H) / 2));
    return { ...place(card.x + Math.floor((card.w - w) / 2), y + sh + 2), stage: { x: card.x + Math.floor((card.w - sw) / 2), y, z } };
  }
  const all = sw + 12 + w, x = card.x + Math.floor((card.w - all) / 2);
  return { ...place(x + sw + 12, top + Math.max(0, Math.floor((room - H) / 2))), stage: { x, y: top + Math.max(0, Math.floor((room - sh) / 2)), z } };
}
const boxAt = (at, k) => ({ x: at.x + k.col * (BOX_W + GAP), y: at.y + (k.row - 1) * (BOX_H + ROW_GAP) });
const within = (x, y, b, pad) => x >= b.x - pad && x < b.x + b.w + pad && y >= b.y - pad && y < b.y + b.h + pad;

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks on the look card open on `tab`:
// { key: i } (a tab, a choice, RANDOM or OK), 'close' (the round cross), or null; outside the card, 'out'
export function lookCardAt(x, y, vw, vh, tab = 'cloak') {
  const pad = LOOK_PADS[tab], at = boxesAt(vw, vh), { card, row } = at;
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  const i = pad.findIndex((k) => {
    if (k.id === 'random' || k.id === 'ok') return within(x, y, row[k.id], ROW_SPLIT / 2); // half the gap each
    if (k.tab) return within(x, y, at.tabs[k.col], TAB_GAP / 2);
    return within(x, y, { ...boxAt(at, k), w: BOX_W, h: BOX_H }, GAP / 2);
  });
  return i >= 0 ? { key: i } : null;
}

// § ground: the crypt floor under each hero, lit by its lantern, `w` × `h`; each size painted
// once (TECH.md)
const grounds = {};
function groundOf(w, h) {
  return (grounds[`${w}x${h}`] ??= paint(w, h));
}
function paint(w, h) {
  const ground = document.createElement('canvas');
  ground.width = w; ground.height = h;
  const c = ground.getContext('2d');
  c.fillStyle = '#3a4050'; c.fillRect(0, 0, w, h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const n = (x * 37 + y * 91 + x * y * 13) % 29; // a fixed speckle, no randomness needed
    if (n === 0) { c.fillStyle = '#454c5e'; c.fillRect(x, y, 1, 1); } else if (n === 7) { c.fillStyle = '#22262f'; c.fillRect(x, y, 1, 1); }
  }
  c.fillStyle = '#22262f'; c.fillRect(0, 13, w, 1); c.fillRect(0, 29, w, 1); c.fillRect(12, 0, 1, 13); c.fillRect(28, 14, 1, 15); c.fillRect(12, 30, 1, h - 30);
  const glow = c.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w * 0.6);
  glow.addColorStop(0, 'rgba(255,214,107,.18)'); glow.addColorStop(1, 'rgba(14,12,22,.4)');
  c.fillStyle = glow; c.fillRect(0, 0, w, h);
  return ground;
}
const frame = (c, x, y, w, h, colour) => {
  c.fillStyle = colour;
  c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1); c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
};

// § draw: the look card on the room's canvas c, `vw` × `vh`. heroIn (sprites.js) draws a hero
// in a look; look: { cloak, eyes, trim, clothes }; tab: the open one; chosen: the key the
// arrows are on; name: the profile's, over the big hero
export function drawLook(c, vw, vh, heroIn, look, tab, chosen, name = '') {
  const pad = LOOK_PADS[tab], { table } = tabOf(tab), wear = (l) => heroIn(l.cloak, l.eyes, l.trim, l.clothes);
  drawCard(c, vw, vh, 'LOOK', 0);
  const at = boxesAt(vw, vh), ground = groundOf(BOX_W - 2, BOX_H - 2);
  c.imageSmoothingEnabled = false;
  pad.forEach((k, i) => {
    if (k.tab) { drawTab(c, at.tabs[k.col], tabOf(k.id).name, k.id === tab, i === chosen); return; }
    if (k.id === 'random' || k.id === 'ok') { const b = at.row[k.id]; drawButton(c, b.x, b.y, k.id.toUpperCase(), i !== chosen, b.w, b.h, ROW_TEXT); return; }
    const { x, y } = boxAt(at, k), picked = k.id === look[tab];
    c.drawImage(ground, x + 1, y + 1);
    drawSmall(c, wear({ ...look, [tab]: k.id }), table[k.id].name, x, y, picked);
    frame(c, x, y, BOX_W, BOX_H, picked ? GOLD : DIM);
  });
  drawStage(c, wear(look), name, table[look[tab]]?.name ?? '', at.stage);
}
// A tab: the open one filled in ember, its name dark; the others framed dim; gold around it when
// the arrows are on it
function drawTab(c, { x, y, w, h }, text, open, arrows) {
  if (open) { c.fillStyle = EMBER; c.fillRect(x, y, w, h); } else { c.fillStyle = K; c.fillRect(x, y, w, h); frame(c, x, y, w, h, DIM); }
  if (arrows) frame(c, x - 1, y - 1, w + 2, h + 2, GOLD);
  drawText(c, text, x + Math.floor((w - textWidth(text)) / 2), y + Math.floor((h - 7) / 2), open ? K : GREY);
}
// Text centred on x, its top at y
const centred = (c, text, x, y, colour) => drawText(c, text, x - Math.floor(textWidth(text) / 2), y, colour);

// A box: the hero 1× on its shadow, its name under it, gold when picked (D-520)
function drawSmall(c, hero, name, x, y, picked) {
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(x + BOX_W / 2 - 6, y + 18, 12, 2);
  c.drawImage(hero, x + BOX_W / 2 - 8, y + 3);
  centred(c, name, x + BOX_W / 2, y + 20, picked ? GOLD : GREY);
}
// The big hero z× on its lit floor, `name` over it and the choice's name under it (D-520, D-523)
function drawStage(c, hero, name, choice, { x, y, z }) {
  const w = stageW(z), h = stageH(z), hx = x + 8, hy = y + LINE + 1;
  if (name) centred(c, name, x + w / 2, y, CORE);
  c.drawImage(groundOf(w, h), x, y + LINE);
  frame(c, x - 1, y + LINE - 1, w + 2, h + 2, DIM);
  c.fillStyle = 'rgba(0,0,0,.35)'; c.fillRect(hx + 4 * z, hy + 15 * z, 8 * z, z + 1); c.fillRect(hx + 5 * z, hy + 16 * z + 1, 6 * z, 2); // its shadow
  c.drawImage(hero, hx, hy, 16 * z, 16 * z);
  centred(c, choice, x + w / 2, y + LINE + h + 2, GOLD);
}
