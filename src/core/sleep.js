// § sleep: the bed set down at home (D-488). Bumped from dusk until morning, the hero
// sleeps until the next morning in one go: the lantern burns nothing while they sleep,
// they wake healed to full and rested, with one gold heart above their full hearts. The
// gold heart is health past the most (maxHealth), so it is the first lost to a bite, and
// gone after a fall, which wakes the hero at full. It is a `sleep` event. By day the
// bed says it isn't time, free; its ask card opens instead (screens.js).
import { say } from './lines.js';
import { note, fresh } from './events.js';
import { DAY_TURNS, DUSK } from './daytime.js';
import { maxHealth } from './state.js';
import { endTurn } from './endturn.js';
import { sleptIn } from './waking.js';
import { glowSlept } from './glow.js';
import { slowSlept } from './slowburn.js';
import { mendSlept } from './mending.js';

export const RESTED = 1; // the gold hearts a night's sleep gives

// Whether the hero can sleep now: from dusk until the morning
export const tired = (state) => state.turn % DAY_TURNS >= DUSK;

// The bed at x, y is remembered as slept in, for a fall to wake beside it (D-737)
export function sleep(state, x, y) {
  if (!tired(state)) return say(state, 'notTired');
  const morning = (Math.floor(state.turn / DAY_TURNS) + 1) * DAY_TURNS;
  const slept = fresh({ ...mendSlept(slowSlept(glowSlept(sleptIn(state, x, y), morning - state.turn), morning - state.turn), morning - state.turn), turn: morning, health: maxHealth(state) + RESTED });
  return endTurn(state, say(note(slept, 'sleep'), 'sleep'));
}
