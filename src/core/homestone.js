// § homestone: a save from before the home waystone (D-589) has its woods room as it was.
// Once, as the save is brought up to date (save.js), the waystone is set there: at the spot
// nearest where a new game puts it, where none of the hero's built things, the pond, the
// cave mouth, a person, a light or the hero stand. Only trees, stumps, branches and bushes
// there are cleared to grass, and sticks on the stone itself go; nothing of the hero's moves.
// Plain data, no drawing.
import { LANDMARKS } from './registry.js';
import { stamp, around } from './landmarks.js';
import { STONE_UP, STONE_RING } from './woods.js';
import { stoneHome } from './mouth.js';

const MARK = LANDMARKS.waystone;
const CLEARED = new Set(['.', 'T', 'S', 'F', 'G', 'H']); // grass, trees, stumps, branches, bushes
const PLATE = 'Z';

// (state) → the state with the waystone in its woods room, and in the room as it began
export function withHomeStone(s) {
  if (stoneMoved(s)) return s; // a save already holding it in the cave mouth's room (D-753)
  const out = { ...s };
  if (s.place === 'woods') Object.assign(out, settle(s, s.hero));
  else if (s.elsewhere?.woods) out.elsewhere = { ...s.elsewhere, woods: settle(s.elsewhere.woods) };
  const began = s.home?.places?.woods;
  if (began) out.home = { ...s.home, places: { ...s.home.places, woods: settle(began) } };
  return out;
}

// Whether the cave mouth's room holds the stone already, as only a save made since D-753 can
// (no save from before D-589 had that room), so this step leaves it as it is
function stoneMoved(s) {
  const id = stoneHome(s.seed), room = s.place === id ? s.room : s.elsewhere?.[id]?.room;
  return !!room?.map.some((line) => line.includes(PLATE) || line.includes('A'));
}

// One woods place ({ room, items, people, lights, taken }) with the stone set, or as it was when it
// has one or no spot fits; `hero` stands there, when they are in it. Also sets it in the cave
// mouth's room for a save from before the stone moved there (movestone.js, D-753)
export function settle(p, hero = null) {
  const room = p.room;
  if (!room || room.map.some((line) => line.includes(PLATE))) return p;
  const at = spotFor(p, hero);
  if (!at) return p;
  const area = around(MARK, at.x, at.y, STONE_RING), inArea = (t) => area.some((a) => a.x === t.x && a.y === t.y);
  const stone = around(MARK, at.x, at.y), on = (t) => stone.some((a) => a.x === t.x && a.y === t.y); // the stone's own tiles, not its ring (D-664)
  const g = room.map.map((line) => [...line]);
  for (const t of area) if (CLEARED.has(g[t.y][t.x])) g[t.y][t.x] = '.';
  stamp(g, MARK, at.x, at.y);
  const out = { ...p, room: { ...room, map: g.map((row) => row.join('')) }, items: (p.items || []).filter((it) => !on(it)) };
  if (p.taken) out.taken = p.taken.filter((t) => !inArea(t)); // what grew there grows back no more
  return out;
}

// The middle nearest where a new game puts it (woods.js), whose plan holds only what is cleared,
// no person, light, hero or anything but sticks; first with the ring around it as clear, then without
function spotFor(p, hero) {
  const { cols, rows, map } = p.room, want = { x: cols >> 1, y: (rows >> 1) - STONE_UP }, reach = 2 + STONE_RING;
  const taken = [...(p.people || []), ...(p.lights || []), ...(hero ? [hero] : [])];
  const clear = (t) => CLEARED.has(map[t.y][t.x]) && !taken.some((o) => o.x === t.x && o.y === t.y);
  const bare = (t) => !(p.items || []).some((it) => it.x === t.x && it.y === t.y && it.id !== 'wood');
  const spots = [];
  for (let y = reach + 1; y < rows - reach - 1; y++) for (let x = reach + 1; x < cols - reach - 1; x++) spots.push({ x, y });
  spots.sort((a, b) => Math.hypot(a.x - want.x, a.y - want.y) - Math.hypot(b.x - want.x, b.y - want.y) || a.y - b.y || a.x - b.x);
  const stone = (t) => around(MARK, t.x, t.y).every((a) => clear(a) && bare(a));
  const ring = (t) => around(MARK, t.x, t.y, STONE_RING).every(clear);
  return spots.find((t) => stone(t) && ring(t)) || spots.find(stone) || null;
}
