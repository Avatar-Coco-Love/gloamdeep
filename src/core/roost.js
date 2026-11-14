// § roost (D-900, D-922): a flyer that `roosts` (the lampmoth and the bat, not the lure wisp) may go
// into a tree beside it and vanish there: a hurt one that flees, a tree beside it, goes in instead of
// flying off; and at dawn, as the night's creatures go, one beside a tree goes in instead. Only an
// inner tree, one the hero can chop, and one flyer a tree (Claude's call). The room keeps them in
// `roosts`, { x, y, e }, off the creature list, so nothing sees, hits or counts them. The first chop
// on the tree drives it out onto a free tile beside the tree, nearest the hero, stirring as one
// woken does (D-368) and after the hero from the turn after; with none free it stays in, and the
// chop that fells the tree drives it out onto the stump. Driven out by day, it keeps to the day
// (its night mark dropped, Claude's call). Each night's coming out clears a room's night roosts,
// as it clears an earlier night's creatures (nightfall.js, B1). Plain data, no drawing; the tree
// shakes (render/roosts.js).
import { get } from './registry.js';
import { tileAt } from './room.js';
import { enemyAt } from './enemies.js';
import { personAt } from './people.js';
import { daylight } from './daytime.js';
import { say } from './lines.js';
import { note } from './events.js';
import { litAt } from './sight.js';

const SIDES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
export const roostsOf = (room) => room.roosts ?? [];
export const roostAt = (room, x, y) => roostsOf(room).find((r) => r.x === x && r.y === y);
// An inner tree: a tree off the room's edge, which stays its wall (W3)
const inner = (room, x, y) => tileAt(room, x, y).id === 'tree' && x > 0 && y > 0 && x < room.cols - 1 && y < room.rows - 1;
// The tree beside e that it can go into: inner, no flyer in it yet; the first side in turn, or null
const treeBeside = (room, e) => SIDES.map(([dx, dy]) => ({ x: e.x + dx, y: e.y + dy }))
  .find((t) => inner(room, t.x, t.y) && !roostAt(room, t.x, t.y)) || null;

// (state, will) → the state with each flyer that roosts and `will(e)`, a tree beside it, gone into
// it: off the creature list, onto the room's roosts, no longer fleeing or after the hero. With
// `line`, the first one on a lit tile says its `roostSay` line
export function intoTrees(state, will, line = false) {
  let room = state.room, said = null, seen = null;
  const enemies = [];
  for (const e of state.enemies) {
    const tree = get(e.id).roosts && will(e) && treeBeside(room, e);
    if (!tree) { enemies.push(e); continue; }
    const { flees, chasing, ...kept } = e;
    room = { ...room, roosts: [...roostsOf(room), { ...tree, e: kept }] };
    said = said || e.id;
    seen = seen || (litAt(state, e.x, e.y) ? e.id : null);
  }
  if (room === state.room) return state;
  const next = note({ ...state, room, enemies }, 'roost', { id: said });
  return line && seen && get(seen).roostSay ? say(next, get(seen).roostSay) : next;
}
// A hurt one fleeing goes into a tree beside it, with its line
export const fleeIntoTrees = (state) => (state.enemies.some((e) => e.flees > 0)
  ? intoTrees(state, (e) => e.flees > 0, true) : state);
// At dawn, a night one beside a tree goes in, silent
export const dawnIntoTrees = (state) => intoTrees(state, (e) => !!e.night);

// (state, x, y) → the state with the flyer in the tree at x, y driven out by a chop, or the same
// state when none is in, or no tile is free; `felled`: the tree is down, so its own tile serves
export function driveOut(state, x, y, felled = false) {
  const roost = roostAt(state.room, x, y);
  if (!roost) return state;
  const { hero } = state, away = (t) => Math.abs(t.x - hero.x) + Math.abs(t.y - hero.y);
  const free = (t) => { const tile = tileAt(state.room, t.x, t.y); return (!tile.solid || tile.low) && !enemyAt(state, t.x, t.y) && !personAt(state, t.x, t.y) && !(t.x === hero.x && t.y === hero.y); };
  const sides = SIDES.map(([dx, dy]) => ({ x: x + dx, y: y + dy })).filter(free).sort((a, b) => away(a) - away(b));
  const to = sides[0] || (felled ? { x, y } : null);
  if (!to) return state;
  const { night, ...byDay } = roost.e;
  const e = { ...(daylight(state.turn) < 0.5 ? roost.e : byDay), x: to.x, y: to.y, stirs: true };
  const room = { ...state.room, roosts: roostsOf(state.room).filter((r) => r !== roost) };
  const next = note({ ...state, room, enemies: [...state.enemies, e] }, 'unroost', { id: e.id });
  return get(e.id).unroostSay ? say(next, get(e.id).unroostSay) : next;
}
// Each night's coming out: the room's roosts from an earlier night gone
export const clearNightRoosts = (room) => (roostsOf(room).some((r) => r.e.night)
  ? { ...room, roosts: roostsOf(room).filter((r) => !r.e.night) } : room);
