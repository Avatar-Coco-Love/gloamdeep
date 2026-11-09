// § creature turn: the creatures' turn after the hero's, and what each will do
// next, read from its ways (behaviours.js; split from turn.js, D-362).
import { tileAt } from './room.js';
import { rng, seedFor } from './rng.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { enemyAt, biters } from './enemies.js';
import { traits } from './behaviours.js';
import { litAt, clearLine } from './sight.js';
import { boonNotice } from './boon.js';
import { note } from './events.js';
import { DIRS, passTurn } from './state.js';
import { fall } from './fall.js';
import { personAt } from './people.js';
import { glanceOf } from './worn.js';
import { poisonedBy, shrugs } from './poison.js';
import { spitTurn, aim } from './spit.js';
import { stingTurn, reach } from './sting.js';
import { rise } from './bones.js';

// § enemies' turn: after the hero's, every enemy next to the hero bites, lit
// or not (D-114). The bite line replaces any other said this turn (D-117).
// A biting enemy has noticed the hero, even in the dark (D-157).
// One that shuns light doesn't bite from a lit tile (D-240, its `bitesLit`).
// One fleeing bites only when it has no tile to flee to (D-292).
// At 0 health the hero falls and wakes at the room's start (D-119).
// Then the others come one tile closer (D-126 to D-129).
// Each bite is a `bite` event, in the order they bite. Worn armour turns some aside:
// each bite has its `glance` chance, from the seed, to hurt nothing, and when none
// hurts, the glance line shows (D-484). One that `drinks` takes oil instead of
// a heart while the lantern holds any, a `drink` event (D-606).
// In god mode (`state.god`, a dev switch) a bite is the same but takes no heart,
// so the hero never falls from one; its event still says what it would take (D-625).
// With Endless oil on (`state.endless`) a drink is the same but takes no oil (D-626).
// One that `poisons` leaves the hero poisoned when its bite hurts, not when it glances (poison.js, D-654);
// with Tough, only 1 time in 2 (D-657).
// First of all the globs fly and the ones that spit spit (spit.js, D-688); then a raised tail
// strikes (sting.js, D-729); a fall there ends the turn.
export function enemiesAct(state) {
  const spat = spitTurn(state);
  if (spat.fell !== state.fell) return spat;
  const stung = stingTurn(spat);
  return stung.fell !== state.fell ? stung : rise(settle(act(stung))); // last, a pile of bones counts down (bones.js, D-731)
}
function act(state) {
  const bites = biting(state);
  if (!bites.length) return enemiesMove(state);
  const drank = drinks(state, bites);
  const hurts = bites.map((e, i) => (drank[i] > 0 || glances(state, e) ? 0 : get(e.id).bite)), first = hurts.findIndex((n, i) => n > 0 || drank[i] > 0);
  const health = state.god ? state.health : Math.max(0, state.health - hurts.reduce((sum, n) => sum + n, 0));
  const oil = state.endless ? state.oil : Math.max(0, state.oil - drank.reduce((sum, n) => sum + n, 0));
  const enemies = chased(state.enemies, bites);
  const stood = state.line?.turn === state.turn && bites.some((e) => get(e.id).stands === state.line.id);
  const said = first < 0 ? 'glance' : drank[first] > 0 ? get(bites[first].id).drinksSay : get(bites[first].id).bites;
  const poisoned = bites.some((e, i) => hurts[i] > 0 && get(e.id).poisons) && !shrugs(state);
  const after = poisoned ? poisonedBy({ ...state, health, oil, enemies }) : { ...state, health, oil, enemies };
  let bitten = stood ? after : say(after, said);
  bites.forEach((e, i) => { bitten = drank[i] > 0 ? note(bitten, 'drink', { id: e.id, oil: drank[i] }) : note(bitten, 'bite', { id: e.id, hurt: hurts[i] }); });
  return health > 0 ? enemiesMove(bitten, true) : fall(bitten);
}
// § drinks: (state, bites) → the oil each creature beside the hero drinks this turn, in turn
// order. One that `drinks` takes that much from the lantern, lit or not, instead of biting;
// with the lantern empty it bites as others do. Armour can't turn a drink aside (D-606).
function drinks(state, bites) {
  let left = state.oil;
  return bites.map((e) => {
    const want = get(e.id).drinks || 0, d = left > 0 ? Math.min(want, left) : 0;
    left -= d;
    return d;
  });
}
// Whether creature e's bite this turn glances off the hero's armour (D-484)
const glances = (state, e) => { const g = glanceOf(state); return g > 0 && rng(seedFor(state.seed ^ state.turn, GLANCE_SALT + e.x * 64 + e.y))() < g; };
const GLANCE_SALT = 12288; // keeps the glance's dice apart from the flee's (fleesHurt), the drop's (4096, turn.js) and Tough's (8192) (D-663)
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
// One asleep, or stirring as it wakes, does nothing (D-368); nor does a pile of bones (D-731)
const still = (e) => e.asleep || e.stirs || e.pile;
// One under the earth (D-726) can't bite until it has come up
const under = (e) => !!e.under;
// The enemies that bite this turn, and the enemies with those marked as having noticed the hero
const biting = (state) => biters(state.enemies, state.hero).filter((e) => !still(e) && !under(e) && traits(get(e.id)).bites !== false)
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
    if (e.asleep || e.pile || !litAt(state, e.x, e.y)) return []; // one asleep in disguise is hidden (D-368); a pile of bones has no move (D-731)
    const noticed = !!moved[i].chasing || (state.lit && traits(get(e.id)).moves === 'toLight') || luring(state, e);
    if (bites.includes(next.enemies[i])) return [{ e, noticed, move: { e, kind: 'bite', dx: state.hero.x - e.x, dy: state.hero.y - e.y } }];
    const spits = traits(get(e.id)).spits && aim(next, e); // a glob mark toward the hero (D-659, D-688)
    if (spits) return [{ e, noticed: true, move: { e, kind: 'spit', ...spits } }];
    const to = moved[i];
    if (to.raised) return [{ e, noticed: true, move: { e, kind: 'bite', ...to.raised } }]; // a raised tail: fangs its way (D-729)
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
// With Soft Step (D-600) one that notices by light needs the lantern's light 1 tile short of its
// reach; torches, glows, daylight and the shy ones' sight are as they were.
// One that seeks light (D-351) needs no noticing: it steps toward the hero
// while the lantern is lit, else toward the nearest lit torch, and stays by it.
// One that lures (D-649) drifts away instead, while the hero is near (lureStep).
function enemiesMove(state, bit = false) {
  const start = rally(state.enemies), claims = [];
  let enemies = start, said = null, raised = false;
  const soft = boonNotice(state); // Soft Step: the lantern's last tile of light wakes no one (D-600)
  for (const e of start) {
    if (still(e)) continue;
    const t = traits(get(e.id)), lit = litAt(state, e.x, e.y);
    if (t.moves === 'lure') {
      const to = luring(state, e) && lureStep({ ...state, enemies }, e);
      if (to) enemies = enemies.map((o) => (o === e ? { ...e, x: to.x, y: to.y, facing: to.x < e.x ? 'left' : to.x > e.x ? 'right' : e.facing } : o));
      continue;
    }
    const seeks = t.moves === 'toLight', goal = seeks ? lightGoal(state, e) : state.hero;
    const sees = t.notices === 'anyLine' || (t.notices === 'inLight' && lit && (!soft || litAt(state, e.x, e.y, soft)));
    const chasing = !seeks && (e.chasing || (sees && clearLine(state.room, e, state.hero)));
    const flees = lit && t.whenLit === 'backAway', runs = fleeing(e);
    if (!(seeks ? goal : chasing && t.moves) && !flees && !runs) continue;
    const near = goal && Math.abs(e.x - goal.x) + Math.abs(e.y - goal.y) === 1;
    const now = { ...state, enemies };
    if (t.strikes && (e.raised || e.rests > 0)) { // raised, it strikes at the turn's start; after, it rests (D-729)
      if (!e.raised) enemies = enemies.map((o) => (o === e ? { ...e, rests: e.rests - 1 } : o));
      continue;
    }
    const way = t.strikes && chasing && !flees && !runs && reach(now, e);
    if (way) {
      const facing = way.dx < 0 ? 'left' : way.dx > 0 ? 'right' : e.facing;
      enemies = enemies.map((o) => (o === e ? { ...e, raised: way, chasing: true, ...(facing && { facing }) } : o));
      said = said || get(e.id).raises;
      raised = true;
      continue;
    }
    if (t.burrows && (e.under || (!e.dug && chasing && !near && !flees && !runs))) {
      const { change, line } = burrowStep(now, e, near);
      enemies = enemies.map((o) => (o === e ? change : o));
      if (line) said = said || get(e.id)[line];
      continue;
    }
    const to = (flees ? backAway(now, e) : runs ? fleeStep(now, e) : near ? e : t.pack && !seeks ? packStep(now, e, claims) : chaseStep(now, e, 1, goal)) || e;
    const facing = to.x < e.x ? 'left' : to.x > e.x ? 'right' : e.facing;
    const moved = { ...e, x: to.x, y: to.y, ...(chasing && { chasing: true }), ...(facing && { facing }) };
    if (runs) Object.assign(moved, e.flees > 1 ? { flees: e.flees - 1 } : { flees: 0, chasing: false });
    enemies = enemies.map((o) => (o === e ? moved : o));
  }
  enemies = rally(enemies); // one that noticed this turn brings its pack (D-727)
  const moved = enemies === state.enemies ? state : { ...state, enemies }, next = raised ? note(moved, 'raise') : moved;
  return said && !bit ? say(next, said) : next; // a bite's line said this turn stays (D-117)
}

// § pack (D-727): one of a pack is one whose ways say `pack` and that carries a `pack` mark (pack.js).
// Once one of a pack has noticed the hero, its whole pack has: `rally` marks them all chasing, the
// same list back when nothing changes. With a packmate left, one chasing heads for a free side of the
// hero no packmate holds or heads for this turn, the farthest from its packmates first, then the
// nearest to it, then the first in DIRS order; with none free, or no step that way, it comes as one
// that chases does. Alone it acts as its other ways say.
const packed = (e) => e.pack && traits(get(e.id)).pack;
const mates = (enemies, e) => enemies.filter((o) => o !== e && packed(o) && o.pack === e.pack);
function rally(enemies) {
  const called = new Set(enemies.filter((e) => packed(e) && e.chasing).map((e) => e.pack));
  if (!enemies.some((e) => packed(e) && !e.chasing && called.has(e.pack))) return enemies;
  return enemies.map((e) => (packed(e) && !e.chasing && called.has(e.pack) ? { ...e, chasing: true } : e));
}
function packStep(state, e, claims) {
  const others = mates(state.enemies, e);
  if (!others.length) return chaseStep(state, e);
  const apart = (t) => Math.min(...others.map((o) => steps(o, t)));
  const sides = Object.values(DIRS).map(([dx, dy]) => ({ x: state.hero.x + dx, y: state.hero.y + dy }))
    .filter((t) => free(state, e, t.x, t.y) && !claims.some((c) => c.x === t.x && c.y === t.y));
  const side = sides.reduce((best, t) => (!best || apart(t) > apart(best) || (apart(t) === apart(best) && steps(e, t) < steps(e, best)) ? t : best), null);
  if (!side) return chaseStep(state, e);
  claims.push(side);
  return chaseStep(state, e, 1, side) || chaseStep(state, e);
}
// With 2 or more of its pack left, itself counted, a hurt one stands its ground (D-727)
const brave = (enemies, foe) => packed(foe) && mates(enemies, foe).length >= 1;

// § burrows (D-726): one that burrows and has noticed the hero digs down where it stands, `under`,
// with its `digs` line; under, it comes a tile a turn toward them as one that chases does; beside
// them it comes up with its `surfaces` line, `dug`, to bite on the turn after and chase on foot
// from then on. Already beside them as it notices, it never digs.
function burrowStep(state, e, near) {
  if (!e.under) return { change: { ...e, under: true, chasing: true }, line: 'digs' };
  if (near) { const { under, ...up } = e; return { change: { ...up, dug: true }, line: 'surfaces' }; }
  const to = chaseStep(state, e) || e, facing = to.x < e.x ? 'left' : to.x > e.x ? 'right' : e.facing;
  return { change: { ...e, x: to.x, y: to.y, ...(facing && { facing }) }, line: null };
}

// § lures (D-649): whether one that lures has the hero within its `near` steps, and the tile
// it drifts to: of the free tiles beside it farther from the hero, the one nearest (in steps)
// the nearest other creature in the room, or with none the farthest from the hero; the first
// in DIRS order on a tie; else null, it stays
const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
function luring(state, e) {
  const t = traits(get(e.id));
  return t.moves === 'lure' && steps(e, state.hero) <= t.near;
}
function lureStep(state, e) {
  const others = state.enemies.filter((o) => o.x !== e.x || o.y !== e.y);
  const goal = others.reduce((best, o) => (!best || steps(o, e) < steps(best, e) ? o : best), null);
  const away = Object.values(DIRS).map(([dx, dy]) => ({ x: e.x + dx, y: e.y + dy }))
    .filter((t) => steps(t, state.hero) > steps(e, state.hero) && free(state, e, t.x, t.y));
  const score = (t) => (goal ? -steps(t, goal) : steps(t, state.hero));
  return away.reduce((best, t) => (!best || score(t) > score(best) ? t : best), null);
}

// Where one that seeks light heads (D-351): the hero while the lantern is lit,
// else the lit torch nearest it in steps, the first listed on a tie, else null
function lightGoal(state, e) {
  if (state.lit) return state.hero;
  const steps = (l) => Math.abs(l.x - e.x) + Math.abs(l.y - e.y);
  return state.lights.filter((l) => get(l.id).reach).reduce((best, l) => (!best || steps(l) < steps(best) ? l : best), null);
}

// Whether enemy e may step onto tile x, y: nothing solid (water is open to one that `flies`,
// D-718), no other enemy (it walks over an item, D-727), no person (D-496), not the hero, and no light for one that
// shuns it unless `lit` (D-240)
function free(state, e, x, y, lit = false) {
  const tile = tileAt(state.room, x, y);
  if ((tile.solid && !(tile.id === 'water' && get(e.id).flies)) || enemyAt(state, x, y) || personAt(state, x, y) || (x === state.hero.x && y === state.hero.y)) return false;
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
  if (brave(enemies, hurt)) return { enemies, stands: true }; // its pack beside it (D-727)
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
