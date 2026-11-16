// § snuff (D-947): one that `snuffs`, the Lampeater, owes a snuff the first time it is down to half
// its hearts, and another each time it gets free from a catch, or a pin, begun after that. Owing one,
// in the dark and not caught, it breathes on the lit brazier nearest it (steps, the map's order on a
// tie), from wherever it is, marked `breath` { x, y, left }: the flame shudders `warns` turns, its
// `says` said as it starts; caught in light before then, the breath stops and it tries again once
// free; at the end the brazier goes cold, a plain cold brazier lit again as ever, its `out` said, a
// `snuff` event, and the tile marked `snuffed` { x, y, turn } for its curl of smoke. With no brazier
// lit it doesn't breathe; what it owes waits. Plain data, no drawing.
import { get } from './registry.js';
import { litAt } from './sight.js';
import { withTile } from './room.js';
import { note } from './events.js';
import { say } from './lines.js';
import { crawl } from './brood.js';

const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// The lit braziers in the room, row by row
function litBraziers(room) {
  const lit = get('brazierLit').letter, out = [];
  room.map.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] === lit) out.push({ x, y }); });
  return out;
}

// (before, e) → e with what it owes brought up to date: half its hearts reached, a catch begun
// after that, a catch got free from
function owing(before, e) {
  const entry = get(e.id), was = before.enemies.find((o) => o.id === e.id) || e;
  let next = e;
  if (!next.halved && (next.health ?? entry.health) <= entry.health / 2) next = { ...next, halved: true, owes: (next.owes ?? 0) + 1 };
  if (was.halved && !was.caught && next.caught) next = { ...next, catchHalf: true };
  if (was.caught && !next.caught && (was.catchHalf || next.catchHalf)) { const { catchHalf, ...free } = next; next = { ...free, owes: (next.owes ?? 0) + 1 }; }
  return next;
}

// § breathe: (before, state) → the state after its breath's turn, each that snuffs in list order
export function breathe(before, state) {
  if (!state.enemies.some((e) => get(e.id).snuffs)) return state;
  let room = state.room, events = [], said = null;
  const enemies = state.enemies.map((e) => {
    const snuffs = get(e.id).snuffs;
    if (!snuffs) return e;
    let me = owing(before, e);
    if (me.breath && (me.caught || litAt({ ...state, room }, me.x, me.y))) { const { breath, ...rest } = me; return rest; } // caught: the breath stops (D-947)
    if (me.breath) {
      const { x, y } = me.breath, { breath, ...rest } = me;
      if (room.map[y]?.[x] !== get('brazierLit').letter) return rest; // gone cold some other way: nothing to snuff
      if (me.breath.left > 1) return { ...me, breath: { x, y, left: me.breath.left - 1 } };
      room = withTile(room, x, y, get('brazier'));
      events.push({ id: e.id, x, y });
      said = snuffs.out;
      return { ...rest, owes: Math.max(0, (me.owes ?? 1) - 1), snuffed: { x, y, turn: state.turn }, ...(snuffs.brood && { bowls: [...(me.bowls || []), { x, y }] }) }; // its brood waits in the bowl (brood.js, D-949)
    }
    if (!(me.owes > 0) || me.caught || litAt({ ...state, room }, me.x, me.y)) return me;
    const lit = litBraziers(room);
    if (!lit.length) return me;
    const to = lit.reduce((b, t) => (steps(t, me) < steps(b, me) ? t : b));
    said = said || snuffs.says;
    return { ...me, breath: { x: to.x, y: to.y, left: snuffs.warns } };
  });
  let next = { ...state, room, enemies };
  for (const v of events) next = note(next, 'snuff', v);
  return said ? say(next, said) : next;
}

// § breath turn: (before, after) → after the creatures' turn, its breath and then its brood's crawl
// (brood.js, D-949), unless the hero fell or left the room in it
export const breathTurn = (before, after) => (after.fell !== before.fell || after.place !== before.place ? after : crawl(breathe(before, after)));
