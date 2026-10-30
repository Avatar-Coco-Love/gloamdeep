// § stairs: going from room to room (D-130 to D-132). Plain data, no drawing.
// The room the hero is in lives at the top of the state as before; every
// other room waits in `state.elsewhere`, by place id, just as it was left
// (D-019): its tiles, lights, enemies, items, people and memory. A depth never
// visited begins fresh, generated from the game's seed (D-147, D-148).
import { placeBeside, placeAt, placeFor, beginPlace, tileAt, isWall } from './room.js';
import { blankMemory } from './fog.js';
import { say } from './lines.js';
import { get } from './registry.js';

// § take: (state) → the state in the room the stairs under the hero lead to,
// standing on its matching stair, with the stairs' line said. Null when the
// hero isn't on stairs, or they lead nowhere (stairs up placed by the dev
// spawn tool in the first room, or stairs with no match where they lead).
export function takeStairs(state) {
  const { hero } = state, entry = tileAt(state.room, hero.x, hero.y);
  const to = entry.leads && placeBeside(state.place, entry.leads, state.seed);
  const there = to && (state.elsewhere[to] || fresh(to, state.seed));
  const spot = there && find(there.room, entry.arrive);
  if (!spot) return null;
  return say(arrive(state, to, there, spot), entry.line);
}

// § go to: (state, depth) → the state at that depth, on its stairs up, or
// where the place starts if it has none (the first room). A dev tool (D-166):
// no turn passes, and the room left waits as stairs leave it.
export const goToDepth = (state, depth) => goToPlace(state, placeAt(depth));

// The same for one place, by id: Go outside goes to the woods, as the crypt is depth 0 too (D-212)
export function goToPlace(state, to) {
  if (to === state.place) return state;
  const there = state.elsewhere[to] || fresh(to, state.seed);
  return arrive(state, to, there, find(there.room, 'stairsUp') || placeFor(to, state.seed).start);
}

// The state moved to place `to`, its room `there`, the hero at `spot`; the room left waits.
// No weapon like one the hero has, held or in the bag, lies there (D-252, D-479). An enemy still fleeing
// calms as the hero leaves: it has to notice them again, as after its turns (D-302),
// and one awake from its disguise settles back down asleep (D-368).
// Each room's taken list goes with it (regrow.js).
export function arrive(state, to, there, spot) {
  const enemies = state.enemies.map((e) => (e.flees > 0 ? { ...e, flees: 0, chasing: false } : e))
    .map(({ awake, ...e }) => (awake ? { ...e, chasing: false, asleep: true } : e)); // one awake settles back down (D-368)
  const here = { room: state.room, lights: state.lights, enemies, items: state.items, people: state.people || [], taken: state.taken || [], seen: state.seen };
  const elsewhere = { ...state.elsewhere, [state.place]: here };
  delete elsewhere[to];
  const has = [state.held, ...(state.bag || []).map((s) => s.id)].filter((id) => id && get(id)?.hold);
  const items = there.items.filter((it) => !has.includes(it.id));
  return stepAside({ ...state, ...there, items, people: there.people || [], taken: there.taken || [], place: to, elsewhere, hero: spot });
}

// § step aside: a creature standing where the hero arrives or wakes, as one that chased
// them to the stairs, steps to the nearest free tile by steps: nothing solid, no item,
// no other creature; none free, and it stays (D-426)
export function stepAside(state) {
  const { hero, room } = state, at = (x, y) => state.enemies.find((e) => e.x === x && e.y === y);
  const foe = at(hero.x, hero.y);
  if (!foe) return state;
  const seen = new Set([hero.x + ',' + hero.y]), queue = [hero];
  for (let i = 0; i < queue.length; i++) {
    for (const [dx, dy] of [[0, -1], [0, 1], [-1, 0], [1, 0]]) { // up, down, left, right, as DIRS
      const x = queue[i].x + dx, y = queue[i].y + dy;
      if (seen.has(x + ',' + y) || x < 0 || y < 0 || x >= room.cols || y >= room.rows || tileAt(room, x, y).solid) continue;
      seen.add(x + ',' + y);
      if (!state.items.some((it) => it.x === x && it.y === y) && !at(x, y)) return { ...state, enemies: state.enemies.map((e) => (e === foe ? { ...e, x, y } : e)) };
      queue.push({ x, y });
    }
  }
  return state;
}

// A place never visited, as it begins from the game's seed, with nothing remembered
export function fresh(id, seed) {
  const { room, lights, enemies, items, people } = beginPlace(id, seed);
  return { room, lights, enemies, items, people, taken: [], seen: blankMemory(room) };
}

// The first tile of kind `id` in the room, row by row, or null
function find(room, id) {
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
    if (tileAt(room, x, y).id === id) return { x, y };
  }
  return null;
}

// § facing: which way the steps sink, toward a wall beside the stairs, so the
// top step starts at the floor (D-143): the wall above first, then left,
// then right, else down.
export function stairsFacing(room, x, y) {
  if (isWall(room, x, y - 1)) return 'up';
  if (isWall(room, x - 1, y)) return 'left';
  if (isWall(room, x + 1, y)) return 'right';
  return 'down';
}

// § glows: (room, seen) → every glowing tile the hero remembers, as a light
// { x, y, r, cr, cg, cb } in pixels from the tile's centre (D-134). Stairs
// must be found: a glow shows only once its own tile is remembered (D-174,
// D-194). `seen` null shows them all (dev Reveal). Worked out once per room.
const TILE_SIZE = 16;
const glowCache = new WeakMap();
export function glowsIn(room, seen) {
  let all = glowCache.get(room);
  if (!all) {
    all = [];
    for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) {
      const g = tileAt(room, x, y).glow;
      if (g) all.push({ at: y * room.cols + x, x: x * TILE_SIZE + TILE_SIZE / 2, y: y * TILE_SIZE + TILE_SIZE / 2, r: g.reach * TILE_SIZE, cr: g.cr, cg: g.cg, cb: g.cb });
    }
    glowCache.set(room, all);
  }
  return seen ? all.filter((g) => seen[g.at]) : all;
}
