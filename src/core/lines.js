// § lines: what the text line says, and when (D-094 to D-097). Plain data,
// no drawing. A line is said on a turn and shows for LINE_TURNS turns.
// The words are style study 1's (study lines 462, 482–483, Q-028).

export const LINES = {
  oilLow: { text: 'The flame is getting low.', warn: false },
  oilEmpty: { text: 'The lantern gutters to an ember.', warn: true }, // a warning, in amber (D-097)
  ratHurt: { text: 'The rat squeaks and flees.', warn: false }, // hurt, it flees (D-292; was the study's line, D-107)
  // Hurt, it stands its ground: the lines take turns (D-297, D-301)
  ratStands: { texts: ['The rat stands its ground.', 'The rat squeaks and bares its teeth.', 'The rat squeaks.'], warn: false },
  ratDie: { text: 'The rat squeaks and falls still.', warn: false }, // (D-112)
  ratBite: { text: 'The rat bites you.', warn: false }, // (D-117)
  gloamlingHurt: { text: 'The gloamling hisses at you.', warn: false }, // (D-240)
  gloamlingDie: { text: 'The gloamling hisses and fades.', warn: false }, // (D-240)
  gloamlingBite: { text: 'The gloamling bites you.', warn: false }, // (D-240)
  lampmothDie: { text: 'The lampmoth flutters and falls.', warn: false }, // (D-356)
  lampmothBite: { text: 'The lampmoth bites you.', warn: false }, // (D-356)
  scorpionDie: { text: 'The scorpion curls up and falls still.', warn: false }, // (D-370)
  scorpionBite: { text: 'The scorpion stings you.', warn: false }, // (D-370)
  flaskMimicWakes: { text: 'The flask opens its eyes!', warn: false }, // (D-368)
  flaskMimicHurt: { text: 'The flask mimic cracks.', warn: false }, // (D-369)
  flaskMimicSettles: { text: 'The flask mimic settles down.', warn: false }, // (D-368)
  flaskMimicDie: { text: 'The flask mimic cracks and falls still.', warn: false }, // (D-366)
  flaskMimicBite: { text: 'The flask mimic bites you.', warn: false }, // (D-366)
  fall: { text: 'You fall, and wake again.', warn: false }, // (D-119)
  anew: { text: 'The world begins again.', warn: false }, // a Hardcore fall (D-344)
  torchLit: { text: 'You light the torch.', warn: false }, // (D-124)
  lanternDark: { text: 'Your lantern is dark.', warn: false }, // (D-124)
  stairsDown: { text: 'You go down the stairs.', warn: false }, // (D-135)
  stairsUp: { text: 'You go up the stairs.', warn: false }, // (D-135)
  herbEat: { text: 'You eat the herb and feel better.', warn: false }, // (D-156)
  flaskPour: { text: 'You pour a flask.', warn: false }, // poured by itself (D-249)
  flaskFull: { text: "You can't carry more flasks.", warn: false }, // every stack full, no slot free (D-250, D-333)
  knifeTake: { text: 'You take the knife.', warn: false }, // into the held slot (D-252)
  flaskMake: { text: 'You make an oil flask.', warn: false }, // 3 oilcaps crafted (D-299)
  oilcapFull: { text: "You can't carry more oilcaps.", warn: false }, // every stack full, no slot free (D-250, D-296, D-333)
  heartcapFull: { text: "You can't carry more heartcaps.", warn: false }, // every stack full, no slot free (D-250, D-303, D-333)
  // Lines with `texts` take turns: each saying the next, then back to the first (D-297)
  oilcapTake: { texts: ['You grab the oilcap.', 'You pluck an oilcap from the floor.', 'The oilcap comes up with a soft pop.'], warn: false },
  oilcapLook: { texts: ['Three make an oil flask.', 'It smells faintly of lamp oil.', 'Its amber cap is slick with oil.'], warn: false },
  heartcapTake: { texts: ['You pick a heartcap.', 'The heartcap comes up whole.', 'A heartcap, warm in your hand.'], warn: false }, // (D-303)
  heartcapEat: { texts: ['You eat a heartcap.', 'The heartcap tastes of earth.', 'Warmth spreads through you.'], warn: false }, // eaten from the bag (D-308)
  potionMake: { text: 'You make a healing potion.', warn: false }, // 3 heartcaps crafted (D-309)
  potionFull: { text: "You can't carry more potions.", warn: false }, // every stack full, no slot free (D-309, D-333)
  potionDrink: { texts: ['You drink a healing potion.', 'The potion warms you through.', 'Your wounds close.'], warn: false }, // drunk from the bag (D-309)
  notHurt: { text: "You aren't hurt.", warn: false }, // Eat at full health (D-308)
  heartcapLook: { texts: ['It might mend a wound.', 'Its red cap is spotted white.', 'It feels faintly warm.'], warn: false },
  depositChip: { text: 'You chip at the boulder.', warn: false }, // the first bump (O2)
  depositCrack: { text: 'The boulder cracks.', warn: false }, // the second bump (O2)
  stoneTake: { texts: ['The boulder breaks. You take a stone.', 'The rock splits. A stone comes free.', 'The rock crumbles. You keep a stone.'], warn: false }, // the third (O2)
  stoneLook: { texts: ['A plain stone, for crafting later.', 'It is heavy and grey.', 'Cold and rough in your hand.'], warn: false },
  ratTailTake: { texts: ['You pick up the rat tail.', 'You take the tail. It is still warm.', 'The rat tail goes in your bag.'], warn: false },
  ratTailLook: { texts: ['A rat tail, for crafting later.', 'Long, pink and a little stiff.', 'It smells of the tunnels.'], warn: false },
  ratTailFull: { text: "You can't carry more rat tails.", warn: false },
  mothDustTake: { texts: ['You gather the moth dust.', 'The dust glitters on your fingers.', 'A pinch of moth dust for the bag.'], warn: false }, // (D-475)
  mothDustLook: { texts: ['Moth dust, for crafting later.', 'It glints amber in the light.', 'Fine and pale, like ash.'], warn: false },
  mothDustFull: { text: "You can't carry more moth dust.", warn: false },
  stingerTake: { texts: ['You pick up the stinger.', 'You take the sting, carefully.', 'The stinger goes in your bag.'], warn: false },
  stingerLook: { texts: ['A stinger, for crafting later.', 'The tip is still sharp.', 'Its shell is hard and dry.'], warn: false },
  stingerFull: { text: "You can't carry more stingers.", warn: false },
  mimicGlassTake: { texts: ['You pick up the mimic glass.', 'A shard of the mimic. It is still oily.', 'The mimic glass goes in your bag.'], warn: false },
  mimicGlassLook: { texts: ['Mimic glass, for crafting later.', 'Thick glass, smeared with oil.', 'Its edge is sharp.'], warn: false },
  mimicGlassFull: { text: "You can't carry more mimic glass.", warn: false },
  gloamWispTake: { texts: ['You catch the gloam wisp.', 'The wisp is cold in your hand.', 'The gloam wisp goes in your bag.'], warn: false },
  gloamWispLook: { texts: ['A gloam wisp, for crafting later.', 'It shrinks from your light.', 'A scrap of living shadow.'], warn: false },
  gloamWispFull: { text: "You can't carry more gloam wisps.", warn: false },
  stoneFull: { text: "You can't carry more stones.", warn: false }, // the third bump, every stack full: the boulder holds (O2)
  woodTake: { texts: ['You pick up a stick.', 'A dry branch. You keep it.', 'You gather some wood.'], warn: false }, // (W1, D-314)
  branchCreak: { text: 'The branch creaks.', warn: false }, // the first bump (W2, D-316)
  branchTake: { texts: ['The branch snaps. You take wood.', 'It breaks apart. Wood for the bag.', 'Crack. You gather the wood.'], warn: false }, // the second
  woodFull: { text: "You can't carry more wood.", warn: false }, // the second bump, every stack full: the branch holds
  treeHack: { text: 'You hack at the tree.', warn: false }, // bumps 1 to 3 (W3, D-317)
  treeChips: { text: 'Chips fly from the trunk.', warn: false },
  treeGroan: { text: 'The tree groans.', warn: false },
  treeTake: { texts: ['The tree falls. You take wood.', 'It crashes down. Wood for the bag.', 'Timber! You gather the wood.'], warn: false }, // the fourth
  treeEdge: { texts: ['The forest will not yield.', 'These trees are too old to fell.'], warn: false }, // an edge tree bumped, free (D-321)
  benchMake: { text: 'You make a workbench.', warn: false }, // 3 Wood crafted (WB1, D-320)
  benchFull: { text: 'You already carry a workbench.', warn: false }, // only 1 is carried
  benchLook: { texts: ['A workbench, folded small.', 'Set it down on the surface.', 'Bigger things are made at it.'], warn: false },
  benchSet: { text: 'You set down the workbench.', warn: false }, // a turn (WB2, D-322)
  benchTake: { text: 'You take down the workbench.', warn: false }, // Deconstruct workbench, a turn (WB3, D-323)
  chestMake: { text: 'You make a stash chest.', warn: false }, // its line on the bench panel, a turn (CH1, D-326)
  chestFull: { text: 'You already carry a stash chest.', warn: false }, // only 1 is carried, free
  chestShort: { text: 'You need 3 Wood and 3 Stone.', warn: false }, // too few, free
  chestSet: { text: 'You set down the stash chest.', warn: false }, // a turn (CH2, D-329)
  chestTake: { text: 'You take down the stash chest.', warn: false }, // Deconstruct chest, a turn (CH5)
  chestNotEmpty: { text: 'Empty the chest first.', warn: false }, // Deconstruct chest with anything inside, free (CH5)
  chestLook: { texts: ['A stash chest, empty.', 'Set it down on the surface.', "It keeps what the bag can't."], warn: false },
  bagFull: { text: 'Your bag is full.', warn: false }, // Deconstruct with every slot taken, free; or a stack out of a chest (D-331), or the bag where you fell (D-345)
  bagBack: { text: 'You take back your bag.', warn: false }, // all of the bag where you fell, back in (MO3, D-345)
  stashFull: { text: 'The chest is full.', warn: false }, // a stack that can't all go into the stash chest, free (D-331)
  notSurface: { text: 'Only on the surface.', warn: false }, // Set down under a roof, free
  noRoom: { text: 'There is no room there.', warn: false }, // Set down toward a side it can't go on, free
  woodLook: { texts: ['Three make a workbench.', 'It snaps if you bend it.', 'Good for building.'], warn: false },
  levelUp: { text: 'You feel stronger. Level {n}.', warn: false }, // {n}, the new level (D-246)
  unsaved: { text: 'Your journey could not be saved.', warn: true }, // a save failed: storage full or blocked; once, until one is kept again (D-428)
};
export const LINE_TURNS = 5; // turns a line stays before it fades (D-095)
const OIL_LOW = 0.2; // "under 20%", as in the study

// § say: (state, id, n) → new state, the line said on this turn; n fills a
// line's {n}, as the level does. A line with `texts` says the one after the
// last it said, kept in `state.told` (D-297).
export function say(state, id, n) {
  if (!LINES[id]) return state; // a creature with no line for this says nothing new (D-369)
  if (LINES[id]?.texts) {
    const i = (state.told?.[id] ?? 0) % LINES[id].texts.length;
    return { ...state, line: { id, turn: state.turn, i }, told: { ...state.told, [id]: i + 1 } };
  }
  return { ...state, line: n === undefined ? { id, turn: state.turn } : { id, turn: state.turn, n } };
}

// § shown: the line on screen now, or null once its turns are used up. A line
// with {n} is filled once per saying, so the same saying stays the same object
// and is drawn and spoken once (textline.js, frame.js).
const filled = new WeakMap();
export function shownLine(state) {
  if (!state.line || state.turn - state.line.turn >= LINE_TURNS) return null;
  const entry = LINES[state.line.id];
  if (!entry) return null; // a line that isn't there, as an old save may hold, shows nothing (D-369)
  if (entry.texts) {
    if (!filled.has(state.line)) filled.set(state.line, { text: entry.texts[state.line.i ?? 0], warn: entry.warn });
    return filled.get(state.line);
  }
  if (state.line.n === undefined) return entry;
  if (!filled.has(state.line)) filled.set(state.line, { ...entry, text: entry.text.replace('{n}', state.line.n) });
  return filled.get(state.line);
}

// § oil: a line only as the oil crosses a mark on the way down, so each is
// said once, and again only after the oil has gone back above it (D-096).
export function oilLine(before, after) {
  if (before > 0 && after === 0) return 'oilEmpty';
  if (before >= OIL_LOW && after < OIL_LOW) return 'oilLow';
  return null;
}
