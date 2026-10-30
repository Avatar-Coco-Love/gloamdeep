// § turn: the game state and the turn rules, as plain data (TECH.md,
// "Turn rules are pure functions"). Nothing moves until the player acts (D-016).
// It is the front door: the other turn files' rules are passed on from here, so
// the rest of the game imports them all from this one file (D-362):
// state.js (the state and world), endturn.js (wait and a turn's end),
// creatureturn.js (the creatures' turn), fall.js (a fall and the lost bag)
// and bagturn.js (the bag's buttons and panels).
import { tileAt, withTile } from './room.js';
import { formOf } from './tiles.js';
import { get } from './registry.js';
import { say } from './lines.js';
import { enemyAt, hitEnemy, DROP_CHANCE } from './enemies.js';
import { rng, seedFor } from './rng.js';
import { lightAt, openSide } from './lights.js';
import { mountAt } from './mount.js';
import { inDaylight } from './daytime.js';
import { takeStairs } from './stairs.js';
import { offEdge, walkOff } from './openings.js';
import { xpOf, gain } from './xp.js';
import { bagAdd } from './bag.js';
import { note, fresh } from './events.js';
import { noteTaken } from './regrow.js';
import { DIRS, passTurn, maxHealth } from './state.js';
import { endTurn } from './endturn.js';
import { fleeOrStand } from './creatureturn.js';
import { fetchBag } from './fall.js';

export { DIRS, FIRST_START, HERO_HEALTH, maxHealth, makeState, makeWorld, itemAt, toward } from './state.js';
export { wait } from './endturn.js';
export { nextMoves, creatureList } from './creatureturn.js';
export { startOver } from './fall.js';
export { pour, craft, makeAt, eat, setDown, takeDown, panelBeside, setSides, look, pourByItself } from './bagturn.js';

// § step: (state, direction) → new state. Walking into something solid
// changes nothing and passes no turn, so the same state comes back (D-043).
// A passed turn burns oil while the lantern is lit (D-037, D-026). An item on
// the new tile is then picked up (pickUp). The oil lines look at the oil after
// both (D-096). Walking into an enemy attacks it (D-017), and into an unlit
// torch's wall lights it (D-121). Stepping onto stairs takes them, before the
// enemies left behind can act (D-132). Walking off an edge through an
// opening does the same, into the room beyond (D-197); elsewhere the edge is
// wall. Every passed turn ends with the enemies' turn (D-114), in the room
// the hero ends it in, but for the first step into a room (D-446). A tile walked onto is a `step` event (events.js).
export function step(state, dir) {
  const [dx, dy] = DIRS[dir];
  const x = state.hero.x + dx, y = state.hero.y + dy;
  if (offEdge(state.room, x, y)) {
    const out = walkOff(note(passTurn(state), 'step'), dir);
    return out ? endTurn(state, out) : state;
  }
  const tile = tileAt(state.room, x, y);
  if (tile.solid) {
    if (minable(state.room, x, y)) return mine(state, x, y);
    return tile.mine?.edge ? say(state, tile.mine.edge) : lightTorch(state, x, y); // an edge tree: its line, free (D-321)
  }
  const foe = enemyAt(state, x, y);
  if (foe) return attack(state, foe);
  let next = note(passTurn({ ...state, hero: { x, y } }), 'step');
  for (const found of state.items.filter((it) => it.x === x && it.y === y)) next = pickUp(next, found); // a bag where you fell may share a tile
  return endTurn(state, takeStairs(next) || next);
}

// § pick up: a flask goes into the bag, and stays on the floor when the bag
// has no room (D-247), or with its full line when it holds some (D-250, D-333);
// an oilcap the same, saying one of its lines as it goes in (D-296, D-297). A herb heals, never above full, and is gone with its
// line; at full health it stays on the floor (D-155, D-156). A weapon goes
// into an empty hand with its line (D-252); with one held it stays for now,
// as only one knife lies in the world. Taken is a `take` event, a herb eaten an `eat`.
// Either way it goes on the room's taken list, to grow back (regrow.js, D-306).
function pickUp(state, found) {
  const entry = get(found.id), id = found.id;
  if (entry.fetch) return fetchBag(state, found);
  const gone = { items: state.items.filter((it) => it !== found), taken: noteTaken(state, found).taken };
  if (entry.hold) return state.held ? state : note(say({ ...state, ...gone, held: id }, entry.says), 'take', { id });
  if (entry.bag) {
    const bag = bagAdd(state.bag, id, found.form);
    if (bag) return note(entry.says ? say({ ...state, ...gone, bag }, entry.says) : { ...state, ...gone, bag }, 'take', { id });
    return state.bag.some((s) => s.id === id) && entry.full ? say(state, entry.full) : state;
  }
  if (entry.heal && state.health < maxHealth(state)) return note(say({ ...state, ...gone, health: Math.min(maxHealth(state), state.health + entry.heal) }, entry.says), 'eat', { id });
  return state;
}

// § attack: the hero swings the lantern at the foe and stays put (D-109),
// or the weapon held, which hits for its own `hit` (D-252). It passes a turn
// like a step, so oil burns (D-111). One that may flee flees or stands (D-301).
// The foe's line is said, and an oil line
// said on the same turn replaces it (D-112). A foe beaten is worth experience, its hearts and bite (D-245, D-371).
// It is a `hit` event, and a foe beaten a `beat` too. A foe beaten may leave a drop (dropFrom).
export const LANTERN_HIT = 1; // two hits kill the rat (D-110)
export const heroHit = (state) => (state.held && get(state.held)?.hit) || LANTERN_HIT;
function attack(state, foe) {
  if (foe.asleep) return wake(state, foe);
  const entry = get(foe.id), hit = hitEnemy(state.enemies, foe, entry, heroHit(state));
  const dead = hit.length < state.enemies.length, { enemies, stands } = fleeOrStand(state, hit, foe);
  const next = note(passTurn({ ...state, enemies, items: dead ? dropFrom(state, foe, entry) : state.items }), 'hit', { id: foe.id, held: state.held });
  return endTurn(state, say(dead ? note(gain(next, xpOf(entry)), 'beat', { id: foe.id }) : next, dead ? entry.die : stands ? entry.stands : entry.hurt));
}

// § drop: the items with what a beaten foe `drops`, about 1 time in 2 (D-453), on the
// tile where it fell (creatures never stand on items), else the nearest open one. The coin is seeded, as a
// flee's is, from the seed, the turn and its tile (D-474), so a replay drops the same.
// It never grows back, so it lies there until taken (D-474).
function dropFrom(state, foe, entry) {
  if (!entry.drops || rng(seedFor(state.seed ^ state.turn, foe.x * 64 + foe.y + 4096))() >= DROP_CHANCE) return state.items;
  const [at] = spread(state, foe.x, foe.y, 1, true);
  return [...state.items, { id: entry.drops, ...at }];
}

// § wake: bumping a creature asleep in disguise wakes it, with no harm and no
// sound. It passes a turn like a step; the creature stirs and does nothing that
// turn, so the hero has a step's start (D-368). It is a `wake` event.
function wake(state, foe) {
  const { asleep, ...woken } = foe, enemies = state.enemies.map((e) => (e === foe ? { ...woken, stirs: true } : e));
  return endTurn(state, say(note(passTurn({ ...state, enemies }), 'wake', { id: foe.id }), get(foe.id).wakes));
}

// § light a torch: walking into the wall of an unlit torch, from the tile it
// faces, lights it for good (D-121). It passes a turn like a step (D-122);
// the hit's rules for lines apply (D-124). With the lantern off nothing
// happens and no turn passes, but the line says why (D-122). Lit, it is a `torch` event.
function lightTorch(state, x, y) {
  const torch = lightAt(state, x, y), entry = torch && get(torch.id);
  if (!entry?.lightsTo) return state;
  const side = openSide(mountAt(state.room, x, y), x, y);
  if (!side || side.x !== state.hero.x || side.y !== state.hero.y) return state;
  if (!state.lit) return say(state, 'lanternDark');
  const lights = state.lights.map((l) => (l === torch ? { ...l, id: entry.lightsTo } : l));
  return endTurn(state, note(say(passTurn({ ...state, lights }), 'torchLit'), 'torch'));
}

// § mine: walking into a deposit bumps it, a turn each, like a hit, with its
// `chips` line in turn (O2). The room keeps each one's bumps in `chips`, by
// tile. The last bump breaks it to floor, or to what it `leaves` (a tree, a
// stump, W3), and its `n` (one unless said) drops go into the bag with its
// `breaks` line, in the tile's look when it has `forms` (else what it leaves);
// with no room for one, its `full` line is said, free, and it holds. With room
// for fewer than `n`, the rest lies on its tile and the nearest open ones, never
// to grow back (W2, D-316; W3, D-317).
// Broken, it goes on the room's taken list, to grow back (regrow.js, O3); its
// cracks, before that, stay until it breaks.
// Each bump is a `chip` event, and the drops a `take`.
function mine(state, x, y) {
  const tile = tileAt(state.room, x, y), { hits, chips, drops, n: count = 1, breaks, full, leaves = 'floor' } = tile.mine;
  const key = `${x},${y}`, n = (state.room.chips?.[key] ?? 0) + 1;
  const { [key]: was, ...rest } = state.room.chips ?? {};
  if (n < hits) {
    const room = { ...state.room, chips: { ...rest, [key]: n } };
    return endTurn(state, say(note(passTurn({ ...state, room }), 'chip', { id: tile.id, n }), chips[n - 1]));
  }
  const after = get(leaves), looks = tile.forms ? tile : after.forms ? after : null;
  const form = looks ? formOf(looks, x, y) : undefined;
  let bag = state.bag, taken = 0;
  for (let more; taken < count && (more = bagAdd(bag, drops, form)); taken++) bag = more;
  if (!taken) return say(state, full || get(drops).full);
  const room = { ...withTile(state.room, x, y, after), chips: rest };
  const left = spread({ ...state, room }, x, y, count - taken)
    .map((at) => ({ id: drops, ...at, ...(form === undefined ? {} : { form }), once: true }));
  const passed = passTurn({ ...state, room, bag, items: [...state.items, ...left] });
  const next = note(note(noteTaken(passed, { id: tile.id, x, y }), 'chip', { id: tile.id, n }), 'take', { id: drops });
  return endTurn(state, say(next, breaks));
}

// Whether the solid tile at x, y can be mined: it has `mine`, and one only `inner`
// (a tree, W3) is off the room's edge, which stays its wall
function minable(room, x, y) {
  const m = tileAt(room, x, y).mine;
  return !!m && !(m.inner && (x === 0 || y === 0 || x === room.cols - 1 || y === room.rows - 1));
}

// k tiles for what didn't fit: x, y first, then the nearest open ones around it with
// nothing on them and no hero, sides before corners; x, y again when none is left.
// With `free`, x, y too only when nothing lies on it (a drop, D-474).
function spread(state, x, y, k, free = false) {
  const around = [[0, 0], [0, 1], [-1, 0], [1, 0], [0, -1], [-1, 1], [1, 1], [-1, -1], [1, -1]].map(([dx, dy]) => ({ x: x + dx, y: y + dy }));
  const open = around.filter((t) => (!free && t.x === x && t.y === y) || (!tileAt(state.room, t.x, t.y).solid
    && !(t.x === state.hero.x && t.y === state.hero.y) && !state.items.some((o) => o.x === t.x && o.y === t.y)));
  return Array.from({ length: k }, (_, i) => open[i] || { x, y });
}

// § switch: the lantern on or off, whenever the player likes. It is free:
// no turn passes and no oil burns (D-015, D-080, D-081). A `lantern` event, on a list of its own.
export const switchLantern = (state) => note(fresh({ ...state, lit: !state.lit }), 'lantern', { lit: !state.lit });
// With the lantern set to By itself (D-210): out as the hero comes into daylight,
// or dawn comes, lit again as they leave it, or dusk falls (D-217); else the state
// as it is. Only at that change, so the player's own switch between holds. It is
// free, like the switch, and adds a `lantern` event to the turn's.
export function followDaylight(before, after) {
  const was = inDaylight(before), now = inDaylight(after);
  return was === now || after.lit === was ? after : note({ ...after, lit: was }, 'lantern', { lit: was });
}
