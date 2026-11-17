// § leapgap: the first Leap gaps (D-968). From depth 5 to 8, one dead end a floor has its cache cut
// off behind a short straight line of Gap tiles, seen before Leap is learnt ("Too wide to step
// across.") and reached after the Lampeater: the locked door shown before its key. The line is a
// run of open floor, up to 4 tiles along a row or a column between walls, whose Gap leaves every
// cache find out of walking reach of the way in, every one reached by a leap over it (open floor
// either side, in line) and within 4 tiles of it, in sight; of those, the one shutting off the
// smallest corner, then the shortest. Nothing stands on the line. The floor's dead ends are tried
// in the seed's order; none fits, no gap. Rooms already kept in a save keep their shape, so a hero
// never stands behind a new gap. In the corner past it, the Archway to the place beyond (beyond.js,
// D-970). Plain data, no drawing.
import { rng } from './rng.js';
import { byLetter, get } from './registry.js';
import { layoutAt, seedAt } from './region.js';
import { withArchway } from './beyond.js';

export const LEAP_GAPS_FROM = 5;
export const LEAP_GAPS_TO = 8; // depth 9 and below wait for their own step (D-968)
const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const LONGEST = 4; // the longest line of Gap; a longer one would cut a room in two
const SIGHT = 4; // every find this near the line, so the lantern shows it across the gap (oil.js's reach)

// (seed, depth) → the floor's dead ends in the order they are tried for its one gap, by the seed;
// none outside depths 5 to 8. The first whose cache a line fits takes it (`leapGapAt` in room.js)
export function leapGapOrder(seed, depth) {
  if (depth < LEAP_GAPS_FROM || depth > LEAP_GAPS_TO) return [];
  const ends = (layoutAt(seed, depth)?.cells || []).filter((c) => c.end).map((c) => c.id), r = rng(seedAt(seed, depth) ^ 0x5ea9a11b);
  for (let i = ends.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [ends[i], ends[j]] = [ends[j], ends[i]]; }
  return ends;
}

// (room, finds) → the room with the cache `finds` behind a line of Gap, or the room as it was
export function withLeapGap(room, finds) {
  if (!finds.length) return room;
  const map = room.map, rows = map.length, cols = map[0].length;
  const open = (x, y) => x >= 0 && y >= 0 && x < cols && y < rows && !byLetter(map[y][x])?.solid;
  const things = [room.start, ...room.items, ...room.enemies, ...(room.people || [])].filter(Boolean);
  const bare = (x, y) => map[y][x] === '.' && !things.some((o) => o.x === x && o.y === y);
  const ways = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if ((x === 0 || y === 0 || x === cols - 1 || y === rows - 1) && open(x, y)) ways.push({ x, y });
  if (room.start) ways.push(room.start);
  let best = null;
  for (const line of runs(cols, rows, open)) {
    if (line.length > LONGEST || !line.every((t) => bare(t.x, t.y))) continue;
    const cut = new Set(line.map((t) => `${t.x},${t.y}`));
    const near = reach(ways.filter((w) => !cut.has(`${w.x},${w.y}`)), (x, y) => open(x, y) && !cut.has(`${x},${y}`));
    if (finds.some((f) => near.has(`${f.x},${f.y}`))) continue;
    const [dx, dy] = line.across;
    const lands = line.flatMap((t) => [1, -1].filter((s) => near.has(`${t.x - s * dx},${t.y - s * dy}`) && bare(t.x + s * dx, t.y + s * dy) && !near.has(`${t.x + s * dx},${t.y + s * dy}`)).map((s) => ({ x: t.x + s * dx, y: t.y + s * dy })));
    const leapt = reach(lands, (x, y) => open(x, y) && !cut.has(`${x},${y}`)); // what a leap over the line reaches
    if (!lands.length || !finds.every((f) => leapt.has(`${f.x},${f.y}`) && line.some((t) => Math.max(Math.abs(t.x - f.x), Math.abs(t.y - f.y)) <= SIGHT))) continue;
    const behind = leapt.size; // the smaller the corner shut off, the nearer the line stands to the finds
    if (!best || behind < best.behind || (behind === best.behind && line.length < best.line.length)) best = { line, behind, leapt };
  }
  if (!best) return room;
  const letter = get('gap').letter, at = new Set(best.line.map((t) => `${t.x},${t.y}`));
  const lined = map.map((row, y) => [...row].map((ch, x) => (at.has(`${x},${y}`) ? letter : ch)).join(''));
  return { ...room, map: withArchway(lined, best.leapt, best.line) }; // past the gap, the Archway to the place beyond (D-970)
}

// Every run of open tiles along a row or a column inside the room's edge, as a list of tiles with
// `across`, the way a leap crosses it
function runs(cols, rows, open) {
  const out = [];
  const walk = (n, len, at, across) => {
    for (let i = 0; i < n; i++) {
      let line = [];
      for (let j = 1; j < len - 1; j++) {
        const t = at(i, j);
        if (open(t.x, t.y)) line.push(t);
        if ((!open(t.x, t.y) || j === len - 2) && line.length) { line.across = across; out.push(line); line = []; }
      }
    }
  };
  walk(cols - 2, rows, (i, j) => ({ x: i + 1, y: j }), [1, 0]); // a column's run, leapt left or right
  walk(rows - 2, cols, (i, j) => ({ x: j, y: i + 1 }), [0, 1]); // a row's run, leapt up or down
  return out;
}

const reach = (from, open) => {
  const seen = new Set(from.map((t) => `${t.x},${t.y}`)), queue = [...from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of SIDES) {
      const x = t.x + dx, y = t.y + dy, k = `${x},${y}`;
      if (!seen.has(k) && open(x, y)) { seen.add(k); queue.push({ x, y }); }
    }
  }
  return seen;
};
