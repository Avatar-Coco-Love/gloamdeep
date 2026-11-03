// § wiped canvases (D-588): Android's browser can wipe a canvas's pixels while the app is in the
// background, so the hero and the tiles came back blank. A canvas that is drawn once and kept says
// how it is drawn (`keep`), and is drawn again when the browser hands it back (contextrestored).
// A cache that is only emptied, to be made again when next needed, gives `onWipe` its emptying.
// When the page shows again, `checks` look for a kept canvas gone blank, in case no event came.
const kept = []; // [canvas, paint], in the order made, so a mirror is painted after its sprite
const fixes = [], checks = [];
let due = false;

// Paints canvas `cv` with paint(cv), now and after every wipe; at, [x, y]: a pixel paint always
// colours, looked at when the page shows again (none: not looked at)
export function keep(cv, paint, at = null) {
  paint(cv);
  kept.push([cv, paint]);
  watch(cv);
  if (at) checks.push(() => blankAt(cv, at[0], at[1]));
  return cv;
}
export function onWipe(fix) { fixes.push(fix); }
// check(): true when what it looks after was wiped
export function onCheck(check) { checks.push(check); }
// A canvas whose being handed back blank redraws everything kept
export function watch(cv) { cv.addEventListener?.('contextrestored', soon); return cv; }

export function redrawAll() {
  for (const [cv, paint] of kept) { cv.getContext('2d').clearRect(0, 0, cv.width, cv.height); paint(cv); }
  for (const fix of fixes) fix();
}
// Many canvases are handed back at once: one redraw for them all
function soon() {
  if (due) return;
  due = true;
  setTimeout(() => { due = false; redrawAll(); }, 0);
}
// Whether a pixel reads see-through; a canvas still lost reads as not blank, as its
// contextrestored will redraw it
export function blankAt(cv, x, y) {
  const c = cv.getContext('2d');
  if (c.isContextLost?.()) return false;
  try { return c.getImageData(x, y, 1, 1).data[3] === 0; } catch { return false; }
}
export function checkWiped() {
  if (checks.some((check) => check())) redrawAll();
}
if (typeof document !== 'undefined') document.addEventListener?.('visibilitychange', () => { if (!document.hidden) checkWiped(); });
