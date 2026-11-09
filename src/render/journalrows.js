// § journal's rows (D-743): the Journal's tabs that are lists, Records, the Bestiary's table and a
// creature's page, Feats and Quests, moved from journal.js. Each list scrolls a whole row at a
// time once it is taller than the card (the owner's pick, as Version history's): `first` is the
// top row shown, and a thin bar at the card's right shows where the window is, as history's.
// Upright, the Bestiary is one table, never two squeezed side by side; sideways two tables
// scroll together. A quest's how wraps onto as many lines as it needs, and a done goal's reward
// goes on its own grey line under it when it doesn't fit right of the goal (the owner's picks).
import { drawText, textWidth } from './font.js';
import { PAD } from './bag.js';
import { wrap } from './history.js';
import { recordRows } from '../core/journal.js';
import { bestiaryRows, pageOf, NONE, FIGHT_HEADING } from '../core/bestiary.js';
import { featRows, glintsText } from '../core/feats.js';
import { questRows, NONE as NO_GOALS } from '../core/goals.js';

const GREY = '#9790a4', GOLD = '#ffd66b', CORE = '#efe6cc', DIM = '#4a4658', AMBER = '#ffc65c';
const MARK_W = 8; // the flame or diamond and its gap, left of the names
export const ROWS_Y = 52, ROW_H = 11; // Records' and Quests' first row's top, and one line to the next
const QUEST_GAP = 4; // under a quest's last line (a two-line quest is 26 tall, D-707)
const REWARD_GAP = 8; // the least gap between a goal and its reward on its right
const BAR_X = 3; // the scroll bar, right of the words' edge
const nameX = (card) => card.x + PAD + MARK_W;
const rightOf = (card) => card.x + card.w - PAD;

// § scroll: hs, the rows' heights; h, the window's. How many rows from `first` fit (one at least)
export function fitFrom(hs, first, h) {
  let used = 0, n = 0;
  for (let i = first; i < hs.length && (n === 0 || used + hs[i] <= h); i++) { used += hs[i]; n++; }
  return n;
}
// The last top row worth scrolling to: the one from which the rest all fit
export function lastFirst(hs, h) {
  let used = 0, i = hs.length;
  while (i > 0 && used + hs[i - 1] <= h) used += hs[--i];
  return Math.min(i, Math.max(0, hs.length - 1));
}
export const clampFirst = (first, hs, h) => Math.max(0, Math.min(first, lastFirst(hs, h)));
function drawBar(c, card, top, h, first, shown, total) {
  if (shown >= total) return;
  c.fillStyle = GREY;
  c.fillRect(rightOf(card) + BAR_X, top + Math.round((first / total) * h), 1, Math.max(4, Math.round((shown / total) * h)));
}

// § bestiary: a table of rows (D-630): the drawing, the name, the met and beaten counts each
// right-aligned under its heading. Two tables side by side only on a card wide enough for both
const BEAST_H = 18, HEADS_Y = 50, BEASTS_Y = 62; // a row's height; the headings' and first row's tops
const SPRITE_W = 16, NAME_GAP = 4, COUNT_GAP = 10, TABLE_GAP = 16, TABLE_MIN = 150;
export function bestiaryTables(card, n) {
  const top = card.y + BEASTS_Y, h = card.h - BEASTS_Y - PAD + 2, fit = Math.max(1, Math.floor(h / BEAST_H));
  const tables = n > fit && card.w - 2 * PAD >= 2 * TABLE_MIN + TABLE_GAP ? 2 : 1;
  const w = Math.floor((card.w - 2 * PAD - (tables - 1) * TABLE_GAP) / tables), per = Math.ceil(n / tables);
  return { per, w, top, h, fit, hs: Array(per).fill(BEAST_H), xs: Array.from({ length: tables }, (_, i) => card.x + PAD + i * (w + TABLE_GAP)) };
}
// The row index under x, y, or -1
export function beastAt(card, n, first, x, y) {
  const { per, w, xs, top, fit } = bestiaryTables(card, n), i = xs.findIndex((tx) => x >= tx && x < tx + w);
  const j = Math.floor((y - top) / BEAST_H);
  if (i < 0 || y < top || j >= Math.min(fit, per - first)) return -1;
  const k = i * per + first + j;
  return k < n ? k : -1;
}
// The top row that keeps row k in view
export function showBeast(card, n, first, k) {
  const { per, fit, hs, h } = bestiaryTables(card, n), j = k % per;
  return clampFirst(j < first ? j : j >= first + fit ? j - fit + 1 : first, hs, h);
}
function drawBestiary(c, card, book, sprites, beast, first) {
  const rows = bestiaryRows(book), { y } = card;
  if (!rows.length) { drawText(c, NONE, nameX(card), y + HEADS_Y + 2, GREY); return; }
  const { per, w, xs, top, h, fit, hs } = bestiaryTables(card, rows.length), beatenW = textWidth('Beaten');
  first = clampFirst(first, hs, h);
  xs.forEach((tx, i) => {
    const bx = tx + w, mx = bx - beatenW - COUNT_GAP; // the columns' right edges
    drawText(c, 'Met', mx - textWidth('Met'), y + HEADS_Y, GREY);
    drawText(c, 'Beaten', bx - beatenW, y + HEADS_Y, GREY);
    for (let j = 0; j < fit && first + j < per; j++) {
      const k = i * per + first + j, r = rows[k], ry = top + j * BEAST_H, img = sprites[r?.id];
      if (!r) break;
      if (img) c.drawImage(img, tx, ry);
      drawText(c, r.name, tx + SPRITE_W + NAME_GAP, ry + 5, k === beast ? GOLD : CORE);
      drawText(c, String(r.met), mx - textWidth(String(r.met)), ry + 5, CORE);
      drawText(c, String(r.beaten), bx - textWidth(String(r.beaten)), ry + 5, CORE);
    }
  });
  drawBar(c, card, top, h, first, Math.min(fit, per), per);
}

// § page: one creature's page (D-631): its drawing at twice the size, its name and counts beside
// it, then how it acts in light words, or the hint in grey; under a gold heading, how to fight
// it, or its count down in grey (D-632). The words under the drawing scroll
const PAGE_Y = 54, BIG = 2 * SPRITE_W, ACTS_GAP = 12, LINE_H = 11, FIGHT_GAP = 8;
function pageRows(card, p) {
  const w = card.w - 2 * PAD, top = card.y + PAGE_Y + BIG + ACTS_GAP;
  const rows = [
    ...wrap(p.acts, w).map((text) => ({ text, colour: p.known ? CORE : GREY, h: LINE_H, dy: 0 })),
    { text: FIGHT_HEADING, colour: GOLD, h: FIGHT_GAP + LINE_H + 2, dy: FIGHT_GAP },
    ...wrap(p.fights, w).map((text) => ({ text, colour: p.skilled ? CORE : GREY, h: LINE_H, dy: 0 })),
  ];
  return { rows, hs: rows.map((r) => r.h), top, h: card.y + card.h - top };
}
function drawPage(c, card, p, img, first) {
  const x = card.x + PAD, y = card.y + PAGE_Y, nx = x + BIG + 8;
  if (img) { c.save(); c.imageSmoothingEnabled = false; c.drawImage(img, x, y, BIG, BIG); c.restore(); }
  drawText(c, p.name, nx, y + 6, CORE);
  drawText(c, p.counts, nx, y + 18, GREY);
  const { rows, hs, top, h } = pageRows(card, p);
  first = clampFirst(first, hs, h);
  const n = fitFrom(hs, first, h);
  for (let i = first, ry = top; i < first + n; ry += rows[i].h, i++) drawText(c, rows[i].text, x, ry + rows[i].dy, rows[i].colour);
  drawBar(c, card, top, h, first, n, rows.length);
}

// § records: a name grey on the left, its value light in one column after the longest name
const VALUE_GAP = 20;
function recordsList(card, records, played) {
  const rows = recordRows(records, played), top = card.y + ROWS_Y;
  return { rows, hs: rows.map(() => ROW_H), top, h: card.y + card.h - top - 2 };
}
function drawRecords(c, card, records, played, first) {
  const { rows, hs, top, h } = recordsList(card, records, played), nx = nameX(card), vx = nx + Math.max(...rows.map((r) => textWidth(r.text))) + VALUE_GAP;
  first = clampFirst(first, hs, h);
  const n = fitFrom(hs, first, h);
  for (let i = 0; i < n; i++) {
    const row = rows[first + i], ry = top + i * ROW_H;
    drawText(c, row.text, nx, ry, GREY);
    drawText(c, row.value, vx, ry, CORE);
  }
  drawBar(c, card, top, h, first, n, rows.length);
}

// § feats: the Glints in gold, then a row a Feat as Records' rows: its name grey, its count light,
// and on the right its 3 marks, small diamonds, gold once reached and dim before (D-695); the
// Glints are those left, the patterns bought taken off (D-696)
const GLINTS_Y = 52, FEATS_Y = 68, MARK = 5, MARK_GAP = 4;
const FEAT_GAP = 8; // narrower than Records' so Deepest's (D-697) and Steps' rows (D-722) and their marks fit the upright card
function featsList(card, records) {
  const rows = featRows(records), top = card.y + FEATS_Y;
  return { rows, hs: rows.map(() => ROW_H), top, h: card.y + card.h - top - 2 };
}
function drawFeats(c, card, records, bought, goalGlints, first) {
  const nx = nameX(card), right = rightOf(card), { rows, hs, top, h } = featsList(card, records);
  drawText(c, glintsText({ records, bought, glints: goalGlints }), nx, card.y + GLINTS_Y, GOLD);
  const vx = nx + Math.max(...rows.map((r) => textWidth(r.text))) + FEAT_GAP;
  first = clampFirst(first, hs, h);
  const n = fitFrom(hs, first, h);
  for (let i = 0; i < n; i++) {
    const r = rows[first + i], ry = top + i * ROW_H;
    drawText(c, r.text, nx, ry, GREY);
    drawText(c, r.value, vx, ry, CORE);
    for (let k = 0; k < r.tiers; k++) drawDiamond(c, right - (r.tiers - k) * (MARK + MARK_GAP) + MARK_GAP, ry + 1, k < r.reached ? GOLD : DIM);
  }
  drawBar(c, card, top, h, first, n, rows.length);
}

// § quests: a row a goal (D-706), newest first: a small diamond, gold once done, the goal (amber
// waiting, gold done), the reward it paid on its right, or under the how when there's no room
export function questsList(card, goals, place, start) {
  const w = rightOf(card) - nameX(card), top = card.y + ROWS_Y;
  const rows = questRows(goals, place, start).map((r) => {
    const goal = wrap(r.goal, w), how = wrap(r.how, w);
    const beside = !r.done || textWidth(goal[0]) + REWARD_GAP + textWidth(r.reward) <= w;
    return { ...r, lines: goal, hows: how, beside, h: (goal.length + how.length + (beside ? 0 : 1)) * ROW_H + QUEST_GAP };
  });
  return { rows, hs: rows.map((r) => r.h), top, h: card.y + card.h - top - 2 + QUEST_GAP };
}
// The quest's id under y, or null
export function questAt(card, goals, place, start, first, y) {
  const { rows, hs, top, h } = questsList(card, goals, place, start);
  first = clampFirst(first, hs, h);
  for (let i = first, ry = top, n = fitFrom(hs, first, h); i < first + n; ry += hs[i], i++) if (y >= ry - 2 && y < ry + hs[i] - 2) return rows[i].id;
  return null;
}
function drawQuests(c, card, goals, place, start, first) {
  const nx = nameX(card), right = rightOf(card), { rows, hs, top, h } = questsList(card, goals, place, start);
  if (!rows.length) { drawText(c, NO_GOALS, nx, top, GREY); return; }
  first = clampFirst(first, hs, h);
  const n = fitFrom(hs, first, h);
  for (let i = first, y = top; i < first + n; y += hs[i], i++) {
    const r = rows[i];
    drawDiamond(c, nx - MARK_W, y + 1, r.done ? GOLD : DIM);
    let ly = y;
    for (const l of r.lines) { drawText(c, l, nx, ly, r.done ? GOLD : AMBER); ly += ROW_H; }
    if (r.done && r.beside) drawText(c, r.reward, right - textWidth(r.reward), y, GREY);
    for (const l of r.hows) { drawText(c, l, nx, ly, GREY); ly += ROW_H; }
    if (r.done && !r.beside) drawText(c, r.reward, nx, ly, GREY);
  }
  drawBar(c, card, top, h, first, n, rows.length);
}
function drawDiamond(c, x, y, colour) {
  c.fillStyle = colour;
  c.fillRect(x + 2, y, 1, 1); c.fillRect(x + 1, y + 1, 3, 1); c.fillRect(x, y + 2, 5, 1); c.fillRect(x + 1, y + 3, 3, 1); c.fillRect(x + 2, y + 4, 1, 1);
}

// § lists: the open tab's rows' heights and window, for scrolling; null on Growth, or with no rows.
// p: { records, played, bestiary, goals }; state: the journey's; page: the creature's page open
export function listOf(card, tab, p, state, page) {
  if (tab === 'records') return recordsList(card, p.records, p.played);
  if (tab === 'feats') return featsList(card, p.records);
  if (tab === 'quests') return questsList(card, p.goals, state?.place, state?.start);
  if (tab === 'bestiary' && page) return pageRows(card, pageOf(p.bestiary, page));
  if (tab === 'bestiary') { const n = bestiaryRows(p.bestiary).length; return n ? bestiaryTables(card, n) : null; }
  return null;
}
// Draw the open list tab, scrolled to `first`
export function drawList(c, card, tab, p, state, first, { sprites = {}, beast = 0, page = null, glints = 0 } = {}) {
  if (tab === 'records') drawRecords(c, card, p.records, p.played, first);
  else if (tab === 'feats') drawFeats(c, card, p.records, p.bought, glints, first);
  else if (tab === 'quests') drawQuests(c, card, p.goals, state?.place, state?.start, first);
  else if (tab === 'bestiary' && page) drawPage(c, card, pageOf(p.bestiary, page), sprites[page], first);
  else if (tab === 'bestiary') drawBestiary(c, card, p.bestiary, sprites, beast, first);
}
