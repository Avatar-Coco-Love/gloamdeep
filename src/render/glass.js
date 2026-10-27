// § glass: the see-through night fill and its soft light edge, corners left out
// so it looks round (pixel glass, D-380); the panel's, the text line's at the
// bottom (D-381) and the bag card's (D-385). Split from hud.js, so the bag's
// layout loads without the sprites.
export const GLASS = 'rgba(14,12,22,.6)';
export const GLASS_EDGE = 'rgba(239,230,204,.28)';
export function drawGlass(c, x, y, w, h) {
  c.fillStyle = GLASS; c.fillRect(x + 1, y + 1, w - 2, h - 2);
  c.fillStyle = GLASS_EDGE;
  c.fillRect(x + 1, y, w - 2, 1); c.fillRect(x + 1, y + h - 1, w - 2, 1);
  c.fillRect(x, y + 1, 1, h - 2); c.fillRect(x + w - 1, y + 1, 1, h - 2);
}
