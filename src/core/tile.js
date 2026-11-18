// § tile: small helpers on tiles, { x, y }, shared by the rules that were copying them (H-101).
// Plain data, no drawing. Not tiles.js, which lists the kinds of tile.

// Whether two tiles are the same tile
export const same = (a, b) => a.x === b.x && a.y === b.y;
// Steps between two tiles, across and down, no diagonals
export const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
// A tile's key, "x,y", for a Set or a Map (cave.js keeps a number of its own, cellKey)
export const key = (t) => `${t.x},${t.y}`;
