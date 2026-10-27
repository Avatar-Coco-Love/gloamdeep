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
const ROW = BUTTON + BUTTON_GAP; // the buttons' column beside the picture (D-198, D-377)
export const VIEW_ROWS = 11; // the room's view is about this many tiles tall (D-381)
export const view = { w: W, h: H }; // the room canvas's size in game pixels, set by the fit

// (canvas, list, room) → { ctx, listCtx, roomCtx }: the menus' picture, the list's row
// below it, and the room's canvas filling the screen behind them (D-381)
export function createScreen(canvas, list, room) {
  canvas.width = W; canvas.height = SCREEN_H;
  list.width = W; list.height = LIST_H;
  const ctx = canvas.getContext('2d'), listCtx = list.getContext('2d'), roomCtx = room.getContext('2d');
  ctx.imageSmoothingEnabled = false; listCtx.imageSmoothingEnabled = false;
  const fit = () => { fitCanvas(canvas, list); fitRoom(room, roomCtx); };
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
function fitCanvas(canvas, list) {
  const box = canvas.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const scale = zoom(Math.min((bw - 2 * ROW) / W, bh / SCREEN_H));
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
function fitRoom(room, roomCtx) {
  const box = room.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const scale = zoom(bh / (VIEW_ROWS * TILE));
  const w = Math.max(1, Math.floor(bw / scale)), h = Math.max(1, Math.floor(bh / scale));
  if (w !== room.width || h !== room.height) { room.width = w; room.height = h; roomCtx.imageSmoothingEnabled = false; }
  view.w = w; view.h = h;
  const s = room.style;
  s.width = w * scale + 'px'; s.height = h * scale + 'px';
  s.left = Math.round((bw - w * scale) / 2) + 'px'; s.top = Math.round((bh - h * scale) / 2) + 'px';
}
