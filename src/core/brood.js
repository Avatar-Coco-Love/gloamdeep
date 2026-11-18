// § brood (D-949, the Lampeater's step 8): each brazier one that `snuffs` breathes out keeps a
// creature of its `brood` in the cold bowl, kept on the snuffer as `bowls` [{ x, y }]. On the turn
// the brazier goes cold, and each turn after while it waits, it crawls out onto a dark free tile
// beside the bowl, the seeded dice picking among them; with none dark and free it waits in the bowl,
// unless the bowl was lit again: then onto any free tile beside it, lit or not (H-77).
// It comes out marked `ash` { x, y, turn }, the bowl it came from: the arena's own, met already so
// the Bestiary counts nothing, beaten with no Records or Feat count and no drop (turn.js), never
// following the hero out, and gone when the hero leaves the room (stairs.js). It acts from the next
// turn, as it crawls out after the creatures have acted. The first time, the snuffer's `crawls` line,
// said after "The brazier gutters out." when that was said this turn. Plain data, no drawing.
import { get } from './registry.js';
import { litAt } from './sight.js';
import { tileAt } from './room.js';
import { rng, pick, seedFor } from './rng.js';
import { say } from './lines.js';

const SIDES = [[0, -1], [1, 0], [0, 1], [-1, 0]];

// The free tiles beside x, y: open floor, no creature, not the hero
function freeBeside(state, x, y) {
  return SIDES.map(([dx, dy]) => ({ x: x + dx, y: y + dy })).filter((t) => t.x >= 0 && t.y >= 0 && t.x < state.room.cols && t.y < state.room.rows
    && !tileAt(state.room, t.x, t.y).solid && !(state.hero.x === t.x && state.hero.y === t.y)
    && !state.enemies.some((e) => e.x === t.x && e.y === t.y));
}
// The dark ones of them, no light reaching it
const darkBeside = (state, x, y) => freeBeside(state, x, y).filter((t) => !litAt(state, t.x, t.y));
// Whether the bowl at b was lit again: its glow lights every tile beside it, so it would wait for ever (H-77)
const relit = (state, b) => state.room.map[b.y]?.[b.x] === get('brazierLit').letter;

// § crawl: (state) → the state with each bowl's creature out where it can be, in list order
export function crawl(state) {
  if (!state.enemies.some((e) => e.bowls?.length)) return state;
  let next = state, crawls = null, out = null;
  for (const e of state.enemies) {
    const snuffs = get(e.id).snuffs;
    if (!snuffs?.brood || !e.bowls?.length) continue;
    const left = [], born = [];
    for (const b of e.bowls) {
      const now = { ...next, enemies: [...next.enemies, ...born] }, dark = darkBeside(now, b.x, b.y);
      const free = dark.length || !relit(now, b) ? dark : freeBeside(now, b.x, b.y); // its bowl lit again, it comes out into the light (H-77)
      if (!free.length) { left.push(b); continue; } // none dark: it waits in the bowl (D-949)
      const at = pick(rng(seedFor(next.seed ^ next.turn, b.x * 64 + b.y + 8192)), free);
      born.push({ id: snuffs.brood, x: at.x, y: at.y, met: true, ash: { x: b.x, y: b.y, turn: next.turn } });
    }
    if (!born.length) continue;
    if (!e.crawled) { crawls = snuffs.crawls; out = snuffs.out; }
    const me = { ...e, bowls: left, ...(!e.crawled && { crawled: true }) };
    next = { ...next, enemies: [...next.enemies.map((o) => (o === e ? me : o)), ...born] };
  }
  if (!crawls) return next;
  const was = next.line;
  return was && was.turn === next.turn && was.id === out ? { ...next, line: { ...was, also: [...(was.also || []), crawls] } } : say(next, crawls); // after the gutter's line (D-949)
}
