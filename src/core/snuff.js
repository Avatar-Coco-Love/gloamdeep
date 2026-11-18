// § snuff (D-947, its phases D-971, D-972, D-978): one that `snuffs`, the Lampeater, owes a snuff at each
// of its phases, the first time it is down to each of `snuffs.at` of its hearts (2/3 and 1/3), marked
// `phase` (how many reached); they replace its half-hearts snuff and the snuff after each catch. Owing one,
// in the dark and not caught, it breathes on the lit brazier nearest it (steps, the map's order on a
// tie), from wherever it is, marked `breath` { x, y, left }; free with none lit, what it owes is spent,
// and it only calls (call.js). The flame shudders `warns` turns, its
// `says` said as it starts; caught in light before then, the breath stops and it tries again once
// free; at the end the brazier goes cold, a plain cold brazier lit again as ever, its `out` said, a
// `snuff` event, and the tile marked `snuffed` { x, y, turn } for its curl of smoke. Its call after a
// phase is from another cold brazier, the snuffed one marked `phaseBowl` till the struck mark clears
// (call.js). Plain data, no drawing.
import { get } from './registry.js';
import { litAt } from './sight.js';
import { withTile } from './room.js';
import { note } from './events.js';
import { say } from './lines.js';
import { crawl } from './brood.js';
import { calls, broodCount } from './call.js';
import { waryTurns } from './wary.js';

const steps = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

// The lit braziers in the room, row by row
function litBraziers(room) {
  const lit = get('brazierLit').letter, out = [];
  room.map.forEach((row, y) => { for (let x = 0; x < row.length; x++) if (row[x] === lit) out.push({ x, y }); });
  return out;
}

// e → how many of its phases it has reached, by its hearts left (D-971, D-972)
const phaseOf = (e) => { const entry = get(e.id), h = e.health ?? entry.health; return entry.snuffs.at.filter((f) => h <= entry.health * f).length; };

// § owing: e → e with what it owes brought up to date, one snuff for each phase newly reached
export function owing(e) {
  const p = phaseOf(e), was = e.phase ?? 0;
  return p > was ? { ...e, phase: p, owes: (e.owes ?? 0) + p - was } : e;
}

// § owed: (state) → the state with each that snuffs owing what its hearts say, before its calls
export const owed = (state) => (state.enemies.some((e) => get(e.id).snuffs) ? { ...state, enemies: state.enemies.map((e) => (get(e.id).snuffs ? owing(e) : e)) } : state);

// § breathe: (before, state) → the state after its breath's turn, each that snuffs in list order
export function breathe(before, state) {
  if (!state.enemies.some((e) => get(e.id).snuffs)) return state;
  let room = state.room, events = [], said = null;
  const enemies = state.enemies.map((e) => {
    const snuffs = get(e.id).snuffs;
    if (!snuffs) return e;
    let me = owing(e);
    if (me.breath && (me.caught || litAt({ ...state, room }, me.x, me.y))) { const { breath, ...rest } = me; return rest; } // caught: the breath stops (D-947)
    if (me.breath) {
      const { x, y } = me.breath, { breath, ...rest } = me;
      if (room.map[y]?.[x] !== get('brazierLit').letter) return rest; // gone cold some other way: nothing to snuff
      if (me.breath.left > 1) return { ...me, breath: { x, y, left: me.breath.left - 1 } };
      room = withTile(room, x, y, get('brazier'));
      events.push({ id: e.id, x, y });
      said = snuffs.out;
      const room6 = snuffs.brood && broodCount(state, me) < (get(e.id).calls?.most ?? Infinity); // never past 6 alive (D-972, D-978)
      return { ...rest, owes: Math.max(0, (me.owes ?? 1) - 1), snuffed: { x, y, turn: state.turn }, phaseBowl: { x, y }, ...(room6 && { bowls: [...(me.bowls || []), { x, y }] }) }; // its brood waits in the bowl (brood.js, D-949)
    }
    if (!(me.owes > 0) || me.caught || litAt({ ...state, room }, me.x, me.y)) return me;
    const lit = litBraziers(room);
    if (!lit.length) return { ...me, owes: 0 }; // none lit: spent, it only calls (D-978)
    const to = lit.reduce((b, t) => (steps(t, me) < steps(b, me) ? t : b));
    said = said || snuffs.says;
    return { ...me, breath: { x: to.x, y: to.y, left: snuffs.warns } };
  });
  let next = { ...state, room, enemies };
  for (const v of events) next = note(next, 'snuff', v);
  return said ? say(next, said) : next;
}

// § breath turn: (before, after) → after the creatures' turn, what it owes (its phases), its calls (call.js, D-974), its breath and
// then its brood's crawl (brood.js, D-949), unless the hero fell or left the room in it
export const breathTurn = (before, after) => (after.fell !== before.fell || after.place !== before.place ? after : crawl(breathe(before, waryTurns(calls(owed(after))))));
