// § creature turn: the creatures' turn after the hero's, and what each will do
// next, read from its ways (behaviours.js; split from turn.js, D-362).
import { tileAt } from './room.js';
import { rng, seedFor } from './rng.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { enemyAt, biters } from './enemies.js';
import { traits } from './behaviours.js';
import { litAt, clearLine } from './sight.js';
import { note } from './events.js';
import { DIRS, passTurn, itemAt } from './state.js';
import { fall } from './fall.js';
import { glanceOf } from './worn.js';

// § enemies' turn: after the hero's, every enemy next to the hero bites, lit
// or not (D-114). The bite line replaces any other said this turn (D-117).
// A biting enemy has noticed the hero, even in the dark (D-157).
// One that shuns light doesn't bite from a lit tile (D-240, its `bitesLit`).
// One fleeing bites only when it has no tile to flee to (D-292).
// At 0 health the hero falls and wakes at the room's start (D-119).
// Then the others come one tile closer (D-126 to D-129).
// Each bite is a `bite` event, in the order they bite. Worn armour turns some aside:
// each bite has its `glance` chance, from the seed, to hurt nothing, and when none
// hurts, the glance line shows (D-484).
export function enemiesAct(state) {
  return settle(act(state));
}
function act(state) {
  const bites = biting(state);
  if (!bites.length) return enemiesMove(state);
  const hurts = bites.map((e) => (glances(state, e) ? 0 : get(e.id).bite)), first = hurts.findIndex((n) => n > 0);
  const health = Math.max(0, state.health - hurts.reduce((sum, n) => sum + n, 0));
  const enemies = chased(state.enemies, bites);
  const stood = state.line?.turn === state.turn && bites.some((e) => get(e.id).stands === state.line.id);
  let bitten = stood ? { ...state, health, enemies } : say({ ...state, health, enemies }, first < 0 ? 'glance' : get(bites[first].id).bites);
  bites.forEach((e, i) => { bitten = note(bitten, 'bite', { id: e.id, hurt: hurts[i] }); });
  return health > 0 ? enemiesMove(bitten) : fall(bitten);
}
// Whether creature e's bite this turn glances off the hero's armour (D-484)
const glances = (state, e) => { const g = glanceOf(state); return g > 0 && rng(seedFor(state.seed ^ state.turn, GLANCE_SALT + e.x * 64 + e.y))() < g; };
const GLANCE_SALT = 4096; // keeps the glance's dice apart from the flee's (fleesHurt)
// § settle: after the creatures' turn, one that stirred is awake and chasing for its
// `awakeTurns`; one awake counts a turn down, and at the last settles back
// down asleep where it stands, with its line (D-368)
function settle(state) {
  if (!state.enemies.some((e) => e.stirs || e.awake)) return state;
  let settled = null;
  const enemies = state.enemies.map((e) => {
    if (e.stirs) { const { stirs, ...rest } = e; return { ...rest, awake: get(e.id).awakeTurns, chasing: true }; }
    if (!e.awake) return e;
    if (e.awake > 1) return { ...e, awake: e.awake - 1 };
    const { awake, chasing, ...rest } = e;
    settled = settled || e;
    return { ...rest, asleep: true };
  });
  return settled ? say({ ...state, enemies }, get(settled.id).settles) : { ...state, enemies };
}
// One asleep, or stirring as it wakes, does nothing (D-368)
const still = (e) => e.asleep || e.stirs;
// The enemies that bite this turn, and the enemies with those marked as having noticed the hero
const biting = (state) => biters(state.enemies, state.hero).filter((e) => !still(e))
  .filter((e) => traits(get(e.id)).bitesLit || !litAt(state, e.x, e.y))
  .filter((e) => !fleeing(e) || !fleeStep(state, e));
const chased = (enemies, bites) => enemies.map((e) => (bites.includes(e) ? { ...e, chasing: true } : e));

// § next moves: what each creature the hero can see does if the hero waits a
// turn (D-349), as { e, kind, dx, dy }: `kind` 'bite' toward the hero
// or 'step' one tile. None for one that stays, or that stands on an unlit tile.
// It reads the enemies' own turn rules, after the wait's oil burns.
export function nextMoves(state) {
  return ahead(state).flatMap(({ move }) => (move ? [move] : []));
}
// § creature list (D-357, CL1): the creatures on lit tiles that have noticed
// the hero, or that one drawn to light flies at while the lantern is lit,
// as { e, move }: `move` as nextMoves gives it, or null for one that waits.
export function creatureList(state) {
  return ahead(state).filter((a) => a.noticed);
}
// Each creature on a lit tile, with its next move and whether it has noticed the hero
function ahead(state) {
  const next = passTurn(state), bites = biting(next);
  const moved = enemiesMove({ ...next, enemies: chased(next.enemies, bites) }).enemies;
  return state.enemies.flatMap((e, i) => {
    if (e.asleep || !litAt(state, e.x, e.y)) return []; // one asleep in disguise is hidden (D-368)
    const noticed = !!moved[i].chasing || (state.lit && traits(get(e.id)).moves === 'toLight');
    if (bites.includes(next.enemies[i])) return [{ e, noticed, move: { e, kind: 'bite', dx: state.hero.x - e.x, dy: state.hero.y - e.y } }];
    const to = moved[i];
    return [{ e, noticed, move: to.x === e.x && to.y === e.y ? null : { e, kind: 'step', dx: to.x - e.x, dy: to.y - e.y } }];
  });
}

// § enemies move: an enemy on a lit tile with a clear line to the hero, no
// wall between, notices them (D-126, D-226) and keeps
// coming until it dies or the hero falls (D-127). Each turn it steps one tile
// toward them, the farther side first, else the other side, else it stays
// (D-128). One that steps next to the hero bites on the next turn (D-129).
// A step left or right turns it to face that way; up or down keeps its
// facing (D-158). They move in list order, so one waits behind another.
// How each acts comes from its ways (behaviours.js, D-269): one that shuns
// light (D-240) notices along a clear line, lit or not, and never steps onto
// a lit tile; caught in light, it backs away, into the dark if it can.
// One fleeing steps away from the hero instead (D-292), for its `flees`
// turns; then it stops and has to notice them again (D-301).
// One that seeks light (D-351) needs no noticing: it steps toward the hero
// while the lantern is lit, else toward the nearest lit torch, and stays by it.
function enemiesMove(state) {
  let enemies = state.enemies;
  for (const e of state.enemies) {
    if (still(e)) continue;
    const t = traits(get(e.id)), lit = litAt(state, e.x, e.y);
    const seeks = t.moves === 'toLight', goal = seeks ? lightGoal(state, e) : state.hero;
    const sees = t.notices === 'anyLine' || (t.notices === 'inLight' && lit);
    const chasing = !seeks && (e.chasing || (sees && clearLine(state.room, e, state.hero)));
    const flees = lit && t.whenLit === 'backAway', runs = fleeing(e);
    if (!(seeks ? goal : chasing && t.moves) && !flees && !runs) continue;
    const near = goal && Math.abs(e.x - goal.x) + Math.abs(e.y - goal.y) === 1;
    const now = { ...state, enemies };
    const to = (flees ? backAway(now, e) : runs ? fleeStep(now, e) : near ? e : chaseStep(now, e, 1, goal)) || e;
    const facing = to.x < e.x ? 'left' : to.x > e.x ? 'right' : e.facing;
    const moved = { ...e, x: to.x, y: to.y, ...(chasing && { chasing: true }), ...(facing && { facing }) };
    if (runs) Object.assign(moved, e.flees > 1 ? { flees: e.flees - 1 } : { flees: 0, chasing: false });
    enemies = enemies.map((o) => (o === e ? moved : o));
  }
  return enemies === state.enemies ? state : { ...state, enemies };
}

// Where one that seeks light heads (D-351): the hero while the lantern is lit,
// else the lit torch nearest it in steps, the first listed on a tie, else null
function lightGoal(state, e) {
  if (state.lit) return state.hero;
  const steps = (l) => Math.abs(l.x - e.x) + Math.abs(l.y - e.y);
  return state.lights.filter((l) => get(l.id).reach).reduce((best, l) => (!best || steps(l) < steps(best) ? l : best), null);
}

// Whether enemy e may step onto tile x, y: nothing solid, no item, no other
// enemy, not the hero, and no light for one that shuns it unless `lit` (D-240)
function free(state, e, x, y, lit = false) {
  if (tileAt(state.room, x, y).solid || itemAt(state, x, y) || enemyAt(state, x, y) || (x === state.hero.x && y === state.hero.y)) return false;
  return lit || traits(get(e.id)).intoLight || !litAt(state, x, y);
}

// Where an enemy that shuns light, caught in it, backs to (D-241, D-243): the dark
// tile next to it farthest from the hero, else one farther from them that
// only the lantern lights, never a torch or any other light, else null: it stays
function backAway(state, e) {
  const away = (t) => Math.abs(t.x - state.hero.x) + Math.abs(t.y - state.hero.y);
  const next = Object.values(DIRS).map(([dx, dy]) => ({ x: e.x + dx, y: e.y + dy }));
  const far = (list) => list.reduce((best, t) => (!best || away(t) > away(best) ? t : best), null);
  const unlit = { ...state, lit: false }; // every light but the lantern
  return far(next.filter((t) => free(state, e, t.x, t.y))) ||
    far(next.filter((t) => away(t) > away(e) && free(state, e, t.x, t.y, true) && !litAt(unlit, t.x, t.y)));
}

// Whether enemy e is fleeing: turns of fleeing left (D-292, D-301)
const fleeing = (e) => e.flees > 0;

// One that may flee when hurt tosses a seeded coin as the hit hurts it: it
// flees for `fleeTurns` turns, or stands its ground and keeps coming (D-301)
export function fleeOrStand(state, enemies, foe) {
  const t = traits(get(foe.id)), hurt = enemies.find((e) => e.x === foe.x && e.y === foe.y);
  if (t.whenHurt !== 'flee' || !hurt) return { enemies, stands: false };
  const flees = rng(seedFor(state.seed ^ state.turn, foe.x * 64 + foe.y))() < t.fleeChance;
  return { enemies: flees ? enemies.map((e) => (e === hurt ? { ...e, flees: t.fleeTurns } : e)) : enemies, stands: !flees };
}

// The tile a fleeing enemy steps onto: chaseStep's mirror, away from the hero,
// the farther side first, else the other side, else null: it stays (D-292)
const fleeStep = (state, e) => chaseStep(state, e, -1);

// The tile enemy e steps onto, or null when both ways toward the hero are
// blocked (see `free`). With `sign` -1 it steps away from them instead.
// `to` is where it heads, the hero unless it seeks a torch (D-351).
function chaseStep(state, e, sign = 1, to = state.hero) {
  const dx = sign * (to.x - e.x), dy = sign * (to.y - e.y);
  const across = dx ? [Math.sign(dx), 0] : null, down = dy ? [0, Math.sign(dy)] : null;
  const ways = Math.abs(dx) >= Math.abs(dy) ? [across, down] : [down, across];
  for (const w of ways) {
    if (!w) continue;
    const x = e.x + w[0], y = e.y + w[1];
    if (free(state, e, x, y)) return { x, y };
  }
  return null;
}
