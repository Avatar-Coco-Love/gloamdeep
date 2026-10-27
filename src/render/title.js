// § title: the title screen, the lantern in the dark (D-181). Pitch black,
// the hero on crypt floor in the lantern's dithered light, the name glowing
// warm above, carved, and a small flame marking the chosen line. Drawn with the
// game's own tiles, sprite, light and font.
import { makeRoom } from '../core/room.js';
import { LANTERN, LANTERN_AT } from '../core/light.js';
import { reach } from '../core/oil.js';
import { W, H, TILE, view } from './screen.js';
import { drawRoom } from './tiles.js';
import { drawHero } from './sprites.js';
import { drawLight, flicker } from './light.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawLines, drawHeading, LINE_GAP } from './menu.js';

const K = '#0e0c16', GOLD = '#ffd66b', EMBER = '#f39a3b', CORE = '#fff5d6', GREY = '#9790a4';
const NAME = 'Gloamdeep', NAME_Y = 28, NAME_SCALE = 2; // the name at double size
const HERO = { x: 5, y: 6 }; // the middle of the room, in tiles
const LIGHT_OIL = 0.5; // a half-full lantern: the light stays between the name and the menu
export const MENU_Y = 166; // the first menu line's top
// A longer page (Settings) starts higher, so its last line stays where a 3-line menu's does
export const titleTop = (count) => Math.min(MENU_Y, MENU_Y - (count - 3) * LINE_GAP);
// Each line past 5 lifts the hero and light one tile, clear of the page's heading (D-249, D-254)
export const heroRow = (count) => HERO.y - Math.max(0, count - 5);

// § scene: the floor, drawn once per screen size; no tile is remembered, so
// only the light shows it. It fills the whole room canvas behind the picture
// (`view`), its tiles lined up with the picture's, so no box shows around it.
let scene = null, name = null;
function paint(cols, rows) {
  const room = makeRoom(Array.from({ length: rows }, () => '.'.repeat(cols)));
  const floor = document.createElement('canvas');
  floor.width = cols * TILE; floor.height = rows * TILE;
  drawRoom(floor.getContext('2d'), room);
  scene = { cols, rows, room, floor, unseen: new Uint8Array(cols * rows) };
}
// § name: carved (D-186): a dark outline all round and an ember edge
// underneath, drawn small once, then doubled with crisp pixels
function carve() {
  const w = textWidth(NAME), small = document.createElement('canvas');
  small.width = w + 2; small.height = FONT_H + 3;
  const s = small.getContext('2d');
  for (let dx = 0; dx <= 2; dx++) for (let dy = 0; dy <= 3; dy++) drawText(s, NAME, dx, dy, K);
  drawText(s, NAME, 1, 2, EMBER);
  drawText(s, NAME, 1, 1, GOLD);
  name = small;
}

const lights = [{ ...LANTERN, x: 0, y: 0, r: 0 }]; // reused every frame (TECH.md)
// c: the room canvas, `view` big; count: the page's lines; still: prefers-reduced-motion;
// ox, oy: the picture's top left on it, so the hero stands where the picture puts them
export function drawScene(c, count, t, still, ox, oy) {
  const sx = (ox % TILE) - TILE, sy = (oy % TILE) - TILE; // the floor's top left, the picture's tiles lined up
  const cols = Math.ceil((view.w - sx) / TILE), rows = Math.ceil((view.h - sy) / TILE);
  if (!scene || scene.cols !== cols || scene.rows !== rows) paint(cols, rows);
  c.fillStyle = K; c.fillRect(0, 0, view.w, view.h);
  c.drawImage(scene.floor, sx, sy);
  const hx = ox + HERO.x * TILE, hy = oy + heroRow(count) * TILE;
  drawHero(c, hx, hy);
  const L = lights[0];
  L.x = hx - sx + LANTERN_AT.x; L.y = hy - sy - 2 + LANTERN_AT.y; // in the floor's pixels
  L.r = reach(LIGHT_OIL) * (still ? 1 : flicker(t, 1.7, 0.035));
  drawLight(c, scene.room, lights, scene.unseen, { x: -sx, y: -sy });
  c.fillStyle = CORE; c.fillRect(L.x + sx, L.y + sy, 1, 1); // the flame's core is always bright
}

// The name and the page's lines on the picture, over the scene (drawScene).
// menu: [{ text }]; chosen: its index; still: prefers-reduced-motion; heading: a page's name (Settings);
// note: a grey line in the strip under the menu (the Are you sure page's)
export function drawTitle(c, menu, chosen, t, still, heading = null, note = null) {
  if (!name) carve();
  c.drawImage(name, Math.floor((W - name.width * NAME_SCALE) / 2), NAME_Y, name.width * NAME_SCALE, name.height * NAME_SCALE);
  const top = titleTop(menu.length);
  if (heading) drawHeading(c, heading, top);
  drawLines(c, menu, chosen, top, t, still);
  if (note) drawText(c, note, Math.floor((W - textWidth(note)) / 2), H + 2, GREY); // where the text line speaks in play
}
