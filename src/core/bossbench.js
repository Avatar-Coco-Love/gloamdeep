// § boss bench: the boss test bench (D-948), a dev jump. It puts the hero just inside the Lampeater's
// arena on depth 8, the arena as it begins (the Lampeater whole, the braziers cold), carrying one
// of three rough builds of what a player has by then. `half` starts it at half its hearts (6 of 12) with
// 3 braziers lit, owing its first snuff, for the second half of the fight. No turn passes and
// nothing is spent; pressed again it starts over. The dev sheet's Boss tab, the playtest's
// #lampeater link and tools/bossrun.js all start here. Plain data, no drawing.
import { get } from './registry.js';
import { fresh, arrive } from './stairs.js';
import { placeFor, withTile } from './room.js';
import { bagAdd } from './bag.js';
import { maxHealth } from './state.js';
import { OIL } from './oil.js';
import { arenaPlace } from './beaten.js';

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

// § bench: (state, build id, half) → the state in a fresh arena with that build
export function bench(state, id = 'middling', half = false) {
  const b = BUILDS[id], place = arenaPlace(state.seed);
  const away = { ...state, elsewhere: { ...state.elsewhere } };
  delete away.elsewhere[place]; // the arena begins again, as if never seen
  let there = fresh(place, state.seed);
  if (half) {
    let room = there.room;
    for (const t of room.map.flatMap((row, y) => [...row].map((ch, x) => ({ ch, x, y })))) {
      if (t.ch === get('brazier').letter && (t.x !== HALF_COLD.x || t.y !== HALF_COLD.y)) room = withTile(room, t.x, t.y, get('brazierLit'));
    }
    there = { ...there, room, enemies: there.enemies.map((e) => (e.id === 'lampeater' ? { ...e, health: get('lampeater').health / 2 } : e)) };
  }
  if (state.place === place) away.place = 'bench'; // standing in it already: left as if from elsewhere
  const bag = Object.entries(b.bag).reduce((acc, [item, n]) => { for (let k = 0; k < n; k++) acc = bagAdd(acc, item); return acc; }, []);
  const kit = { ...away, held: b.held, tool: null, worn: b.armour ? { armour: [b.armour] } : {}, grown: { ...b.grown }, bag, oil: OIL.start, lit: true, boon: null, poisoned: null, ward: null, glow: null, shade: null, spitproof: null };
  const out = arrive(kit, place, there, placeFor(place, state.seed).start);
  const { elsewhere } = out;
  if (away.place === 'bench') delete elsewhere.bench;
  return { ...out, elsewhere, health: maxHealth(out) };
}
