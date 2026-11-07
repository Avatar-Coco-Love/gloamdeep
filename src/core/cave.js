// § cave: a generated room, round chambers joined by winding tunnels
// (D-147, D-162) or a digger's burrows (D-165), from one seed (D-148), with a torch by the stairs up, a flask and
// a rat guarding it (D-149), a herb (D-155), an oilcap (D-296) and, in about half the rooms, a heartcap (D-303), each mushroom its own tone (D-305), and deposits when asked (D-311). Plain data, no drawing. Same seed, same room.
import { rng, int, pick } from './rng.js';
import { toned } from './tones.js';
import { setAside, stampIn, ringOf } from './stamper.js';
import { around } from './landmarks.js';

// § sizes: about 1.5 screens, 17 × 20, bigger than the screen, so the camera
// follows the hero (D-195). The chambers (D-162): how many, their half-widths
// and half-heights in tiles, and how far apart their middles are. Counts of
// chambers and open tiles grew with the room's area from the 11 × 13 ones.
// A room may be smaller, as the shallow floors are (D-580, region.js): the
// counts of chambers and open tiles, and the burrows' dig, shrink with its
// area, rounded (`byArea`).
export const COLS = 17;
export const ROWS = 20;
const CAVES = [5, 10], CAVE_R = [1.3, 3], CAVE_GAP = 4;
// At least this many open tiles, 45 in an 11 × 13 room (D-147)
const MIN_OPEN = 107;
// A count for a 17 × 20 room, for a room of `cols` × `rows`
export const byArea = (n, cols, rows) => Math.round((n * cols * rows) / (COLS * ROWS));
const TRIES = 200;
// A room with someone trapped in it, or a landmark, gets more tries, since a spot for the ring is rarer
// (D-580), and so does a dungeon room: 1200 since its rooms became 13 × 15 cells (D-645)
const TRAPPED_TRIES = 1200;
// § second round: when every try fails, up to this many more, in which the corridors keep
// clear of the stairs up and the wall above them, so a doorway beside them still joins up
// (D-585). Only rooms no first-round try could make reach it, so every other room stays as it was.
const MORE_TRIES = 400;
// The share of rooms with a heartcap (D-303)
export const HEARTCAP_ODDS = 0.5;

// (seed, shape, ways) → { map, start, lights, enemies, items }, or null if no
// try worked. The shape is 'chambers', 'burrows' (D-165) or 'halls' (D-228). `ways.doors` are
// openings to carve at the edges, as { dir, at } (region.js, D-201).
// `ways.rats` is how many rats the room holds (D-231), and `ways.second` the
// kind of creature that takes the extra ones' place (a gloamling, D-240), and
// `ways.weapon` the weapon that lies there, if any: the knife (D-252) or the spear (D-479), `ways.deposits` how many deposits (D-311), and `ways.veins` how many of them are copper veins (D-480). `ways.up` and `ways.down` are where the stairs must be, as { x, y }, so
// floors line up (D-202); true lets the room pick, null leaves them out. `ways.pool`: whether a
// still pool may lie there (D-500). `ways.cols` and `ways.rows`: the room's size (D-580).
// `ways.trapped`: the person trapped in a ring of rubble there, if any (D-490); a
// try with no spot for the ring is made again, so the room always has one (D-580).
// `ways.landmark`: a landmark set aside there, as { mark, at } (stamper.js, D-587); a try
// that leaves anything cut off is made again.
export function generateRoom(seed, shape = 'chambers', { doors = [], up = true, down = true, rats = 1, second = 'rat', weapon = null, deposits = 0, veins = 0, pool = false, cols = COLS, rows = ROWS, trapped = null, landmark = null } = {}) {
  const r = rng(seed), carve = SHAPES[shape], dig = shape === 'halls' ? lane : tunnel, first = trapped || landmark || shape === 'halls' ? TRAPPED_TRIES : TRIES;
  const lr = landmark && rng(seed ^ 0x3c6ef372); // the landmark's own seed, for its tunnel
  for (let i = 0; i < first + MORE_TRIES; i++) {
    const clear = i >= first && up && typeof up === 'object' ? [up, { x: up.x, y: up.y - 1 }] : null; // the stairs up and the wall above them
    const carved = carve(r, cols, rows), g = carved && landmark ? setAside(lr, carved, landmark.mark, landmark.at, dig) : carved;
    const dug = g && openStairs(r, openDoors(r, g, doors, dig, clear), up, down, dig, clear);
    const room = dug && fill(r, landmark ? stampIn(dug, landmark.mark, landmark.at) : dug, up, down, rats, second, weapon);
    if (!room) continue;
    const keep = landmark ? around(landmark.mark, landmark.at.x, landmark.at.y, ringOf(landmark.mark)) : []; // no deposit or pool on it or its ring
    const made = { ...room, map: deposits ? withDeposits(r, room, deposits, veins, keep) : room.map, items: toned(seed, room.items) }; // each mushroom its own tone (D-305)
    const done = pool ? withPool(seed, made, keep) : made;
    if (landmark && !joined(done.map)) continue;
    if (!trapped) return done;
    const held = withTrapped(seed, done, trapped);
    if (held !== done) return held;
  }
  return null;
}

// § doors: each opening is a gap in the edge, with a tunnel in from it to the
// nearest open tile (D-201), straight in halls (D-228). The tile just inside
// is where the hero comes in. In the second round, `clear` holds the stairs up and the
// wall above them: no tunnel heads for them, and an opening beside that wall first
// takes one step away from the stairs (D-585).
const EDGE = { up: (at) => [{ x: at, y: 0 }, { x: at, y: 1 }], down: (at, w, h) => [{ x: at, y: h - 1 }, { x: at, y: h - 2 }],
  left: (at) => [{ x: 0, y: at }, { x: 1, y: at }], right: (at, w) => [{ x: w - 1, y: at }, { x: w - 2, y: at }] };
function openDoors(r, g, doors, dig, clear = null) {
  const inside = tilesWhere(g, (x, y) => g[y][x] === '.' && !(clear || []).some((c) => same(c, { x, y })));
  const out = doors.map(({ dir, at }) => {
    const [edge, inner] = EDGE[dir](at, g[0].length, g.length), to = inside.reduce((a, b) => (dist(b, inner) < dist(a, inner) ? b : a));
    g[edge.y][edge.x] = '.'; g[inner.y][inner.x] = '.';
    dig(r, g, clear && dist(inner, clear[1]) === 1 ? stepAway(g, inner, clear) : inner, to, clear);
    return inner;
  });
  g.doors = out;
  return g;
}
// The tile beside `inner`, off the edge and not touching the stairs, farthest from them,
// opened; `inner` itself when there is none
function stepAway(g, inner, [stairs, above]) {
  const ns = WAYS.map(([dx, dy]) => ({ x: inner.x + dx, y: inner.y + dy })).filter((n) => !onEdge(g, n) && !same(n, above) && dist(n, stairs) > 1);
  if (!ns.length) return inner;
  const at = ns.reduce((a, b) => (dist(b, stairs) > dist(a, stairs) ? b : a));
  g[at.y][at.x] = '.';
  return at;
}

// § stairs to fit: each stairs tile set is opened, with a tunnel to the
// nearest open tile, and the stairs up get their wall above (D-143, D-202); in the second
// round the tunnel from the stairs up keeps off that wall (D-585)
function openStairs(r, g, up, down, dig, clear = null) {
  for (const t of [up, down]) {
    if (typeof t !== 'object' || !t) continue;
    const inside = tilesWhere(g, (x, y) => g[y][x] === '.' && !same({ x, y }, t));
    g[t.y][t.x] = '.';
    if (inside.length) dig(r, g, t, inside.reduce((a, b) => (dist(b, t) < dist(a, t) ? b : a)), clear && t === up ? [clear[1]] : null);
  }
  if (up && typeof up === 'object') g[up.y - 1][up.x] = '#';
  return g;
}

// Round chambers joined by tunnels, as a grid of '#' and '.', or null
function chambers(r, cols, rows) {
  let g = walls(cols, rows);
  const caves = placeCaves(r, cols, rows);
  if (caves.length < 2) return null;
  for (const c of caves) carveCave(r, g, c);
  g = smooth(g);
  joinCaves(r, g, caves);
  // a tile the smoothing cuts off goes back to wall
  const joined = reach(g, caves[0]);
  for (const f of tilesWhere(g, (x, y) => g[y][x] === '.')) if (!joined.has(key(f))) g[f.y][f.x] = '#';
  return g;
}

// The stairs, torch, flask, rat and herb in a carved grid, or null if they
// don't fit. With no stairs up, the way in through the room's first door
// stands for them (D-201), and there is no torch.
function fill(r, g, up = true, down = true, rats = 1, second = 'rat', weapon = null) {
  const floors = tilesWhere(g, (x, y) => g[y][x] === '.');
  if (floors.length < byArea(MIN_OPEN, g[0].length, g.length)) return null;
  const doors = g.doors || [];

  // § stairs: up on a floor tile with wall above, so the steps sink into it
  // (D-143); down as far along the way as can be, unless set. Neither may cut
  // the room in two, so the hero never has to cross a stair to get somewhere.
  const free = (x, y, cut) => reach(g, floors.find((f) => !cut.some((c) => c.x === f.x && c.y === f.y)), cut).size === floors.length - cut.length;
  const canUp = (f) => !onEdge(g, f) && g[f.y - 1][f.x] === '#' && free(f.x, f.y, [f]);
  let at = null;
  if (up === true) {
    const ups = floors.filter(canUp);
    if (!ups.length) return null;
    at = pick(r, ups);
  } else if (up) {
    if (!canUp(up)) return null;
    at = up;
  }
  const from = at || doors[0], far = reach(g, from), cut = at ? [at] : [];
  let to = null;
  if (down === true) {
    const downs = floors.filter((f) => !onEdge(g, f) && far.get(key(f)) >= 8 && free(f.x, f.y, [...cut, f]));
    if (!downs.length) return null;
    const most = Math.max(...downs.map((f) => far.get(key(f))));
    to = pick(r, downs.filter((f) => far.get(key(f)) >= most - 2));
  } else if (down) {
    if (!far.has(key(down)) || !free(down.x, down.y, [...cut, down])) return null;
    to = down;
  }
  if (at) g[at.y][at.x] = '<';
  if (to) g[to.y][to.x] = '>';
  if (!at) return finds(r, g, floors, far, from, to, null, doors, rats, second, weapon);

  // § torch: on a wall face near the stairs up, not right above them, and
  // not on the top row, where the hearts, depth and oil bar boxes could hide
  // it wherever the camera stands (D-101, D-195)
  const faces = tilesWhere(g, (x, y) => g[y][x] === '#' && y > 0 && y + 1 < g.length && g[y + 1][x] === '.');
  const near = faces.filter((t) => dist(t, at) <= 3 && !(t.x === at.x && t.y === at.y - 1));
  if (!near.length) return null;
  const torch = pick(r, near);
  return finds(r, g, floors, far, at, to, torch, doors, rats, second, weapon);
}

// The flask, rat and herb, `far` steps from `up`, the way in; with `down` and
// `torch` when the room has them, and `count` creatures in all, the extra
// ones of kind `second`; and the weapon `weapon`, when set
function finds(r, g, floors, far, up, down, torch, doors, count = 1, second = 'rat', weapon = null) {
  // § flask and rat: the flask well away from the stairs, the rat beside it,
  // at least 5 steps from the stairs up, and 3 tiles off counting across walls.
  // It starts in the dark, as the second room's does: out of the torch's
  // light (3 tiles, D-098) and the stairs' glow (1.5, D-134).
  const open = floors.filter((f) => !onEdge(g, f) && !same(f, up) && !(down && same(f, down)) && !doors.some((d) => same(f, d)));
  const flasks = open.filter((f) => far.get(key(f)) >= 5);
  if (!flasks.length) return null;
  const flask = pick(r, flasks);
  const dark = (f) => far.get(key(f)) >= 5 && dist(f, up) >= 3 && (!torch || dist(f, torch) >= 5) && (!down || dist(f, down) >= 3);
  const rats = open.filter((f) => !same(f, flask) && dist(f, flask) <= 2 && dark(f));
  if (!rats.length) return null;
  const rat = pick(r, rats);

  // § herb: anywhere open, at least 3 tiles from the flask and the rat (D-155).
  // Picked last, so the rest of a seed's room is as it was before herbs.
  const herbs = open.filter((f) => dist(f, flask) >= 3 && dist(f, rat) >= 3);
  if (!herbs.length) return null;
  const herb = pick(r, herbs);

  // § more rats deeper: each extra rat anywhere open by the first rat's
  // rules, but not guarding the flask (D-231). Picked after the herb, so the
  // rest of a seed's room stays as it was; one that doesn't fit is left out.
  const enemies = [{ id: 'rat', x: rat.x, y: rat.y }], taken = [flask, herb, rat];
  for (let i = 1; i < count; i++) {
    const spots = open.filter((f) => dark(f) && !taken.some((t) => same(t, f)));
    if (!spots.length) break;
    const at = pick(r, spots);
    taken.push(at); enemies.push({ id: second, x: at.x, y: at.y });
  }

  // § weapon: the knife or the spear, by the flask's rule, at least 5 steps from the stairs up, on a
  // tile nothing else took (D-252). Picked last, so the rest of a seed's room
  // stays as it was; any open tile when none is that far.
  const items = [{ id: 'flask', x: flask.x, y: flask.y }, { id: 'herb', x: herb.x, y: herb.y }];
  if (weapon) {
    const free = open.filter((f) => !taken.some((t) => same(t, f))), far5 = free.filter((f) => far.get(key(f)) >= 5);
    const at = (far5.length || free.length) && pick(r, far5.length ? far5 : free);
    if (at) { items.push({ id: weapon, x: at.x, y: at.y }); taken.push(at); }
  }

  // § oilcap: one on any open tile nothing else took (D-296). Picked last, so
  // the rest of a seed's room stays as it was; none when no tile is free.
  const caps = open.filter((f) => !taken.some((t) => same(t, f)));
  if (caps.length) { const at = pick(r, caps); items.push({ id: 'oilcap', x: at.x, y: at.y }); taken.push(at); }

  // § heartcap: in about 1 in 2 rooms, on any open tile nothing else took
  // (D-303). Picked after the oilcap, so the rest of a seed's room stays as it was.
  const hearts = open.filter((f) => !taken.some((t) => same(t, f)));
  if (r() < HEARTCAP_ODDS && hearts.length) { const at = pick(r, hearts); items.push({ id: 'heartcap', x: at.x, y: at.y }); }

  return {
    map: g.map((row) => row.join('')),
    start: { x: up.x, y: up.y },
    lights: torch ? [{ id: 'torch', x: torch.x, y: torch.y }] : [],
    items,
    enemies,
  };
}

// § deposits: `count` deposits on open floor, off the edge, where nothing lies,
// stands or starts, or a landmark keeps clear (D-311, D-592). Each one must leave every open tile reachable, so a
// deposit never cuts the room in two; one that can't fit is left out. Placed
// after everything else, so the rest of a seed's room stays as it was. The last
// `veins` placed become copper veins ('V', D-480), so every deposit stays where it was.
function withDeposits(r, room, count, veins = 0, keep = []) {
  const g = room.map.map((row) => [...row]), things = [room.start, ...room.items, ...room.enemies, ...keep];
  const all = tilesWhere(g, (x, y) => walkable(g, { x, y })), placed = [];
  for (let i = 0; i < count; i++) {
    const spots = all.filter((t) => g[t.y][t.x] === '.' && !onEdge(g, t) && !things.some((o) => same(o, t)));
    while (spots.length) {
      const at = spots.splice(int(r, 0, spots.length - 1), 1)[0];
      g[at.y][at.x] = 'O';
      if (joined(g)) { placed.push(at); break; }
      g[at.y][at.x] = '.';
    }
  }
  for (const at of veins ? placed.slice(-veins) : []) g[at.y][at.x] = 'V';
  return g.map((row) => row.join(''));
}
// Whether every tile of g that can be walked joins up with the rest, a deposit ('O'), vein ('V'), rubble ('U'), water ('~') or standing stone ('Y') counting as solid
const walkable = (g, t) => g[t.y]?.[t.x] !== undefined && !['#', 'O', 'V', 'U', '~', 'Y'].includes(g[t.y][t.x]);
function joined(g) {
  const open = tilesWhere(g, (x, y) => walkable(g, { x, y })), seen = new Set([key(open[0])]), queue = [open[0]];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (walkable(g, n) && !seen.has(key(n))) { seen.add(key(n)); queue.push(n); }
    }
  }
  return seen.size === open.length;
}

// § pool: in about 1 room in 2, a still pool of 5 to 9 water tiles ('~', D-500), in a
// chamber: it starts on floor with open floor all 8 tiles around, and grows over open
// floor off the edge where nothing lies, stands or starts or a landmark keeps clear, every tile of it at least
// POOL_CLEAR steps from the stairs and the way in. It never cuts the room in two. From its
// own seed, so the rest of a seed's room stays as it was; the room as it was when none fits.
export const POOL_ODDS = 0.5, POOL_MIN = 5, POOL_MAX = 9, POOL_CLEAR = 4;
export function withPool(seed, room, keep = []) {
  const r = rng(seed ^ 0x6a09e667);
  if (r() >= POOL_ODDS) return room;
  const g = room.map.map((row) => [...row]), far = reach(g, room.start), size = int(r, POOL_MIN, POOL_MAX);
  const things = [room.start, ...room.items, ...room.enemies, ...keep];
  const stairs = tilesWhere(g, (x, y) => g[y][x] === '<' || g[y][x] === '>');
  const free = (t) => g[t.y]?.[t.x] === '.' && !onEdge(g, t) && !things.some((o) => same(o, t))
    && far.get(key(t)) >= POOL_CLEAR && stairs.every((s) => dist(s, t) >= POOL_CLEAR);
  const spots = tilesWhere(g, (x, y) => free({ x, y }) && RING.every(([dx, dy]) => g[y + dy]?.[x + dx] === '.'));
  while (spots.length) {
    const pool = [spots.splice(int(r, 0, spots.length - 1), 1)[0]];
    g[pool[0].y][pool[0].x] = '~';
    while (pool.length < size) {
      const next = pool.flatMap((t) => [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy }))).filter(free);
      if (!next.length) break;
      const n = next[int(r, 0, next.length - 1)];
      g[n.y][n.x] = '~'; pool.push(n);
    }
    if (pool.length >= POOL_MIN && joined(g)) return { ...room, map: g.map((row) => row.join('')) };
    for (const t of pool) g[t.y][t.x] = '.';
  }
  return room;
}

// § flask mimic: (seed, room) → the room with a flask mimic asleep where a flask
// could lie (D-366, D-368): on open floor off the edge, at least 5 steps from the way in,
// where nothing lies, stands or starts, not beside the stairs or an opening, and
// never cutting the room in two, since it never moves. Placed after everything
// else, from its own seed, so the rest of a seed's room stays as it was; the room
// as it was when no tile fits.
export function withMimic(seed, room) {
  const r = rng(seed ^ 0x510e527f), g = room.map.map((row) => [...row]), far = reach(g, room.start);
  const things = [room.start, ...room.items, ...room.enemies, ...(room.people || [])];
  const beside = (t) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => {
    const n = { x: t.x + dx, y: t.y + dy }, ch = g[n.y]?.[n.x];
    return ch === '<' || ch === '>' || (ch === '.' && onEdge(g, n));
  });
  const spots = tilesWhere(g, (x, y) => g[y][x] === '.').filter((t) => !onEdge(g, t) && far.get(key(t)) >= 5 && !beside(t) && !things.some((o) => same(o, t)));
  while (spots.length) {
    const at = spots.splice(int(r, 0, spots.length - 1), 1)[0];
    g[at.y][at.x] = 'O';
    const ok = joined(g);
    g[at.y][at.x] = '.';
    if (ok) return { ...room, enemies: [...room.enemies, { id: 'flaskMimic', x: at.x, y: at.y, asleep: true }] };
  }
  return room;
}

// § trapped: (seed, room, id) → the room with person `id` trapped in a ring of rubble
// ('U', D-490): on open floor at least 5 steps from the way in, with at least 4 of its
// 8 tiles around open and a wall on one straight side at most (D-586), every open one
// turned to rubble, the walls doing the rest. Off the edge, with no stairs or opening
// beside, the way in not on it or around it, and never cutting the room in two. A creature
// or find on it or around it moves to the nearest free floor (D-586). Placed last, from its
// own seed, so the rest of a seed's room stays as it was; the room as it was when no tile fits.
export const RING = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
const STRAIGHT = [[0, -1], [-1, 0], [1, 0], [0, 1]];
export const RING_OPEN = 4, RING_WALLS = 1; // open tiles around him at least; straight sides walled at most
export function withTrapped(seed, room, id) {
  const r = rng(seed ^ 0x1f83d9ab), g = room.map.map((row) => [...row]), far = reach(g, room.start);
  const ring = (t) => RING.map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy }));
  const fits = (t) => {
    const around = ring(t);
    return around.every((n) => (g[n.y][n.x] === '.' || g[n.y][n.x] === '#') && !onEdge(g, n)) && around.filter((n) => g[n.y][n.x] === '.').length >= RING_OPEN
      && STRAIGHT.filter(([dx, dy]) => g[t.y + dy][t.x + dx] === '#').length <= RING_WALLS && ![t, ...around].some((n) => same(room.start, n));
  };
  const spots = tilesWhere(g, (x, y) => g[y][x] === '.').filter((t) => !onEdge(g, t) && far.get(key(t)) >= 5 && fits(t));
  while (spots.length) {
    const at = spots.splice(int(r, 0, spots.length - 1), 1)[0], open = ring(at).filter((n) => g[n.y][n.x] === '.');
    for (const n of [at, ...open]) g[n.y][n.x] = 'U';
    if (joined(g)) {
      g[at.y][at.x] = '.';
      const block = [at, ...ring(at)], taken = [room.start, ...room.items, ...room.enemies].filter((o) => !block.some((b) => same(b, o)));
      const aside = (o) => (block.some((b) => same(b, o)) ? { ...o, ...nearestFree(g, o, block, taken) } : o);
      const items = room.items.map(aside), enemies = room.enemies.map(aside);
      return { ...room, map: g.map((row) => row.join('')), items, enemies, people: [...(room.people || []), { id, x: at.x, y: at.y }] };
    }
    for (const n of [at, ...open]) g[n.y][n.x] = '.';
  }
  return room;
}
// The open floor tile nearest `from` by steps, off the edge, outside `block` and with
// nothing in `taken` on it, which it then joins; steps go over floor and rubble
function nearestFree(g, from, block, taken) {
  const seen = new Set([key(from)]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    if (g[t.y][t.x] === '.' && !onEdge(g, t) && !block.some((b) => same(b, t)) && !taken.some((o) => same(o, t))) { taken.push(t); return { x: t.x, y: t.y }; }
    for (const [dx, dy] of WAYS) {
      const n = { x: t.x + dx, y: t.y + dy };
      if ((g[n.y]?.[n.x] === '.' || g[n.y]?.[n.x] === 'U') && !seen.has(key(n))) { seen.add(key(n)); queue.push(n); }
    }
  }
  return from;
}

// § chambers: 5 to 10 roundish chambers, their middles well apart (D-162);
// 3 to 6 in a 13 × 15 room (D-580)
function placeCaves(r, cols, rows) {
  const want = int(r, byArea(CAVES[0], cols, rows), byArea(CAVES[1], cols, rows)), caves = [];
  for (let i = 0; i < 60 && caves.length < want; i++) {
    const c = { x: int(r, 2, cols - 3), y: int(r, 2, rows - 3), rx: size(r), ry: size(r) };
    if (!caves.some((o) => Math.hypot(o.x - c.x, o.y - c.y) < CAVE_GAP)) caves.push(c);
  }
  return caves;
}
const size = (r) => CAVE_R[0] + r() * (CAVE_R[1] - CAVE_R[0]);

// § lumpy: a chamber's oval as floor, each edge tile in or out by chance (D-162)
const LUMPY = 0.9;
function carveCave(r, g, c) {
  for (let y = 1; y < g.length - 1; y++) for (let x = 1; x < g[0].length - 1; x++) {
    const d = ((x - c.x) / c.rx) ** 2 + ((y - c.y) / c.ry) ** 2;
    if (d <= 1 + (r() - 0.5) * LUMPY) g[y][x] = '.';
  }
}

// § smooth: one pass that rounds the chambers off, like water on stone: a tile
// is wall when 5 or more of it and its 8 neighbours are wall (D-162). It runs
// before the tunnels, which it would close.
function smooth(g) {
  return g.map((row, y) => row.map((ch, x) => {
    if (onEdge(g, { x, y })) return '#';
    let walls = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (g[y + dy][x + dx] === '#') walls++;
    return walls >= 5 ? '#' : '.';
  }));
}

// § tunnels: each chamber joins the nearest one already joined, by a one-tile
// tunnel that heads there but wanders a step aside now and then (D-162)
const WANDER = 0.3;
function joinCaves(r, g, caves) {
  const joined = [caves[0]], left = caves.slice(1);
  while (left.length) {
    let best = null;
    for (const a of left) for (const b of joined) if (!best || dist(a, b) < best.d) best = { a, b, d: dist(a, b) };
    tunnel(r, g, best.a, best.b);
    joined.push(best.a); left.splice(left.indexOf(best.a), 1);
  }
}

// A one-tile tunnel from `from` to `to`, wandering a step aside now and then
function tunnel(r, g, from, to) {
  let { x, y } = from;
  for (let s = 0; s < 200 && (x !== to.x || y !== to.y); s++) {
    if (r() < WANDER) {
      const [dx, dy] = pick(r, [[1, 0], [-1, 0], [0, 1], [0, -1]]);
      if (inside(g, x + dx, y + dy)) { x += dx; y += dy; }
    } else if (x !== to.x && (y === to.y || r() < 0.5)) x += Math.sign(to.x - x);
    else y += Math.sign(to.y - y);
    g[y][x] = '.';
  }
}

// § burrows: a digger starts near the middle and wanders, mostly keeping its
// way, carving as it goes until 119 to 138 tiles are open (50 to 58 in an
// 11 × 13 room, 89 to 104 in a 15 × 17 one): twisty tunnels, loops and dead
// ends (D-163, D-165, D-195, D-580). It starts at least 5 tiles in from the
// left and top, and 6 from the right and bottom. Its path is one piece, so
// all is joined.
const DIG_OPEN = [119, 138], DIG_TURN = 0.35, DIG_STEPS = 4000;
const WAYS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function burrows(r, cols, rows) {
  const g = walls(cols, rows), want = int(r, byArea(DIG_OPEN[0], cols, rows), byArea(DIG_OPEN[1], cols, rows));
  let x = int(r, 5, cols - 6), y = int(r, 5, rows - 6), [dx, dy] = pick(r, WAYS), open = 0;
  for (let i = 0; i < DIG_STEPS && open < want; i++) {
    if (g[y][x] === '#') { g[y][x] = '.'; open++; }
    if (r() < DIG_TURN) [dx, dy] = pick(r, WAYS);
    if (inside(g, x + dx, y + dy)) { x += dx; y += dy; } else [dx, dy] = pick(r, WAYS);
  }
  return g;
}

// § halls: 3 or 4 straight-walled halls, 4 to 7 tiles wide and 4 to 6 tall,
// with wall between them, each joined to the one before by a one-tile
// corridor that turns once (D-228). Built stone, so nothing wanders.
// A room of more cells (D-645) gets that many times the halls, by its area against one 13 × 15 cell.
const HALLS = [3, 4], HALL_W = [4, 7], HALL_H = [4, 6], HALL_CELL = 13 * 15;
function halls(r, cols, rows) {
  const k = Math.max(1, Math.round((cols * rows) / HALL_CELL)), g = walls(cols, rows), want = int(r, HALLS[0] * k, HALLS[1] * k), hs = [];
  for (let i = 0; i < 100 * k && hs.length < want; i++) {
    const w = int(r, HALL_W[0], HALL_W[1]), h = int(r, HALL_H[0], HALL_H[1]);
    const hall = { x: int(r, 2, cols - 2 - w), y: int(r, 2, rows - 2 - h), w, h };
    if (!hs.some((o) => hall.x <= o.x + o.w && o.x <= hall.x + hall.w && hall.y <= o.y + o.h && o.y <= hall.y + hall.h)) hs.push(hall);
  }
  if (hs.length < HALLS[0] * k) return null;
  const mid = (h) => ({ x: h.x + (h.w >> 1), y: h.y + (h.h >> 1) });
  hs.forEach((h, i) => {
    for (let y = h.y; y < h.y + h.h; y++) for (let x = h.x; x < h.x + h.w; x++) g[y][x] = '.';
    if (i) lane(r, g, mid(hs[i - 1]), mid(h));
  });
  return g;
}

// A one-tile corridor from `from` to `to`, along one way and then the other; the other
// way round when the first would cross a tile in `avoid` and the other wouldn't (D-585)
function lane(r, g, from, to, avoid = null) {
  let { x, y } = from, across = r() < 0.5;
  const crosses = (way) => lanePath(from, to, way).some((t) => avoid.some((a) => same(a, t)));
  if (avoid?.length && crosses(across) && !crosses(!across)) across = !across;
  for (const way of across ? ['x', 'y'] : ['y', 'x']) {
    while (way === 'x' ? x !== to.x : y !== to.y) {
      g[y][x] = '.';
      if (way === 'x') x += Math.sign(to.x - x); else y += Math.sign(to.y - y);
    }
  }
  g[y][x] = '.';
}

// The tiles a lane from `from` to `to` passes, after `from`
function lanePath(from, to, across) {
  let { x, y } = from;
  const out = [];
  for (const way of across ? ['x', 'y'] : ['y', 'x']) {
    while (way === 'x' ? x !== to.x : y !== to.y) {
      if (way === 'x') x += Math.sign(to.x - x); else y += Math.sign(to.y - y);
      out.push({ x, y });
    }
  }
  return out;
}

const SHAPES = { chambers, burrows, halls };

// § helpers
// The grid's size comes from the grid itself, rows of tiles or strings
const walls = (cols, rows) => Array.from({ length: rows }, () => Array(cols).fill('#'));
const key = (t) => t.y * 64 + t.x; // a tile's key, one number for each tile of any room up to 64 wide
const onEdge = (g, t) => t.x === 0 || t.y === 0 || t.x === g[0].length - 1 || t.y === g.length - 1;
const inside = (g, x, y) => x > 0 && y > 0 && x < g[0].length - 1 && y < g.length - 1; // off the edge
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
function tilesWhere(g, test) {
  const out = [];
  for (let y = 0; y < g.length; y++) for (let x = 0; x < g[0].length; x++) if (test(x, y)) out.push({ x, y });
  return out;
}
// Steps from `from` to every floor tile it can walk to, not through `cut`
function reach(g, from, cut = []) {
  const out = new Map([[key(from), 0]]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (g[n.y]?.[n.x] !== '.' || out.has(key(n)) || cut.some((c) => same(c, n))) continue;
      out.set(key(n), out.get(key(t)) + 1); queue.push(n);
    }
  }
  return out;
}
