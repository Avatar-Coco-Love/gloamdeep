// § boons: every boon the home waystone can offer (D-583, D-596), one entry each, the
// owner's list and numbers (answers Q-077). Plain data, no rules: the rules are boon.js.
// To add, drop or change a boon, edit its line here; tests check every one.
// `sort` is its kind: 'light' (light and oil), 'hearts' (hearts and fighting), 'finding'
// (finding things) or 'around' (getting around). `words` is its one line on the card.
// Its effects stack with gear (D-596): `burn` multiplies the oil a lit turn burns, `hearts`
// adds to the most hearts (or takes, Reckless: any above the new most go as it is taken), `drop` is the chance a beaten creature drops its part, `reach`
// tiles more light (not the empty ember), `hit` more on every hit, the spear's second too,
// `pour` of a tank a flask pours, `heal` more hearts healed by anything eaten, `rare` the rare
// drop's chance (its part above the usual adds to a charm's, D-599).
// `notice` the tiles short of the lantern's reach a creature must stand to notice by its light (D-600).
// One marked `soon` isn't built yet, so it is never offered; its numbers wait here:
// `stairs` the way down shown, `shows` the part of a room's map shown.

export const BOON_SORTS = { light: 'Light and oil', hearts: 'Hearts and fighting', finding: 'Finding things', around: 'Getting around' };

export const BOONS = {
  slowWick: { id: 'slowWick', kind: 'boon', sort: 'light', name: 'Slow Wick', words: 'The lantern burns a quarter slower.', burn: 0.75 },
  wideGlow: { id: 'wideGlow', kind: 'boon', sort: 'light', name: 'Wide Glow', words: 'The light reaches 1 tile farther.', reach: 1 },
  deepPour: { id: 'deepPour', kind: 'boon', sort: 'light', name: 'Deep Pour', words: 'Each flask pours more oil.', pour: 0.6 },
  hungryFlame: { id: 'hungryFlame', kind: 'boon', sort: 'light', name: 'Hungry Flame', words: 'The light reaches 2 tiles farther, but burns faster.', reach: 2, burn: 1.5 },
  stoutHeart: { id: 'stoutHeart', kind: 'boon', sort: 'hearts', name: 'Stout Heart', words: '2 more hearts, until you are home.', hearts: 2 },
  hardBlow: { id: 'hardBlow', kind: 'boon', sort: 'hearts', name: 'Hard Blow', words: 'Every hit you land does 1 more.', hit: 1 },
  kindHerbs: { id: 'kindHerbs', kind: 'boon', sort: 'hearts', name: 'Kind Herbs', words: 'Whatever heals you heals 1 heart more.', heal: 1 },
  reckless: { id: 'reckless', kind: 'boon', sort: 'hearts', name: 'Reckless', words: 'Every hit does 1 more, but 2 fewer hearts.', hit: 1, hearts: -2 },
  keenEye: { id: 'keenEye', kind: 'boon', sort: 'finding', name: 'Keen Eye', words: 'Creatures drop their part more often.', drop: 0.75 },
  luckyFind: { id: 'luckyFind', kind: 'boon', sort: 'finding', name: 'Lucky Find', words: 'Rare drops come more often.', rare: 0.25 },
  greedyHands: { id: 'greedyHands', kind: 'boon', sort: 'finding', name: 'Greedy Hands', words: 'Creatures always drop their part, but the oil burns faster.', drop: 1, burn: 1.25 },
  softStep: { id: 'softStep', kind: 'boon', sort: 'around', name: 'Soft Step', words: 'Creatures notice you 1 tile later.', notice: 1 },
  waymark: { id: 'waymark', kind: 'boon', sort: 'around', name: 'Waymark', words: 'Each room shows its way down on the map.', stairs: true, soon: true },
  farSight: { id: 'farSight', kind: 'boon', sort: 'around', name: 'Far Sight', words: 'Each room shows more of its map as you enter.', shows: 1 / 3, soon: true },
};
