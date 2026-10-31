// § text line: where the game speaks, on glass along the bottom of the room
// (D-381; was a strip under the room, D-094), upright above the corner pieces (D-505). It shows the core's shown
// line (core/lines.js), centred; once its turns are used up it fades in half
// a second, glass and all, or goes at once with reduced motion (D-095).
// Ordinary lines are the study's grey, warnings amber (D-097).
import { view, LINE_H, BUTTON_GAP, PAD_DISC } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawGlass } from './glass.js';

const GREY = '#9790a4', AMBER = '#ffc65c'; // the study's --muted and --amber
const FADE_MS = 500;
const PAD = 3; // between the words and the glass's edge, as on the panel
export const LINE_UP = LINE_H + 2; // the glass's height and the gap under it, kept clear by the creature list
// § line's top: along the bottom sideways; upright (D-505) the corner pieces leave too little
// room between them, so it stands above them: above the arrow pad's height, the tallest,
// whether the pad is shown or not, so it never jumps when the pad is switched
export const lineTop = () => view.h - LINE_UP - (view.h > view.w ? Math.ceil((PAD_DISC + 2 * BUTTON_GAP) / view.scale) : 0);
export const lineUp = () => view.h - lineTop(); // from the line's top to the screen layer's bottom

export function createTextLine() {
  let drawn = null, img = null, fadeFrom = 0; // the last line, its pixels, when its fade began
  const paint = (line) => { // once per line, not every frame (TECH.md)
    const w = textWidth(line.text);
    img = document.createElement('canvas');
    img.width = w + 2 * PAD; img.height = LINE_H;
    const c = img.getContext('2d');
    drawGlass(c, 0, 0, img.width, img.height);
    drawText(c, line.text, PAD, Math.floor((LINE_H - FONT_H) / 2), line.warn ? AMBER : GREY);
  };
  return {
    // line: the shown line or null; reduce: prefers-reduced-motion
    draw(c, line, t, reduce) {
      if (line) { if (line !== drawn) { drawn = line; paint(line); } fadeFrom = 0; } // said again: no fade
      if (!drawn) return;
      if (!line && !fadeFrom) fadeFrom = t;
      const a = fadeFrom ? (reduce ? 0 : 1 - (t - fadeFrom) / FADE_MS) : 1;
      if (a <= 0) { drawn = null; return; }
      c.globalAlpha = a; c.drawImage(img, Math.floor((view.w - img.width) / 2), lineTop()); c.globalAlpha = 1;
    },
  };
}
