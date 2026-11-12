// § bag make (D-787): the recipes made in the bag, for its Make tab. Each is a find's `craft`
// in the registry (D-299), so no list is kept by hand: in the registry's order, those making
// the same thing side by side (the two Oil flasks). A recipe shows once each of its parts has
// been held, in `state.known`, and stays after (D-418); its cost is counted from the bag.
// Plain data, no drawing.
import { ALL, get } from './registry.js';
import { carried, bagHas } from './bag.js';

// A recipe: find `from`'s `craft`, or a made thing's own `made`, making itself (the campfire,
// D-851); undefined for neither
export const recipeOf = (from) => { const e = get(from); return e?.craft ?? (e?.made && { ...e.made, into: from }); };
// A recipe's cost as { itemId: n }: a count of itself (3 oilcaps) or a mixed one (D-477)
export const costOf = (from) => { const of = recipeOf(from).of; return typeof of === 'number' ? { [from]: of } : of; };

// Every bag recipe, by the find whose MAKE it is, or the made thing itself: { from, into }
const crafting = ALL.filter((e) => e.kind === 'item' && (e.craft || e.made));
const into = (e) => recipeOf(e.id).into;
export const BAG_MAKES = crafting
  .filter((e, i) => crafting.findIndex((o) => into(o) === into(e)) === i)
  .flatMap((first) => crafting.filter((e) => into(e) === into(first)))
  .map((e) => ({ from: e.id, into: into(e) }));
export const MAKE_COLS = 4;
export const MAKE_SLOTS = 12;

// § known: every find ever held, the bag's now added (D-787)
export const knownOf = (state) => new Set([...(state.known || []), ...state.bag.map((s) => s.id)]);
// The state with the bag's finds added to `known`, the same state when none is new
export function learn(state) {
  const known = state.known || [], fresh = [...new Set(state.bag.map((s) => s.id))].filter((id) => !known.includes(id));
  return fresh.length || !state.known ? { ...state, known: [...known, ...fresh] } : state;
}

// § makes: the recipes shown, each { from, item, cost: [{ id, n, have }], dim }, dim with too few
export function bagMakes(state) {
  const known = knownOf(state);
  return BAG_MAKES.filter((m) => Object.keys(costOf(m.from)).every((id) => known.has(id))).map((m) => {
    const of = costOf(m.from);
    return { from: m.from, item: m.into, cost: Object.entries(of).map(([id, n]) => ({ id, n, have: carried(state.bag, id) })), dim: !bagHas(state.bag, of) };
  });
}
// The Make tab's slot for find `id`'s MAKE on the Bag tab: its own recipe when shown (Wood's
// workbench), else the first shown recipe it is in, or -1
export function makeFor(state, id) {
  const makes = bagMakes(state), own = makes.findIndex((m) => m.from === id);
  return own >= 0 ? own : makes.findIndex((m) => m.cost.some((c) => c.id === id));
}
// "Makes an Oil flask": the line above a find's MAKE on the Bag tab (D-787)
export const makesWords = (into) => { const name = get(into).name; return `Makes ${/^[aeiou]/i.test(name) ? 'an' : 'a'} ${name}`; };
// § at a station: what find `id` makes at a set-down station (the mortar's Glow Draught), once
// that recipe shows, all its parts held: { into, at: 'at the mortar' }, or null (D-791)
const STATIONS = ALL.filter((e) => e.kind === 'tile' && e.makes);
export function stationFor(state, id) {
  const known = knownOf(state);
  for (const tile of STATIONS) {
    const into = tile.makes.find((m) => { const of = get(m).bench.of; return of[id] && Object.keys(of).every((at) => known.has(at)); });
    if (into) return { into, at: tile.at };
  }
  return null;
}
