// § the round map in the dark (Q-108, D-920): how much the round map shows, from the light on
// the hero's own tile. Plain data, no drawing. The light is the brightest of daylight under the
// sky, the lantern (its reach against a full tank's, so an ember is about 0.17) and any other
// light reaching the tile (a torch or brazier, a glow, daylight through the mouth: 1 at its
// centre, 0 at its edge). The map shows 15% at no light, all of it at full light, evenly: no
// dark spot round the hero (D-931). The full map always opens clearly.
import { seenCells, CELL } from './light.js';
import { lightsNow } from './sight.js';
import { lanternReach } from './boon.js';
import { reach } from './oil.js';
import { daylight } from './daytime.js';

const TILE_SIZE = 16;
export const LEAST = 0.15; // the round map at no light (D-920)

// § light here: (state) → the light on the hero's tile, 0 to 1
export function lightHere(state) {
  const sun = state.room.dark.sky ? daylight(state.turn) : 0;
  const lamp = state.lit ? Math.min(1, lanternReach(state) / reach(1)) : 0;
  const { room, hero } = state, cw = room.cols * TILE_SIZE / CELL;
  const mx = hero.x * TILE_SIZE + TILE_SIZE / 2, my = hero.y * TILE_SIZE + TILE_SIZE / 2;
  const cell = (my / CELL | 0) * cw + (mx / CELL | 0);
  let near = 0;
  for (const L of lightsNow({ ...state, lit: false })) { // every light but the lantern
    const f = 1 - Math.hypot(mx - L.x, my - L.y) / L.r;
    if (f <= near) continue;
    if (seenCells(room, L.x, L.y, L.r, new Uint8Array(cw * room.rows * TILE_SIZE / CELL))[cell] === 1) near = f;
  }
  return Math.max(sun, lamp, near);
}

// § shown: (light) → how much of the round map shows, 0.15 to 1 (D-920)
export const shownAt = (light) => LEAST + (1 - LEAST) * Math.min(1, Math.max(0, light));
