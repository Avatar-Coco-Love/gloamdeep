// § wary (D-971, D-972, D-977): the Lampeater's step 5. One whose entry has `calls.wary`, struck and
// free again (not caught, in the dark, not calling) with no cold brazier it can reach, or `calls.most`
// of its brood alive or waiting in a bowl (call.js), is wary for `calls.wary` turns, marked `wary`
// (turns left), its `calls.warySays` said as it starts. Wary, it keeps to a dark tile just past the
// lantern's reach, beside a tile the lantern's own light would reach, lit or not, so lighting it
// never catches it there: the nearest such tile by steps (the first of up, down, left, right on a
// tie), a tile a turn, following the hero; on one, it stays, and drinks at the light's edge as ever
// (edgedrink.js). It never calls while wary. Its turns count down as each creatures' turn ends, caught
// or not; at the end the struck mark clears, as a call's end does, and it comes for the hero as ever.
// With no way to such a tile, it acts as ever. Its eyes dim while wary (sprites.js). Plain data, no drawing.
import { get } from './registry.js';
import { litAt, lanternReachOf } from './sight.js';
import { DIRS } from './state.js';

const around = (t) => Object.values(DIRS).map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy }));
const key = (t) => `${t.x},${t.y}`;

// Whether e is wary, or turns wary now (callStep found no call for it, creatureturn.js)
const isWary = (e) => !!get(e.id).calls?.wary && (e.wary > 0 || (e.struck && !e.caught && !e.call));

// § wary step: (state, e, free) → the tile e steps onto while wary (its own tile to stay), or null to
// act as ever. `free`: whether e may step onto a tile (creatureturn.js)
export function waryStep(state, e, free) {
  if (!isWary(e)) return null;
  const reach = lanternReachOf(state);
  const past = (t) => !reach(t.x, t.y) && !litAt(state, t.x, t.y) && around(t).some((a) => reach(a.x, a.y));
  if (past(e)) return e;
  const seen = new Set([key(e)]);
  let ring = around(e).filter((t) => free(state, e, t.x, t.y)).map((t) => ({ ...t, first: t }));
  ring.forEach((t) => seen.add(key(t)));
  while (ring.length) {
    const there = ring.find(past);
    if (there) return there.first;
    ring = ring.flatMap((t) => around(t).map((a) => ({ ...a, first: t.first })))
      .filter((t) => !seen.has(key(t)) && seen.add(key(t)) && free(state, e, t.x, t.y));
  }
  return null;
}

// § wary turns: (state) → after the creatures' turn, each one wary a turn nearer its end
export function waryTurns(state) {
  if (!state.enemies.some((e) => e.wary)) return state;
  return { ...state, enemies: state.enemies.map((e) => {
    if (!e.wary) return e;
    if (e.wary > 1) return { ...e, wary: e.wary - 1 };
    const { wary, struck, ...rest } = e;
    return rest;
  }) };
}
