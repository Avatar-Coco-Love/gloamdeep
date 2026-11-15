// § edge drink (D-946): one with `edgeDrinks`, the Lampeater, waiting in the dark beside a tile the
// lantern's own light reaches, seeing the hero along a clear line, with the lantern lit and holding oil,
// drinks that much oil from it as the creatures' turn ends: 1 turn's oil, so the lantern burns twice
// as fast, and its light, and the dark it can't cross, pull in. Never while caught or pinned, never
// from a brazier's light alone. It is marked `drinking`, the lit tile beside it nearest the hero, for
// the thread of light drawn into its mouth; a `drink` event flickers the oil bar and plays its sip, as
// the oil tick's does (D-606); its `edgeSays` is said the first time, unless a line was said this turn.
// With Endless oil on it drinks the same but takes no oil (D-626). Plain data, no drawing.
import { get } from './registry.js';
import { litAt, lanternLitAt } from './sight.js';
import { noticesHero } from './creatureturn.js';
import { note } from './events.js';
import { say } from './lines.js';

const SIDES = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const away = (t, h) => Math.abs(t.x - h.x) + Math.abs(t.y - h.y);

// The lit tile beside e it drinks from, nearest the hero, or null when it can't drink this turn
function edgeOf(state, e) {
  if (!get(e.id).edgeDrinks || e.caught || e.asleep || !state.lit || state.oil <= 0 || litAt(state, e.x, e.y)) return null;
  const lit = SIDES.map(([dx, dy]) => ({ x: e.x + dx, y: e.y + dy })).filter((t) => lanternLitAt(state, t.x, t.y));
  if (!lit.length || !noticesHero(state, e)) return null;
  return lit.reduce((b, t) => (away(t, state.hero) < away(b, state.hero) ? t : b));
}

// § drink at the edge: (state) → new state, each one that can drinking in list order
export function edgeDrink(state) {
  if (!state.enemies.some((e) => get(e.id).edgeDrinks)) return state;
  let oil = state.oil, events = [], said = null;
  const enemies = state.enemies.map((e) => {
    const edge = oil > 0 ? edgeOf({ ...state, oil }, e) : null;
    const { drinking, ...rest } = e;
    if (!edge) return drinking ? rest : e;
    const d = Math.min(get(e.id).edgeDrinks, oil);
    if (!state.endless) oil -= d;
    events.push({ id: e.id, oil: d });
    const first = !e.drank && !said && state.line?.turn !== state.turn && get(e.id).edgeSays;
    if (first) said = first;
    return { ...rest, drinking: edge, ...((first || e.drank) && { drank: true }) };
  });
  let next = { ...state, oil, enemies };
  for (const v of events) next = note(next, 'drink', v);
  return said ? say(next, said) : next;
}

// § edge turn: (before, after) → after the creatures' turn, its edge drinks, unless the hero fell or
// was slammed out of the room in it
export const edgeTurn = (before, after) => (after.fell !== before.fell || after.place !== before.place ? after : edgeDrink(after));
