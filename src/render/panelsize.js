// § panel size: how wide the hearts and oil panel is, in game pixels (hud.js draws
// it, D-378), apart from the drawing so the buttons and tests can read it without a
// browser. Hearts with the level at the right, the oil bar, the depth, each padded PAD.
import { textWidth } from './font.js';
import { HEART_W, ROW_HEARTS } from './hearts.js';
import { ALL } from '../core/registry.js';

export const PAD = 3;
// the oil bar's 10 segments
export const SEG_W = 3;
export const SEG_GAP = 1;
export const SEGS = 10;
export const BAR_W = SEGS * SEG_W + (SEGS - 1) * SEG_GAP;
// A bigger tank's bar runs on, each segment still a tenth of a plain tank (D-1005): 13 for 1.25.
// tank: how many plain tanks the lantern holds (core/parts.js tankOf)
export const segsOf = (tank = 1) => Math.ceil(tank * SEGS - 1e-9);
export const barW = (segs = SEGS) => segs * SEG_W + (segs - 1) * SEG_GAP;
const MOST_SEGS = segsOf(Math.max(1, ...ALL.map((e) => e.part?.holds ?? 1))); // the biggest tank's
export const heartsW = (max) => Math.min(max, ROW_HEARTS) * HEART_W + (Math.min(max, ROW_HEARTS) - 1) * SEG_GAP; // two rows of 5 at most
export const panelW = (shown, lv, where, segs = SEGS) => 2 * PAD + Math.max(heartsW(shown) + 4 + textWidth(lv), barW(segs), textWidth(where));
// at its widest: a full row of hearts at level 99; the dev wrench keeps clear of it (D-682)
export const panelWidest = () => panelW(ROW_HEARTS, 'LV 99', 'DEPTH 99', MOST_SEGS);
