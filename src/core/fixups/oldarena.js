// § oldarena (D-941): a save from 0.3.382 may have made the arena already, standing empty, before
// the Lampeater came. Once, as the save is brought up to date (save.js): an arena made and kept gets
// the Lampeater on its tile below the sealed door, unless the hero stands there. Nothing else of
// the room moves; its braziers and door stay as they were. Plain data, no drawing.
import { layoutAt } from '../region.js';
import { ARENA_DEPTH, LAMPEATER_AT } from '../arena.js';

export function withLampeater(s) {
  const id = layoutAt(s.seed, ARENA_DEPTH).cells.find((c) => c.arena)?.id, here = s.place === id, p = here ? s : s.elsewhere?.[id];
  if (!p?.room || (p.enemies || []).some((e) => e.id === 'lampeater')) return s;
  if (here && s.hero.x === LAMPEATER_AT.x && s.hero.y === LAMPEATER_AT.y) return s; // not onto the hero
  const out = { ...p, enemies: [...(p.enemies || []), { id: 'lampeater', ...LAMPEATER_AT }] };
  return here ? { ...s, ...out } : { ...s, elsewhere: { ...s.elsewhere, [id]: out } };
}
