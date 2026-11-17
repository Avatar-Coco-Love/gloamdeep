// § beyond: the place beyond a Leap gap, its second step (D-969, D-970). In the corner cut off
// behind the floor's Gap, one wall tile is an Archway: on the room's outer edge where the corner
// reaches it, else a wall inside the room; beside no open ground but the corner's, never a room's
// corner tile or an edge that has a way out already; of those, the one farthest from the Gap.
// Stepping onto it goes through, as the stairs do, into one room off the floor's grid, a cell
// big, empty for now, in the floor's own look; its own Archway, in the middle of the edge facing
// back, leads to the same tile. Its place id is the gap room's with `/beyond`, so its depth
// reads as the floor's. Plain data, no drawing.
import { get, byLetter } from './registry.js';
import { sizeAt } from './region.js';

const BEYOND = '/beyond';
export const isBeyond = (id) => typeof id === 'string' && id.endsWith(BEYOND);
// The place an Archway leads to from place `id`: the room beyond, or back to the gap's room
export const throughArchway = (id) => (isBeyond(id) ? id.slice(0, -BEYOND.length) : id + BEYOND);
// The gap's room a room beyond belongs to
export const roomBefore = (id) => id.slice(0, -BEYOND.length);

const SIDES = { right: [1, 0], left: [-1, 0], down: [0, 1], up: [0, -1] };
// The Archway in a map, { x, y }, or null
export function archwayIn(map) {
  const letter = get('archway').letter;
  for (let y = 0; y < map.length; y++) { const x = map[y].indexOf(letter); if (x >= 0) return { x, y }; }
  return null;
}

// (map, corner, line) → the map with one wall tile beside the cut-off corner made an Archway, or
// the map as it was when none fits. `corner` holds the corner's tiles as "x,y", `line` the Gap's
const WALL = '#';
export function withArchway(map, corner, line) {
  const rows = map.length, cols = map[0].length, edge = (x, y) => x === 0 || y === 0 || x === cols - 1 || y === rows - 1;
  const openEdge = { up: [...map[0]].some((ch) => ch !== WALL), down: [...map[rows - 1]].some((ch) => ch !== WALL),
    left: map.some((l) => l[0] !== WALL), right: map.some((l) => l[cols - 1] !== WALL) }; // an edge with a way out already
  const sideOf = (x, y) => (y === 0 ? 'up' : y === rows - 1 ? 'down' : x === 0 ? 'left' : x === cols - 1 ? 'right' : null);
  let best = null;
  for (const k of corner) {
    const [cx, cy] = k.split(',').map(Number);
    for (const [dx, dy] of Object.values(SIDES)) {
      const x = cx + dx, y = cy + dy;
      if (x < 0 || y < 0 || x >= cols || y >= rows || map[y][x] !== WALL) continue;
      const side = sideOf(x, y), corners = (x === 0 || x === cols - 1) && (y === 0 || y === rows - 1);
      if (corners || (side && openEdge[side])) continue;
      const touches = Object.values(SIDES).some(([ex, ey]) => { const ax = x + ex, ay = y + ey; return map[ay]?.[ax] !== undefined && map[ay][ax] !== WALL && !corner.has(`${ax},${ay}`); });
      if (touches) continue; // beside open ground outside the corner, it would be a way round the Gap
      const far = Math.min(...line.map((t) => Math.abs(t.x - x) + Math.abs(t.y - y))), outer = side ? 1 : 0;
      if (!best || outer > best.outer || (outer === best.outer && far > best.far)) best = { x, y, far, outer };
    }
  }
  if (!best) return map;
  const letter = get('archway').letter;
  return map.map((row, y) => (y === best.y ? row.slice(0, best.x) + letter + row.slice(best.x + 1) : row));
}

// (map) → the way the hero walks into its Archway, from the open tile beside it: 'right' when the
// floor is on its left. Null when there is no Archway
export function wayIn(map) {
  const at = archwayIn(map);
  if (!at) return null;
  const open = (x, y) => map[y]?.[x] !== undefined && !byLetter(map[y][x])?.solid;
  return Object.keys(SIDES).find((dir) => { const [dx, dy] = SIDES[dir]; return open(at.x - dx, at.y - dy); }) || null;
}

// (depth, way) → the room beyond as a place: a cell big, walls round an empty floor, its Archway
// in the middle of the edge it is walked into from `way` ('right': its left edge), the hero
// starting on the floor beside it. Nothing in it yet: its look, creatures and finds are later steps
export function beyondRoom(depth, way) {
  const { cols, rows } = sizeAt(depth), mx = Math.floor(cols / 2), my = Math.floor(rows / 2);
  const map = Array.from({ length: rows }, (_, y) => (y === 0 || y === rows - 1 ? WALL.repeat(cols) : WALL + '.'.repeat(cols - 2) + WALL));
  const at = { right: { x: 0, y: my }, left: { x: cols - 1, y: my }, down: { x: mx, y: 0 }, up: { x: mx, y: rows - 1 } }[way || 'right'];
  const [dx, dy] = SIDES[way || 'right'], letter = get('archway').letter;
  return {
    map: map.map((row, y) => (y === at.y ? row.slice(0, at.x) + letter + row.slice(at.x + 1) : row)),
    start: { x: at.x + dx, y: at.y + dy }, lights: [], enemies: [], items: [], people: [],
  };
}
