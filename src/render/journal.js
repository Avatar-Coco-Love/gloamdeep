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
// counts beside it, and under them how it acts, or a grey hint until one is beaten. Feats
// (D-695): the Glints at the top, then each Feat's name, its count toward the next tier and
// its 3 marks, lit gold once reached.
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { drawHearts } from './hearts.js';
import { POISON_MARK } from './marks.js';
import { cardAt, drawCard, drawButton, frame, inCard, onCross, wrapWords, BUTTON, PAD, TAP_PAD } from './bag.js';
import { TABS, recordRows } from '../core/journal.js';
import { ROWS_OPEN, HEARTS_MORE, START_PICK, embers, heartsBought, isTough, placesOf, told, upgradeAt } from '../core/growth.js';
import { BRANCHES } from '../core/upgrades.js';
import { bestiaryRows, pageOf, NONE, FIGHT_HEADING } from '../core/bestiary.js';
import { featRows, glintsText } from '../core/feats.js';

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
const BOX_W = 76; // a place at its widest
// A place's height, the gap between two places, and from the card's bottom, as the tree stands
// on it: the first place's top (each above climbs box + gap), where the trunk splits into the
// limbs, and the root ember's top; inside a place, its name's top and its picture's (hearts or
// drop). Snug, closer, where the tallest branch would reach the tabs (D-657)
const ROOMY = { box: 24, gap: 12, row0: 62, fork: 28, root: 17, name: 3, hearts: 15, drop: 13 };
const SNUG = { box: 21, gap: 4, row0: 44, fork: 21, root: 13, name: 2, hearts: 12, drop: 11 };
const NAMES_UP = 12; // the branches' names over the tallest branch
const LIMB = 3; // a limb's thickness
const tabsLeft = (card) => card.x + PAD + MARK_W;
const MIN_GAP = MARK_W + 4, TAB_ROW = 16; // the least gap between two tabs; from one row of tabs to the next
// § tabs: each tab's left edge and top, in a row from the left, the gaps shrinking on a narrow
// card so the last tab ends inside its padding (D-630); on a card too narrow for that (upright),
// in two rows, the second's under the first's, as the how to play card's (D-695). `down`: how
// much lower than one row's the rule under them and the tab's page go
function tabsAt(card) {
  const ws = TABS.map((t) => textWidth(t.text)), wide = card.x + card.w - PAD - tabsLeft(card);
  const fits = (n) => ws.slice(0, n).reduce((a, b) => a + b, 0) + (n - 1) * MIN_GAP <= wide;
  const first = fits(ws.length) ? ws.length : Math.ceil(ws.length / 2), spots = [];
  const room = wide - ws.slice(0, first).reduce((a, b) => a + b, 0), gap = Math.max(MIN_GAP, Math.min(TAB_GAP, Math.floor(room / (first - 1))));
  let x = tabsLeft(card);
  for (let i = 0; i < first; i++) { spots.push({ x, y: card.y + TABS_Y, row: 0 }); x += ws[i] + gap; }
  for (let i = first; i < ws.length; i++) spots.push({ x: spots[i - first].x, y: card.y + TABS_Y + TAB_ROW, row: 1 });
  return { spots, down: spots.at(-1).row * TAB_ROW };
}
// The card as a tab's page sees it: with two rows of tabs, its top `down` lower, its foot where it was
const pageCard = (card, down) => (down ? { ...card, y: card.y + down, h: card.h - down } : card);

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
  const tallest = Math.max(...BRANCHES.map((_, col) => placesOf(col).length)), reach = (m) => m.row0 + (tallest - 1) * (m.box + m.gap) + NAMES_UP;
  const m = card.tall || reach(ROOMY) <= footOf(card) - card.y - TABS_RULE_Y - 4 ? ROOMY : SNUG, row0 = footOf(card) - m.row0;
  const boxes = mids.flatMap((mid, col) => placesOf(col).map((p, i) => ({ ...p, x: mid - Math.floor(w / 2), y: row0 - i * (m.box + m.gap), w, h: m.box })));
  return { mids, boxes, row0, m };
}
const buttonOf = (card, text) => { const w = textWidth(text) + 8; return { x: card.x + card.w - PAD - w, y: card.button.y, w }; };

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { tab } for a tab (anywhere from
// halfway to the tab before to halfway to the next, between the two rules), on Growth { pick }
// for a place on the tree and 'buy' for its button, on the Bestiary's table { beast } for a row's
// index, 'close' (the round cross), or null; outside the card, 'out'. tab: the one open; state
// and pick: the journey and the place picked; book: the profile's Bestiary; page: the creature
// whose page is open, if one is.
export function journalAt(x, y, vw, vh, tab = 'records', state = null, pick = null, book = {}, page = null) {
  const whole = cardAt(vw, vh);
  if (!inCard(whole, x, y)) return 'out';
  if (onCross(whole, x, y)) return 'close';
  const { spots, down } = tabsAt(whole), card = pageCard(whole, down);
  if (tab === 'growth') {
    const b = state && pick && told(state, pick).button, at = b && buttonOf(card, b.text.toUpperCase());
    if (at && x >= at.x - TAP_PAD && x < at.x + at.w + TAP_PAD && y >= at.y - TAP_PAD && y < at.y + BUTTON.h + TAP_PAD) return 'buy';
    const box = treeOf(card).boxes.find((p) => x >= p.x - TAP_PAD && x < p.x + p.w + TAP_PAD && y >= p.y - TAP_PAD && y < p.y + p.h + TAP_PAD);
    if (box) return { pick: { col: box.col, row: box.row, slot: box.slot } };
  }
  if (tab === 'bestiary' && !page) {
    const n = bestiaryRows(book).length, { per, w, xs } = bestiaryTables(card, n);
    const i = xs.findIndex((tx) => x >= tx && x < tx + w), j = Math.floor((y - card.y - BEASTS_Y) / BEAST_H);
    if (i >= 0 && j >= 0 && j < per && i * per + j < n) return { beast: i * per + j };
  }
  if (y < whole.y + TABS_Y - 8 || y >= whole.y + TABS_RULE_Y + down) return null;
  const row = Math.max(0, Math.min(spots.at(-1).row, Math.floor((y - whole.y - TABS_Y + 8) / TAB_ROW)));
  const inRow = spots.map((s, i) => ({ ...s, i })).filter((s) => s.row === row);
  let k = 0;
  while (k < inRow.length - 1 && x >= (inRow[k].x + textWidth(TABS[inRow[k].i].text) + inRow[k + 1].x) / 2) k++;
  return { tab: TABS[inRow[k].i].id };
}

// c: the room's canvas, `vw` × `vh`; records and played, the profile's; state, the journey's;
// tab, the one open; pick, Growth's picked place; still: prefers-reduced-motion; book, the
// profile's Bestiary, and sprites its drawings by id (sprites.js's SPRITES, D-630); beast, the
// Bestiary's picked row, and page the creature whose page is open, if one is (D-631); bought, the
// patterns the profile bought, for the Glints left (D-696)
export function drawJournal(c, vw, vh, records, played, state, tab, t, still, pick = START_PICK, book = {}, sprites = {}, beast = 0, page = null, bought = []) {
  const growth = tab === 'growth', whole = drawCard(c, vw, vh, 'JOURNAL', 0), { spots, down } = tabsAt(whole);
  TABS.forEach((s, i) => {
    const on = s.id === tab, at = spots[i];
    drawText(c, s.text, at.x, at.y, on ? GOLD : GREY);
    if (!on) return;
    drawMarker(c, at.x - MARK_W, at.y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(at.x, at.y + 11, textWidth(s.text), 1);
  });
  c.fillStyle = LINE; c.fillRect(whole.x + 8, whole.y + TABS_RULE_Y + down, whole.w - 16, 1);
  const card = pageCard(whole, down), { y } = card;
  if (growth) { drawTree(c, card, state, pick, t, still); return; }
  if (tab === 'feats') { drawFeats(c, card, records, bought); return; }
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
  const { mids, boxes, row0, m: ms } = treeOf(card), mid = mids[1], bottom = footOf(card), root = bottom - ms.root, fork = bottom - ms.fork;
  const glow = c.createRadialGradient(mid, root + 3, 1, mid, root + 3, 16);
  glow.addColorStop(0, `rgba(${GLOW},.45)`); glow.addColorStop(1, `rgba(${GLOW},0)`);
  c.fillStyle = glow; c.fillRect(mid - 16, root - 13, 32, 32);
  c.fillStyle = WOOD;
  c.fillRect(mid - 1, fork, LIMB, root - fork);
  c.fillRect(mids[0] - 1, fork, mids[2] - mids[0] + LIMB, LIMB);
  mids.forEach((m, col) => {
    c.fillRect(m - 1, row0, LIMB, fork - row0);
    for (let r = 1; r < placesOf(col).length; r++) c.fillRect(m - 1, row0 - r * (ms.box + ms.gap) + ms.box, LIMB, ms.gap); // up to the place above
  });
  drawMarker(c, mid - 1, root, t, still);
  const namesY = Math.min(...boxes.map((p) => p.y)) - NAMES_UP;
  BRANCHES.forEach((b, i) => {
    const name = b.text.toUpperCase();
    drawText(c, name, mids[i] - Math.floor(textWidth(name) / 2), namesY, i === pick.col ? GOLD : GREY);
  });
  for (const p of boxes) drawPlace(c, p, ms, state, p.col === pick.col && p.row === pick.row && p.slot === (pick.slot ?? 0));
  drawTold(c, card, state, pick, namesY - 8);
}

// § place: an upgrade in a box with its name, a heart's row of hearts bought, Tough's drop of
// venom, dim until bought (D-657); a place still to come or not open yet, dashed and dim, a
// locked one with a small lock
const LOCK = ['.xxx.', 'x...x', 'xxxxx', 'xx.xx', 'xxxxx'];
const dots = (c, rows, x, y, colour, on = 'x') => { c.fillStyle = colour; rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === on) c.fillRect(x + i, y + j, 1, 1); })); };
function drawPlace(c, p, ms, state, picked) {
  const u = upgradeAt(p), open = p.row < ROWS_OPEN;
  c.fillStyle = K; c.fillRect(p.x, p.y, p.w, p.h);
  if (picked) frame(c, p.x, p.y, p.w, p.h, GOLD);
  else if (u && open) frame(c, p.x, p.y, p.w, p.h, LINE);
  else dashed(c, p.x, p.y, p.w, p.h, DIM);
  if (!open) {
    const lx = p.x + Math.floor((p.w - 5) / 2), ly = p.y + Math.floor((p.h - LOCK.length) / 2);
    dots(c, LOCK, lx, ly, DIM);
  } else if (!u) drawText(c, 'to come', p.x + Math.floor((p.w - textWidth('to come')) / 2), p.y + Math.floor(p.h / 2) - 4, DIM);
  else {
    drawText(c, u.name, p.x + 4, p.y + ms.name, CORE);
    if (u.id === 'tough') dots(c, POISON_MARK.icon, p.x + 3, p.y + ms.drop, isTough(state) ? POISON_MARK.tint : DIM, '#'); // poisoned's drop (D-654)
    else drawHearts(c, heartsBought(state), HEARTS_MORE, p.x + 4, p.y + ms.hearts);
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

// § feats: the Glints in gold, then a row a Feat as Records' rows: its name grey, its count light,
// and on the right its 3 marks, small diamonds, gold once reached and dim before (D-695); the
// Glints are those left, the patterns bought taken off (D-696)
const GLINTS_Y = 52, FEATS_Y = 68, MARK = 5, MARK_GAP = 4;
function drawFeats(c, card, records, bought) {
  const nx = tabsLeft(card), rows = featRows(records), right = card.x + card.w - PAD;
  drawText(c, glintsText({ records, bought }), nx, card.y + GLINTS_Y, GOLD);
  const vx = nx + Math.max(...rows.map((r) => textWidth(r.text))) + VALUE_GAP;
  rows.forEach((r, i) => {
    const ry = card.y + FEATS_Y + i * ROW_H;
    drawText(c, r.text, nx, ry, GREY);
    drawText(c, r.value, vx, ry, CORE);
    for (let k = 0; k < r.tiers; k++) drawDiamond(c, right - (r.tiers - k) * (MARK + MARK_GAP) + MARK_GAP, ry + 1, k < r.reached ? GOLD : DIM);
  });
}
function drawDiamond(c, x, y, colour) {
  c.fillStyle = colour;
  c.fillRect(x + 2, y, 1, 1); c.fillRect(x + 1, y + 1, 3, 1); c.fillRect(x, y + 2, 5, 1); c.fillRect(x + 1, y + 3, 3, 1); c.fillRect(x + 2, y + 4, 1, 1);
}
