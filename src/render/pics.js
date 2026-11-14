// § pictures (D-902, D-907 to D-909, D-916): the one picture under an item's rows, on the bag
// card, the Make card (the workbench's, the mortar's and the bag's Make tab, D-916), the
// peddler's and the stash chest's (D-917): a
// weapon's hits on the grid beside the one held, else hearts or oil now and after, else a
// draught's turns; each left out where it is too wide for `dw` or its rows and it would reach
// `below`. Gives { h, draw(py) } for drawNumbers (numbers.js), or null.
import { numbersH } from './numbers.js';
import { drawHits, hitsH, hitsW } from './hits.js';
import { drawRefill, refillH, refillW } from './refill.js';
import { drawSips, sipsH, sipsW } from './sips.js';
import { weaponHits } from '../core/numbers.js';
import { get } from '../core/registry.js';

// entry: the item's registry entry; rows: its itemNumbers; top: the rows' top; held: the held
// weapon's id, or null; spriteOf: a slot's sprite, or null for no hits; refill: refills' (core/
// numbers.js); sips: draughtTurns', or null
export function pictureOf(c, entry, rows, dx, top, dw, below, { held = null, spriteOf = null, refill = [], sips = null } = {}) {
  const fit = (h) => top + numbersH(rows, dw, h) <= below;
  const hits = spriteOf ? weaponHits(entry, held && get(held)) : [];
  if (hits.length && hitsW(hits) <= dw && fit(hitsH(hits))) return { h: hitsH(hits), draw: (py) => drawHits(c, hits, dx, py, spriteOf) };
  if (refill.length && refillW(refill, dw) <= dw && fit(refillH(refill, dw))) return { h: refillH(refill, dw), draw: (py) => drawRefill(c, refill, dx, py, dw) }; // hearts or oil now and after (D-908)
  if (sipsH(sips) && sipsW(sips) <= dw && fit(sipsH(sips))) return { h: sipsH(sips), draw: (py) => drawSips(c, sips, dx, py) }; // a draught's turns now and after (D-909)
  return null;
}
