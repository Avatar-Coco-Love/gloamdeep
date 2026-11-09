// § rehome: an older save's home brought into Hearthwood's 9 rooms (D-733, step 1). Plain
// data, no drawing. Home keeps everything in it, but the cave mouth and the rocks either
// side of it in its edge become trees, as the mouth stands in the room beside it now, and
// the paths to the rooms beside are cut, as a new journey's home has them. A hero
// standing on the old mouth steps in onto the tile in front of it.
import { mouthOf } from './mouth.js';
import { HOME_ID, pathsOf, cutPaths } from './hearthwood.js';
import { COLS, ROWS } from './cave.js';

const ALONG = { up: [1, 0], down: [1, 0], left: [0, 1], right: [0, 1] };
const IN = { up: [0, 1], down: [0, -1], left: [1, 0], right: [-1, 0] };

// (state) → the state with its home room, if it has one yet, rehomed
export function rehome(s) {
  const here = s.place === HOME_ID, home = here ? s : s.elsewhere?.[HOME_ID];
  if (!home?.room) return s;
  const { dir, tile } = mouthOf(s.seed);
  const room = { ...home.room, map: homeMap(s.seed, home.room.map) };
  if (!here) return { ...s, elsewhere: { ...s.elsewhere, [HOME_ID]: { ...home, room } } };
  const on = s.hero.x === tile.x && s.hero.y === tile.y;
  return { ...s, room, hero: on ? { x: tile.x + IN[dir][0], y: tile.y + IN[dir][1] } : s.hero };
}

// (seed, map) → an older home's map with the mouth and its rocks made trees and the paths cut;
// also used for the copy the dev Reset reads (renew.js, D-742)
export const HOME_MIDDLE = { x: COLS >> 1, y: ROWS >> 1 };
export function homeMap(seed, map) {
  const { dir, tile } = mouthOf(seed), [ax, ay] = ALONG[dir], g = map.map((line) => line.split(''));
  for (const k of [-1, 0, 1]) {
    const x = tile.x + ax * k, y = tile.y + ay * k;
    if ('MR'.includes(g[y]?.[x])) g[y][x] = 'T';
  }
  return cutPaths(g.map((row) => row.join('')), pathsOf(seed, HOME_ID), HOME_MIDDLE);
}
