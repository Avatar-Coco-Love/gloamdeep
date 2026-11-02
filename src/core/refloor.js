// § refloor: a save from before the floors grew with depth (D-580) has its generated
// rooms at the old size, 17 × 20, which no longer fit the floors' grids. Once, as the
// save is brought up to date (save.js), every generated room is forgotten, to be made
// again from the same seed at its new size, and the hero's memory of it goes too.
// Plain data, no drawing.
// § who and what moves: a hero in a generated room stands on the stairs up of that
// floor; a bag left in one lies on those stairs; a freed person still waiting there
// goes home (homeward.js); and a person already freed is not trapped again in the room
// made anew, their ring of rubble cleared.
import { isGenerated, depthOf, placeAt, tileAt, withTile, peddlerRoom } from './room.js';
import { fresh } from './stairs.js';
import { goHome } from './homeward.js';
import { get } from './registry.js';

export function refloor(s) {
  const away = Object.entries(s.elsewhere || {}), here = isGenerated(s.place);
  const left = [...away.filter(([id]) => isGenerated(id)), ...(here ? [[s.place, s]] : [])];
  const bags = left.flatMap(([id, p]) => (p.items || []).filter((it) => it.id === 'lostbag').map((it) => ({ ...it, to: placeAt(depthOf(id)) })));
  const waiting = left.flatMap(([, p]) => (p.people || []).filter((p) => p.leaves !== undefined).map((p) => p.id));
  let state = { ...s, elsewhere: Object.fromEntries(away.filter(([id]) => !isGenerated(id))) };
  if (here) {
    const to = placeAt(depthOf(s.place)), there = fresh(to, s.seed);
    state = { ...state, ...there, place: to, hero: stairsUp(there.room) };
  }
  state = waiting.reduce(goHome, state);
  for (const bag of bags) state = edit(state, bag.to, (p) => ({ ...p, items: [...p.items, { id: 'lostbag', ...stairsUp(p.room), holds: bag.holds }] }));
  return freed(state);
}

// Every room made anew (the hero's, those the bags went to, and the peddler's once he is
// freed, made now so he isn't trapped there again) without the people freed before, who
// stand somewhere kept; each tile of rubble around them cleared
function freed(state) {
  const kept = [...(isGenerated(state.place) ? [] : [state]), ...Object.entries(state.elsewhere).filter(([id]) => !isGenerated(id)).map(([, p]) => p)];
  const out = new Set(kept.flatMap((p) => (p.people || []).map((q) => q.id)));
  const ids = [...new Set([...(isGenerated(state.place) ? [state.place] : []), ...Object.keys(state.elsewhere).filter(isGenerated), ...(out.has('peddler') ? [peddlerRoom(state.seed)] : [])])];
  return ids.reduce((s, id) => edit(s, id, (p) => {
    const gone = (p.people || []).filter((q) => out.has(q.id));
    if (!gone.length) return p;
    let room = p.room;
    for (const q of gone) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (tileAt(room, q.x + dx, q.y + dy).id === 'rubble') room = withTile(room, q.x + dx, q.y + dy, get('floor'));
    }
    return { ...p, room, people: p.people.filter((q) => !gone.includes(q)) };
  }), state);
}

// The state with place `id` changed by `change`: the hero's room, or one waiting, made fresh when not begun
function edit(state, id, change) {
  if (id === state.place) return { ...state, ...change(state) };
  return { ...state, elsewhere: { ...state.elsewhere, [id]: change(state.elsewhere[id] || fresh(id, state.seed)) } };
}

// The first stairs up in a room, row by row
function stairsUp(room) {
  for (let y = 0; y < room.rows; y++) for (let x = 0; x < room.cols; x++) if (tileAt(room, x, y).id === 'stairsUp') return { x, y };
  return null;
}
