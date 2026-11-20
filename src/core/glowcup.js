// § glowcup: the second flower, the dark floors' (D-1007, Q-092). Plain data, no drawing. In about
// half the rooms of every floor from depth 1 down, one on open floor, never on the start, a find, a
// light, a creature or a person already there, or a waystone's ring. Its tone (tones.js) and the way
// it faces (`flip`) the seed's. From its own seed, picked last, so the rest of each seed's room stays
// as it was. The vaults, the arena, its hallway and the room beyond a Gap hold none. Picked, it comes
// back a day later on another floor tile of the room (regrow.js, D-530). An older save's rooms never
// entered are made fresh, so they get theirs; rooms already entered stay as they were.
import { rng } from './rng.js';
import { toned } from './tones.js';

// § odds: the share of rooms with a glowcup, the heartcap's (D-1007)
export const GLOWCUP_ODDS = 0.5;

// (seed, room, keep) → the room with its glowcup, in about half of them; `keep` the tiles to keep clear
// (a waystone's ring). The room as it was otherwise.
export function withGlowcup(seed, room, keep = []) {
  const r = rng((seed ^ 0x2b7e1516) >>> 0);
  if (r() >= GLOWCUP_ODDS) return room;
  const things = [room.start, ...keep, ...(room.items || []), ...(room.lights || []), ...(room.enemies || []), ...(room.people || [])].filter(Boolean), open = [];
  for (let y = 1; y < room.map.length - 1; y++) for (let x = 1; x < room.map[y].length - 1; x++)
    if (room.map[y][x] === '.' && !things.some((t) => t.x === x && t.y === y)) open.push({ x, y });
  if (!open.length) return room;
  const at = open[Math.floor(r() * open.length)];
  const cup = { id: 'glowcup', x: at.x, y: at.y, ...(r() < 0.5 && { flip: true }) };
  return { ...room, items: [...(room.items || []), ...toned(seed, [cup])] };
}
