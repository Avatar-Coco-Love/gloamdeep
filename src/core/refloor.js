// § refloor: a save from before the floors grew with depth (D-580) has its generated
// rooms at the old size, 17 × 20, which no longer fit the floors' grids. Once, as the
// save is brought up to date (save.js), every generated room is forgotten, to be made
// again from the same seed at its new size, and the hero's memory of it goes too.
// Plain data, no drawing.
// § who and what moves: a hero in a generated room stands on the stairs up of that
// floor; a bag left in one lies on those stairs; a freed person still waiting there
// goes home (homeward.js); and a person already freed is not trapped again in the room
// made anew, their ring of rubble cleared.
// § which rooms: every generated one by default; `remake` (id, place) picks fewer, as
// the step that makes again only the crypt rooms standing in for dungeon rooms (D-585),
// and then the hero goes to their floor's stairs up as that room was kept, if it was.
import { isGenerated, depthOf, placeAt, tileAt, withTile, peddlerRoom, stoneRoom, isStoneDepth } from './room.js';
import { fresh } from './stairs.js';
import { goHome } from './homeward.js';
import { get } from './registry.js';
import { cellOf } from './region.js';

// § stand-ins: a save from before 0.3.43 may hold a crypt room that stood in for a dungeon
// room no try could make (Q-078); once, each is made again from its seed, at its floor's
// size, and every other room stays as it was (D-585)
export const restand = (s) => refloor(s, (id, p) => isGenerated(id) && !fits(p.room, cellOf(s.seed, id, depthOf(id))));
const fits = (room, cell) => !room || (!!cell && room.cols === cell.cols && room.rows === cell.rows); // a room the layout no longer has never fits

// § the depth 2 waystone: a save from before it (D-587) may hold the room the seed picks for it as
// it was; once, that room alone is made again from its seed, with the stone, and every
// other room stays as it was. A hero in it goes to the floor's stairs up, a bag left there too.
const STONED = /[ZA]/; // the plate, asleep or woken
export const restone = (s) => refloor(s, (id, p) => id === stoneRoom(s.seed) && !!p.room && !p.room.map.some((l) => STONED.test(l)));
// § the deeper waystones: the same, once, for the room the seed picks on each other depth that holds
// one, 5, 8, then every 4th (D-594); a room that already has its stone stays as it was
export const restones = (s) => refloor(s, (id, p) => isGenerated(id) && isStoneDepth(depthOf(id)) && id === stoneRoom(s.seed, depthOf(id)) && !!p.room && !p.room.map.some((l) => STONED.test(l)));

export function refloor(s, remake = isGenerated) {
  const away = Object.entries(s.elsewhere || {}), here = remake(s.place, s);
  const left = [...away.filter(([id, p]) => remake(id, p)), ...(here ? [[s.place, s]] : [])];
  const kept = new Set([...(here ? [] : [s.place]), ...away.filter(([id, p]) => !remake(id, p)).map(([id]) => id)]);
  const bags = left.flatMap(([id, p]) => (p.items || []).filter((it) => it.id === 'lostbag').map((it) => ({ ...it, to: placeAt(depthOf(id)) })));
  const waiting = left.flatMap(([, p]) => (p.people || []).filter((p) => p.leaves !== undefined).map((p) => p.id));
  let state = { ...s, elsewhere: Object.fromEntries(away.filter(([id, p]) => !remake(id, p))) };
  if (here) {
    const to = placeAt(depthOf(s.place)), elsewhere = { ...state.elsewhere }, there = elsewhere[to] || fresh(to, s.seed);
    delete elsewhere[to];
    state = { ...state, ...there, place: to, elsewhere, hero: stairsUp(there.room) };
  }
  state = waiting.reduce(goHome, state);
  for (const bag of bags) state = edit(state, bag.to, (p) => ({ ...p, items: [...p.items, { id: 'lostbag', ...stairsUp(p.room), holds: bag.holds }] }));
  return freed(state, kept);
}

// Every room made anew (the hero's, those the bags went to, and the peddler's once he is
// freed, made now so he isn't trapped there again) without the people freed before, who
// stand somewhere kept (a room in `kept`, or one never generated); each tile of rubble around them cleared
function freed(state, kept) {
  const anew = (id) => isGenerated(id) && !kept.has(id);
  const rooms = [[state.place, state], ...Object.entries(state.elsewhere)].filter(([id]) => !anew(id));
  const out = new Set(rooms.flatMap(([, p]) => (p.people || []).map((q) => q.id)));
  const ids = [...new Set([state.place, ...Object.keys(state.elsewhere), ...(out.has('peddler') ? [peddlerRoom(state.seed)] : [])])].filter(anew);
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
