// § map card (D-395; was a box over the room under its veil, D-205): the map opens as a
// glass card like the bag's (D-385), "MAP" in ember top left and the round cross that
// closes it. Between them, centred, "DEPTH 3" and the area's name between an up arrow
// and a down arrow that turn the map a floor, ember while there is a floor that way,
// else greyed (D-206). Each room is
// drawn small from the tiles remembered: floors in the floor's grey, walls
// beside them in the brick's top edge, found stairs in their violet, the
// hero a blinking gold dot on their own floor (still with reduced motion), each
// bag where you fell a leather brown dot (MO3, D-345).
// Rooms sit a tile apart, a dark seam between them, and a pale blue line
// bridges each doorway found (D-224). It scrolls and zooms in its window under the
// card's rule (the view, core/map.js).
// In the Seed Explorer (D-214) the same card sits on the title's scene, a row at its
// foot: Back a button on its left, Type and Reseed on its right, the seed in gold
// between them; the window is shorter.
import { drawText, textWidth } from './font.js';
import { cardAt, drawCard, drawButton, inCard, onCross, BUTTON, PAD } from './bag.js';
import { markAt, aroundHero } from '../core/map.js';
import { areaAt } from '../core/room.js';

const EMBER = '#f39a3b', GOLD = '#ffd66b', DIM = '#46405a';
const SHOWN = { floor: '#363b48', wall: '#69748b', stairs: '#a58ce0' }; // ART-DIRECTION.md
// Walls in each room's own tone, and the heading's area name in its floor's (D-233):
// crypt brick, cave rock, warren earth, the dungeon's cold blue (D-229), woods green
const TONE = { crypt: '#69748b', rock: '#7a8396', earth: '#8e7a62', dungeon: '#4c5a84', woods: '#4f8a3f' };
const wallOf = (room) => TONE[room.look] || SHOWN.wall;
const BAG = '#9a7350'; // the bag where you fell, in its leather brown (MO3, D-345)
const DOOR = '#a6e0e4'; // the cloak's pale blue, not the stairs' violet or the lantern's amber
const RULE = 20, TOP = 26, INSET = 8; // the card's rule under its heading; the window's top and sides inside the card
const GAP = 4; // between "DEPTH 3" and each arrow, and between Type and Reseed

// § layout: on a view `vw` × `vh`, the card, the map's window and, in the Explorer, its
// buttons' row: { y, back, type, reseed }, each button { x, w }, just wide enough for its word
const wide = (text) => textWidth(text) + 8;
export function mapLayout(vw, vh, explore = false) {
  const card = cardAt(vw, vh), bottom = card.y + card.h;
  const row = explore ? bottom - PAD - BUTTON.h : bottom - INSET + GAP;
  const win = { x: card.x + INSET, y: card.y + TOP, w: card.w - 2 * INSET, h: row - GAP - card.y - TOP };
  if (!explore) return { card, win, bar: null };
  const reseed = { x: card.x + card.w - PAD - wide('RESEED'), w: wide('RESEED') };
  const type = { x: reseed.x - GAP - wide('TYPE'), w: wide('TYPE') };
  return { card, win, bar: { y: row, back: { x: card.x + PAD, w: wide('BACK') }, type, reseed } };
}

// What a tap at x, y on the room's canvas picks: 'out' outside the card, 'close' (the round
// cross), 'up' or 'down' in the heading's left or right half, in the Explorer 'back', 'type'
// or 'reseed' anywhere in its row (the nearest button on its side of the seed, so no tap is
// lost), else null
export function mapCardAt(x, y, vw, vh, explore = false) {
  const { card, bar } = mapLayout(vw, vh, explore);
  if (!inCard(card, x, y)) return 'out';
  if (onCross(card, x, y)) return 'close';
  if (y < card.y + RULE) return x < card.x + card.w / 2 ? 'up' : 'down';
  if (!bar || y < bar.y - GAP) return null;
  if (x < bar.back.x + bar.back.w + GAP) return 'back';
  if (x >= bar.reseed.x - 1) return 'reseed';
  if (x >= bar.type.x - GAP) return 'type';
  return null;
}
function arrow(c, x, y, down, colour) { // 5 × 3, pointing up or down
  c.fillStyle = colour;
  for (let i = 0; i < 3; i++) c.fillRect(x + i, down ? y + i : y + 2 - i, 5 - 2 * i, 1);
}

// The plan drawn into its own canvas at k pixels per tile, again when k changes
const drawn = document.createElement('canvas');
let plan = null, k = 0;
export function setMap(next) { plan = next; k = 0; }
function redraw(at) { k = at; drawPlan(drawn, plan, k); }
// A plan's rooms and doorways drawn into canvas `into`, sized to it, at k pixels per tile;
// the round map's too (D-383)
export function drawPlan(into, plan, k) {
  into.width = plan.cols * k; into.height = plan.rows * k;
  const c = into.getContext('2d');
  for (const { x: ox, y: oy, room, seen } of plan.rooms) {
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
      const mark = markAt(room, seen, x, y);
      if (mark) { c.fillStyle = mark === 'wall' ? wallOf(room) : SHOWN[mark]; c.fillRect((ox + x) * k, (oy + y) * k, k, k); }
    }
  }
  c.fillStyle = DOOR;
  for (const { x, y } of plan.doors) c.fillRect(x * k, y * k, k, k);
}
// The hero's blinking gold dot and each bag where you fell, on a plan drawn at mx, my, k pixels a tile
function drawMarks(c, plan, mx, my, k, t, still) {
  c.fillStyle = BAG;
  for (const b of plan.bags || []) c.fillRect(mx + b.x * k, my + b.y * k, k, k);
  if (plan.hero && (still || Math.floor(t / 400) % 2 === 0)) { c.fillStyle = GOLD; c.fillRect(mx + plan.hero.x * k, my + plan.hero.y * k, k, k); }
}

// § round map: the floor around the hero, the hero in the middle, on the round
// map top right (D-383): `drawn` the plan from drawPlan at k pixels a tile, c the
// round map's own canvas, cleared so its glass shows where nothing is found
export function drawRoundMap(c, plan, drawn, k, t, still) {
  const n = c.canvas.width, { x: mx, y: my } = aroundHero(plan, n, k);
  c.clearRect(0, 0, n, n);
  c.drawImage(drawn, mx, my);
  drawMarks(c, plan, mx, my, k, t, still);
}

// The Explorer's row: bar the layout's; seed the seed shown, back whether Back has a seed to go to
function drawBar(c, bar, seed, back) {
  drawButton(c, bar.back.x, bar.y, 'BACK', !back, bar.back.w);
  drawButton(c, bar.type.x, bar.y, 'TYPE', false, bar.type.w);
  drawButton(c, bar.reseed.x, bar.y, 'RESEED', false, bar.reseed.w);
  const text = `SEED ${seed}`, left = bar.back.x + bar.back.w, right = bar.type.x;
  drawText(c, text, Math.floor((left + right - textWidth(text)) / 2), bar.y + 3, GOLD);
}

// c: the room's canvas, `vw` × `vh`; view: { k, x, y } (core/map.js); turns: { up, down },
// whether each arrow turns the map; explore: the Explorer's seed and Back ({ seed, back },
// drawBar), or null in the game
export function drawMap(c, vw, vh, view, t, still, turns, explore = null) {
  if (view.k !== k) redraw(view.k);
  const { card, win, bar } = mapLayout(vw, vh, !!explore);
  drawCard(c, vw, vh, 'MAP', 0);
  // As the strip says it (D-209), then the area's name in its tone (D-233)
  const depth = plan.depth === 0 ? 'SURFACE' : `DEPTH ${plan.depth}`, area = areaAt(plan.depth);
  const name = area ? ` · ${area.area}` : '', head = depth + name;
  const hx = card.x + Math.floor((card.w - textWidth(head)) / 2), hy = card.y + 7;
  drawText(c, depth, hx, hy, EMBER);
  if (area) drawText(c, name, hx + textWidth(depth), hy, TONE[area.look]);
  arrow(c, hx - GAP - 5, hy + 2, false, turns.up ? EMBER : DIM);
  arrow(c, hx + textWidth(head) + GAP, hy + 2, true, turns.down ? EMBER : DIM);
  if (bar) drawBar(c, bar, explore.seed, explore.back);
  c.save();
  c.beginPath(); c.rect(win.x, win.y, win.w, win.h); c.clip();
  const mx = win.x - view.x, my = win.y - view.y;
  c.drawImage(drawn, mx, my);
  drawMarks(c, plan, mx, my, k, t, still);
  c.restore();
}
