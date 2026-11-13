// § spawn: dev mode's spawn tool as plain rules (DEV-TOOLS.md, D-049).
// (state, id, x, y) → new state. Spawning never passes a turn. When nothing
// can change, the same state comes back.
import { get, asleepAtFirst } from './registry.js';
import { tileAt, withTile } from './room.js';
import { blankMemory } from './fog.js';
import { itemAt } from './turn.js';
import { lightAt } from './lights.js';
import { mountAt } from './mount.js';
import { enemyAt } from './enemies.js';
import { personAt } from './people.js';

export function spawn(state, id, x, y) {
  const entry = get(id), room = state.room;
  if (!entry || x < 0 || y < 0 || x >= room.cols || y >= room.rows) return state;
  if (entry.kind === 'tile') {
    if (tileAt(room, x, y) === entry) return state;
    const onHero = state.hero.x === x && state.hero.y === y;
    if (onHero && entry.solid) return state; // a wall can't go on the hero (D-049)
    if (entry.solid && (itemAt(state, x, y) || enemyAt(state, x, y) || personAt(state, x, y))) return state; // nor on an item, enemy (D-079, D-108) or person (D-869)
    const next = withTile(room, x, y, entry);
    // every light must still have somewhere to sit; it turns to fit if it can (D-099, D-102)
    if (state.lights.some((l) => !mountAt(next, l.x, l.y))) return state;
    return { ...state, room: next };
  }
  if (entry.kind === 'item' || entry.kind === 'enemy') { // on floor, off the hero and people, one thing per tile (D-079, D-108, D-869)
    const onHero = state.hero.x === x && state.hero.y === y;
    if (onHero || personAt(state, x, y) || tileAt(room, x, y).solid || itemAt(state, x, y) || enemyAt(state, x, y)) return state;
    const list = entry.kind === 'item' ? 'items' : 'enemies';
    // one in disguise starts asleep (D-368); each is marked `spawned`, so beating it or pouring it counts in no Records (D-720)
    return { ...state, [list]: [...state[list], { id, x, y, ...(asleepAtFirst(entry) && { asleep: true }), spawned: true }] };
  }
  const free = !tileAt(room, x, y).solid && !(state.hero.x === x && state.hero.y === y) && !itemAt(state, x, y) && !enemyAt(state, x, y) && !personAt(state, x, y);
  if (entry.kind === 'light') { // where it can sit, one per tile (D-100)
    if (lightAt(state, x, y)) return state;
    if (mountAt(room, x, y)) return { ...state, lights: [...state.lights, { id, x, y }] };
    // on a free floor tile, on a torch's stone foot, as one set down (D-478, H-49); a dev light never burns out
    if (!free) return state;
    return { ...state, room: withTile(room, x, y, get('torchStand')), lights: [...state.lights, { id, x, y }] };
  }
  if (entry.kind === 'npc') return free ? bring(state, id, x, y) : state; // on a free floor tile (H-48)
  return state; // other kinds arrive with their own steps
}

// § bring: there is one of each person, so Spawn moves them here from any room they stand
// in, standing as at home, already greeted: a bump of one who buys opens their trade (H-48)
function bring(state, id, x, y) {
  const away = (p) => (p.people || []).some((q) => q.id === id) ? { ...p, people: p.people.filter((q) => q.id !== id) } : p;
  const elsewhere = Object.fromEntries(Object.entries(state.elsewhere || {}).map(([k, p]) => [k, away(p)]));
  return { ...state, elsewhere, people: [...away(state).people || [], { id, x, y, home: true, greeted: true }] };
}

// § reset: the starting room comes back (D-050). If the hero now stands in a
// wall, they go back to their starting tile. The memory is forgotten too (D-062),
// spawned items are gone (D-079), and the starting lights, enemies and items
// come back (D-102, D-108, D-140), and its people (D-490).
export function resetRoom(state, room, start, lights = [], enemies = [], items = [], people = []) {
  const hero = tileAt(room, state.hero.x, state.hero.y).solid ? { x: start.x, y: start.y } : state.hero;
  return { ...state, room, hero, seen: blankMemory(room), items, lights, enemies, people };
}
