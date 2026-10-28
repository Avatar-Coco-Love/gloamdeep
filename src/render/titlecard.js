// § title card (D-401; were the title's centred lines, D-181): the title screen laid out like a
// phone game's, on the title's scene. The name at the top (title.js), one big ember button under
// the hero: CONTINUE while a journey is saved, with New journey a grey line under it, else NEW
// JOURNEY alone. Journal, How to play and Settings are round buttons top right, a 9 × 9 icon
// in each (D-402) and its name under it; the profile in play is a glass chip top left, its hero, name and
// deepest depth, opening Profiles; the Seed Explorer a round button bottom left, its name beside
// it. The chosen one is ember (the button, a round button's rim, the chip's edge) or gold with
// the flame (the grey line). No sprites here, so the tests can load it.
import { SCREEN_H } from './screen.js';
import { drawText, textWidth, FONT_H } from './font.js';
import { drawGlass } from './glass.js';
import { drawMarker } from './menu.js';
import { frame, round, EDGE_GAP } from './bag.js';
import { drawPatchHero, TEXT_X, BOX_H } from './slots.js';

const K = '#0e0c16', GOLD = '#ffd66b', EMBER = '#f39a3b', GREY = '#9790a4', CORE = '#fff5d6', LINE = 'rgba(239,230,204,.16)';
export const NAME = 'Gloamdeep'; // drawn by title.js, lit from below
export const NAME_TOP = 16; // its top, from the picture's
export const NAME_SCALE = 3; // at triple size
const NAME_W = (textWidth(NAME) + 2) * NAME_SCALE;
const BUTTON_TOP = 160, BUTTON_H = 19, BUTTON_PAD = 24; // the big button's top from the picture's, its height and the room either side of its word
const LINE_GAP = 7; // from the big button's foot to New journey's top
const R = 12, ROUND_GAP = 52, COLUMN_GAP = 40; // the round buttons' radius, and from one's middle to the next in a row, or in a column
const TAP_PAD = 4;

// § icons: 9 × 9 in the stone grey, one game pixel per dot like the hero's and the hearts' (D-402; were 5 × 5 drafts, doubled, D-401)
const ICONS = {
  journal: ['.xx...xx.', 'x..x.x..x', 'x.x.x.x.x', 'x...x...x', 'x.x.x.x.x', 'x...x...x', 'x.x.x.x.x', '.xxx.xxx.', '....x....'], // an open book, its lines
  howto: ['..xxxxx..', '.xx...xx.', '.xx...xx.', '.....xx..', '....xx...', '....xx...', '.........', '....xx...', '....xx...'], // a question mark
  settings: ['....x....', '.x.xxx.x.', '..xxxxx..', '.xxx.xxx.', 'xxx...xxx', '.xxx.xxx.', '..xxxxx..', '.x.xxx.x.', '....x....'], // a gear, its hole
  explore: ['......x.x', '......x.x', '.....xxxx', '....xxx..', '...xxx...', '..xxx....', '.xxx.....', 'xxx......', 'xx.......'], // a wrench, the tools (D-376)
};
const ROUNDS = ['journal', 'howto', 'settings'];
const NAMES = { journal: 'Journal', howto: 'How to play', settings: 'Settings', explore: 'Seed Explorer' };

// § layout: on a view `vw` × `vh`, the picture in its middle; each of menu's lines (titleMenu,
// core/menu.js) as a box { x, y, w, h } that a tap picks, with what is drawn there
const pictureTop = (vh) => Math.round((vh - SCREEN_H) / 2);
export const nameTop = (vh) => pictureTop(vh) + NAME_TOP; // the name's top on the room's canvas
export function titleLayout(vw, vh, menu, chip) {
  const cx = Math.floor(vw / 2), oy = pictureTop(vh), saved = menu.some((l) => l.id === 'continue');
  const top = oy + BUTTON_TOP;
  // The round buttons in a row top right, or down the right where the row would reach the name
  const row = vw - EDGE_GAP - (ROUNDS.length - 1) * ROUND_GAP - R - Math.ceil(textWidth(NAMES.howto) / 2) > cx + NAME_W / 2 + EDGE_GAP;
  return menu.map((l) => {
    if (l.id === 'continue' || (l.id === 'new' && !saved)) {
      const word = l.text.toUpperCase(), w = textWidth(word) + 2 * BUTTON_PAD;
      return { id: l.id, kind: 'button', word, x: cx - Math.floor(w / 2), y: top, w, h: BUTTON_H };
    }
    if (l.id === 'new') {
      const w = textWidth(l.text);
      return { id: l.id, kind: 'line', word: l.text, x: cx - Math.floor(w / 2), y: top + BUTTON_H + LINE_GAP, w, h: FONT_H };
    }
    if (l.id === 'profiles') {
      const w = TEXT_X + Math.max(textWidth(chip.name), textWidth(chip.deepest)) + 8;
      return { id: l.id, kind: 'chip', x: EDGE_GAP, y: EDGE_GAP, w, h: BOX_H };
    }
    const i = ROUNDS.indexOf(l.id), word = NAMES[l.id], lw = textWidth(word);
    const mx = i < 0 ? EDGE_GAP + R : row ? vw - EDGE_GAP - R - (ROUNDS.length - 1 - i) * ROUND_GAP : vw - EDGE_GAP - Math.ceil(textWidth(NAMES.howto) / 2);
    const my = i < 0 ? vh - EDGE_GAP - R - 4 : EDGE_GAP + R + (row ? 0 : i * COLUMN_GAP); // the Explorer clear of the version under it
    const hit = i >= 0 ? { x: mx - Math.floor(Math.max(2 * R, lw) / 2), y: my - R, w: Math.max(2 * R, lw), h: 2 * R + 3 + FONT_H } // its name under it
      : { x: mx - R, y: my - R, w: 2 * R + 6 + lw, h: 2 * R }; // its name beside it
    return { id: l.id, kind: 'round', word, mx, my, x: mx - R, y: my - R, w: 2 * R, h: 2 * R, hit };
  });
}

// What a tap at x, y on the room's canvas picks: a line's index, else -1. A round button's
// name picks it too.
export function titleCardAt(x, y, vw, vh, menu, chip) {
  return titleLayout(vw, vh, menu, chip).findIndex((b) => {
    const h = b.hit ?? b;
    return x >= h.x - TAP_PAD && x < h.x + h.w + TAP_PAD && y >= h.y - TAP_PAD && y < h.y + h.h + TAP_PAD;
  });
}

// c: the room's canvas, `vw` × `vh`, over the title's scene; menu: titleMenu; chosen: its line
// picked; chip: { name, deepest, hero }, the profile in play, its hero sprite in its look
export function drawTitleCard(c, vw, vh, menu, chosen, chip, t, still) {
  titleLayout(vw, vh, menu, chip).forEach((b, i) => {
    const on = i === chosen;
    if (b.kind === 'button') {
      c.fillStyle = K; c.fillRect(b.x, b.y, b.w, b.h);
      frame(c, b.x, b.y, b.w, b.h, on ? EMBER : LINE);
      drawText(c, b.word, b.x + BUTTON_PAD, b.y + 6, on ? GOLD : GREY);
      if (on) drawMarker(c, b.x + 8, b.y + 7, t, still);
    } else if (b.kind === 'line') {
      drawText(c, b.word, b.x, b.y, on ? GOLD : GREY);
      if (on) drawMarker(c, b.x - 7, b.y + 2, t, still);
    } else if (b.kind === 'chip') {
      drawGlass(c, b.x, b.y, b.w, b.h);
      if (on) frame(c, b.x, b.y, b.w, b.h, EMBER);
      drawPatchHero(c, chip.hero, b.x, b.y);
      drawText(c, chip.name, b.x + TEXT_X, b.y + 6, on ? GOLD : CORE);
      drawText(c, chip.deepest, b.x + TEXT_X, b.y + 17, GREY);
    } else {
      round(c, b.mx, b.my, R, on ? EMBER : undefined);
      c.fillStyle = on ? GOLD : GREY;
      ICONS[b.id].forEach((row, y) => [...row].forEach((ch, x) => { if (ch === 'x') c.fillRect(b.mx - 4 + x, b.my - 4 + y, 1, 1); }));
      if (b.id === 'explore') drawText(c, b.word, b.x + b.w + 6, b.my - 4, on ? GOLD : GREY);
      else drawText(c, b.word, b.mx - Math.floor(textWidth(b.word) / 2), b.y + b.h + 3, on ? GOLD : GREY);
    }
  });
}

// The chip's words for a profile: its name and deepest depth, as its box on the profiles card shows
export const chipOf = (name, deepest, hero = null) => ({ name, deepest: `Deepest  ${deepest}`, hero });
