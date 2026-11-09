// § unguarded: in a made room, each flask has a 1 in 4 chance, from the room's seed,
// of no rat by it (D-725, answers Q-075). From depth 2, every made room; each flask
// of a hall or large room rolls alone. Its guard goes somewhere else in the dark, by
// the guard's rules (at least 5 steps in, 3 tiles from the stairs, out of the torch's
// light) but more than 2 tiles from every flask, and is picked again from the depth's
// pool, the room keeping at least two kinds (D-534). A guard with nowhere to go
// stays. From its own draws, so the rest of a seed's room stays where it was. Plain
// data, no drawing.
import { rng, pick } from './rng.js';
import { steps } from './sized.js';

export const UNGUARDED_ODDS = 0.25, GUARD = 2;
const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const key = (t) => `${t.x},${t.y}`;
const draws = (seed) => rng(seed ^ 0x6a09e667);

// (seed, count) → for each of a room's `count` flasks, in order, whether it is unguarded
export function unguardedOf(seed, count) {
  const r = draws(seed);
  return Array.from({ length: count }, () => r() < UNGUARDED_ODDS);
}

// (seed, room, pool, dress) → the room, each unguarded flask's guard moved and picked
// again; `dress` gives a moved creature its colours, tone and sleep. Every guard's
// mark (`guard`, set where it was placed) comes off.
export function withUnguarded(seed, room, pool, dress = (e) => e) {
  const flasks = room.items.filter((i) => i.id === 'flask');
  const guards = room.enemies.flatMap((e, i) => (e.guard ? [i] : []));
  const loose = unguardedOf(seed, flasks.length), r = draws(seed ^ 0x3c6ef372);
  const map = room.map, up = room.start, far = steps(map, up), rows = map.length, cols = map[0].length;
  const torch = room.lights.find((l) => l.id === 'torch');
  const downs = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) if (map[y][x] === '>') downs.push({ x, y });
  const enemies = room.enemies.map(({ guard, ...e }) => e);
  const taken = () => [room.start, ...room.items, ...enemies, ...(room.people || [])].filter(Boolean);
  const dark = (t) => far.get(key(t)) >= 5 && dist(t, up) >= 3 && (!torch || dist(t, torch) >= 5) && downs.every((d) => dist(t, d) >= 3);
  const open = (t) => map[t.y][t.x] === '.' && t.x > 0 && t.y > 0 && t.x < cols - 1 && t.y < rows - 1;
  guards.forEach((g, i) => {
    if (!loose[i] || !flasks[i]) return;
    const busy = taken(), spots = [];
    for (let y = 1; y < rows - 1; y++) for (let x = 1; x < cols - 1; x++) {
      const t = { x, y };
      if (open(t) && dark(t) && flasks.every((f) => dist(f, t) > GUARD) && !busy.some((o) => same(o, t))) spots.push(t);
    }
    if (!spots.length) return;
    const at = pick(r, spots), rest = enemies.filter((e, j) => j !== g && e.id !== 'flaskMimic').map((e) => e.id);
    let id = pick(r, pool);
    if (rest.length && rest.every((k) => k === id)) id = pick(r, pool.filter((k) => k !== id));
    enemies[g] = dress({ id, x: at.x, y: at.y });
  });
  return { ...room, enemies };
}
