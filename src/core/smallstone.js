// § smallstone: a save from before the 3 × 3 waystone (D-620) has its waystones 5 × 5. Once, as
// the save is brought up to date (save.js), each is made 3 × 3 where it stands: the outer ring
// of the old plan, the big stones' far tiles and the cross's ends, becomes the ground under it,
// grass or floor ('.'). What is left is the new plan exactly, asleep or woken as it was, and
// nothing else in the room changes. Plain data, no drawing.
const OLD = ['YYXYY', 'YYXYY', 'XXZXX', 'YYXYY', 'YYXYY'];
const PLATE = /[ZA]/; // asleep or woken

// One room's map (rows of letters) with every old 5 × 5 waystone made 3 × 3
export function shrinkMap(map) {
  const g = map.map((line) => [...line]), at = (x, y) => g[y]?.[x];
  for (let y = 0; y < g.length; y++) for (let x = 0; x < g[y].length; x++) {
    if (!PLATE.test(g[y][x])) continue;
    const ring = [];
    for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (Math.max(Math.abs(i), Math.abs(j)) === 2) ring.push([x + i, y + j, OLD[j + 2][i + 2]]);
    if (!ring.every(([i, j, ch]) => at(i, j) === ch)) continue;
    for (const [i, j] of ring) g[j][i] = '.';
  }
  return g.map((row) => row.join(''));
}

const shrunk = (p) => (p?.room?.map ? { ...p, room: { ...p.room, map: shrinkMap(p.room.map) } } : p);
const each = (places) => places && Object.fromEntries(Object.entries(places).map(([id, p]) => [id, shrunk(p)]));

// (state) → the state with every waystone 3 × 3: in the room the hero is in, in every room kept
// elsewhere, and in the rooms as they began
export function withSmallStones(s) {
  const out = shrunk(s);
  if (s.elsewhere) out.elsewhere = each(s.elsewhere);
  if (s.home?.places) out.home = { ...s.home, places: each(s.home.places) };
  return out;
}
