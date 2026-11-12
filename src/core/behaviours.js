// § behaviours: the ways a creature can act, keyed by id (D-263, D-269).
// A creature's entry in enemies.js names its ways in `ways`, and a new
// creature mixes them by name. Each way is plain data that the turn rules
// in creatureturn.js read through `traits`; a later way in the list wins.
export const BEHAVIOURS = {
  // It comes for the hero a tile a turn once it notices them (D-126 to D-129):
  // from a lit tile along a clear line (D-226), or on a bite or a hit (D-157).
  chases: { id: 'chases', name: 'Chases', notices: 'inLight', moves: 'toward' },
  // It never steps onto a lit tile, backs out of light into the dark, and doesn't
  // bite while lit. It sees the hero along a clear line, lit or not (D-240, D-241, D-243).
  shunsLight: { id: 'shunsLight', name: 'Shuns light', notices: 'anyLine', intoLight: false, bitesLit: false, whenLit: 'backAway' },
  // Once hurt, a coin toss: 1 in 2 it steps a tile a turn away from the hero for
  // 4 turns, biting only when it can't step away (D-292), then stops and has to
  // notice them again; else it stands its ground and keeps coming (D-301).
  fleesHurt: { id: 'fleesHurt', name: 'Flees when hurt', whenHurt: 'flee', fleeChance: 0.5, fleeTurns: 4 },
  // It walks a tile a turn toward the nearest light, never needing to notice:
  // the hero while the lantern is lit, else the nearest lit torch; with none it
  // stays (D-351, D-356).
  seeksLight: { id: 'seeksLight', name: 'Seeks light', moves: 'toLight' },
  // It never bites. When the hero comes within `near` steps it drifts a tile a turn away from
  // them, to the tile nearest the nearest other creature in the room, or just the farthest
  // from the hero with none; lit or not, it needs no noticing (D-649).
  lures: { id: 'lures', name: 'Lures', moves: 'lure', near: 3, bites: false },
  // It never bites. When the hero comes within `near` steps it hops a tile a turn away from them,
  // `alone`: to the free tile farthest from them, never toward another creature; lit or not, it
  // needs no noticing. The lure wisp's way without the lure (D-784)
  shy: { id: 'shy', name: 'Shy', moves: 'lure', near: 3, bites: false, alone: true },
  // It never moves or bites. Seeing the lit lantern along a clear row or column, up to `range`
  // tiles, it spits a glob that flies a tile a turn down that line, then rests `rest` turns
  // (spit.js, D-659, D-688).
  spits: { id: 'spits', name: 'Spits', bites: false, spits: { range: 5, rest: 2 } },
  // It notices as one that chases does, then digs down where it stands instead of stepping, and
  // comes a tile a turn under the floor, a mound of earth that can't be hit or bitten by; beside
  // the hero it comes up, biting only on the turn after, then chases on foot (creatureturn.js, D-726).
  burrows: { id: 'burrows', name: 'Burrows', notices: 'inLight', moves: 'toward', burrows: true },
  // One of a pack (its `pack` mark, pack.js): once one notices the hero, the whole pack does; each
  // heads for its own free side of the hero, away from its packmates first; hurt with 2 or more of
  // its pack left, it stands its ground. Alone, it acts as its other ways say (creatureturn.js, D-727).
  pack: { id: 'pack', name: 'Pack', pack: true },
  // It waits where it stands, lit or not, until the hero comes within `near` steps along a clear line
  // (or bites or hits it); then it comes as one that chases does, and keeps coming (D-797).
  lurks: { id: 'lurks', name: 'Lurks', notices: 'near', near: 3, moves: 'toward' },
  // It notices and comes as one that chases does, but never bites beside the hero: with them in its
  // row or column within `reach` tiles it raises its tail for a turn, then strikes those tiles, and
  // rests `rest` turns (sting.js, D-729).
  strikes: { id: 'strikes', name: 'Tail strike', notices: 'inLight', moves: 'toward', bites: false, strikes: { reach: 2, rest: 1 } },
};

// § traits: (entry) → how the creature acts, its ways merged. With no way it
// never notices or moves, steps into light, bites lit or not, and never flees.
const BASE = { notices: null, moves: null, intoLight: true, bitesLit: true, whenLit: null, whenHurt: null };
export function traits(entry) {
  return Object.assign({ ...BASE }, ...(entry.ways ?? []).map((w) => {
    const { id, name, ...way } = BEHAVIOURS[w];
    return way;
  }));
}
