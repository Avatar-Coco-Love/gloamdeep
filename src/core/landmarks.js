// § landmarks: places bigger than one tile, as data (D-587). `plan` is its tiles row by
// row, by letter (tiles.js), its middle tile in the middle of the plan. Not things to
// pick up or spawn one tile at a time, so not in the registry's ALL (registry.js).
// The shared stamper that sets them aside in generated rooms comes with the depth 2
// waystone; for now only the home waystone uses a plan (D-589). Plain data, no drawing.

export const LANDMARKS = {
  // A cross through the middle is walked on, a standing stone in each corner, and the middle
  // is the plate (D-587), 3 × 3 (D-620). `pad`: tiles more kept open around it in a generated
  // room (stamper.js), so each depth's stone stays in the room and spot it had at 5 × 5.
  waystone: { id: 'waystone', kind: 'landmark', name: 'Waystone', plan: ['YXY', 'XZX', 'YXY'], pad: 1 },
};

// § stamp: the landmark's plan set on g (rows of letters, as arrays), its middle at x, y
export function stamp(g, mark, x, y) {
  const h = mark.plan.length >> 1, w = mark.plan[0].length >> 1;
  mark.plan.forEach((row, j) => [...row].forEach((ch, i) => { g[y - h + j][x - w + i] = ch; }));
}

// § around: every tile of the landmark and `ring` tiles more on each side, at middle x, y
export function around(mark, x, y, ring = 0) {
  const h = (mark.plan.length >> 1) + ring, w = (mark.plan[0].length >> 1) + ring, out = [];
  for (let j = y - h; j <= y + h; j++) for (let i = x - w; i <= x + w; i++) out.push({ x: i, y: j });
  return out;
}
