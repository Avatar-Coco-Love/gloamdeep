// § hits (D-902, D-907): a weapon's hits on the grid, under its rows on the bag card (look C,
// from the Into the Breach idea): each row of weaponHits (core/numbers.js) its words in grey,
// then the hero's tile and the tiles it reaches, a rat on each one hit, turned to the hero,
// what it takes in red above it, and the knock icon where a knocked one stood.
import { drawText, textWidth } from './font.js';
import { drawIcon } from './numbers.js';

const GREY = '#9790a4', RED = '#e8786a', LINE = 'rgba(239,230,204,.16)', FILL = 'rgba(14,12,22,.55)';
const TILE = 16, NUM_H = 9, ROW_GAP = 4, LABEL_GAP = 6;
const ROW_H = NUM_H + TILE; // a row: the red numbers' line, then its tiles
// The picture's height, and its width, for `rows`; 0 for none
export const hitsH = (rows) => (rows.length ? rows.length * ROW_H + (rows.length - 1) * ROW_GAP : 0);
const labelW = (rows) => Math.max(...rows.map((r) => textWidth(r.label))) + LABEL_GAP;
export const hitsW = (rows) => (rows.length ? labelW(rows) + TILE * (1 + Math.max(...rows.map((r) => r.tiles.length))) : 0);
function tile(c, x, y) {
  c.fillStyle = FILL; c.fillRect(x + 1, y + 1, TILE - 2, TILE - 2);
  c.fillStyle = LINE; c.fillRect(x, y, TILE, 1); c.fillRect(x, y + TILE - 1, TILE, 1); c.fillRect(x, y + 1, 1, TILE - 2); c.fillRect(x + TILE - 1, y + 1, 1, TILE - 2);
}
// rows: weaponHits'; spriteOf: the hero's ('hero', as worn) and the rat's sprites; gives the height used
export function drawHits(c, rows, x, y, spriteOf) {
  const tx = x + labelW(rows), hero = spriteOf({ id: 'hero', n: 1 }), rat = spriteOf({ id: 'rat', n: 1 });
  rows.forEach((r, j) => {
    const ty = y + j * (ROW_H + ROW_GAP) + NUM_H;
    drawText(c, r.label, x, ty + 5, GREY);
    tile(c, tx, ty); c.drawImage(hero, tx, ty - 1);
    r.tiles.forEach((t, k) => {
      const sx = tx + (k + 1) * TILE;
      tile(c, sx, ty);
      if (t.knock) { drawIcon(c, 'knock', sx + 5, ty + 5); return; }
      c.save(); c.scale(-1, 1); c.drawImage(rat, -sx - TILE, ty); c.restore(); // facing the hero
      const n = `-${t.hit}`;
      drawText(c, n, sx + Math.floor((TILE - textWidth(n)) / 2), ty - NUM_H, RED);
    });
  });
  return hitsH(rows);
}
