// § regrow: things picked grow back (D-306, D-307). Each room keeps a `taken` list
// beside its items: the thing just as it lay, its tile and tone, and the turn it
// was taken (`at`). A kind with `regrow` in the registry comes back that many
// turns later, each on its own clock; one without (the knife) never does. It
// comes back only out of the hero's sight, on a tile nothing stands or lies on,
// so nothing appears before their eyes; in a room the hero has just come into,
// what grew while they were away is already there. A tile on the list (a broken
// deposit, O3) comes back the same way, as that tile on the room's map, but on a
// floor tile within `near` steps of where it stood (diagonals count), or its own
// again, picked by the seed: off the edge, never cutting the room in two (D-313).
// A tree comes back only on its own stump (`on`, W3, D-317), and waits while
// that would cut the room.
// Plain data, no drawing.
import { get } from './registry.js';
import { litAt } from './sight.js';
import { tileAt, withTile } from './room.js';
import { rng, pick, seedFor } from './rng.js';

// (state, item) → the state with the item on its room's taken list, when its kind grows
// back and it isn't one left over, `once` (W2, D-316)
export function noteTaken(state, item) {
  if (!get(item.id)?.regrow || item.once) return state;
  return { ...state, taken: [...(state.taken || []), { ...item, at: state.turn }] };
}

// (state, came) → the state with every taken thing whose clock has run out back on its
// tile (a tile kind near it), when the tile is free and out of sight (any tile, when the
// hero `came` into the room just now); the rest wait on the list. Each goes back in
// turn, so two coming back at once never share a tile or cut the room together.
export function regrow(state, came = false) {
  const taken = state.taken || [];
  if (!taken.some((t) => state.turn - t.at >= get(t.id).regrow)) return state;
  let now = { ...state, taken: [] };
  for (const t of taken) {
    const entry = get(t.id), due = state.turn - t.at >= entry.regrow;
    const at = due && (entry.kind === 'tile' ? spotNear(now, t, entry, came) : free(now, t, came) && t);
    if (!at) now = { ...now, taken: [...now.taken, t] };
    else if (entry.kind === 'tile') now = { ...now, room: withTile(now.room, at.x, at.y, entry) };
    else { const { at: _, ...item } = t; now = { ...now, items: [...now.items, item] }; }
  }
  return now.taken.length === taken.length ? state : now;
}

// A floor tile (or the kind's `on` tile) within the kind's `near` steps of t, off the edge, free, out of
// sight and not cutting the room in two, picked by the seed; null when none is
function spotNear(state, t, entry, came) {
  const { room } = state, near = entry.near ?? 0, spots = [];
  for (let y = t.y - near; y <= t.y + near; y++) for (let x = t.x - near; x <= t.x + near; x++) {
    if (x < 1 || y < 1 || x > room.cols - 2 || y > room.rows - 2) continue;
    if (tileAt(room, x, y).id !== (entry.on ?? 'floor') || !free(state, { x, y }, came)) continue;
    if (joined(withTile(room, x, y, entry))) spots.push({ x, y });
  }
  return spots.length ? pick(rng(seedFor(seedFor(state.seed ?? 1, t.at), t.y * room.cols + t.x)), spots) : null;
}

// Every open tile of the room reachable from every other (a bench set down, too, bagturn.js)
export function joined(room) {
  const open = [];
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (!tileAt(room, x, y).solid) open.push(`${x},${y}`);
  const seen = new Set(open.slice(0, 1)), queue = open.slice(0, 1);
  while (queue.length) {
    const [x, y] = queue.shift().split(',').map(Number);
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = `${x + dx},${y + dy}`;
      if (x + dx < 0 || y + dy < 0 || x + dx >= room.cols || y + dy >= room.rows || seen.has(k) || tileAt(room, x + dx, y + dy).solid) continue;
      seen.add(k); queue.push(k);
    }
  }
  return seen.size === open.length;
}

// Its tile is open, nothing stands or lies on it, and it is out of sight
function free(state, { x, y }, came) {
  if (state.hero.x === x && state.hero.y === y) return false;
  if (tileAt(state.room, x, y).solid) return false;
  const on = (list) => list.some((o) => o.x === x && o.y === y);
  if (on(state.enemies) || on(state.items)) return false;
  return came || !litAt(state, x, y);
}
