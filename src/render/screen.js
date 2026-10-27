// § screen: a small native canvas, enlarged with crisp pixels (ART-DIRECTION.md, "Grid and scale")
export const TILE = 16;
export const COLS = 11;
export const ROWS = 13;
export const W = COLS * TILE; // 176
export const H = ROWS * TILE; // 208, the room
export const LINE_H = 13; // the text line's strip under the room (D-094)
export const SCREEN_H = H + LINE_H; // 221, the room and its text line
export const HUD_H = 15; // the strip above the room for the hearts, depth and oil (D-198)
export const SIDE_W = 49; // sideways, the strip is a column this wide at the room's left (D-199)
export const LIST_H = 17; // upright, the creature list's row under the text line (D-357); sideways it is in the strip's column
export const BUTTON = 44; // a 44 px tap target (TECH.md)
export const BUTTON_GAP = 8; // 8 px from the picture
const ROW = BUTTON + BUTTON_GAP; // the buttons' column beside the picture (D-198, D-377)

// (canvas, hud, list) → { ctx, hudCtx, listCtx }: the room's canvas, the strip's above it and the list's below
export function createScreen(canvas, hud, list) {
  canvas.width = W; canvas.height = SCREEN_H;
  list.width = W; list.height = LIST_H;
  const ctx = canvas.getContext('2d'), hudCtx = hud.getContext('2d'), listCtx = list.getContext('2d');
  ctx.imageSmoothingEnabled = false; listCtx.imageSmoothingEnabled = false;
  const fit = () => fitCanvas(canvas, hud, hudCtx, list);
  addEventListener('resize', fit);
  fit();
  return { ctx, hudCtx, listCtx };
}

// § fit: the biggest zoom that fits the box, always sideways (D-377; was
// upright or sideways, D-199). The strip is a column at the room's left and
// the buttons stand beside the picture; the creature list's row under the
// text line stays hidden (D-357). A phone held upright shows the picture
// asking to turn it instead (src/input/upright.js).
// Each game pixel covers a whole number of screen pixels (2 or more), so
// all are the same size. Below 2 the zoom is fractional instead, so very
// small screens still fill the box.
function fitCanvas(canvas, hud, hudCtx, list) {
  const box = canvas.parentElement, bw = box.clientWidth, bh = box.clientHeight;
  const scale = zoom(Math.min((bw - 2 * ROW) / (SIDE_W + W), bh / SCREEN_H));
  if (hud.width !== SIDE_W || hud.height !== SCREEN_H) { hud.width = SIDE_W; hud.height = SCREEN_H; hudCtx.imageSmoothingEnabled = false; }
  for (const c of [canvas, hud, list]) { c.style.width = c.width * scale + 'px'; c.style.height = c.height * scale + 'px'; }
  list.style.display = 'none';
  box.style.flexDirection = 'row';
  hud.style.marginTop = '0';
}
function zoom(fitScale) {
  const dpr = devicePixelRatio || 1, whole = Math.floor(fitScale * dpr) / dpr;
  return whole * dpr >= 2 ? whole : Math.max(fitScale, 0.1);
}
