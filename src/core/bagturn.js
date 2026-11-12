// § bag turn: what the bag's buttons and the panels do: pour, make, eat, hold, set down,
// take down and look (split from turn.js, D-362)
import { tileAt, withTile } from './room.js';
import { sow, unsow } from './garden.js';
import { spread } from './spread.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { enemyAt } from './enemies.js';
import { personAt } from './people.js';
import { offEdge } from './openings.js';
import { bagAdd, bagTake, bagHas, bagPay, bagSize, sortBag, sameBag, isFlask, devPour } from './bag.js';
import { note, fresh } from './events.js';
import { grown } from './upgrades.js';
import { pourOf, healOf } from './boon.js';
import { glowing } from './glow.js';
import { slowing } from './slowburn.js';
import { mendingBy } from './mending.js';
import { wardingBy } from './ward.js';
import { spitproofBy } from './spitproof.js';
import { shadeBy } from './shade.js';
import { joined, ringed } from './regrow.js';
import { stashAt, withoutStash, nearStacks, payNear } from './chest.js';
import { DIRS, passTurn, itemAt, maxHealth } from './state.js';
import { tired } from './sleep.js';
import { forgetBed } from './waking.js';
import { endTurn } from './endturn.js';
import { costOf, recipeOf } from './bagmake.js';
import { thrift, keptSay } from './thrift.js';
import { burnOil } from './oil.js';
import { isFitted } from './parts.js';
import { isWorn } from './worn.js';
import { campCorner, campTiles } from './camp.js';

// § pour: a flask from bag slot i into the lantern, never above full, even
// into a full one (D-078). It passes a turn like a wait, so the oil burns first
// and the enemies act (D-247). An empty slot changes nothing. A `pour` event, by hand.
// A Pond Minnow pours its 15% the same way (D-611). With Quick Pour a flask is free: no turn
// passes, and "You pour a flask." is said (D-816); a minnow still takes its turn.
export function pour(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  if (!entry?.oil) return state;
  const bag = bagTake(state.bag, i), dev = devPour(state, state.bag[i].id, bag); // one spawned counts in no Records (D-720)
  if (grown(state, 'quickPour') && isFlask(state.bag[i].id)) {
    const poured = note(fresh(state), 'pour', { id: state.bag[i].id, by: 'hand', ...dev.mark });
    return say({ ...poured, ...dev.rest, bag, oil: Math.min(1, state.oil + pourOf(state, entry)) }, 'flaskPour');
  }
  const next = note(passTurn(state), 'pour', { id: state.bag[i].id, by: 'hand', ...dev.mark });
  return endTurn(state, { ...next, ...dev.rest, bag, oil: Math.min(1, next.oil + pourOf(state, entry)) });
}

// § make in the bag: MAKE on the bag's Make tab (D-787) makes find `from`'s recipe's `into`, its
// cost taken from the whole bag, and passes a turn, with its line (D-299). With too few, nothing
// happens; with no room for what it makes, its `full` line is said, free, and the bag stays as it
// was. With Thrift, about 1 making in 4 keeps 1 of its most-used part, with its own line
// (thrift.js, D-818), here and in each making below. (The old Make on a bag slot went, D-869.)
export function makeFrom(state, from) {
  const recipe = recipeOf(from), of = recipe && costOf(from); // a find's `craft`, or the campfire's own `made` (D-851)
  if (!recipe || !bagHas(state.bag, of)) return state;
  const kept = thrift(state, of);
  const bag = bagAdd(bagPay(state.bag, kept.of), recipe.into, undefined, bagSize(state));
  if (!bag) return say(state, state.bag.some((s) => s.id === recipe.into) ? get(recipe.into).full : 'bagFull'); // full, or one already carried (D-826);
  return endTurn(state, keptSay({ ...passTurn(state), bag }, kept.kept, recipe.says));
}

// § make at the bench: a line on the workbench's panel takes item `id`'s `bench.of`
// from the bag and puts one `id` in it, passing a turn, with its line (CH1, D-326).
// With too few, its `short` line; with one already carried, its `full` line (or
// "Your bag is full."); all free, and the bag stays as it was. A lantern part already
// fitted, a piece worn, or a tool in the Tool slot counts as carried (D-483, D-484, D-552);
// a tool made with that slot empty goes straight into it, unless one is already in the
// bag, as after Take off (R3, D-666). A bag upgrade (`grows`)
// never goes in the bag: made, the bag holds its `grows.to` slots at once (D-547).
// The cost counts the chests in STORE's reach too, taken from the bag first, then the
// nearest chest (D-560).
const canPay = (state, of) => bagHas([...state.bag, ...nearStacks(state)], of);
export function makeAt(state, id) {
  const recipe = get(id)?.bench, grows = get(id)?.grows;
  if (!recipe) return state;
  if (grows) return growBag(state, id, recipe, grows);
  const inBag = get(id).max === 1 && state.bag.some((s) => s.id === id);
  if (isFitted(state, id) || isWorn(state, id) || state.tool === id || inBag) return say(state, get(id).full);
  if (!canPay(state, recipe.of)) return say(state, recipe.short);
  const { of, kept } = thrift(state, recipe.of), { bag: paid, stashes } = payNear(state, of);
  if (get(id).tool && !state.tool) return endTurn(state, keptSay({ ...passTurn(state), bag: paid, stashes, tool: id }, kept, recipe.says));
  const bag = bagAdd(paid, id, undefined, bagSize(state));
  if (!bag) return say(state, state.bag.some((s) => s.id === id) ? get(id).full : 'bagFull');
  return endTurn(state, keptSay({ ...passTurn(state), bag, stashes }, kept, recipe.says));
}
// § grow: the Pouch takes a bag of `grows.from` slots to `grows.to`, the Big Bag 9 to 12,
// a turn passing, with its line; one already that big says its `full` line, and one too
// small (the Big Bag before the Pouch) changes nothing; all free (D-545, D-547)
function growBag(state, id, recipe, { from, to }) {
  const size = bagSize(state);
  if (size >= to) return say(state, get(id).full);
  if (size !== from) return state;
  if (!canPay(state, recipe.of)) return say(state, recipe.short);
  const { of, kept } = thrift(state, recipe.of), { bag, stashes } = payNear(state, of);
  return endTurn(state, keptSay({ ...passTurn(state), bag, stashes, bagSlots: to }, kept, recipe.says));
}

// § eat: Eat on bag slot i eats one of its item, healing its `heal` hearts,
// never above full, with its `eats` line; a turn passes, like a pour (D-308).
// A potion is drunk this way, for 4 hearts (D-309).
// At full health it stays, "You aren't hurt." is said, free. An `eat` event.
// An antidote (`cures`) ends poisoned instead, healing nothing; not poisoned, it stays
// and "You aren't poisoned." is said, free (D-655). A Glow Draught (`glow`) lights farther (D-791),
// and Slowburn (`slow`) burns slower (D-792), and the Mending Draught (`mend`) heals slowly (D-794);
// the Ward Draught (`ward`) ends poisoned before the turn and wards off poison (D-795);
// the Spitproof Draught (`spitproof`) turns the spit grub's globs aside (D-802);
// the Shade Draught (`shade`) lets creatures notice the hero only near (D-806).
export function eat(state, i) {
  const entry = state.bag[i] && get(state.bag[i].id);
  if (!entry?.eats) return state;
  if (entry.cures) return cure(state, i, entry);
  if (entry.glow) return glow(state, i, entry);
  if (entry.slow) return glow(state, i, entry, slowing);
  if (entry.mend) return glow(state, i, entry, mendingBy);
  if (entry.ward) return glow({ ...state, poisoned: 0 }, i, entry, wardingBy);
  if (entry.spitproof) return glow(state, i, entry, spitproofBy);
  if (entry.shade) return glow(state, i, entry, shadeBy);
  if (state.health >= maxHealth(state)) return say(state, 'notHurt');
  const next = note(say(passTurn(state), entry.eats), 'eat', { id: entry.id });
  return endTurn(state, { ...next, bag: bagTake(state.bag, i), health: Math.min(maxHealth(next), next.health + healOf(state, entry)) });
}

function cure(state, i, entry) {
  if (!(state.poisoned > 0)) return say(state, 'notPoisoned');
  const next = note(say(passTurn(state), entry.eats), 'eat', { id: entry.id });
  return endTurn(state, { ...next, bag: bagTake(state.bag, i), poisoned: 0 });
}

// A Glow Draught is drunk any time, even at full health or with the lantern empty; its count
// starts whole after the turn's own tick (glow.js, D-791); Slowburn is drunk the same way, `starts`
// its own count (slowburn.js, D-792), and the Mending Draught too, at full health as well (mending.js, D-794)
function glow(state, i, entry, starts = glowing) {
  const next = note(say(passTurn(state), entry.eats), 'eat', { id: entry.id });
  const after = endTurn(state, { ...next, bag: bagTake(state.bag, i) });
  return after.fell === state.fell ? starts(after, entry) : after; // a turn that ends in a fall loses it, as a fall ends every draught (H-17, D-879)
}

// § hold: Hold on bag slot i puts its weapon in the hand, or its tool in the Tool slot,
// and the one there, if any, in that bag slot; it passes a turn, like a pour, with its
// `holds` line (D-479, D-552). A `hold` event, `tool` for a tool (D-826).
export function hold(state, i) {
  const s = state.bag[i], entry = s && get(s.id), key = entry?.tool ? 'tool' : entry?.hold ? 'held' : null;
  if (!key) return state;
  const was = state[key] ?? null;
  const bag = was ? state.bag.map((o, j) => (j === i ? { id: was, n: 1 } : o)) : bagTake(state.bag, i);
  return endTurn(state, say(note(passTurn({ ...state, bag, [key]: s.id }), 'hold', { id: s.id, tool: key === 'tool' }), entry.holds));
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
// chest) puts it back in the bag whole as its `takes` item, and its `also` item when
// there is room (a planted garden bed's seed, D-566), floor left where it stood,
// and passes a turn, with its line (WB3, D-323; CH5). A chest holding anything says
// its `empty` line instead. The miners' camp's pick leaves its every tile `into` the bare
// camp's instead of floor (D-770). With one already carried, held too, that item's `full` line; with
// every slot taken, "Your bag is full."; all free, and it stays. A `take` event.
export function takeDown(state, x, y) {
  const takes = tileAt(state.room, x, y).takes;
  if (!takes) return state;
  if (takes.empty && stashAt(state, x, y).length) return say(state, takes.empty);
  const held = state.tool === takes.item; // a pick in the Tool slot is carried too (D-770)
  const bed = !held && bagAdd(state.bag, takes.item, undefined, bagSize(state));
  if (!bed) return say(state, held || state.bag.some((s) => s.id === takes.item) ? get(takes.item).full : 'bagFull');
  const also = takes.also && bagAdd(bed, takes.also, undefined, bagSize(state));
  if (takes.both && !also) return say(state, 'bagFull'); // the shelf and its locket together, or neither (D-693)
  const bag = also || bed; // the seed planted too, when it fits (D-566)
  const room = takes.into ? intoBare(state.room, x, y, get(takes.into)) : withTile(state.room, x, y, get('floor')), stashes = withoutStash(state, x, y);
  const next = note(passTurn(unsow({ ...forgetBed(state, x, y), room, bag, ...(stashes && { stashes }) }, x, y)), 'take', { id: takes.item });
  return endTurn(state, say(next, takes.says));
}

// The room with every tile of the camp at x, y made `tile` (camp.js, D-770)
// whose tile is the one bumped's, so one spawned alone by the dev tools turns alone
const intoBare = (room, x, y, tile) => { const at = campCorner(room, x, y), was = room.map[y][x]; return campTiles(at.x, at.y).filter((t) => room.map[t.y]?.[t.x] === was).reduce((r, t) => withTile(r, t.x, t.y, tile), room); };

// § shelve: Yes on the shelf's ask sets its `shelves` relic from the bag on it, the tile
// turning into its `into` tile with the relic shown, and passes a turn, with its line
// (D-693). It stays there; without the relic in the bag, nothing changes. A `shelve` event.
export function shelve(state, x, y) {
  const shelves = tileAt(state.room, x, y).shelves, i = shelves ? state.bag.findIndex((s) => s.id === shelves.relic) : -1;
  if (i < 0) return state;
  const room = withTile(state.room, x, y, get(shelves.into));
  const next = note(passTurn({ ...state, room, bag: bagTake(state.bag, i) }), 'shelve', { id: shelves.relic });
  return endTurn(state, say(next, shelves.says));
}
// § kindle: Yes on cold ashes' ask, Light the fire? (D-757): the lantern's oil lights it, one
// turn's worth (`OIL.burn`, the owner's "one move of oil"), the tile turning into its `into`,
// embers, and passes a turn, with its line. With no oil, nothing changes. A `kindle` event.
export function kindle(state, x, y) {
  const kindles = tileAt(state.room, x, y)?.kindles;
  if (!kindles || !canKindle(state, x, y)) return state;
  const room = withTile(state.room, x, y, get(kindles.into));
  const next = note(passTurn({ ...state, room, oil: burnOil(state.oil) }), 'kindle', { id: kindles.into });
  return endTurn(state, say(next, kindles.says));
}
// Whether the tile at x, y can be lit now: it `kindles`, and the lantern has oil (D-757)
export const canKindle = (state, x, y) => !!tileAt(state.room, x, y)?.kindles && state.oil > 0;
// Whether the shelf at x, y would take a relic now: its `shelves` relic in the bag (D-693)
export const canShelve = (state, x, y) => { const shelves = tileAt(state.room, x, y)?.shelves; return !!shelves && state.bag.some((s) => s.id === shelves.relic); };
// § plant: Plant on the card of the garden bed at x, y puts one of its `plants` seed from
// the bag in it, the bed becoming its `into` tile, a sprout showing, and passes a turn,
// with its line (garden step 3, D-566). With no seed, or nothing to plant in, nothing
// changes. A `plant` event.
export function plant(state, x, y) {
  const plants = tileAt(state.room, x, y).plants, i = plants ? state.bag.findIndex((s) => s.id === plants.seed) : -1;
  if (i < 0) return state;
  const room = withTile(state.room, x, y, get(plants.into));
  const next = note(passTurn(sow({ ...state, room, bag: bagTake(state.bag, i) }, x, y)), 'plant', { id: plants.seed }); // its clock starts (D-567)
  return endTurn(state, say(next, plants.says));
}
// Whether the garden bed at x, y can be planted now: empty, with a seed in the bag
export const canPlant = (state, x, y) => { const plants = tileAt(state.room, x, y).plants; return !!plants && state.bag.some((s) => s.id === plants.seed); };

// § pick: Pick on the card of the grown garden bed at x, y puts its `picks` berries in the
// bag, the bed going back to a sprout whose clock starts again, and passes a turn, with
// its line (garden step 5, D-568). With room for none, its `full` line, free, and it keeps
// them; with room for fewer, the rest lies on the nearest open tiles, the wild bush's way
// (D-316). A `take` event.
export function pick(state, x, y) {
  const picks = tileAt(state.room, x, y).picks;
  if (!picks) return state;
  let bag = state.bag, taken = 0;
  for (let more; taken < picks.n && (more = bagAdd(bag, picks.drops, undefined, bagSize(state))); taken++) bag = more;
  if (!taken) return say(state, picks.full);
  const room = withTile(state.room, x, y, get(picks.into));
  const left = spread({ ...state, room }, x, y, picks.n - taken, true).map((at) => ({ id: picks.drops, ...at, once: true }));
  const next = note(passTurn(sow({ ...state, room, bag, items: [...state.items, ...left] }, x, y)), 'take', { id: picks.drops });
  return endTurn(state, say(next, picks.says));
}
// § feed: Feed on the card of the sprout at x, y spreads 1 of its `feeds` item, Bat Guano,
// from the bag on its soil, the sprout becoming its `into` tile, fed, that grows in half the
// time on the same clock, and passes a turn, with its line (garden step 6, D-569). With no
// guano, or a sprout already fed, nothing changes. A `feed` event.
export function feed(state, x, y) {
  const feeds = tileAt(state.room, x, y).feeds, i = feeds ? state.bag.findIndex((s) => s.id === feeds.item) : -1;
  if (i < 0) return state;
  const room = withTile(state.room, x, y, get(feeds.into));
  const next = note(passTurn({ ...state, room, bag: bagTake(state.bag, i) }), 'feed', { id: feeds.item }); // the planting's clock kept
  return endTurn(state, say(next, feeds.says));
}
// Whether the sprout at x, y can be fed now: not fed yet, with guano in the bag
export const canFeed = (state, x, y) => { const feeds = tileAt(state.room, x, y).feeds; return !!feeds && state.bag.some((s) => s.id === feeds.item); };

// Whether the garden bed at x, y has something to pick: grown
export const canPick = (state, x, y) => !!tileAt(state.room, x, y).picks;

// The tile beside the hero on side `dir` when bumping it opens a panel (the bench, WB3), else null.
// The bed opens its card only by day; at night a bump sleeps (D-488), unless `any`; the bedroll's too (D-804).
export function panelBeside(state, dir, any = false) {
  const x = state.hero.x + DIRS[dir][0], y = state.hero.y + DIRS[dir][1];
  const tile = !offEdge(state.room, x, y) && tileAt(state.room, x, y);
  return tile?.panel && (any || !((tile.sleeps || tile.camps) && tired(state))) ? { x, y } : null; // the bedroll from dusk asks to sleep instead (D-804)
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
    return joined(withTile(room, x, y, get(sets.tile)), ringed(state.people));
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
// (at 55% oil or lower, D-248; 40% with Deep Pour, D-599). It is free: no turn passes. "You pour a
// flask." is said, unless another line was said this turn (an oil line aside).
// It adds a `pour` event, by itself, to the turn's.
export function pourByItself(before, after) {
  if (after.turn === before.turn || after.fell !== before.fell) return after;
  const i = after.bag.findIndex((s) => isFlask(s.id) && after.oil + pourOf(after, get(s.id)) <= 1 + 1e-9);
  if (i < 0) return after;
  const bag = bagTake(after.bag, i), dev = devPour(after, after.bag[i].id, bag);
  const poured = note({ ...after, ...dev.rest, bag, oil: Math.min(1, after.oil + pourOf(after, get(after.bag[i].id))) }, 'pour', { id: after.bag[i].id, by: 'self', ...dev.mark });
  const other = after.line?.turn === after.turn && !['oilLow', 'oilEmpty'].includes(after.line.id);
  return other ? poured : say(poured, 'flaskPour');
}

// § sort: the bag's SORT lines it up by kind and joins half stacks (sortBag, D-559), free:
// "You sort the bag.", or "The bag is in order." when nothing would change
export function sortTheBag(state) {
  const bag = sortBag(state.bag);
  return sameBag(bag, state.bag) ? say(state, 'sortNone') : say({ ...state, bag }, 'sortDone');
}
