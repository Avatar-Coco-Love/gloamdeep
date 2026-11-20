// § boss bar (Q-112, D-957, D-959, D-1004): the Lampeater's name and hearts, top middle, below
// anything there, while its way in is sealed (core/beaten.js, bossFight). On the glass of the text line: its
// name in bone white, under it a thin bar from the eyes' pink to the haze's violet, emptying as it
// is hurt. A blow's loss turns pale, waits a moment, then drains away; a blow that sinks into it
// flickers the bar grey and leaves it full. Beaten, the last loss drains to empty and the bar fades.
// With reduced motion: no pale piece, no flicker (grey a moment, steady), no fades. The timing is
// kept here, never in the core: real time never touches the game's state or saves.
import { view } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawGlass } from './glass.js';

const PINK = '#e8786a', VIOLET = '#8a6cc8', TRACK = '#1d1729', PALE = '#efe6cc', GREY = '#9790a4', NAME = '#efe6cc';
export const BAR_W = 96, BAR_H = 3; // the bar's length and thickness, in the screen layer's pixels
const PAD = 3, GAP = 1; // in from the glass's edge; between the name and the bar
export const BOX_H = 2 + FONT_H + GAP + BAR_H + 2 + 2; // the glass's height: the name, the bar and its track's edge
export const HOLD_MS = 250, DRAIN_MS = 500, SINK_MS = 400, BLINK_MS = 100, FADE_MS = 400;

const mixHex = (a, b, k) => `#${[1, 3, 5].map((i) => Math.round(parseInt(a.slice(i, i + 2), 16) * (1 - k) + parseInt(b.slice(i, i + 2), 16) * k).toString(16).padStart(2, '0')).join('')}`;
const RAMP = Array.from({ length: BAR_W }, (_, i) => mixHex(PINK, VIOLET, i / (BAR_W - 1))); // a colour a pixel column

// (top, clear) → where the glass sits: centred, at `top`, and below each of `clear`'s areas it
// would overlap (the panel, pause and the wrench on an upright phone, D-1004), in the screen layer's pixels
export function barBox(top, clear = []) {
  const w = BAR_W + 2 * PAD, x = Math.floor((view.w - w) / 2);
  let y = top;
  for (const a of [...clear].sort((p, q) => p.y - q.y)) {
    if (a.w && a.x < x + w && a.x + a.w > x && a.y < y + BOX_H && a.y + a.h > y) y = Math.ceil(a.y + a.h) + 2;
  }
  return { x, y, w, h: BOX_H };
}

// (shown, health, max) → the drawn bar's parts: how much is full, how much pale behind it, in
// pixels. `pale` is the health the pale piece reaches back to, from the loss's timing
export const barParts = (health, pale, max) => ({ full: Math.round(BAR_W * health / max), pale: Math.round(BAR_W * Math.max(health, pale) / max) });

// (from, to, since, still) → the pale piece's health now: held, then draining to `to`
export function paleAt(from, to, since, still) {
  if (still || since >= HOLD_MS + DRAIN_MS) return to;
  if (since <= HOLD_MS) return from;
  return from + (to - from) * ((since - HOLD_MS) / DRAIN_MS);
}

export function createBossBar() {
  let shown = null, pale = null, sinkAt = -Infinity, seen = null, from = 0, alpha = 0, ending = null, t0 = 0;
  // fight: core's bossFight(state) or null; events: the state's events, to catch a sunk blow and the last one; box: barBox's
  return {
    draw(c, fight, events, t, still, under, box) {
      const dt = t - t0; t0 = t;
      if (events !== seen) { // a new action
        seen = events;
        if (fight && events?.some((e) => e.type === 'hit' && e.sank && e.id === fight.id)) sinkAt = t;
        if (!fight && shown && events?.some((e) => e.type === 'beat' && e.id === shown.id)) ending = { from: shown.health, at: t }; // beaten: the last loss drains to empty
      }
      if (fight) {
        if (!shown || shown.id !== fight.id) { pale = null; alpha = still ? 1 : 0; }
        else if (fight.health < shown.health) pale = { from: pale ? paleAt(pale.from, shown.health, t - pale.at, still) : shown.health, at: t };
        shown = fight; ending = null;
      } else if (!ending) { shown = null; pale = null; return; } // left, or fallen: gone at once
      const goal = ending ? (still || t - ending.at > HOLD_MS + DRAIN_MS ? 0 : 1) : under;
      alpha = still ? goal : alpha + Math.sign(goal - alpha) * Math.min(Math.abs(goal - alpha), dt / FADE_MS);
      if (ending && alpha <= 0) { shown = null; pale = null; ending = null; return; }
      const health = ending ? 0 : shown.health;
      const back = ending ? paleAt(ending.from, 0, t - ending.at, still) : pale ? paleAt(pale.from, health, t - pale.at, still) : health;
      const sinking = !ending && t - sinkAt < SINK_MS && (still || Math.floor((t - sinkAt) / BLINK_MS) % 2 === 0);
      const parts = barParts(health, back, shown.max);
      c.save(); c.globalAlpha = alpha;
      drawGlass(c, box.x, box.y, box.w, box.h);
      drawText(c, shown.name, box.x + Math.floor((box.w - textWidth(shown.name)) / 2), box.y + 2, NAME);
      const bx = box.x + PAD, by = box.y + 2 + FONT_H + GAP + 1;
      c.fillStyle = TRACK; c.fillRect(bx - 1, by - 1, BAR_W + 2, BAR_H + 2);
      if (parts.pale > parts.full) { c.fillStyle = PALE; c.fillRect(bx + parts.full, by, parts.pale - parts.full, BAR_H); }
      for (let i = 0; i < parts.full; i++) { c.fillStyle = sinking ? GREY : RAMP[i]; c.fillRect(bx + i, by, 1, BAR_H); }
      c.restore();
    },
  };
}
