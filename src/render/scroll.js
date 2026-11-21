// § scroll (D-1011): a grid of whole rows in a window shorter than it. A finger's drag moves
// it, giving a little past either end; let go, it glides on and slows, then settles with whole
// rows in the window (the gentle snap), on a critically damped spring so it never jolts. The
// wheel and the arrows glide it a row at a time. The thin bar beside it lights while it moves.
// The scroller is the card's own, kept on `app`, not in the game's state; it counts game
// pixels and milliseconds, and `max` is how far it scrolls, `pitch` a row's height with its gap.
export const OMEGA = 0.0125; // the spring's speed, per ms: settles in about a third of a second
const MAX_V = 2; // the fastest flick, game px per ms
const GIVE = 0.7; // past an end, a drag moves it this power of the way
const TRAIL_MS = 80; // a flick's speed is measured over its last this many ms
const CATCH_V = 0.03; // a touch on a grid gliding faster than this only stops it
const LIT_MS = [60, 500]; // the bar lights this fast, and fades this slowly

export const scroller = () => ({ y: 0, v: 0, rest: 0, moving: false, held: null, bar: false, lit: 0, last: null });
const clamp = (y, max) => Math.min(max, Math.max(0, y));
export const snap = (y, max, pitch) => clamp(Math.round(y / pitch) * pitch, max);
const aim = (s) => (s.moving ? s.rest : s.y); // where it is heading
export function settle(s, to) { s.rest = to; s.moving = true; }

// § finger: down, drag, let go. grab gives whether the touch caught a glide, so isn't a tap
export function grab(s, y, t) {
  const caught = s.moving && Math.abs(s.v) > CATCH_V;
  s.moving = false; s.v = 0;
  s.held = { y0: y, from: s.y, trail: [{ y, t }], caught, started: false };
  return caught;
}
export function drag(s, y, t, max) {
  const h = s.held;
  if (!h) return;
  if (!h.started) { h.started = true; h.y0 = y; h.from = s.y; h.trail = [{ y, t }]; } // from where the drag began, not the touch
  let to = h.from - (y - h.y0);
  if (to < 0) to = -((-to) ** GIVE);
  else if (to > max) to = max + (to - max) ** GIVE;
  s.y = to;
  h.trail.push({ y, t });
  while (h.trail.length > 2 && t - h.trail[0].t > TRAIL_MS) h.trail.shift();
}
// A drag let go: the flick's speed carries it on, to the row nearest where the glide would end
export function release(s, max, pitch) {
  const h = s.held;
  s.held = null;
  if (!h) return;
  const a = h.trail[0], b = h.trail[h.trail.length - 1];
  const v = b.t > a.t ? -(b.y - a.y) / (b.t - a.t) : 0;
  s.v = Math.max(-MAX_V, Math.min(MAX_V, v));
  settle(s, snap(s.y + s.v * 2 / OMEGA, max, pitch));
}
// A touch lifted without a drag: it settles where it is; true when it caught a glide
export function letGo(s, max, pitch) {
  const caught = !!s.held?.caught;
  s.held = null;
  settle(s, snap(s.y, max, pitch));
  return caught;
}

// § rows: the wheel's notch or a page, `by` rows down; and row [top, bottom) kept in a window `win` tall
export const nudge = (s, by, max, pitch) => settle(s, snap(aim(s) + by * pitch, max, pitch));
export function keepInView(s, top, bottom, win, max, pitch) {
  const from = aim(s);
  if (top < from) settle(s, snap(top, max, pitch));
  else if (bottom > from + win) settle(s, snap(bottom - win, max, pitch));
}

// § time: the spring moves it on to `rest`, frame by frame; a window resized, or a bag grown
// or shrunk, settles it back onto a whole row inside its reach
export function stepScroll(s, t, max, pitch) {
  const dt = s.last === null ? 16 : Math.min(32, Math.max(0, t - s.last));
  s.last = t;
  if (!s.held && !s.moving && s.y !== snap(s.y, max, pitch)) settle(s, snap(s.y, max, pitch));
  if (s.moving && !s.held) {
    if (s.rest !== snap(s.rest, max, pitch)) s.rest = snap(s.rest, max, pitch);
    s.v += (OMEGA * OMEGA * (s.rest - s.y) - 2 * OMEGA * s.v) * dt;
    s.y += s.v * dt;
    if (Math.abs(s.rest - s.y) < 0.2 && Math.abs(s.v) < 0.005) { s.y = s.rest; s.v = 0; s.moving = false; }
  }
  const on = s.held || s.moving ? 1 : 0;
  s.lit += (on - s.lit) * Math.min(1, dt / LIT_MS[on ? 0 : 1]);
}
