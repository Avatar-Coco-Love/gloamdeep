// § journal card (D-391; after the how to play card, D-390): the Journal (D-262, D-270) opens
// as a glass card as the bag's (D-385), from the pause card on the room and from the title on
// its scene alike, "JOURNAL" at its top and the round cross that goes back. Under the heading
// its tabs, Records and Growth (D-293), the open one gold with the menus' flame (D-181) and
// underlined. Records' rows are each name grey on the left and its value light in a column on
// the right. Growth is a tree (D-481, look D of the step 8 mock-up): an ember glowing at the
// root, a trunk splitting into three limbs, and across them a twig for each row, row 0 at the
// bottom, its number dim at the left; on a twig each branch's places are small picture tiles side
// by side (D-811, look A), the tree scrolling once its rows outgrow the card; the picked place outlined gold, and what it says on the right, past a line, with
// its button in the bottom right corner, as Make on the bag's card. The Bestiary (D-630) is a
// table of the creatures met: each one's drawing and name, its met and beaten counts in two
// columns under grey headings, in two tables side by side when one is too tall for the card;
// the picked row's name gold. A creature's page (D-631): its drawing twice as big, its name and
// counts beside it, and under them how it acts, or a grey hint until one is beaten. Feats
// (D-695): the Glints at the top, then each Feat's name, its count toward the next tier and
// its 3 marks, lit gold once reached. Quests (D-706): a row a goal, newest first: a small diamond,
// gold once done, the goal (amber waiting, gold done), the reward it paid on the right, the how in
// grey under it. Those lists are drawn, and scroll, in journalrows.js (D-743).
import { drawText, textWidth } from './font.js';
import { drawMarker } from './menu.js';
import { HEART } from './hearts.js';
import { POISON_MARK, GLOW_MARK } from './marks.js';
import { cardAt, drawCard, drawButton, frame, inCard, onCross, wrapWords, BUTTON, PAD, TAP_PAD } from './bag.js';
import { TABS } from '../core/journal.js';
import { ROWS, ROWS_OPEN, START_PICK, embers, heartsBought, allPlaces, placesIn, told, upgradeAt } from '../core/growth.js';
import { grown } from '../core/upgrades.js';
import { BRANCHES } from '../core/upgrades.js';
import { bestiaryRows } from '../core/bestiary.js';
import { bestiaryTables, beastAt, showBeast, questAt, listOf, drawList, clampFirst } from './journalrows.js';
export { bestiaryTables };

const K = '#0e0c16', GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', LINE = 'rgba(239,230,204,.16)';
const DIM = '#4a4658', WOOD = '#5b4a3e', GLOW = '255,154,60';
const TABS_Y = 28, TABS_RULE_Y = 44; // inside the card: the tabs' top and the rule under them
const MARK_W = 8; // the flame and its gap, left of the open tab and of the names
const TAB_GAP = 24; // between two tabs
const COST_GAP = 6; // between the cost and the button
// § tree's measures, inside the card
const INFO_W = 100; // what the picked place says, right of the line
const NAMES_Y = 50; // the embers' line right of the tree
const TILE = 18, TILE_GAP = 3; // a place's tile at its biggest, smaller where a branch's places would not fit side by side; between two
// From the card's bottom, as the tree stands on it: the first row's tiles' top, where the trunk
// splits into the limbs, the root ember's top, and from one row to the next. Snug, closer, where
// the rows would reach the tabs; past that, the tree scrolls (D-811)
const ROOMY = { row0: 50, fork: 26, root: 17, rowH: TILE + 12 };
const SNUG = { row0: 40, fork: 21, root: 13, rowH: TILE + 6 };
const LABEL_W = 8; // the rows' numbers, left of the tree
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
// shown place's tile { col, row, slot, x, y, w, h } and each branch's middle, from the card and
// the bottom row shown, `first` (D-811). Upright (D-505) the tree spans the card's width,
// standing on the button's row, what is said above it
const splitOf = (card) => card.w - PAD - INFO_W - 9;
const TALL_LIFT = 18; // upright, how far above the card's bottom the tree stands, clear of the button
const footOf = (card) => card.y + card.h - (card.tall ? TALL_LIFT : 0);
// How many rows fit between the tabs and the root, in a measure
const fitIn = (card, m) => Math.max(1, Math.floor((footOf(card) - m.row0 - card.y - TABS_RULE_Y - 4 - NAMES_UP) / m.rowH) + 1);
const measureOf = (card) => (fitIn(card, ROOMY) >= ROWS ? ROOMY : SNUG);
// The bottom row shown, kept so that rows fill the card; 0 where every row fits
export const clampRow = (first, card) => Math.max(0, Math.min(first, ROWS - fitIn(card, measureOf(card))));
function treeOf(card, first = 0) {
  const left = card.x + PAD + LABEL_W, right = card.tall ? card.x + card.w - PAD + 8 : card.x + splitOf(card);
  const side = Math.max(...allPlaces().map((p) => p.slot + 1)); // the most places side by side on a twig, up to 3 (D-811)
  const colW = (right - 8 - left) / BRANCHES.length, tile = Math.min(TILE, Math.floor((colW - 4 - (side - 1) * TILE_GAP) / side));
  const mids = BRANCHES.map((_, i) => Math.floor(left + colW * (i + 0.5)));
  const m = measureOf(card), shown = fitIn(card, m), from = clampRow(first, card), to = Math.min(ROWS, from + shown), row0 = footOf(card) - m.row0;
  const yOf = (row) => row0 - (row - from) * m.rowH;
  const tiles = allPlaces().filter((p) => p.row >= from && p.row < to).map((p) => {
    const n = placesIn(p.col, p.row), w = n * tile + (n - 1) * TILE_GAP;
    return { ...p, x: mids[p.col] - Math.floor(w / 2) + p.slot * (tile + TILE_GAP), y: yOf(p.row), w: tile, h: tile };
  });
  return { mids, tiles, row0, m, tile, from, to, yOf };
}
const buttonOf = (card, text) => { const w = textWidth(text) + 8; return { x: card.x + card.w - PAD - w, y: card.button.y, w }; };

// What a tap at x, y on the room's canvas, `vw` × `vh`, picks: { tab } for a tab (anywhere from
// halfway to the tab before to halfway to the next, between the two rules), on Growth { pick }
// for a place on the tree and 'buy' for its button, on the Bestiary's table { beast } for a row's
// index, 'close' (the round cross), or null; outside the card, 'out'. tab: the one open; state
// and pick: the journey and the place picked; book: the profile's Bestiary; page: the creature
// whose page is open, if one is.
// goals: the profile's, for the Quests tab's rows ({ quest: id }, D-712); first: the open list's
// top row shown, scrolled (D-743)
export function journalAt(x, y, vw, vh, tab = 'records', state = null, pick = null, book = {}, page = null, goals = {}, first = 0) {
  const whole = cardAt(vw, vh);
  if (!inCard(whole, x, y)) return 'out';
  if (onCross(whole, x, y)) return 'close';
  const { spots, down } = tabsAt(whole), card = pageCard(whole, down);
  if (tab === 'growth') {
    const b = state && pick && told(state, pick).button, at = b && buttonOf(card, b.text.toUpperCase());
    if (at && x >= at.x - TAP_PAD && x < at.x + at.w + TAP_PAD && y >= at.y - TAP_PAD && y < at.y + BUTTON.h + TAP_PAD) return 'buy';
    const box = treeOf(card, first).tiles.find((p) => x >= p.x - TAP_PAD && x < p.x + p.w + TAP_PAD && y >= p.y - TAP_PAD && y < p.y + p.h + TAP_PAD);
    if (box) return { pick: { col: box.col, row: box.row, slot: box.slot } };
  }
  if (tab === 'bestiary' && !page) {
    const n = bestiaryRows(book).length, { hs, h } = bestiaryTables(card, n), k = beastAt(card, n, clampFirst(first, hs, h), x, y);
    if (k >= 0) return { beast: k };
  }
  if (tab === 'quests') {
    const id = questAt(card, goals, state?.place, state?.start, first, y);
    if (id) return { quest: id };
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
// patterns the profile bought, for the Glints left (D-696); first: the open list's top row shown (D-743)
export function drawJournal(c, vw, vh, records, played, state, tab, t, still, pick = START_PICK, book = {}, sprites = {}, beast = 0, page = null, bought = [], goals = {}, goalGlints = 0, first = 0) {
  const growth = tab === 'growth', whole = drawCard(c, vw, vh, 'JOURNAL', 0), { spots, down } = tabsAt(whole);
  TABS.forEach((s, i) => {
    const on = s.id === tab, at = spots[i];
    drawText(c, s.text, at.x, at.y, on ? GOLD : GREY);
    if (!on) return;
    drawMarker(c, at.x - MARK_W, at.y + 1, t, still);
    c.fillStyle = GOLD; c.fillRect(at.x, at.y + 11, textWidth(s.text), 1);
  });
  c.fillStyle = LINE; c.fillRect(whole.x + 8, whole.y + TABS_RULE_Y + down, whole.w - 16, 1);
  const card = pageCard(whole, down);
  if (growth) drawTree(c, card, state, pick, t, still, first);
  else drawList(c, card, tab, { records, played, bestiary: book, goals, bought }, state, first, { sprites, beast, page, glints: goalGlints });
}

// § scroll (D-743): the open list's top row after scrolling `by` rows (by > 0 down), kept in its
// bounds, or null where it all fits (a short list); p: { records, played, bestiary, goals }. On
// Growth, `first` is the bottom row shown, and scrolling down shows the rows below (D-811)
export function scrollJournal(first, by, vw, vh, tab, p, state, page) {
  const whole = cardAt(vw, vh), card = pageCard(whole, tabsAt(whole).down);
  if (tab === 'growth') return clampRow(Infinity, card) === 0 ? null : clampRow(clampRow(first, card) - by, card);
  const list = listOf(pageCard(whole, tabsAt(whole).down), tab, p, state, page);
  if (!list || clampFirst(Infinity, list.hs, list.h) === 0) return null;
  return clampFirst(clampFirst(first, list.hs, list.h) + by, list.hs, list.h);
}
// The bottom row shown that keeps Growth's row `row` in view (D-811)
export function showGrowthRow(first, row, vw, vh) {
  const whole = cardAt(vw, vh), card = pageCard(whole, tabsAt(whole).down), m = measureOf(card), from = clampRow(first, card);
  return clampRow(row < from ? row : Math.max(from, row - fitIn(card, m) + 1), card);
}
// The top row that keeps the Bestiary's row k in view
export function showBeastRow(first, k, vw, vh, book) {
  const whole = cardAt(vw, vh), n = bestiaryRows(book).length;
  return n ? showBeast(pageCard(whole, tabsAt(whole).down), n, first, k) : 0;
}

// § tree: the root's glow and flame, the limbs, each shown row's number and twig, then each
// place's tile over them; a small dim arrow where rows are hidden above or below (D-811)
function drawTree(c, card, state, pick, t, still, first) {
  const { mids, tiles, m, tile, from, to, yOf } = treeOf(card, first), mid = mids[1], bottom = footOf(card), root = bottom - m.root, fork = bottom - m.fork;
  const glow = c.createRadialGradient(mid, root + 3, 1, mid, root + 3, 16);
  glow.addColorStop(0, `rgba(${GLOW},.45)`); glow.addColorStop(1, `rgba(${GLOW},0)`);
  c.fillStyle = glow; c.fillRect(mid - 16, root - 13, 32, 32);
  const top = yOf(to - 1), twig = Math.floor(tile / 2) - 1;
  c.fillStyle = WOOD;
  c.fillRect(mid - 1, fork, LIMB, root - fork);
  c.fillRect(mids[0] - 1, fork, mids[2] - mids[0] + LIMB, LIMB);
  mids.forEach((x) => c.fillRect(x - 1, top + twig, LIMB, fork - top - twig));
  for (let row = from; row < to; row++) {
    const y = yOf(row);
    drawText(c, String(row + 1), card.x + PAD, y + Math.floor(tile / 2) - 4, row < ROWS_OPEN ? GREY : DIM);
    BRANCHES.forEach((_, col) => {
      const n = placesIn(col, row), w = n * tile + (n - 1) * TILE_GAP;
      c.fillStyle = WOOD; c.fillRect(mids[col] - Math.floor(w / 2) + 2, y + twig, w - 4, 2);
    });
  }
  drawMarker(c, mid - 1, root, t, still);
  const namesY = top - NAMES_UP;
  BRANCHES.forEach((b, i) => {
    const name = b.text.toUpperCase();
    drawText(c, name, mids[i] - Math.floor(textWidth(name) / 2), namesY, i === pick.col ? GOLD : GREY);
  });
  if (to < ROWS) dots(c, ['..x..', '.xxx.', 'xxxxx'], card.x + PAD, namesY + 2, GREY); // more above
  if (from > 0) dots(c, ['xxxxx', '.xxx.', '..x..'], card.x + PAD, yOf(from) + tile + 3, GREY); // more below
  for (const p of tiles) drawPlace(c, p, state, p.col === pick.col && p.row === pick.row && p.slot === (pick.slot ?? 0));
  drawTold(c, card, state, pick, namesY - 8);
}

// § place: an upgrade's tile, its small picture from the registry's `look` (D-811): Tough's drop
// of venom (D-657), Steady Wick's small flame in the lantern's gold (D-798), Quick Hands' pale
// open hand (D-813), the heart a heart
// twice the panel's size with how many are bought in its corner; the picture dim until bought,
// a bought tile's frame faintly gold. Its name and words are on the right when picked. A place
// still to come is a dashed, empty tile; one not open yet dashed with a small lock
const LOCK = ['.xxx.', 'x...x', 'xxxxx', 'xx.xx', 'xxxxx'];
const FLAME = ['....#....', '...##....', '...###...', '..####...', '..#####..', '.###.##..', '.##..###.', '..##.##..', '....#....'];
// Quick Hands' open hand, pale (D-813): four fingers up, the thumb out to the left
const HAND = ['..#.#.#..', '..#.#.#.#', '..#.#.#.#', '..#######', '#.#######', '.########', '..#######', '...#####.', '...#####.'];
const BOUGHT = 'rgba(255,214,107,.45)'; // a bought tile's frame
const dots = (c, rows, x, y, colour, on = 'x', size = 1) => { c.fillStyle = colour; rows.forEach((row, j) => [...row].forEach((ch, i) => { if (ch === on) c.fillRect(x + i * size, y + j * size, size, size); })); };
function drawPlace(c, p, state, picked) {
  const u = upgradeAt(p), open = p.row < ROWS_OPEN, n = u ? grown(state, u.id) : 0, s = p.w;
  c.fillStyle = K; c.fillRect(p.x, p.y, s, s);
  if (picked) frame(c, p.x, p.y, s, s, GOLD);
  else if (u && open) frame(c, p.x, p.y, s, s, n > 0 ? BOUGHT : LINE);
  else dashed(c, p.x, p.y, s, s, DIM);
  const at = (w, h) => [p.x + Math.floor((s - w) / 2), p.y + Math.floor((s - h) / 2)]; // a picture in the middle
  if (!open) dots(c, LOCK, ...at(5, LOCK.length), DIM);
  if (!open || !u) return;
  if (u.look === 'flame') dots(c, FLAME, ...at(9, 9), n > 0 ? GLOW_MARK.tint : DIM, '#');
  else if (u.look === 'drop') dots(c, POISON_MARK.icon, ...at(9, 9), n > 0 ? POISON_MARK.tint : DIM, '#'); // poisoned's drop (D-654)
  else if (u.look === 'hand') dots(c, HAND, ...at(9, 9), n > 0 ? CORE : DIM, '#');
  else if (u.look === 'hearts') {
    const counted = u.most > 1 && n > 0, size = s >= 16 ? 2 : 1, [hx, hy] = counted ? [p.x + 2, p.y + 2] : at(5 * size, 4 * size); // twice the size where the tile has room
    dots(c, HEART, hx, hy, n > 0 ? '#e8786a' : DIM, 'x', size);
    if (counted) drawText(c, String(heartsBought(state)), p.x + s - 1 - textWidth(String(n)), p.y + s - 9, CORE);
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
