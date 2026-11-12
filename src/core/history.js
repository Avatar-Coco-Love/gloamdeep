// § history: every version, newest first (D-254): its number, date, a short
// title and its changelog lines, word for word. The Version history page in
// Settings shows it. Plain data, and the list's scrolling, with no drawing.
// The versions themselves are in history-all.js, loaded only when Version history first opens, so a
// start fetches 12 files and 328 KB fewer (H-23, D-868). `HISTORY` is filled in place, so every list
// that holds it sees them; a load that fails is tried again on the next open.
export const HISTORY = [];
let loading = null;
export const historyLoaded = () => HISTORY.length > 0;
export function loadHistory() {
  loading ??= import('./history-all.js').then(({ VERSIONS }) => { if (!HISTORY.length) HISTORY.push(...VERSIONS); }, (err) => { loading = null; throw err; });
  return loading;
}

// What a screen reader says for a version, with its lines while it is open
export const versionWords = (e, open) => (open ? `${e.v}, ${e.date}. ${e.title}. ${e.lines.join(' ')}` : `${e.v}, ${e.title}`);

// § scroll: in game pixels from the list's top; never past its ends
export const clampScroll = (s, contentH, viewH) => Math.max(0, Math.min(s, contentH - viewH));
// The scroll that shows rows a to b (b included) as far as they fit, moving as
// little as it can; when they don't all fit, row a stays at the top
export function scrollToShow(scroll, a, b, rowH, viewH, count) {
  let s = Math.max(scroll, (b + 1) * rowH - viewH);
  if (a * rowH < s) s = a * rowH;
  return clampScroll(s, count * rowH, viewH);
}
