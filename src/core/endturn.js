// § end turn: waiting, and the end of every passed turn (split from turn.js, D-362)
import { say, oilLine } from './lines.js';
import { discover, levelOf } from './xp.js';
import { note } from './events.js';
import { regrow } from './regrow.js';
import { grow } from './garden.js';
import { passTurn } from './state.js';
import { enemiesAct, packWarns } from './creatureturn.js';
import { get } from './registry.js';
import { withTile } from './room.js';
import { leave, send, arrive, greet } from './homeward.js';
import { fishTurn } from './fishing.js';
import { stiffTick } from './stiff.js';
import { glowTick } from './glow.js';
import { slowTick } from './slowburn.js';
import { warmTick } from './warmed.js';
import { mendTick } from './mending.js';
import { wardTick } from './ward.js';
import { spitproofTick } from './spitproof.js';
import { shadeTick } from './shade.js';
import { meet } from './bestiary.js';
import { learn } from './bagmake.js';
import { poisonTick } from './poison.js';
import { nightfall, leaveByLight } from './nightfall.js';

// § wait: stand still for one turn (D-084). It passes a turn like a step,
// so oil burns while the lantern is lit (D-037).
export const wait = (state) => endTurn(state, passTurn(state));
// The end of a passed turn: the oil line, if one was crossed, a new room's
// experience (D-245), the level line if a level was reached, which replaces
// any other line (D-246), then the enemies' turn, but for a room just come
// into: the hero's first step there is their own (D-446). A freed person whose turns are
// up says their goodbye and goes home before it, and one still waiting in a room left goes
// home too (homeward.js, D-496); one at home beams in as the hero comes, and greets them
// once, near. Another room is an `enter`
// event, a new one a `found` too, and a level reached a `level`. Last, what
// was taken here and is due grows back out of sight, or anywhere in a room
// just come into, as it grew while the hero was away (regrow.js, D-307), and a torch
// set down whose time is up goes out (D-478), and a planted garden bed whose time is up grows
// (garden.js, D-567). At the very end, each creature lit and showing is met (bestiary.js, D-630). First of all, a line out waits for a bite, or reels in (fishing.js, D-610).
export const endTurn = (before, cast) => {
  const after = fishTurn(before, cast), id = oilLine(before.oil, after.oil), place = after.place;
  let found = discover(before, id ? say(after, id) : after);
  if (id === 'oilEmpty') found = note(found, 'oilOut'); // the lantern gutters: its sound (D-830)
  if (id === 'oilLow') found = note(found, 'oilLow'); // the flame is getting low: its sputter (D-834)
  if (place !== before.place) found = note(found, 'enter', { place });
  if (found.found.length > after.found.length) found = note(found, 'found', { place });
  found = leave(found); // a freed person whose turns are up goes home (D-496)
  const level = levelOf(found.xp), moved = place !== before.place;
  const done = level > levelOf(before.xp) ? note(say(found, 'levelUp', level), 'level', { n: level }) : found;
  const ticked = poisonTick(shadeTick(spitproofTick(wardTick(mendTick(warmTick(stiffTick(slowTick(glowTick(done))))))))); // poisoned counts down before the creatures' turn, so a bite's own turn takes nothing (poison.js, D-654); stiff counts down too (stiff.js, D-759), and the Glow Draught's (glow.js, D-791) and Slowburn's (slowburn.js, D-792), and Warmed's (warmed.js, D-845); the Mending Draught's heart comes before poison's (mending.js, D-794); the Ward Draught's counts down before the creatures' bites (ward.js, D-795), and the Spitproof Draught's before the globs fly (spitproof.js, D-802), and the Shade Draught's before the creatures notice (shade.js, D-806)
  const fell = ticked.fell !== done.fell; // poison took the last heart: the hero woke at the start, and no creature acts (D-655)
  const acted = moved ? { ...ticked, globs: [] } : fell ? ticked : packWarns(before, enemiesAct(leaveByLight(ticked))); // night or day creatures gone with the light leave first, so none bites on waking (D-783, B2); a pack that notices warns (D-766); a room left leaves its globs behind (D-688)
  const next = grow(burnOut(nightfall(regrow(acted, moved)), moved)); // night creatures come out in the woods, or go by day (nightfall.js, D-778)
  const sent = next.place === before.place ? next : send(next, before.place); // the room left, as by a fall too: one freed there goes home (D-496)
  return lastHeart(before, learn(meet(greet(arrive(sent))))); // one gone home beams in as the hero comes, and greets the hero once, near (D-496); then each creature lit is met (D-630); the bag's finds are known (D-787)
};

// § last heart: the turn that leaves the hero on one heart, from more, beats once (D-835): again only
// after a heart has come back and gone again; a fall, which wakes the hero at full hearts, does not
const lastHeart = (before, after) => (before.health > 1 && after.health === 1 && after.fell === before.fell ? note(after, 'lastHeart') : after);

// § burn out: a torch set down goes out on its `out` turn, leaving bare floor where its
// foot stood, with its line; in a room just come into, one due went out while the hero
// was away, so nothing is said (D-478).
function burnOut(state, came) {
  const out = state.lights.filter((l) => l.out !== undefined && state.turn >= l.out);
  if (!out.length) return state;
  const room = out.reduce((r, l) => withTile(r, l.x, l.y, get('floor')), state.room);
  const next = { ...state, room, lights: state.lights.filter((l) => !out.includes(l)) };
  return came ? next : say(next, get(out[0].id).outSays || 'torchOut'); // a glow lamp's own line (D-808)
}
