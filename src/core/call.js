// § call (D-971, D-972, D-974): the Lampeater's step 3. One whose entry has `calls`, struck (a blow
// that hurt it, marked `struck` by enemies.js, hitEnemy) and free again (not caught, in the dark), goes through the
// dark to a tile beside the nearest cold brazier (fewest steps, the first of up, down, left, right on a
// tie), never a lit one, and calls a creature of its `snuffs.brood` out of it over `turns` turns,
// marked `call` { x, y, left }, its `says` said as it starts. Caught in light, the call stops, and it
// tries again once free; that brazier lit, the call is spoilt, and it turns to another cold one. At
// the end the creature waits in the bowl and crawls out as one from a snuffed bowl does (brood.js).
// With `most` of its brood alive (or waiting in a bowl), or no cold brazier it can reach, it fights
// on as ever (the wary step comes later, D-972). Plain data, no drawing.
import { get } from './registry.js';
import { litAt } from './sight.js';
import { DIRS } from './state.js';
import { say } from './lines.js';

const around = (t) => Object.values(DIRS).map(([dx, dy]) => ({ x: t.x + dx, y: t.y + dy }));
const coldAt = (state, t) => state.room.map[t.y]?.[t.x] === get('brazier').letter;
// The cold brazier beside tile t, the first of up, down, left, right, or undefined
const coldBeside = (state, t) => around(t).find((b) => coldAt(state, b));

// How many of its brood are alive in the room, or waiting in a bowl
export const broodCount = (state, e) => {
  const brood = get(e.id).snuffs?.brood;
  return state.enemies.filter((o) => o.id === brood).length + state.enemies.reduce((n, o) => n + (o.bowls?.length ?? 0), 0);
};

// Whether e, struck and free again, wants to call now
const wants = (state, e) => !!get(e.id).calls && e.struck && !e.caught && !e.call && !litAt(state, e.x, e.y) && broodCount(state, e) < get(e.id).calls.most;

// § call step: (state, e, free) → the tile e steps onto on its way to a cold brazier (its own tile when
// already beside one), or null to fight on as ever. `free`: whether e may step onto a tile (creatureturn.js)
export function callStep(state, e, free) {
  if (e.call) return e; // calling: it stays where it is
  if (!wants(state, e)) return null;
  if (coldBeside(state, e)) return e;
  const key = (t) => `${t.x},${t.y}`, seen = new Set([key(e)]);
  let ring = around(e).filter((t) => free(state, e, t.x, t.y)).map((t) => ({ ...t, first: t }));
  ring.forEach((t) => seen.add(key(t)));
  while (ring.length) {
    const there = ring.find((t) => coldBeside(state, t));
    if (there) return there.first;
    ring = ring.flatMap((t) => around(t).map((a) => ({ ...a, first: t.first })))
      .filter((t) => !seen.has(key(t)) && seen.add(key(t)) && free(state, e, t.x, t.y));
  }
  return null;
}

// § calls: (state) → after the creatures' turn, each call begun, counted down, stopped, spoilt or ended
export function calls(state) {
  if (!state.enemies.some((e) => get(e.id).calls && (e.struck || e.call))) return state;
  let said = null;
  const enemies = state.enemies.map((e) => {
    const c = get(e.id).calls;
    if (!c) return e;
    if (e.call) {
      const { call, ...rest } = e;
      if (e.caught || litAt(state, e.x, e.y)) return rest; // caught: the call stops; it tries again once free (D-972)
      if (!coldAt(state, call)) return rest; // lit: spoilt; it turns to another cold one (D-972)
      if (call.left > 1) return { ...e, call: { ...call, left: call.left - 1 } };
      const { struck, ...done } = rest;
      return broodCount(state, e) < c.most ? { ...done, bowls: [...(e.bowls || []), { x: call.x, y: call.y }] } : done; // it waits in the bowl and crawls out (brood.js)
    }
    if (!wants(state, e)) return e;
    const b = coldBeside(state, e);
    if (!b) return e;
    said = said || c.says;
    return { ...e, call: { x: b.x, y: b.y, left: c.turns }, ...(b.x !== e.x && { facing: b.x < e.x ? 'left' : 'right' }) };
  });
  const next = { ...state, enemies };
  return said ? say(next, said) : next;
}
