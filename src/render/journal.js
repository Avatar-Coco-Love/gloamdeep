// § journal card (D-391; after the how to play card, D-390): the Journal (D-262, D-270) opens
// as a glass card as the bag's (D-385), from the pause card on the room and from the title on
// its scene alike, "JOURNAL" at its top and the round cross that goes back. Under the heading
// its tabs, Records and Growth (D-293), the open one gold with the menus' flame (D-181) and
// underlined. Records' rows are each name grey on the left and its value light in a column on
// the right. Growth is a tree (D-481, look D of the step 8 mock-up): an ember glowing at the
// root, a trunk splitting into three limbs, each climbing through its branch's places, row 0 at
// the bottom; the picked place outlined gold, and what it says on the right, past a line, with
// its button in the bottom right corner, as Make on the bag's card. The Bestiary (D-630) is a
// table of the creatures met: each one's drawing and name, its met and beaten counts in two
// columns under grey headings, in two tables side by side when one is too tall for the card;
// the picked row's name gold. A creature's page (D-631): its drawing twice as big, its name and
// counts beside it, and under them how it acts, or a grey hint until one is beaten.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { drawHearts } from './hearts.js';
import { cardAt, drawCard, drawButton, frame, inCard, onCross, wrapWords, BUTTON, PAD, TAP_PAD } from './bag.js';
import { TABS, recordRows } from '../core/journal.js';
import { ROWS, ROWS_OPEN, HEARTS_MORE, START_PICK, embers, heartsBought, told, upgradeAt } from '../core/growth.js';
import { BRANCHES } from '../core/upgrades.js';
import { bestiaryRows, pageOf, NONE, FIGHT_HEADING } from '../core/bestiary.js';

const K = '#0e0c16', GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', LINE = 'rgba(239,230,204,.16)';
const DIM = '#4a4658', WOOD = '#5b4a3e', GLOW = '255,154,60';
const TABS_Y = 28, TABS_RULE_Y = 44; // inside the card: the tabs' top and the rule under them
const ROWS_Y = 52, ROW_H = 11; // Records' first row's top, and from one row's top to the next
const MARK_W = 8; // the flame and its gap, left of the open tab and of the names
const TAB_GAP = 24; // between two tabs
const VALUE_GAP = 20; // between the longest name and the values' column
const COST_GAP = 6; // between the cost and the button
// § tree's measures, inside the card
const INFO_W = 100; // what the picked place says, right of the line
const NAMES_Y = 50; // the embers' line right of the tree
const BOX_W = 76, BOX_H = 24, BOX_GAP = 12; // a place at its widest, its height, and between two rows
// From the card's bottom, as the tree stands on it: row 0's top (each row above it climbs
// BOX_H + BOX_GAP), where the trunk splits into the limbs, and the root ember's top
const ROW0_UP = 62, FORK_UP = 28, ROOT_UP = 17;
const LIMB = 3; // a limb's thickness
const tabsLeft = (card) => card.x + PAD + MARK_W;
// Each tab's left edge, in a row from the left; on a narrow card the gaps shrink so the last
// tab ends inside the card's padding (D-630)
function tabXs(card) {
  let x = tabsLeft(card);
  const room = card.x + card.w - PAD - x - TABS.reduce((w, t) => w + textWidth(t.text), 0);
  const gap = Math.max(MARK_W + 4, Math.min(TAB_GAP, Math.floor(room / (TABS.length - 1))));
  return TABS.map((tab) => { const at = x; x += textWidth(tab.text) + gap; return at; });
}

// § tree's layout: the line between the tree and what is said (from the card's left), and each
// place's box { col, row, x, y, w, h } and each branch's middle, from the card alone. Upright
// (D-505) the tree spans the card's width, standing on the button's row, what is said above it
const splitOf = (card) => card.w - PAD - INFO_W - 9;
const TALL_LIFT = 18; // upright, how far above the card's bottom the tree stands, clear of the button
const footOf = (card) => card.y + card.h - (card.tall ? TALL_LIFT : 0);
function treeOf(card) {
  const left = card.x + PAD, right = card.tall ? card.x + card.w - PAD + 8 : card.x + splitOf(card);
  const colW = (right - 8 - left) / BRANCHES.length, w = Math.min(BOX_W, Math.floor(colW) - 6);
  const mids = BRANCHES.map((_, i) => Math.floor(left + colW * (i + 0.5)));
  const row0 = footOf(card) - ROW0_UP;
  const boxes = mids.flatMap((mid, col) => Array.from({ length: ROWS }, (_, row) => ({ col, row, x: mid - Math.floor(w / 2), y: row0 - row * (BOX_H + BOX_GAP), w, h: BOX_H })));
  return { mids, boxes, row0 };
}
const buttonOf = (card, text) => { const w = textWidth(text) + 8; return { x: card.x + card.w - PAD - w, y: card.button.y, w }; };

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { tab } for a tab (anywhere from
// halfway to the tab before to halfway to the next, between the two rules), on Growth { pick }
// for a place on the tree and 'buy' for its button, on the Bestiary's table { beast } for a row's
// index, 'close' (the round cross), or null; outside the card, 'out'. tab: the one open; state
// and pick: the journey and the place picked; book: the profile's Bestiary; page: the creature
// whose page is open, if one is.
export function journalAt(x, y, vw, vh, tab = 'records', state = null, pick = null, book = {}, page = null) {
  const card = cardAt(vw, vh);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (tab === 'growth') {
    const b = state && pick && told(state, pick).button, at = b && buttonOf(card, b.text.toUpperCase());
    if (at && x >= at.x - TAP_PAD && x < at.x + at.w + TAP_PAD && y >= at.y - TAP_PAD && y < at.y + BUTTON.h + TAP_PAD) return 'buy';
    const box = treeOf(card).boxes.find((p) => x >= p.x - TAP_PAD && x < p.x + p.w + TAP_PAD && y >= p.y - TAP_PAD && y < p.y + p.h + TAP_PAD);
    if (box) return { pick: { col: box.col, row: box.row } };
  }
  if (tab === 'bestiary' && !page) {
    const n = bestiaryRows(book).length, { per, w, xs } = bestiaryTables(card, n);
    const i = xs.findIndex((tx) => x >= tx && x < tx + w), j = Math.floor((y - card.y - BEASTS_Y) / BEAST_H);
    if (i >= 0 && j >= 0 && j < per && i * per + j < n) return { beast: i * per + j };
  }
  if (y < card.y + TABS_Y - 8 || y >= card.y + TABS_RULE_Y) return null;
  const xs = tabXs(card);
  let i = 0;
  while (i < xs.length - 1 && x >= (xs[i] + textWidth(TABS[i].text) + xs[i + 1]) / 2) i++;
  return { tab: TABS[i].id };
}

// c: the room's canvas, `vw` × `vh`; records and played, the profile's; state, the journey's;
// tab, the one open; pick, Growth's picked place; still: prefers-reduced-motion; book, the
// profile's Bestiary, and sprites its drawings by id (sprites.js's SPRITES, D-630); beast, the
// Bestiary's picked row, and page the creature whose page is open, if one is (D-631)
export function drawJournal(c, vw, vh, records, played, state, tab, t, still, pick = START_PICK, book = {}, sprites = {}, beast = 0, page = null) {
  const growth = tab === 'growth', card = drawCard(c, vw, vh, 'JOURNAL', 0), { x, y, w } = card, xs = tabXs(card);
  TABS.forEach((s, i) => {
    const on = s.id === tab;
    drawText(c, s.text, xs[i], y + TABS_Y, on ? GOLD : GREY);
    if (!on) return;
    drawMarker(c, xs[i] - MARK_W, y + TABS_Y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(xs[i], y + TABS_Y + 11, textWidth(s.text), 1);
  });
  c.fillStyle = LINE; c.fillRect(x + 8, y + TABS_RULE_Y, w - 16, 1);
  if (growth) { drawTree(c, card, state, pick, t, still); return; }
  if (tab === 'bestiary') { if (page) drawPage(c, card, pageOf(book, page), sprites[page]); else drawBestiary(c, card, book, sprites, beast); return; }
  // § rows: Records' values in one column, after its longest name
  const rows = recordRows(records, played), nx = tabsLeft(card), vx = nx + Math.max(...rows.map((r) => textWidth(r.text))) + VALUE_GAP;
  rows.forEach((row, i) => {
    drawText(c, row.text, nx, y + ROWS_Y + i * ROW_H, GREY);
    drawText(c, row.value, vx, y + ROWS_Y + i * ROW_H, CORE);
  });
}

// § tree: the root's glow and flame, the limbs, then each place over them
function drawTree(c, card, state, pick, t, still) {
  const { mids, boxes, row0 } = treeOf(card), mid = mids[1], bottom = footOf(card), root = bottom - ROOT_UP, fork = bottom - FORK_UP;
  const glow = c.createRadialGradient(mid, root + 3, 1, mid, root + 3, 16);
  glow.addColorStop(0, `rgba(${GLOW},.45)`); glow.addColorStop(1, `rgba(${GLOW},0)`);
  c.fillStyle = glow; c.fillRect(mid - 16, root - 13, 32, 32);
  c.fillStyle = WOOD;
  c.fillRect(mid - 1, fork, LIMB, root - fork);
  c.fillRect(mids[0] - 1, fork, mids[2] - mids[0] + LIMB, LIMB);
  for (const m of mids) {
    c.fillRect(m - 1, row0, LIMB, fork - row0);
    for (let r = 1; r < ROWS; r++) c.fillRect(m - 1, row0 - r * (BOX_H + BOX_GAP) + BOX_H, LIMB, BOX_GAP); // up to the row above
  }
  drawMarker(c, mid - 1, root, t, still);
  const namesY = row0 - (ROWS - 1) * (BOX_H + BOX_GAP) - 12;
  BRANCHES.forEach((b, i) => {
    const name = b.text.toUpperCase();
    drawText(c, name, mids[i] - Math.floor(textWidth(name) / 2), namesY, i === pick.col ? GOLD : GREY);
  });
  for (const p of boxes) drawPlace(c, p, state, p.col === pick.col && p.row === pick.row);
  drawTold(c, card, state, pick, namesY - 8);
}

// § place: an upgrade in a box with its name, a heart's row of hearts bought; a place still to
// come or not open yet, dashed and dim, a locked one with a small lock
const LOCK = ['.xxx.', 'x...x', 'xxxxx', 'xx.xx', 'xxxxx'];
function drawPlace(c, p, state, picked) {
  const u = upgradeAt(p), open = p.row < ROWS_OPEN;
  c.fillStyle = K; c.fillRect(p.x, p.y, p.w, p.h);
  if (picked) frame(c, p.x, p.y, p.w, p.h, GOLD);
  else if (u && open) frame(c, p.x, p.y, p.w, p.h, LINE);
  else dashed(c, p.x, p.y, p.w, p.h, DIM);
  if (!open) {
    const lx = p.x + Math.floor((p.w - 5) / 2), ly = p.y + Math.floor((p.h - LOCK.length) / 2);
    c.fillStyle = DIM; LOCK.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === 'x') c.fillRect(lx + i, ly + j, 1, 1); }));
  } else if (!u) drawText(c, 'to come', p.x + Math.floor((p.w - textWidth('to come')) / 2), p.y + 8, DIM);
  else {
    drawText(c, u.name, p.x + 4, p.y + 3, CORE);
    drawHearts(c, heartsBought(state), HEARTS_MORE, p.x + 4, p.y + 15);
  }
}
function dashed(c, x, y, w, h, colour) {
  c.fillStyle = colour;
  for (let i = 0; i < w; i += 2) { c.fillRect(x + i, y, 1, 1); c.fillRect(x + i, y + h - 1, 1, 1); }
  for (let j = 0; j < h; j += 2) { c.fillRect(x, y + j, 1, 1); c.fillRect(x + w - 1, y + j, 1, 1); }
}

// § told: right of the line, the embers left, then the picked place's name, value and words,
// and its button with its cost grey beside it, dim while no ember can buy it. Upright, over the
// tree, the line across at `above`, the branches' names' top less a little (D-505)
function drawTold(c, card, state, pick, above) {
  const { x, y, h } = card, split = splitOf(card), ix = card.tall ? x + PAD : x + split + 9, iw = x + card.w - PAD - ix, said = told(state, pick);
  c.fillStyle = LINE;
  if (card.tall) c.fillRect(x + 8, above, card.w - 16, 1);
  else c.fillRect(x + split, y + TABS_RULE_Y + 6, 1, h - TABS_RULE_Y - 14);
  drawText(c, 'Embers', ix, y + NAMES_Y, GREY);
  drawText(c, String(embers(state)), ix + textWidth('Embers') + 6, y + NAMES_Y, CORE);
  let ty = y + NAMES_Y + 16;
  drawText(c, said.name, ix, ty, CORE);
  if (said.value) drawText(c, said.value, ix, (ty += 11), GREY);
  wrapWords(said.words, iw).forEach((l, i) => drawText(c, l, ix, ty + 14 + i * 11, GREY));
  if (!said.button) return;
  const text = said.button.text.toUpperCase(), b = buttonOf(card, text);
  drawButton(c, b.x, b.y, text, !said.button.can, b.w);
  drawText(c, said.button.cost, b.x - COST_GAP - textWidth(said.button.cost), b.y + 3, GREY);
}

// § bestiary: the creatures met, a table of rows (D-630): the drawing, the name, then the met
// and beaten counts each right-aligned under its heading; past the card's foot, a second table
// beside the first. None met yet, a grey line says so.
const BEAST_H = 18, HEADS_Y = 50, BEASTS_Y = 62; // a row's height; the headings' and first row's tops
const SPRITE_W = 16, NAME_GAP = 4, COUNT_GAP = 10, TABLE_GAP = 16;
export function bestiaryTables(card, n) {
  const fit = Math.max(1, Math.floor((card.h - BEASTS_Y - PAD + 2) / BEAST_H)), tables = n > fit ? 2 : 1;
  const w = Math.floor((card.w - 2 * PAD - (tables - 1) * TABLE_GAP) / tables);
  return { per: tables === 2 ? Math.ceil(n / 2) : n, w, xs: Array.from({ length: tables }, (_, i) => card.x + PAD + i * (w + TABLE_GAP)) };
}
function drawBestiary(c, card, book, sprites, beast) {
  const rows = bestiaryRows(book), { y } = card;
  if (!rows.length) { drawText(c, NONE, tabsLeft(card), y + HEADS_Y + 2, GREY); return; }
  const { per, w, xs } = bestiaryTables(card, rows.length), beatenW = textWidth('Beaten');
  xs.forEach((tx, i) => {
    const part = rows.slice(i * per, (i + 1) * per);
    if (!part.length) return;
    const bx = tx + w, mx = bx - beatenW - COUNT_GAP; // the columns' right edges
    drawText(c, 'Met', mx - textWidth('Met'), y + HEADS_Y, GREY);
    drawText(c, 'Beaten', bx - beatenW, y + HEADS_Y, GREY);
    part.forEach((r, j) => {
      const ry = y + BEASTS_Y + j * BEAST_H, img = sprites[r.id];
      if (img) c.drawImage(img, tx, ry);
      drawText(c, r.name, tx + SPRITE_W + NAME_GAP, ry + 5, i * per + j === beast ? GOLD : CORE);
      drawText(c, String(r.met), mx - textWidth(String(r.met)), ry + 5, CORE);
      drawText(c, String(r.beaten), bx - textWidth(String(r.beaten)), ry + 5, CORE);
    });
  });
}

// § page: one creature's page (D-631), under the tabs: its drawing at twice the size, its name
// and counts beside it, then how it acts in light words, or the hint in grey; under a gold
// heading, how to fight it, or its count down in grey (D-632)
const PAGE_Y = 54, BIG = 2 * SPRITE_W, ACTS_GAP = 12, LINE_H = 11, FIGHT_GAP = 8;
function drawPage(c, card, p, img) {
  const x = card.x + PAD, y = card.y + PAGE_Y, nx = x + BIG + 8, w = card.w - 2 * PAD;
  if (img) { c.save(); c.imageSmoothingEnabled = false; c.drawImage(img, x, y, BIG, BIG); c.restore(); }
  drawText(c, p.name, nx, y + 6, CORE);
  drawText(c, p.counts, nx, y + 18, GREY);
  const acts = wrapWords(p.acts, w), ay = y + BIG + ACTS_GAP;
  acts.forEach((l, i) => drawText(c, l, x, ay + i * LINE_H, p.known ? CORE : GREY));
  const fy = ay + acts.length * LINE_H + FIGHT_GAP;
  drawText(c, FIGHT_HEADING, x, fy, GOLD);
  wrapWords(p.fights, w).forEach((l, i) => drawText(c, l, x, fy + LINE_H + 2 + i * LINE_H, p.skilled ? CORE : GREY));
}
