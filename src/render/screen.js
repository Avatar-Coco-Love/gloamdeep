// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
import { MARGIN } from '../core/camera.js';

export const TILE = 16;
export const COLS = 11;
export const ROWS = 13;
export const W = COLS * TILE; // 176
export const H = ROWS * TILE; // 208, the menus' picture above its text line
export const LINE_H = 13; // the text line's strip under the room (D-094)
export const SCREEN_H = H + LINE_H; // 221, the room and its text line
export const LIST_H = 17; // upright, the creature list's row under the text line (D-357); sideways it is in the strip's column
export const BUTTON = 44; // a 44 px tap target (TECH.md)
export const BUTTON_GAP = 8; // 8 px from the picture
export const MAP_DISC = 104; // the round map's width, top right (D-383)
export const PAD_DISC = 128; // the arrow pad's width, bottom left (D-406)
export const LANTERN = 64; // the round lantern's width, bottom right (D-384)
export const ARC = 64; // from the lantern's middle to its arc's buttons' middles (D-384)
const ROW = BUTTON + BUTTON_GAP; // the buttons' column beside the picture (D-198, D-377)
export const VIEW_ROWS = 11; // the room's view is about this many tiles tall (D-381)
export const MIN_ROWS = 9; // a narrow room zooms in no further than this many tiles tall (D-444)
export const view = { w: W, h: H, scale: 1 }; // the screen layer's size in game pixels: the panel, plaques, text line and cards (D-444), and its zoom, set by the fit
export const roomView = { w: W, h: H }; // the room canvas's size in game pixels, zoomed in for a narrow room (D-441)
export const GLIDE_MS = 400; // the room's zoom glides to a new room's this long (D-448)
const roomSize = { cols: 0, rows: 0 }; // the room in play, in tiles (0 on the title)
let refit = null, titled = false; // the fit, and whether the room canvas is zoomed as the picture (the title's scene)
let shownZoom = 0, glide = null; // the room canvas's zoom last fitted, and { from, start } while it glides (D-448)

// (canvas, list, room, hud) → { ctx, listCtx, roomCtx, hudCtx }: the menus' picture, the list's row
// below it, the room's canvas filling the screen behind them (D-381), and the screen
// layer between them, at the room's old zoom however the room zooms (D-444)
export function createScreen(canvas, list, room, hud) {
  canvas.width = W; canvas.height = SCREEN_H;
  list.width = W; list.height = LIST_H;
  const ctx = canvas.getContext('2d'), listCtx = list.getContext('2d'), roomCtx = room.getContext('2d', { willReadFrequently: true }); // the light reads its pixels back every frame (D-427)
  const hudCtx = hud.getContext('2d');
  ctx.imageSmoothingEnabled = false; listCtx.imageSmoothingEnabled = false;
  const fit = () => { fitCanvas(canvas, list); fitRoom(room, roomCtx, hud, hudCtx, canvas); };
  refit = fit;
  addEventListener('resize', fit);
  fit();
  return { ctx, listCtx, roomCtx, hudCtx };
}

// § fit: the menus' picture gets the biggest zoom that fits the box, held
// either way (D-505), clear of the buttons at the sides; upright, nothing
// stands beside it, so it fills the width as play does, with FOOT left under
// it for the title's row of round buttons and the Seed Explorer (D-506), and
// as much over it, as it stands in the middle. The hearts, oil and
// the creature list are on the room (D-378), so the list's row under the text
// line stays hidden (D-357).
// Each game pixel covers a whole number of screen pixels (2 or more), so
// all are the same size. Below 2 the zoom is fractional instead, so very
// small screens still fill the box.
export const FOOT = 52; // upright, the room under the picture (D-506)
const pictureZoom = (bw, bh) => bh > bw ? zoom(Math.min(bw / W, bh / (SCREEN_H + 2 * FOOT))) : zoom(Math.min((bw - 2 * ROW) / W, bh / SCREEN_H));
function fitCanvas(canvas, list) {
  const box = canvas.parentElement, scale = pictureZoom(box.clientWidth, box.clientHeight);
  for (const c of [canvas, list]) { c.style.width = c.width * scale + 'px'; c.style.height = c.height * scale + 'px'; }
  list.style.display = 'none';
}
function zoom(fitScale) {
  const dpr = devicePixelRatio || 1, whole = Math.floor(fitScale * dpr) / dpr;
  return whole * dpr >= 2 ? whole : Math.max(fitScale, 0.1);
}

// § room fit: the room fills the whole box behind the menus (D-381), zoomed so
// about VIEW_ROWS tiles show across the screen's short side, however the phone
// is held, so a tile is the same size upright and sideways (D-505); the long
// side follows the screen. A room shorter than the long side zooms in further,
// until it and a margin each end fill it (D-441), but never past MIN_ROWS
// tiles across the short side (D-444): its width sideways, its height upright.
// The screen layer keeps the VIEW_ROWS zoom, so the panel and cards keep their size.
// The same whole-pixel zoom as the picture's, so a little more can show.
// On the title's screens both take the picture's own zoom instead, so the
// title's scene fills the whole screen, pixel for pixel with the picture.
function fitRoom(room, roomCtx, hud, hudCtx, picture) {
  const box = room.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const short = Math.min(bw, bh), long = Math.max(bw, bh), along = bw >= bh ? roomSize.cols : roomSize.rows;
  const base = titled ? pictureZoom(bw, bh) : zoom(short / (VIEW_ROWS * TILE));
  const near = titled || !along ? base
    : zoom(Math.max(short / (VIEW_ROWS * TILE), Math.min(long / (along * TILE + 2 * MARGIN), short / (MIN_ROWS * TILE))));
  fitLayer(hud, hudCtx, base, view, picture);
  shownZoom = glidingTo(near);
  fitLayer(room, roomCtx, shownZoom, roomView, picture);
}
// § glide: into a room of another width, the zoom eases from the old room's to the new one's,
// starting and landing gently, so most of it shows as the new room brightens (D-448). Between
// whole zooms the pixels are a hair uneven for that moment.
function glidingTo(near) {
  const k = glide ? (performance.now() - glide.start) / GLIDE_MS : 1;
  if (k >= 1) { glide = null; return near; }
  return glide.from + (near - glide.from) * k * k * (3 - 2 * k);
}
function fitLayer(c, cx, scale, size, picture) {
  const box = c.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  let w = Math.max(1, Math.floor(bw / scale)), h = Math.max(1, Math.floor(bh / scale));
  let left = Math.round((bw - w * scale) / 2), top = Math.round((bh - h * scale) / 2);
  if (titled) { // its pixels on the picture's, so the scene goes on across the picture's edge
    const r = picture.getBoundingClientRect(), b = box.getBoundingClientRect();
    left = ((r.left - b.left) % scale) - scale; top = ((r.top - b.top) % scale) - scale;
    w = Math.ceil((bw - left) / scale); h = Math.ceil((bh - top) / scale);
  }
  if (w !== c.width || h !== c.height) { c.width = w; c.height = h; cx.imageSmoothingEnabled = false; }
  size.w = w; size.h = h; size.scale = scale;
  const s = c.style;
  s.width = w * scale + 'px'; s.height = h * scale + 'px';
  s.left = left + 'px'; s.top = top + 'px';
}

// § title fit: on (the title's screens) or off (play); the room canvas fits again when it changes
export function fitTitle(on) {
  if (on === titled) return;
  titled = on; glide = null;
  if (on) { roomSize.cols = 0; roomSize.rows = 0; } // back in play, the room's zoom starts where it belongs, no glide
  refit?.();
}

// § room size: the room in play, its width and height in tiles; the room canvas fits again when it changes
// (D-441, D-505), its zoom gliding there unless `ease` is off (reduced motion), then every frame of the glide (D-448)
export function fitRoomSize(cols, rows, ease = true) {
  if (cols === roomSize.cols && rows === roomSize.rows) { if (glide) refit?.(); return; }
  glide = ease && roomSize.cols && shownZoom ? { from: shownZoom, start: performance.now() } : null;
  roomSize.cols = cols; roomSize.rows = rows;
  refit?.();
}
