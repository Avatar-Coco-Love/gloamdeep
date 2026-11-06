// § thumbs: the dev Spawn grid's pictures, one 16 × 16 canvas per registry entry (D-624).
// Items, enemies and people show their sprite; a tile is drawn as the room draws it, in
// the middle of a small crypt floor, and cut out; a torch sits on a wall's face. Made
// once each, the first time it is asked for, and kept through a canvas wipe.
import { makeRoom } from '../core/room.js';
import { TILES } from '../core/tiles.js';
import { drawRoom } from './tiles.js';
import { drawBrackets, drawFlames } from './torches.js';
import { SPRITES, spriteOf } from './sprites.js';
import { keep } from './wipe.js';

const made = new Map();
const canvas = (w) => Object.assign(document.createElement('canvas'), { width: w, height: w });

// A 3 × 3 room drawn whole, its middle tile copied out
function cutFrom(map, lights = []) {
  const room = makeRoom(map), big = canvas(48), c = big.getContext('2d');
  drawRoom(c, room);
  drawBrackets(c, room, lights);
  drawFlames(c, room, lights, 0, true);
  return big;
}
const paintTile = (id) => cutFrom(['...', `.${TILES[id].letter}.`, '...']);
const paintLight = (id) => cutFrom(['###', '###', '...'], [{ id, x: 1, y: 1 }]);

// A grey "?" for anything with no picture yet, as the maker's blanks are (D-622)
const ASK = ['.kkkk.', 'kk..kk', '....kk', '...kk.', '..kk..', '......', '..kk..'];
function paintAsk(c) {
  c.fillStyle = '#4a5262'; c.fillRect(2, 2, 12, 12);
  c.fillStyle = '#9aa6b4';
  ASK.forEach((r, y) => [...r].forEach((ch, x) => ch === 'k' && c.fillRect(5 + x, 4 + y, 1, 1)));
}

export function thumbOf(entry) {
  if (made.has(entry.id)) return made.get(entry.id);
  const cv = canvas(16);
  keep(cv, () => {
    const c = cv.getContext('2d');
    c.clearRect(0, 0, 16, 16);
    const from = entry.kind === 'tile' ? paintTile(entry.id) : entry.kind === 'light' ? paintLight(entry.id) : null;
    if (from) { c.drawImage(from, 16, 16, 16, 16, 0, 0, 16, 16); return; }
    const sprite = entry.kind === 'item' ? spriteOf({ id: entry.id }) : SPRITES[entry.id];
    if (sprite) c.drawImage(sprite, 0, 0); else paintAsk(c);
  });
  made.set(entry.id, cv);
  return cv;
}
