// § sized: halls and large rooms hold more (D-651). A room of 2 cells holds twice
// a one-cell room's finds and creatures, one of 2 × 2 four times. The room's first
// set stays where it lay; each other cell gets a set of its own, by the first
// set's rules (cave.js, finds): a flask 5 steps or more from the way in, off the
// edge and not by an opening or the stairs; a rat within 2 tiles of it, in the
// dark; a herb 3 tiles or more from both; the rest of the depth's creatures in
// the dark, each picked from the depth's pool, a set of rats alone getting one
// swapped (D-534); an oilcap; and a heartcap 1 time in 2. A set that doesn't fit
// its cell goes anywhere in the room, and one that fits nowhere is left out. From its own draws, placed after the rest, so the rest of
// a seed's room stays where it was. Plain data, no drawing.
import { rng, pick } from './rng.js';
import { HEARTCAP_ODDS } from './cave.js';

const same = (a, b) => a.x === b.x && a.y === b.y;
const dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const key = (t) => `${t.x},${t.y}`;
const STEP = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const walk = (ch) => ch === '.' || ch === '<' || ch === '>';

// Steps from `from` to every tile that can be walked, by "x,y"
function steps(map, from) {
  const out = new Map([[key(from), 0]]), queue = [from];
  while (queue.length) {
    const t = queue.shift();
    for (const [dx, dy] of STEP) {
      const n = { x: t.x + dx, y: t.y + dy };
      if (!walk(map[n.y]?.[n.x]) || out.has(key(n))) continue;
      out.set(key(n), out.get(key(t)) + 1); queue.push(n);
    }
  }
  return out;
}

// (seed, room, cell, size, count, pool) → { items, enemies }, a set for each of the
// room's cells but the first set's; `cell` the room's { w, h } in cells, `size` one
// cell's { cols, rows } in tiles, `count` a set's creatures, `pool` the depth's
// kinds. They come back bare, as { id, x, y }, for the room to tone and dress.
export function withSize(seed, room, cell, size, count, pool) {
  const many = cell.w * cell.h;
  if (many < 2) return { items: [], enemies: [] };
  const r = rng(seed ^ 0x2545f491), map = room.map, rows = map.length, cols = map[0].length;
  const cellAt = (t) => Math.floor(t.x / (size.cols + 1)) + cell.w * Math.floor(t.y / (size.rows + 1));
  const seam = (t) => (t.x + 1) % (size.cols + 1) === 0 || (t.y + 1) % (size.rows + 1) === 0;
  const far = steps(map, room.start), up = room.start;
  const torch = room.lights.find((l) => l.id === 'torch');
  const downs = [], doors = [];
  for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
    if (map[y][x] === '>') downs.push({ x, y });
    if (map[y][x] === '.' && (x === 0 || y === 0 || x === cols - 1 || y === rows - 1)) doors.push({ x, y });
  }
  const by = (t) => [...doors, ...downs, up].some((o) => dist(o, t) <= 1); // by an opening or the stairs
  const things = [room.start, ...room.items, ...room.enemies, ...(room.people || [])].filter(Boolean);
  const taken = [...things];
  const free = (t) => !taken.some((o) => same(o, t));
  const dark = (t) => far.get(key(t)) >= 5 && dist(t, up) >= 3 && (!torch || dist(t, torch) >= 5) && downs.every((d) => dist(t, d) >= 3);
  const first = room.items.find((i) => i.id === 'flask');
  const items = [], enemies = [];
  // One set in the open tiles `open`, or null when it doesn't fit
  const place = (open) => {
    const flasks = open.filter((t) => far.get(key(t)) >= 5 && free(t));
    if (!flasks.length) return null;
    const flask = pick(r, flasks);
    const rats = open.filter((t) => !same(t, flask) && dist(t, flask) <= 2 && dark(t) && free(t));
    if (!rats.length) return null;
    const rat = pick(r, rats);
    const herbs = open.filter((t) => dist(t, flask) >= 3 && dist(t, rat) >= 3 && free(t));
    if (!herbs.length) return null;
    const herb = pick(r, herbs);
    taken.push(flask, rat, herb);
    const set = [{ id: 'rat', x: rat.x, y: rat.y }];
    for (let i = 1; i < count; i++) {
      const spots = open.filter((t) => dark(t) && free(t));
      if (!spots.length) break;
      const at = pick(r, spots);
      taken.push(at); set.push({ id: pick(r, pool), x: at.x, y: at.y });
    }
    const others = pool.filter((id) => id !== 'rat');
    if (set.length > 1 && others.length && set.every((e) => e.id === 'rat')) set[1 + Math.floor(r() * (set.length - 1))].id = pick(r, others);
    const found = [{ id: 'flask', x: flask.x, y: flask.y }, { id: 'herb', x: herb.x, y: herb.y }];
    const caps = open.filter(free);
    if (caps.length) { const at = pick(r, caps); taken.push(at); found.push({ id: 'oilcap', x: at.x, y: at.y }); }
    const hearts = open.filter(free);
    if (r() < HEARTCAP_ODDS && hearts.length) { const at = pick(r, hearts); taken.push(at); found.push({ id: 'heartcap', x: at.x, y: at.y }); }
    items.push(...found); enemies.push(...set);
    return set;
  };
  const all = [];
  for (let y = 1; y < rows - 1; y++) for (let x = 1; x < cols - 1; x++) {
    const t = { x, y };
    if (map[y][x] === '.' && far.has(key(t)) && !by(t)) all.push(t);
  }
  // Each cell but the first set's; one with too little open floor (a cell of
  // rock and a tunnel) gets its set anywhere in the room
  for (let c = 0; c < many; c++) {
    if (first && c === cellAt(first)) continue;
    place(all.filter((t) => !seam(t) && cellAt(t) === c)) || place(all);
  }
  return { items, enemies };
}
