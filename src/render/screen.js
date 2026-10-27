// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
export const TILE = 16;
export const COLS = 11;
export const ROWS = 13;
export const W = COLS * TILE; // 176
export const H = ROWS * TILE; // 208, the room
export const LINE_H = 13; // the text line's strip under the room (D-094)
export const SCREEN_H = H + LINE_H; // 221, the room and its text line
export const LIST_H = 17; // upright, the creature list's row under the text line (D-357); sideways it is in the strip's column
export const BUTTON = 44; // a 44 px tap target (TECH.md)
export const BUTTON_GAP = 8; // 8 px from the picture
const ROW = BUTTON + BUTTON_GAP; // the buttons' column beside the picture (D-198, D-377)

// (canvas, list) → { ctx, listCtx }: the room's canvas and the list's below
export function createScreen(canvas, list) {
  canvas.width = W; canvas.height = SCREEN_H;
  list.width = W; list.height = LIST_H;
  const ctx = canvas.getContext('2d'), listCtx = list.getContext('2d');
  ctx.imageSmoothingEnabled = false; listCtx.imageSmoothingEnabled = false;
  const fit = () => fitCanvas(canvas, list);
  addEventListener('resize', fit);
  fit();
  return { ctx, listCtx };
}

// § fit: the biggest zoom that fits the box, always sideways (D-377; was
// upright or sideways, D-199). The buttons stand beside the picture; the
// hearts, oil and the creature list are on the room (D-378), so the list's
// row under the text line stays hidden (D-357). A phone held upright shows the picture
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
