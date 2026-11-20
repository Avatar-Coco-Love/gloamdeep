// § arena: the Lampeater, steps 1 and 2 (D-939, D-940, D-941). On depth 8 the way ends in a hallway
// and, straight above it, the arena (region.js): no finds or cache, and no creature but the
// Lampeater, standing one tile below the tile before its sealed door (step 2, D-941).
// The arena is the seal hall: a cold brazier in each corner, 4 pillars round its middle, and at
// its top a wall with a sealed door in its middle and the stairs down 3 tiles deep behind it,
// ringed by the old seal's stones. Only beating the Lampeater sinks the door (beaten.js, D-953); its
// braziers lit go cold again when the hero leaves a still-sealed arena (vault.js, coolVault). The hallway is the processional: a road 3 tiles wide from its way in to the
// arena's, bending once where the two don't face, a line of seal stones down its middle, round
// pillars every other tile along its sides, 2 cold braziers where it starts, and an open stone
// door on its top edge, the way into the arena. Drawn in the dungeon's bricks. Plain data, no drawing.
import { get } from './registry.js';

export const ARENA_DEPTH = 8;
// The stairs down, in the stair room behind the sealed door (13 × 15, the dungeon's cell)
export const ARENA_DOWN = { x: 6, y: 2 };
// The Lampeater's tile, one below the tile before the sealed door, so the way to it stays open (D-941)
export const LAMPEATER_AT = { x: 6, y: 6 };
// § the brood at the start (D-971): a gloamling on the tile beside each corner brazier, on its
// outer side, toward the wall. Each is the arena's own, as one crawled from a snuffed bowl is
// (brood.js): marked `ash` with its brazier and turn -1, so it never plays the crawl, drops and counts
// nothing, never follows the hero out, crumbles when the Lampeater is beaten (beaten.js) and is
// back with it whole again after a fall or a doorway (wholeAgain)
const BROOD_AT = [{ x: 1, y: 5, bowl: { x: 2, y: 5 } }, { x: 11, y: 5, bowl: { x: 10, y: 5 } }, { x: 1, y: 11, bowl: { x: 2, y: 11 } }, { x: 11, y: 11, bowl: { x: 10, y: 11 } }];
export const startingBrood = () => BROOD_AT.map(({ x, y, bowl }) => ({ id: 'gloamling', x, y, met: true, ash: { ...bowl, turn: -1 } }));
// § the lure wisps (3.04, D-939, D-1002): 2 of today's lure wisps, on the tiles either side of the
// Lampeater's, marked as the arena's own as its gloamlings are (`ash` on their own tile, turn -1):
// they drop nothing, never follow the hero out, fade when it is beaten and are back whole after a
// fall or a doorway. Each lures toward the Lampeater only (`lure`, creatureturn.js), never a gloamling
const WISPS_AT = [{ x: LAMPEATER_AT.x - 1, y: LAMPEATER_AT.y }, { x: LAMPEATER_AT.x + 1, y: LAMPEATER_AT.y }];
const startingWisps = () => WISPS_AT.map(({ x, y }) => ({ id: 'lureWisp', x, y, met: true, lure: 'lampeater', ash: { x, y, turn: -1 } }));
// Every creature of the arena's own at the start of the fight: its gloamlings and its wisps
export const arenaOwn = () => [...startingBrood(), ...startingWisps()];

// The seal hall, its way in at the bottom; `,` the old seal's stones, `j` a cold brazier, `q` a
// pillar, `k` the sealed door, `>` the stairs down. The gap in the bottom edge is cut at the opening.
const SEAL_HALL = [
  '#############',
  '#####,,,#####',
  '#####,>,#####',
  '#####,,,#####',
  '######k######',
  '#.j.......j.#',
  '#...........#',
  '#...q...q...#',
  '#...........#',
  '#...........#',
  '#...q...q...#',
  '#.j.......j.#',
  '#...........#',
  '#...........#',
  '#############',
];
const LETTERS = { ',': 'sealStone', j: 'brazier', q: 'pillar', k: 'sealedDoor', '>': 'stairsDown', '#': 'wall', '.': 'floor' };
const lettered = (rows) => rows.map((row) => [...row].map((ch) => get(LETTERS[ch]).letter).join(''));
const set = (map, x, y, id) => { map[y] = map[y].slice(0, x) + get(id).letter + map[y].slice(x + 1); };
const empty = (map, start) => ({ map, start, lights: [], items: [], enemies: [], people: [] });

// (cell) → the arena as a generated room is: its map, the hero's start just inside its one
// opening, at the bottom, the Lampeater in it, standing (D-941), its 4 gloamlings (D-971) and 2 wisps (D-1002)
export function arenaRoom(cell) {
  const { at } = cell.doors[0], map = lettered(SEAL_HALL);
  set(map, at, cell.rows - 1, 'floor');
  return { ...empty(map, { x: at, y: cell.rows - 2 }), enemies: [{ id: 'lampeater', ...LAMPEATER_AT }, ...arenaOwn()] };
}

// § hallway: (cell) → the hallway as a generated room is. Its road follows a path from the tile
// just inside its way in to the tile below its top opening: up from a way in at the bottom to the
// middle row, across, and up again; across then up from one at a side.
const WIDE = 2; // the pillars stand 2 tiles out from the path, the road between them 3 wide
export function hallwayRoom(cell) {
  const { cols, rows } = cell, out = cell.doors.find((d) => d.dir === 'up'), into = cell.doors.find((d) => d !== out);
  const ex = out.at, path = [];
  const line = (a, b) => { const n = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)); for (let k = path.length ? 1 : 0; k <= n; k++) path.push({ x: a.x + Math.sign(b.x - a.x) * k, y: a.y + Math.sign(b.y - a.y) * k }); };
  const top = { x: ex, y: 1 };
  if (into.dir === 'down') {
    const mid = Math.floor(rows / 2), from = { x: into.at, y: rows - 2 };
    line(from, { x: into.at, y: mid }); line({ x: into.at, y: mid }, { x: ex, y: mid }); line({ x: ex, y: mid }, top);
  } else {
    const from = { x: into.dir === 'left' ? 1 : cols - 2, y: into.at };
    line(from, { x: ex, y: into.at }); line({ x: ex, y: into.at }, top);
  }
  const inside = (t) => t.x >= 1 && t.y >= 1 && t.x <= cols - 2 && t.y <= rows - 2;
  const far = (t) => Math.min(...path.map((p) => Math.max(Math.abs(p.x - t.x), Math.abs(p.y - t.y))));
  const map = Array.from({ length: rows }, (_, y) => Array.from({ length: cols }, (_, x) => (far({ x, y }) <= WIDE && inside({ x, y }) ? '.' : '#')).join(''));
  const road = lettered(map);
  for (const p of path) set(road, p.x, p.y, 'sealStone');
  // Beside the path on a straight stretch, `n` out across its way on each side, where nothing of the
  // path is nearer; [] at a bend
  const beside = (i, n) => {
    const p = path[i], q = path[i + 1], o = path[i - 1];
    if (!o || !q || q.x - p.x !== p.x - o.x || q.y - p.y !== p.y - o.y) return [];
    const dx = q.x - p.x, dy = q.y - p.y;
    return [{ x: p.x - dy * n, y: p.y + dx * n }, { x: p.x + dy * n, y: p.y - dx * n }].filter((t) => inside(t) && far(t) === n);
  };
  // The 2 braziers where the road starts, 2 out, or 1 out on a side that has no room, the road
  // narrower there (a way in 2 tiles from a corner)
  const pair = (i) => { const two = beside(i, WIDE); return two.length === 2 ? two : [...two, ...beside(i, 1).filter((t) => !two.some((u) => Math.sign(u.x - path[i].x) === Math.sign(t.x - path[i].x) && Math.sign(u.y - path[i].y) === Math.sign(t.y - path[i].y)))]; };
  const lit = path.findIndex((_, i) => pair(i).length === 2);
  for (const t of pair(lit)) set(road, t.x, t.y, 'brazier');
  for (let i = lit + 2; i < path.length - 1; i += 2) for (const t of beside(i, WIDE)) set(road, t.x, t.y, 'pillar');
  const edge = { down: { x: into.at, y: rows - 1 }, left: { x: 0, y: into.at }, right: { x: cols - 1, y: into.at } }[into.dir];
  set(road, edge.x, edge.y, 'floor');
  set(road, ex, 0, 'openDoor');
  return empty(road, path[0]);
}
