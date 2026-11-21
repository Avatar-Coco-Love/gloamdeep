// § boss bench: the boss test bench (D-948), a dev jump. It puts the hero in the Lampeater's arena's
// way in, on depth 8, so the first step up seals it behind them (D-958), the arena as it begins (the Lampeater whole, the braziers cold), carrying one
// of three rough builds of what a player has by then. `half` starts it at half its hearts (6 of 12) with
// 3 braziers lit, its first phase counted done (D-978), for the second half of the fight. No turn passes and
// nothing is spent; pressed again it starts over, the cutscenes unseen again (`sealSeen`, D-958; `fadeSeen`, D-1014). tools/bossrun.js starts here.
// `below` starts it lower, for the whole way up (D-960): the dev sheet's Boss tab and the playtest's #lampeater link put the
// hero in the room before the hallway, one tile below its way into it, that room's creatures gone, the hallway fresh and the
// arena kept as above, waiting. Plain data, no drawing.
import { get } from './registry.js';
import { fresh, arrive } from './stairs.js';
import { placeFor, withTile } from './room.js';
import { bagAdd } from './bag.js';
import { maxHealth } from './state.js';
import { OIL } from './oil.js';
import { arenaPlace, hallPlace } from './beaten.js';
import { layoutAt } from './region.js';
import { ARENA_DEPTH } from './arena.js';

// § builds: hearts come from Growth's Heart, so health is 5 and one more for each (D-811)
export const BUILDS = {
  lean: { name: 'Lean', held: 'knife', armour: null, grown: {}, bag: { flask: 1 } },
  middling: { name: 'Middling', held: 'spear', armour: 'ratVest', grown: { steadyWick: 1, heart: 2 }, bag: { flask: 3, mendingDraught: 1 } },
  strong: { name: 'Strong', held: 'wardenFist', armour: 'shellVest', grown: { steadyWick: 1, heart: 5, quickHands: 1, tough: 1 }, bag: { flask: 5, mendingDraught: 2, wardDraught: 1 } },
};
// At half: the braziers left cold, the one at its bottom right (the seal hall's corners, arena.js)
const HALF_COLD = { x: 10, y: 11 };

// The arena's place id for this seed (beaten.js)
export { arenaPlace };

// § bench: (state, build id, half, below) → the state in a fresh arena with that build, or below its hallway
export function bench(state, id = 'middling', half = false, below = false) {
  const b = BUILDS[id], place = arenaPlace(state.seed);
  const away = { ...state, elsewhere: { ...state.elsewhere } };
  delete away.elsewhere[place]; // the arena begins again, as if never seen
  let there = fresh(place, state.seed);
  if (half) {
    let room = there.room;
    for (const t of room.map.flatMap((row, y) => [...row].map((ch, x) => ({ ch, x, y })))) {
      if (t.ch === get('brazier').letter && (t.x !== HALF_COLD.x || t.y !== HALF_COLD.y)) room = withTile(room, t.x, t.y, get('brazierLit'));
    }
    there = { ...there, room, enemies: there.enemies.map((e) => (e.id === 'lampeater' ? { ...e, health: get('lampeater').health / 2, phase: 1 } : e)) };
  }
  if (state.place === place) away.place = 'bench'; // standing in it already: left as if from elsewhere
  const bag = Object.entries(b.bag).reduce((acc, [item, n]) => { for (let k = 0; k < n; k++) acc = bagAdd(acc, item); return acc; }, []);
  const kit = { ...away, sealSeen: false, fadeSeen: false, held: b.held, tool: null, worn: b.armour ? { armour: [b.armour] } : {}, grown: { ...b.grown }, bag, oil: OIL.start, lit: true, boon: null, poisoned: null, ward: null, glow: null, shade: null, spitproof: null };
  let out;
  if (below) {
    // The room before the hallway, straight below it, and the tile just inside its way up into it (region.js, D-940)
    const cells = layoutAt(state.seed, ARENA_DEPTH).cells, hall = cells.find((c) => c.hall), gap = hall.doors.find((d) => d.dir === 'down');
    const low = cells.find((c) => c.x === hall.x && c.y === hall.y + 1).id;
    for (const p of [hallPlace(state.seed), low]) { delete kit.elsewhere[p]; if (state.place === p) kit.place = 'bench'; } // fresh, as if never seen
    kit.elsewhere = { ...kit.elsewhere, [place]: there }; // the arena waits, as made above
    out = arrive(kit, low, { ...fresh(low, state.seed), enemies: [] }, { x: gap.at, y: 1 });
  } else {
    const start = placeFor(place, state.seed).start, door = { x: start.x, y: start.y + 1 }; // the way in, just below the start (arena.js)
    out = arrive(kit, place, there, door);
  }
  const { elsewhere } = out;
  delete elsewhere.bench; // standing in one already: left as if from nowhere kept
  return { ...out, elsewhere, health: maxHealth(out) };
}
