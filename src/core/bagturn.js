// § bag turn: what the bag's buttons and the panels do: pour, make, eat, hold, set down,
// take down and look (split from turn.js, D-362)
import { tileAt, withTile } from './room.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { enemyAt } from './enemies.js';
import { personAt } from './people.js';
import { offEdge } from './openings.js';
import { bagAdd, bagTake, bagHas, bagPay, canCraft, bagSize } from './bag.js';
import { note } from './events.js';
import { joined } from './regrow.js';
import { stashAt, withoutStash } from './chest.js';
import { DIRS, passTurn, itemAt, maxHealth } from './state.js';
import { tired } from './sleep.js';
import { endTurn } from './endturn.js';
import { isFitted } from './parts.js';
import { isWorn } from './worn.js';

// § pour: a flask from bag slot i into the lantern, never above full, even
// into a full one (D-078). It passes a turn like a wait, so the oil burns first
// and the enemies act (D-247). An empty slot changes nothing. A `pour` event, by hand.
export function pour(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  if (!entry?.oil) return state;
  const next = note(passTurn(state), 'pour', { id: state.bag[i].id, by: 'hand' });
  return endTurn(state, { ...next, bag: bagTake(state.bag, i), oil: Math.min(1, next.oil + entry.oil) });
}

// § craft: Make on bag slot i turns its item's `craft.of` into one
// `craft.into`, which goes on its stack or in a slot at the end, and passes a
// turn, like a pour, with its line (D-299). With too few, nothing happens;
// with no room for what it makes, its `full` line is said, free, and the bag
// stays as it was. A mixed cost is taken from the whole bag (D-477).
export function craft(state, i) {
  const s = state.bag[i], recipe = s && get(s.id).craft;
  if (!canCraft(state.bag, i)) return state;
  const paid = typeof recipe.of === 'number' ? bagTake(state.bag, i, recipe.of) : bagPay(state.bag, recipe.of);
  const bag = bagAdd(paid, recipe.into, undefined, bagSize(state));
  if (!bag) return say(state, get(recipe.into).full);
  return endTurn(state, say({ ...passTurn(state), bag }, recipe.says));
}

// § make at the bench: a line on the workbench's panel takes item `id`'s `bench.of`
// from the bag and puts one `id` in it, passing a turn, with its line (CH1, D-326).
// With too few, its `short` line; with one already carried, its `full` line (or
// "Your bag is full."); all free, and the bag stays as it was. A lantern part already
// fitted, or a piece worn, counts as carried (D-483, D-484). A bag upgrade (`grows`)
// never goes in the bag: made, the bag holds its `grows.to` slots at once (D-547).
export function makeAt(state, id) {
  const recipe = get(id)?.bench, grows = get(id)?.grows;
  if (!recipe) return state;
  if (grows) return growBag(state, id, recipe, grows);
  if (isFitted(state, id) || isWorn(state, id)) return say(state, get(id).full);
  if (!bagHas(state.bag, recipe.of)) return say(state, recipe.short);
  const paid = bagPay(state.bag, recipe.of);
  const bag = bagAdd(paid, id, undefined, bagSize(state));
  if (!bag) return say(state, state.bag.some((s) => s.id === id) ? get(id).full : 'bagFull');
  return endTurn(state, say({ ...passTurn(state), bag }, recipe.says));
}
// § grow: the Pouch takes a bag of `grows.from` slots to `grows.to`, the Big Bag 9 to 12,
// a turn passing, with its line; one already that big says its `full` line, and one too
// small (the Big Bag before the Pouch) changes nothing; all free (D-545, D-547)
function growBag(state, id, recipe, { from, to }) {
  const size = bagSize(state);
  if (size >= to) return say(state, get(id).full);
  if (size !== from) return state;
  if (!bagHas(state.bag, recipe.of)) return say(state, recipe.short);
  return endTurn(state, say({ ...passTurn(state), bag: bagPay(state.bag, recipe.of), bagSlots: to }, recipe.says));
}

// § eat: Eat on bag slot i eats one of its item, healing its `heal` hearts,
// never above full, with its `eats` line; a turn passes, like a pour (D-308).
// A potion is drunk this way, for 4 hearts (D-309).
// At full health it stays, "You aren't hurt." is said, free. An `eat` event.
export function eat(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  if (!entry?.eats) return state;
  if (state.health >= maxHealth(state)) return say(state, 'notHurt');
  const next = note(say(passTurn(state), entry.eats), 'eat', { id: entry.id });
  return endTurn(state, { ...next, bag: bagTake(state.bag, i), health: Math.min(maxHealth(next), next.health + entry.heal) });
}

// § hold: Hold on bag slot i puts its weapon in the hand, and the one held, if
// any, in that slot; it passes a turn, like a pour, with its `holds` line (D-479).
// A `hold` event.
export function hold(state, i) {
  const s = state.bag[i], entry = s && get(s.id);
  if (!entry?.hold) return state;
  const bag = state.held ? state.bag.map((o, j) => (j === i ? { id: state.held, n: 1 } : o)) : bagTake(state.bag, i);
  return endTurn(state, say(note(passTurn({ ...state, bag, held: s.id }), 'hold', { id: s.id }), entry.holds));
}

// § set down: Set down on bag slot i puts its item's `sets` tile (the workbench's
// bench) beside the hero on side `dir`, takes it from the bag and passes a turn,
// with its line (WB2, D-322). Only under the sky, unless it goes `anywhere` (a torch,
// D-478); elsewhere "Only on the surface." is said, free. It goes only on plain floor
// off the room's edge, with nothing on it, and only when the room stays joined; toward
// any other side (or none), "There is no room there.", free. A `set` event. One that
// brings a `light` puts it on that tile, going out `burns` turns later (endturn.js).
export function setDown(state, i, dir) {
  const entry = state.bag[i] && get(state.bag[i].id), sets = entry?.sets;
  if (!sets) return state;
  if (!sets.anywhere && !state.room.dark?.sky) return say(state, 'notSurface');
  if (!setSides(state, i).includes(dir)) return say(state, 'noRoom');
  const [dx, dy] = DIRS[dir], x = state.hero.x + dx, y = state.hero.y + dy, room = withTile(state.room, x, y, get(sets.tile));
  const lights = sets.light ? [...state.lights, { id: sets.light, x, y, out: state.turn + 1 + sets.burns }] : state.lights;
  const next = note(passTurn({ ...state, room, lights, bag: bagTake(state.bag, i) }), 'set', { id: sets.tile });
  return endTurn(state, say(next, sets.says));
}

// § take down: Deconstruct on the panel of the tile at x, y (the bench or a stash
// chest) puts it back in the bag whole as its `takes` item, floor left where it stood,
// and passes a turn, with its line (WB3, D-323; CH5). A chest holding anything says
// its `empty` line instead. With one already carried, that item's `full` line; with
// every slot taken, "Your bag is full."; all free, and it stays. A `take` event.
export function takeDown(state, x, y) {
  const takes = tileAt(state.room, x, y).takes;
  if (!takes) return state;
  if (takes.empty && stashAt(state, x, y).length) return say(state, takes.empty);
  const bag = bagAdd(state.bag, takes.item, undefined, bagSize(state));
  if (!bag) return say(state, state.bag.some((s) => s.id === takes.item) ? get(takes.item).full : 'bagFull');
  const room = withTile(state.room, x, y, get('floor')), stashes = withoutStash(state, x, y);
  const next = note(passTurn({ ...state, room, bag, ...(stashes && { stashes }) }), 'take', { id: takes.item });
  return endTurn(state, say(next, takes.says));
}

// The tile beside the hero on side `dir` when bumping it opens a panel (the bench, WB3), else null.
// The bed opens its card only by day; at night a bump sleeps (D-488), unless `any`.
export function panelBeside(state, dir, any = false) {
  const x = state.hero.x + DIRS[dir][0], y = state.hero.y + DIRS[dir][1];
  const tile = !offEdge(state.room, x, y) && tileAt(state.room, x, y);
  return tile?.panel && (any || !(tile.sleeps && tired(state))) ? { x, y } : null;
}

// The sides bag slot i's item can be set down on now, in DIRS' order; none off the surface
// unless it goes `anywhere`
export function setSides(state, i) {
  const sets = state.bag[i] && get(state.bag[i].id).sets, { room, hero } = state;
  if (!sets || (!sets.anywhere && !room.dark?.sky)) return [];
  return Object.keys(DIRS).filter((dir) => {
    const x = hero.x + DIRS[dir][0], y = hero.y + DIRS[dir][1];
    if (x < 1 || y < 1 || x > room.cols - 2 || y > room.rows - 2 || tileAt(room, x, y).id !== 'floor') return false;
    if (itemAt(state, x, y) || enemyAt(state, x, y) || personAt(state, x, y)) return false; // not on a person (D-492)
    return joined(withTile(room, x, y, get(sets.tile)));
  });
}

// § look: choosing bag slot i says its item's `look` line, the next in turn
// (D-297). Free: no turn passes. An item with none changes nothing.
export function look(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  return entry?.look ? say(state, entry.look) : state;
}

// § pour by itself: with Flasks set to By itself (D-249), after a turn has
// passed, the first flask in the bag pours once none of it would be wasted
// (at 55% oil or lower, D-248). It is free: no turn passes. "You pour a
// flask." is said, unless another line was said this turn (an oil line aside).
// It adds a `pour` event, by itself, to the turn's.
export function pourByItself(before, after) {
  if (after.turn === before.turn || after.fell !== before.fell) return after;
  const i = after.bag.findIndex((s) => get(s.id)?.oil && after.oil + get(s.id).oil <= 1 + 1e-9);
  if (i < 0) return after;
  const poured = note({ ...after, bag: bagTake(after.bag, i), oil: Math.min(1, after.oil + get(after.bag[i].id).oil) }, 'pour', { id: after.bag[i].id, by: 'self' });
  const other = after.line?.turn === after.turn && !['oilLow', 'oilEmpty'].includes(after.line.id);
  return other ? poured : say(poured, 'flaskPour');
}
