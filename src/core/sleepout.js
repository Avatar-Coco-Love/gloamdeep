// § sleeping out: the owner's idea, step 1 (D-758). From dusk until morning, in a room under
// the sky with no creature after the hero, the moon button shows; it asks "Sleep here until
// morning?", and Yes sleeps until the next morning in one go, the lantern burning nothing, as
// the bed does (D-488). Without a bed the hero wakes with only the hearts they lay down with:
// no healing and no gold heart, and the spot isn't remembered as a bed for a fall (D-737).
// They wake stiff, step 2 (stiff.js, D-759). It is a `sleep` event. Plain data, no drawing.
import { say } from './lines.js';
import { note, fresh } from './events.js';
import { DAY_TURNS } from './daytime.js';
import { endTurn } from './endturn.js';
import { tired } from './sleep.js';
import { creatureList } from './creatureturn.js';
import { stiffen } from './stiff.js';
import { glowSlept } from './glow.js';
import { slowSlept } from './slowburn.js';
import { mendSlept } from './mending.js';
import { wardSlept } from './ward.js';

// A creature is after the hero: one chasing, even in the dark, or one seen that has noticed them
export const chased = (state) => state.enemies.some((e) => e.chasing && !e.asleep && !e.pile) || creatureList(state).length > 0;

// Whether the moon button shows: under the sky, from dusk until morning, nothing after the hero
export const canSleepOut = (state) => !!state.room.dark.sky && tired(state) && !chased(state);

export function sleepOut(state) {
  if (!canSleepOut(state)) return state;
  const morning = (Math.floor(state.turn / DAY_TURNS) + 1) * DAY_TURNS;
  const woke = endTurn(state, say(note(fresh({ ...wardSlept(mendSlept(slowSlept(glowSlept(state, morning - state.turn), morning - state.turn), morning - state.turn), morning - state.turn), turn: morning }), 'sleep'), 'sleepOut')); // the night uses the Glow Draught's, Slowburn's, the Mending Draught's and the Ward Draught's turns (D-795, D-794, D-792, D-791)
  return woke.fell !== state.fell ? woke : stiffen(woke); // stiff from waking, its count whole, unless poison took the last heart (D-759)
}
