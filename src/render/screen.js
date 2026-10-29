// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
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
export const view = { w: W, h: H }; // the room canvas's size in game pixels, set by the fit
let refit = null, titled = false; // the fit, and whether the room canvas is zoomed as the picture (the title's scene)

// (canvas, list, room) → { ctx, listCtx, roomCtx }: the menus' picture, the list's row
// below it, and the room's canvas filling the screen behind them (D-381)
export function createScreen(canvas, list, room) {
  canvas.width = W; canvas.height = SCREEN_H;
  list.width = W; list.height = LIST_H;
  const ctx = canvas.getContext('2d'), listCtx = list.getContext('2d'), roomCtx = room.getContext('2d', { willReadFrequently: true }); // the light reads its pixels back every frame (D-427)
  ctx.imageSmoothingEnabled = false; listCtx.imageSmoothingEnabled = false;
  const fit = () => { fitCanvas(canvas, list); fitRoom(room, roomCtx, canvas); };
  refit = fit;
  addEventListener('resize', fit);
  fit();
  return { ctx, listCtx, roomCtx };
}

// § fit: the menus' picture gets the biggest zoom that fits the box, always
// sideways (D-377; was upright or sideways, D-199), clear of the buttons at
// the sides. The hearts, oil and the creature list are on the room (D-378),
// so the list's row under the text line stays hidden (D-357). A phone held upright shows the picture
// asking to turn it instead (src/input/upright.js).
// Each game pixel covers a whole number of screen pixels (2 or more), so
// all are the same size. Below 2 the zoom is fractional instead, so very
// small screens still fill the box.
const pictureZoom = (bw, bh) => zoom(Math.min((bw - 2 * ROW) / W, bh / SCREEN_H));
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
// about VIEW_ROWS tiles show from top to bottom; the width follows the screen.
// The same whole-pixel zoom as the picture's, so a few more rows can show.
// On the title's screens it takes the picture's own zoom instead, so the
// title's scene fills the whole screen, pixel for pixel with the picture.
function fitRoom(room, roomCtx, picture) {
  const box = room.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const scale = titled ? pictureZoom(bw, bh) : zoom(bh / (VIEW_ROWS * TILE));
  let w = Math.max(1, Math.floor(bw / scale)), h = Math.max(1, Math.floor(bh / scale));
  let left = Math.round((bw - w * scale) / 2), top = Math.round((bh - h * scale) / 2);
  if (titled) { // its pixels on the picture's, so the scene goes on across the picture's edge
    const r = picture.getBoundingClientRect(), b = box.getBoundingClientRect();
    left = ((r.left - b.left) % scale) - scale; top = ((r.top - b.top) % scale) - scale;
    w = Math.ceil((bw - left) / scale); h = Math.ceil((bh - top) / scale);
  }
  if (w !== room.width || h !== room.height) { room.width = w; room.height = h; roomCtx.imageSmoothingEnabled = false; }
  view.w = w; view.h = h;
  const s = room.style;
  s.width = w * scale + 'px'; s.height = h * scale + 'px';
  s.left = left + 'px'; s.top = top + 'px';
}

// § title fit: on (the title's screens) or off (play); the room canvas fits again when it changes
export function fitTitle(on) {
  if (on === titled) return;
  titled = on;
  refit?.();
}
