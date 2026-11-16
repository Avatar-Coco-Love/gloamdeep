// § follow: creatures through doorways (Q-107, D-925). Plain data, no drawing. As the hero
// leaves a room by a doorway, an edge, the cave mouth or stairs, each creature that `follows`
// (its registry mark: the ones that chase, but not the warden) and is chasing, within 3 steps of
// the tile left by walking, comes after them. It is gone from the room left at once, and comes in
// as many turns later as it was steps away, on the tile the hero came in by (the nearest free tile
// to it when that one is taken), chasing, after the creatures' turn, so it acts the turn after.
// Should the hero leave the room before it comes, it gives up: a coin toss puts it in the room
// it left or the one it was coming into, on a random free tile, no longer chasing. A fall gives
// them all up. Waiting followers are `state.coming`: [{ foe, from, to, at, spot }].
import { get } from './registry.js';
import { tileAt } from './room.js';
import { rng, seedFor, pick } from './rng.js';

export const REACH = 3; // steps from the tile left (D-925)
const SALT = 0x3f1e7a2b;
const SIDES = [[0, -1], [0, 1], [-1, 0], [1, 0]];
const open = (room, x, y) => x >= 0 && y >= 0 && x < room.cols && y < room.rows && !tileAt(room, x, y).solid;

// § steps: (room, from) → a map 'x,y' → walking steps from `from`, through open tiles, up to REACH
function stepsFrom(room, from) {
  const out = new Map([[from.x + ',' + from.y, 0]]), queue = [from];
  for (let i = 0; i < queue.length; i++) {
    const at = queue[i], n = out.get(at.x + ',' + at.y);
    if (n === REACH) continue;
    for (const [dx, dy] of SIDES) {
      const x = at.x + dx, y = at.y + dy, key = x + ',' + y;
      if (out.has(key) || !open(room, x, y)) continue;
      out.set(key, n + 1);
      queue.push({ x, y });
    }
  }
  return out;
}

const follows = (e) => get(e.id)?.follows && !e.ash && e.chasing && !e.asleep && !e.pile && !e.under && !(e.flees > 0);

// § follow: (left, out, exit) → `out`, the state just arrived in another room, with each
// follower of `left`'s room, near `exit`, taken out of that room and waiting in `coming`
export function follow(left, out, exit) {
  if (out.place === left.place) return out;
  const near = stepsFrom(left.room, exit);
  const going = left.enemies.filter((e) => follows(e) && near.get(e.x + ',' + e.y) > 0);
  if (!going.length) return out;
  const gone = (e) => going.some((g) => g.x === e.x && g.y === e.y);
  const was = out.elsewhere[left.place];
  const elsewhere = { ...out.elsewhere, [left.place]: { ...was, enemies: was.enemies.filter((e) => !gone(e)) } };
  const coming = going.map((foe) => ({ foe, from: left.place, to: out.place, at: out.turn + near.get(foe.x + ',' + foe.y), spot: out.hero }));
  return { ...out, elsewhere, coming: [...(out.coming || []), ...coming] };
}

// § taken: whether a tile of the room `p` holds a creature, an item, a person or the hero
const taken = (p, x, y, hero) => (hero && hero.x === x && hero.y === y)
  || p.enemies.some((e) => e.x === x && e.y === y) || (p.items || []).some((it) => it.x === x && it.y === y)
  || (p.people || []).some((q) => q.x === x && q.y === y);

// § nearest free: (place, spot, hero) → `spot`, or the nearest free tile to it by steps, or null
function nearestFree(p, spot, hero) {
  const seen = new Set([spot.x + ',' + spot.y]), queue = [spot];
  for (let i = 0; i < queue.length; i++) {
    const at = queue[i];
    if (!taken(p, at.x, at.y, hero)) return at;
    for (const [dx, dy] of SIDES) {
      const x = at.x + dx, y = at.y + dy;
      if (seen.has(x + ',' + y) || !open(p.room, x, y)) continue;
      seen.add(x + ',' + y);
      queue.push({ x, y });
    }
  }
  return null;
}

// § somewhere: (place, r, hero) → a random free tile of the room, or null
function somewhere(p, r, hero) {
  const free = [];
  for (let y = 0; y < p.room.rows; y++) for (let x = 0; x < p.room.cols; x++) {
    if (open(p.room, x, y) && !taken(p, x, y, hero)) free.push({ x, y });
  }
  return free.length ? pick(r, free) : null;
}

// A follower given up, settled in the room `place` of the state; null when no tile is free there
function settle(state, f, n) {
  const r = rng(seedFor(state.seed ^ state.turn, SALT + n));
  const place = r() < 0.5 ? f.from : f.to, here = place === state.place;
  const p = here ? state : state.elsewhere[place];
  if (!p) return null;
  const at = somewhere(p, r, here && state.hero);
  if (!at) return null;
  const { chasing, flees, ...rest } = f.foe, foe = { ...rest, x: at.x, y: at.y, chasing: false };
  return here ? { ...state, enemies: [...state.enemies, foe] }
    : { ...state, elsewhere: { ...state.elsewhere, [place]: { ...p, enemies: [...p.enemies, foe] } } };
}

// § come in: (state) → each follower due in the hero's room comes in; each whose room the hero
// has left gives up. One with no free tile yet waits another turn; one given up with none is lost.
export function comeIn(state, giveUp = false) {
  if (!state.coming?.length) return state;
  let s = { ...state, coming: [] };
  const waiting = [];
  state.coming.forEach((f, n) => {
    if (giveUp || s.place !== f.to) { s = settle(s, f, n) || s; return; }
    const at = s.turn >= f.at && nearestFree(s, f.spot, s.hero);
    if (!at) { waiting.push(f); return; }
    s = { ...s, enemies: [...s.enemies, { ...f.foe, x: at.x, y: at.y, chasing: true }] };
  });
  return { ...s, coming: waiting };
}

// § on the way: whether a follower is coming into the hero's room (the rim stays red, D-925)
export const onTheWay = (state) => (state.coming || []).some((f) => f.to === state.place);
