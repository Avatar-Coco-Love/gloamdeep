// § bones (D-731): one that `rises`, the bone rat, falls into a pile of bones when beaten instead
// of going: still in the room's list, `pile` the turns until it stands, `newPile` for the turn it
// fell. A pile does nothing, bites no one and can't be hit; no creature steps onto it. Each
// creature turn after the one it fell in counts it down; with 1 turn left it says its `stirsSay`
// line, unless a line was said this turn; at 0 it stands up where it lies, whole and chasing, to
// act from the next turn. Stepping onto it scatters it (scatter, turn.js): only then is it beaten.
// Claude's drafts the owner may change: it stands up chasing; the count waits while the hero is
// in another room; the stir line's words.
import { get } from './registry.js';
import { say } from './lines.js';

// § fallen: (foe, entry) → the pile a beaten one that `rises` leaves where it fell
export function fallen(foe, entry) {
  const { health, chasing, flees, ...rest } = foe;
  return { ...rest, pile: entry.rises, newPile: true };
}

// § rise: (state) → the state after the piles' count, at a creature turn's end
export function rise(state) {
  if (!state.enemies.some((e) => e.pile)) return state;
  let stirs = null;
  const enemies = state.enemies.map((e) => {
    if (!e.pile) return e;
    if (e.newPile) { const { newPile, ...rest } = e; return rest; }
    if (e.pile > 1) { if (e.pile === 2) stirs = stirs || e; return { ...e, pile: e.pile - 1 }; }
    const { pile, ...up } = e;
    return { ...up, chasing: true };
  });
  const next = { ...state, enemies }, said = state.line?.turn === state.turn;
  return stirs && !said ? say(next, get(stirs.id).stirsSay) : next;
}
