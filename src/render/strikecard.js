// § strike card (D-614): pulling on a bite opens it in the middle of the screen, the room dim
// and paused around it, as the ask card (D-400). STRIKE! in ember at its top left, "Tap in
// the light" in grey under the rule; under it the bar, dark in a grey frame, the zone amber,
// and the needle, cream with an ember tip, swept by the card's clock. No cross: a tap anywhere,
// Space or Enter strikes.
import { drawText, textWidth } from './font.js';
import { drawGlass } from './glass.js';
import { drawRule, PAD, CARD_VEIL } from './bag.js';

const K = '#0e0c16', EMBER = '#f39a3b', GREY = '#9790a4', CREAM = '#efe6cc', AMBER = '#ffc65c', LINE = 'rgba(239,230,204,.16)';
export const STRIKE_HEADING = 'STRIKE!', STRIKE_NOTE = 'Tap in the light';
const W = 160, H = 64, RULE_Y = 20, NOTE_Y = 26, BAR_Y = 44, BAR_H = 9; // from the card's top

// c: the screen layer, `vw` × `vh`; zone: the zone's left, 0..1; n: the needle, 0..1, or null;
// w: the zone's width, the fish's own (D-618)
export function drawStrikeCard(c, vw, vh, zone, n, w) {
  c.fillStyle = K; c.globalAlpha = CARD_VEIL; c.fillRect(0, 0, vw, vh); c.globalAlpha = 1;
  const x = Math.floor((vw - W) / 2), y = Math.floor((vh - H) / 2);
  drawGlass(c, x, y, W, H);
  drawText(c, STRIKE_HEADING, x + PAD, y + 7, EMBER);
  c.fillStyle = LINE; drawRule(c, x, y, W, RULE_Y, false); // no cross on this card
  drawText(c, STRIKE_NOTE, x + Math.floor((W - textWidth(STRIKE_NOTE)) / 2), y + NOTE_Y, GREY);
  const bx = x + PAD, bw = W - 2 * PAD, by = y + BAR_Y;
  c.fillStyle = GREY; c.fillRect(bx - 1, by - 1, bw + 2, BAR_H + 2);
  c.fillStyle = K; c.fillRect(bx, by, bw, BAR_H);
  c.fillStyle = AMBER; c.fillRect(bx + Math.round(zone * bw), by, Math.round(w * bw), BAR_H);
  if (n === null) return;
  const nx = bx + Math.min(bw - 1, Math.round(n * (bw - 1)));
  c.fillStyle = CREAM; c.fillRect(nx, by - 2, 1, BAR_H + 4);
  c.fillStyle = EMBER; c.fillRect(nx - 1, by - 4, 3, 2);
}
