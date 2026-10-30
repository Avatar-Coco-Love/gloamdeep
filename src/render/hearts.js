// § hearts: the hero's health as small pixel hearts (D-116), on the panel (hud.js) and on the
// Growth tree's heart (D-481). A full heart is the hostile red with the study's deeper red
// (PAL p, R) under it; an empty one is an empty oil segment's colour. Past 5, hearts bought
// (D-293) fill a second row below, up to 10. Health past `max`, rested in the bed (D-488),
// shows as gold hearts after the red, in the oil bar's amber.
export const HEART = ['.x.x.', 'xxxxx', '.xxx.', '..x..'];
export const HEART_W = 5;
export const ROW_HEARTS = 5;
const GAP = 1;
export function drawHearts(c, health, max, bx, by) {
  for (let i = 0; i < Math.max(max, health); i++) {
    const x0 = bx + (i % ROW_HEARTS) * (HEART_W + GAP), y0 = by + Math.floor(i / ROW_HEARTS) * (HEART.length + GAP), full = i < health;
    HEART.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch !== 'x') return;
      const low = y === HEART.length - 1 || HEART[y + 1][x] !== 'x'; // the heart's lower edge
      c.fillStyle = !full ? '#2a2636' : i >= max ? (low ? '#a8642c' : '#ffc65c') : low ? '#c4473a' : '#e8786a';
      c.fillRect(x0 + x, y0 + y, 1, 1);
    }));
  }
}
