// § patch (F-9, D-1003): a woods room's tiles in `box` (patch.js) painted again over a room
// drawRoom drew, `ground` its return: the grass and trees (woods.js), then every other tile
// near enough to reach in (the camp is 3 tiles wide), cut to the box, in drawRoom's order
import { TILE as T } from './screen.js';
import { patchWoods } from './woods.js';
import { drawOver } from './tiles.js';

const REACH = 3;
export function patchRoom(c, room, ground, box) {
  patchWoods(c, room, ground, box);
  c.save(); c.beginPath(); c.rect(box.x * T, box.y * T, box.w * T, box.h * T); c.clip();
  for (let y = Math.max(0, box.y - REACH); y < Math.min(room.rows, box.y + box.h + REACH); y++) {
    for (let x = Math.max(0, box.x - REACH); x < Math.min(room.cols, box.x + box.w + REACH); x++) drawOver(c, room, x, y);
  }
  c.restore();
}
