// § sleeping out: the owner's idea, step 1 (D-758). From dusk until morning, in a room under
// the sky with no creature after the hero, the moon button shows; it asks "Sleep here until
// morning?", and Yes sleeps until the next morning in one go, the lantern burning nothing, as
// the bed does (D-488). Without a bed the hero wakes with only the hearts they lay down with:
// no healing and no gold heart, and the spot isn't remembered as a bed for a fall (D-737).
// They wake stiff, step 2 (stiff.js, D-759). With the Fur Bedroll in the bag they wake with 2
// hearts back, never above full, and not stiff (D-803), or beside one set down (D-804). It is a `sleep` event. Plain data, no drawing.
import { say } from './lines.js';
import { note, fresh } from './events.js';
import { DAY_TURNS } from './daytime.js';
import { endTurn } from './endturn.js';
import { regrow } from './regrow.js';
import { tired } from './sleep.js';
import { creatureList } from './creatureturn.js';
import { healed } from './state.js';
import { get } from './registry.js';
import { DIRS } from './state.js';
import { tileAt } from './room.js';
import { offEdge } from './openings.js';
import { stiffen } from './stiff.js';
import { glowSlept } from './glow.js';
import { slowSlept } from './slowburn.js';
import { warmSlept } from './warmed.js';
import { mendSlept } from './mending.js';
import { wardSlept } from './ward.js';
import { spitproofSlept } from './spitproof.js';
import { shadeSlept } from './shade.js';
import { poisonSlept } from './poison.js';

// A creature is after the hero: one chasing, even in the dark, or one seen that has noticed them;
// one that never bites and isn't chasing, a shy bunny, isn't after them (D-826)
export const chased = (state) => state.enemies.some((e) => e.chasing && !e.asleep && !e.pile) || creatureList(state).some((a) => a.e.chasing || get(a.e.id)?.bite);

// The Fur Bedroll in the bag, or null (D-803)
export const rolled = (state) => state.bag.find((s) => get(s.id)?.rest) ?? null;
// A set-down bedroll beside the hero, a side away, or null (D-804)
export const rollBeside = (state) => Object.values(DIRS).map(([dx, dy]) => ({ x: state.hero.x + dx, y: state.hero.y + dy }))
  .find((at) => !offEdge(state.room, at.x, at.y) && tileAt(state.room, at.x, at.y).camps) ?? null;
// Whether the night's sleep is warm: the bedroll in the bag or beside the hero (D-803, D-804)
export const warm = (state) => !!(rolled(state) || rollBeside(state));

// Whether the moon button shows: under the sky, from dusk until morning, nothing after the hero
export const canSleepOut = (state) => !!state.room.dark.sky && tired(state) && !chased(state);

// Whether bumping side `dir` asks to sleep: a set-down bedroll there, and the hero can sleep out (D-804)
export const campAsks = (state, dir) => { const x = state.hero.x + DIRS[dir][0], y = state.hero.y + DIRS[dir][1]; return !offEdge(state.room, x, y) && !!tileAt(state.room, x, y).camps && canSleepOut(state); };

// Why the hero can't sleep out now, a line's id, or null when they can: below ground, by day,
// or a creature after them; SLEEP in the bag and a bumped bedroll say it, free (D-804)
export const noSleepOut = (state) => (!state.room.dark.sky ? 'sleepUnder' : !tired(state) ? 'notTired' : chased(state) ? 'sleepChased' : null);

export function sleepOut(state) {
  if (!canSleepOut(state)) return state;
  const morning = (Math.floor(state.turn / DAY_TURNS) + 1) * DAY_TURNS;
  const roll = warm(state);
  const night = poisonSlept(state, morning - state.turn); // the night uses poison's turns too, and its hearts (Q-098, D-874)
  if (night.fell !== state.fell) return night; // poison took the last heart in the night
  const hurt = state.health - night.health, slept = hurt > 0 ? (s) => note(s, 'poison', { hurt }) : (s) => s; // its heart flashes green on waking (D-654)
  const woke = regrow(endTurn(state, say(slept(note(fresh({ ...shadeSlept(spitproofSlept(wardSlept(mendSlept(warmSlept(slowSlept(glowSlept(night, morning - state.turn), morning - state.turn), morning - state.turn), morning - state.turn), morning - state.turn), morning - state.turn), morning - state.turn), turn: morning }), 'sleep')), roll ? 'sleepOutRoll' : 'sleepOut')), true); // the night uses the Glow Draught's, Slowburn's, Warmed's, the Mending Draught's, the Ward Draught's, the Spitproof Draught's and the Shade Draught's turns (D-806, D-802, D-795, D-794, D-792, D-791)
  if (woke.fell !== state.fell) return woke; // poison took the last heart in the night
  if (roll) return { ...woke, health: healed(woke, get('furBedroll').rest.heal) }; // warm: hearts back, not stiff (D-803, D-804)
  return stiffen(woke); // stiff from waking, its count whole (D-759)
}
