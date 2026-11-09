// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
// Taken, a kind with `regrow` lies there again that many turns later, out of
// sight (regrow.js): a day for mushrooms and herbs, three for a flask (D-306).
import { DAY_TURNS } from './daytime.js';
// How far a mushroom's tone may shift (D-305, the owner's pick of three)
export const MUSHROOM_TONE = { hue: 12, light: 7 };
// How far a flower's petals may shift (D-763), a little more than a mushroom's
export const FLOWER_TONE = { hue: 16, light: 6 };
export const ITEMS = {
  // Walking onto it puts it in the bag; poured from there into the lantern,
  // never above full (D-078, D-247). With every flask stack full and no slot free
  // it stays, with its `full` line (D-250, D-333).
  flask: { id: 'flask', kind: 'item', name: 'Oil flask', oil: 0.45, bag: true, max: 5, full: 'flaskFull', regrow: 3 * DAY_TURNS },
  // Walking onto it heals 2 hearts, never above full; at full health it is
  // left on the floor for later (D-155, D-156).
  // The first weapon (D-252): walking onto it puts it in the hero's hand, in the
  // held slot apart from the bag, with its line. Held, it hits for `hit` in
  // place of the lantern's 1. It lies only in depth 2's first room, and not
  // while the hero has one (cave.js, stairs.js). Found with a weapon held, it
  // goes into the bag with its `bagged` line, 1 a slot; Hold there swaps it into
  // the hand with its `holds` line (D-479).
  knife: { id: 'knife', kind: 'item', name: 'Knife', hit: 2, hold: true, says: 'knifeTake', bagged: 'knifeBag', holds: 'knifeHold', away: 'knifeAway' },
  // The second weapon (D-479): it hits a creature for `hit` and the one awake
  // behind it, in a line, for `through`. It lies only in depth 3's first room.
  spear: { id: 'spear', kind: 'item', name: 'Spear', hit: 2, through: 1, hold: true, says: 'spearTake', bagged: 'spearBag', holds: 'spearHold', away: 'spearAway' },
  // Walking onto a herb hurt eats it on the spot (`eatHurt`); at full health it goes
  // into the bag, 5 a stack, and Eat there heals the same (D-511, supersedes D-156). One grows
  // in each woods room outside too, the same herb (woodsherb.js, D-762).
  herb: { id: 'herb', kind: 'item', name: 'Healing herb', heal: 2, eats: 'herbEat', eatHurt: true, bag: true, max: 5, regrow: DAY_TURNS },
  // The first resource (D-296): an amber mushroom, one in every generated room.
  // Walking onto it puts it in the bag with one of its `says` lines, in turn;
  // choosing its slot in the bag says one of its `look` lines (D-297). Make,
  // in the bag, turns `of` of them into one `into`, with its `says` line (D-299).
  // Each one a room lays out shifts its cap's colour by up to `tone`: degrees of
  // hue and points of lightness, either way (tones.js, D-305).
  oilcap: { id: 'oilcap', kind: 'item', name: 'Oilcap', bag: true, max: 20, says: 'oilcapTake', look: 'oilcapLook', full: 'oilcapFull', tone: MUSHROOM_TONE, regrow: DAY_TURNS,
    craft: { into: 'flask', of: 3, says: 'flaskMake' } },
  // A bright red mushroom in about half the rooms (D-303), into the bag the
  // oilcap's way, with its own lines and its own tones. Eat, in the bag, heals
  // `heal` hearts with its `eats` line, never above full (D-308). Make turns
  // 3 into a healing potion (D-309).
  heartcap: { id: 'heartcap', kind: 'item', name: 'Heartcap', bag: true, max: 20, says: 'heartcapTake', look: 'heartcapLook', full: 'heartcapFull', tone: MUSHROOM_TONE, regrow: DAY_TURNS,
    heal: 1, eats: 'heartcapEat', craft: { into: 'potion', of: 3, says: 'potionMake' } },
  // Made from heartcaps, never found (D-309). Drunk from the bag the heartcap's
  // way, its button saying `verb`, it heals 4 hearts, never above full.
  potion: { id: 'potion', kind: 'item', name: 'Healing potion', bag: true, max: 5, full: 'potionFull', heal: 4, eats: 'potionDrink', verb: 'DRINK' },
  // A plain stone from a broken deposit (D-311, O2), for crafts; loose ones lie in the
  // mountain rooms, 2 a room, picked up with one of its `says` lines and growing back after a day
  // (loosestone.js, D-761). Into the bag in stacks of 20 (D-333); choosing it says one of its `look` lines.
  stone: { id: 'stone', kind: 'item', name: 'Stone', bag: true, max: 20, says: 'looseStoneTake', look: 'stoneLook', full: 'stoneFull', regrow: DAY_TURNS },
  // The first flower (D-763, Q-092): a violet duskstar, 2 in each woods room (duskstar.js), each in
  // its own tone and facing its own way. Walking onto it puts it in the bag, for crafts later. Picked,
  // it `roam`s: a day later it grows again on another free grass tile of the room (regrow.js, D-530).
  duskstar: { id: 'duskstar', kind: 'item', name: 'Duskstar', bag: true, max: 20, says: 'duskstarTake', look: 'duskstarLook', full: 'duskstarFull', tone: FLOWER_TONE, regrow: DAY_TURNS, roam: true },
  // The first creature material (D-453, D-454): a beaten rat leaves one where it fell,
  // about 1 time in 2 (turn.js). Into the bag in stacks of 20 with its lines in turn
  // (D-333); with every stack full it stays, with its `full` line. It never grows back.
  ratTail: { id: 'ratTail', kind: 'item', name: 'Rat Tail', bag: true, max: 20, says: 'ratTailTake', look: 'ratTailLook', full: 'ratTailFull', sells: 1 },
  // The other four common materials (D-454), taken and kept the Rat Tail's way (D-475):
  // a lampmoth's Moth Dust, a scorpion's Stinger, a flask mimic's Mimic Glass and a
  // gloamling's Gloam Wisp. Make on Mimic Glass turns 1 with 2 oilcaps into a flask (D-477);
  // Make on Moth Dust turns 1 with 1 Wood into a torch (D-478).
  mothDust: { id: 'mothDust', kind: 'item', name: 'Moth Dust', bag: true, max: 20, says: 'mothDustTake', look: 'mothDustLook', full: 'mothDustFull', sells: 1,
    craft: { into: 'bagTorch', of: { mothDust: 1, wood: 1 }, says: 'torchMake' } },
  stinger: { id: 'stinger', kind: 'item', name: 'Stinger', bag: true, max: 20, says: 'stingerTake', look: 'stingerLook', full: 'stingerFull', sells: 1 },
  mimicGlass: { id: 'mimicGlass', kind: 'item', name: 'Mimic Glass', bag: true, max: 20, says: 'mimicGlassTake', look: 'mimicGlassLook', full: 'mimicGlassFull', sells: 1,
    craft: { into: 'flask', of: { mimicGlass: 1, oilcap: 2 }, says: 'glassFlaskMake' } },
  gloamWisp: { id: 'gloamWisp', kind: 'item', name: 'Gloam Wisp', bag: true, max: 20, says: 'gloamWispTake', look: 'gloamWispLook', full: 'gloamWispFull', sells: 1 },
  // A cave spider's Spider Silk, taken and kept the same way (D-535).
  spiderSilk: { id: 'spiderSilk', kind: 'item', name: 'Spider Silk', bag: true, max: 20, says: 'spiderSilkTake', look: 'spiderSilkLook', full: 'spiderSilkFull', sells: 1 },
  // A bat's Bat Wing, taken and kept the same way (D-537).
  batWing: { id: 'batWing', kind: 'item', name: 'Bat Wing', bag: true, max: 20, says: 'batWingTake', look: 'batWingLook', full: 'batWingFull', sells: 1 },
  // A mole's Mole Fur, taken and kept the same way (D-541).
  moleFur: { id: 'moleFur', kind: 'item', name: 'Mole Fur', bag: true, max: 20, says: 'moleFurTake', look: 'moleFurLook', full: 'moleFurFull', sells: 1 },
  // A snapcap's Snapcap Gill, taken and kept the same way (D-543).
  snapcapGill: { id: 'snapcapGill', kind: 'item', name: 'Snapcap Gill', bag: true, max: 20, says: 'snapcapGillTake', look: 'snapcapGillLook', full: 'snapcapGillFull', sells: 1,
    craft: { into: 'antidote', of: { snapcapGill: 1, herb: 1 }, says: 'antidoteMake' } }, // with a herb, the Antidote (D-655)
  // A herb mimic's Mimic Leaf, taken and kept the same way (D-549).
  mimicLeaf: { id: 'mimicLeaf', kind: 'item', name: 'Mimic Leaf', bag: true, max: 20, says: 'mimicLeafTake', look: 'mimicLeafLook', full: 'mimicLeafFull', sells: 1 },
  // A bone rat's Rat Bone, taken and kept the same way (D-551).
  ratBone: { id: 'ratBone', kind: 'item', name: 'Rat Bone', bag: true, max: 20, says: 'ratBoneTake', look: 'ratBoneLook', full: 'ratBoneFull', sells: 1 },
  // An oil tick's Tick Shell, taken and kept the same way (D-606).
  tickShell: { id: 'tickShell', kind: 'item', name: 'Tick Shell', bag: true, max: 20, says: 'tickShellTake', look: 'tickShellLook', full: 'tickShellFull', sells: 1 },
  // The Lure Wisp's drop (D-649): a sliver of cold glass, for crafting later, sold for 2
  wispGlass: { id: 'wispGlass', kind: 'item', name: 'Wisp Glass', bag: true, max: 20, says: 'wispGlassTake', look: 'wispGlassLook', full: 'wispGlassFull', sells: 2 },
  // A centipede's Centipede Leg (D-654), about 1 in 2, taken and kept the same way, sold for 1;
  // a part for the charm against poison later (D-652).
  centipedeLeg: { id: 'centipedeLeg', kind: 'item', name: 'Centipede Leg', bag: true, max: 20, says: 'centipedeLegTake', look: 'centipedeLegLook', full: 'centipedeLegFull', sells: 1 },
  // A Spit grub's Grub Skin (D-688), about 1 in 2, taken and kept the same way, sold for 1.
  grubSkin: { id: 'grubSkin', kind: 'item', name: 'Grub Skin', bag: true, max: 20, says: 'grubSkinTake', look: 'grubSkinLook', full: 'grubSkinFull', sells: 1 },
  // Bat Guano, a find of its own (D-539, D-540): a pile beside each bat as a room is made
  // (guano.js), taken and kept the same way, sold for 1, growing back after a day. Kept
  // for the garden (step 14) and crafts later.
  batGuano: { id: 'batGuano', kind: 'item', name: 'Bat Guano', bag: true, max: 20, says: 'batGuanoTake', look: 'batGuanoLook', full: 'batGuanoFull', sells: 1, regrow: DAY_TURNS },
  // Each find `sells` to the peddler at its own price: 1 trade coin for most common materials (Wisp Glass 2, D-649), 5 for a rare one (step 13a, D-494, D-674).
  // The three rare materials (D-454), from creatures of depth 3 down, about 1 in 10,
  // taken and kept the same way (D-476): a scorpion's Venom Sac, a flask mimic's Mimic
  // Heart and a gloamling's Gloam Eye.
  venomSac: { id: 'venomSac', kind: 'item', name: 'Venom Sac', bag: true, max: 20, says: 'venomSacTake', look: 'venomSacLook', full: 'venomSacFull', sells: 5 },
  mimicHeart: { id: 'mimicHeart', kind: 'item', name: 'Mimic Heart', bag: true, max: 20, says: 'mimicHeartTake', look: 'mimicHeartLook', full: 'mimicHeartFull', sells: 5 },
  gloamEye: { id: 'gloamEye', kind: 'item', name: 'Gloam Eye', bag: true, max: 20, says: 'gloamEyeTake', look: 'gloamEyeLook', full: 'gloamEyeFull', sells: 5 },
  // A bat's rare Bat Fang, from depth 3 down, taken and kept the same way (D-537).
  batFang: { id: 'batFang', kind: 'item', name: 'Bat Fang', bag: true, max: 20, says: 'batFangTake', look: 'batFangLook', full: 'batFangFull', sells: 5 },
  // A mole's rare Mole Claw, from depth 5 down, taken and kept the same way (D-541).
  moleClaw: { id: 'moleClaw', kind: 'item', name: 'Mole Claw', bag: true, max: 20, says: 'moleClawTake', look: 'moleClawLook', full: 'moleClawFull', sells: 5 },
  // An oil tick's rare Oil Bladder, from depth 3 down, taken and kept the same way (D-606).
  oilBladder: { id: 'oilBladder', kind: 'item', name: 'Oil Bladder', bag: true, max: 20, says: 'oilBladderTake', look: 'oilBladderLook', full: 'oilBladderFull', sells: 5 },
  // A Spit grub's rare Glow Gland, from depth 4 down, taken and kept the same way (D-688).
  glowGland: { id: 'glowGland', kind: 'item', name: 'Glow Gland', bag: true, max: 20, says: 'glowGlandTake', look: 'glowGlandLook', full: 'glowGlandFull', sells: 5 },
  // Picked from a gloamberry bush in the woods, 2 a bump (step 13b, D-531), into the bag the
  // oilcap's way in stacks of 20. Eaten from the bag the heartcap's way: 1 heart, a turn.
  // Make turns 3 into a Gloamberry Seed, the heartcap's way (garden step 1, D-564).
  // Its recipe at the bench comes at a later step.
  gloamberry: { id: 'gloamberry', kind: 'item', name: 'Gloamberry', bag: true, max: 20, look: 'gloamberryLook', full: 'gloamberryFull',
    heal: 1, eats: 'gloamberryEat', craft: { into: 'gloamberrySeed', of: 3, says: 'gloamberrySeedMake' } },
  // Made from 3 Gloamberries in the bag, never found (garden step 1, D-564), in stacks of
  // 20; choosing it says one of its `look` lines. Planted in a garden bed at a later step (D-565).
  gloamberrySeed: { id: 'gloamberrySeed', kind: 'item', name: 'Gloamberry Seed', bag: true, max: 20, look: 'gloamberrySeedLook', full: 'gloamberrySeedFull' },
  // The first wood (W1, D-314): sticks lying in the woods, 3 a room, into the
  // bag the oilcap's way in stacks of 20 (D-333), with lines in turn. Each one lies in
  // one of `forms` looks (a straight stick, a forked twig, a crooked branch);
  // the bag shows the last one picked. With no room it stays, no line.
  // Make turns 3 into a workbench (WB1, D-320).
  wood: { id: 'wood', kind: 'item', name: 'Wood', bag: true, max: 20, says: 'woodTake', look: 'woodLook', forms: 3, regrow: DAY_TURNS,
    craft: { into: 'workbench', of: 3, says: 'benchMake' } },
  // Made from 3 Wood in the bag, never found (WB1, D-320). Only `max` 1 is carried;
  // choosing it says one of its `look` lines. Set down, it `sets` the bench tile on
  // the side picked, on the surface, with its line (WB2, D-322; bagturn.js).
  workbench: { id: 'workbench', kind: 'item', name: 'Workbench', bag: true, max: 1, look: 'benchLook', full: 'benchFull',
    sets: { tile: 'bench', says: 'benchSet' } },
  // Made at the workbench, its line on the bench panel, never found (CH1, D-324, D-326):
  // `bench.of` is its cost, taken from the bag, with its `says` line; with too few, its
  // `short` line. Only `max` 1 is carried; choosing it says one of its `look` lines.
  chest: { id: 'chest', kind: 'item', name: 'Stash chest', bag: true, max: 1, look: 'chestLook', full: 'chestFull',
    bench: { of: { wood: 3, stone: 3 }, says: 'chestMake', short: 'chestShort' },
    sets: { tile: 'stash', says: 'chestSet' } }, // set down the bench's way (CH2, D-329)
  // The first pick, made at the workbench as the chest is, never found (D-480). Only `max` 1
  // is carried. A `tool`: Hold, in the bag, puts it in the Tool slot, a turn, and only there does
  // a copper vein break (D-552, which supersedes D-480's "never held"). Made with that slot
  // empty, it goes straight into it.
  pick: { id: 'pick', kind: 'item', name: 'Stone Pick', bag: true, max: 1, tool: true, holds: 'pickHold', away: 'pickAway', look: 'pickLook', full: 'pickFull',
    bench: { of: { wood: 2, stone: 3 }, says: 'pickMake', short: 'pickShort' } },
  // The first rod, fishing's first step (D-609): made at the workbench as the pick is, never
  // found. A `tool` like the pick, held in the Tool slot, swapped with the pick there. Held,
  // bumping water fishes it: the home pond and the cave pools (fishing.js, D-610, D-618).
  rod: { id: 'rod', kind: 'item', name: 'Wooden Rod', bag: true, max: 1, tool: true, holds: 'rodHold', away: 'rodAway', look: 'rodLook', full: 'rodFull',
    bench: { of: { wood: 2, spiderSilk: 2 }, says: 'rodMake', short: 'rodShort' } },
  // The first fish (D-608, D-610): caught at the home pond with the rod, never found, into the bag
  // in stacks of 20; its uses come one a step. Poured from the bag, a turn, it gives the lantern
  // `oil`, the flask's way (D-611); `byHand`: never by the quick slot or by itself, never more with
  // Deep Pour, and not counted in Flasks poured. A fish's `caught` and `slips` lines are said as it
  // lands or, with no room, slips back; its `zone`, the strike meter's, a quarter when unset.
  pondMinnow: { id: 'pondMinnow', kind: 'item', name: 'Pond Minnow', bag: true, max: 20, oil: 0.15, byHand: true, heal: 1, eats: 'minnowEat', look: 'pondMinnowLook', full: 'pondMinnowFull', sells: 1, caught: 'fishCatch', slips: 'fishSlip' },
  // The cave pools' fish (D-618), the minnow's way, a little better: 20% oil, 1 heart, 2 coins,
  // its strike zone a fifth of the bar.
  blindCavefish: { id: 'blindCavefish', kind: 'item', name: 'Blind Cavefish', bag: true, max: 20, oil: 0.2, byHand: true, heal: 1, eats: 'cavefishEat', look: 'blindCavefishLook', full: 'blindCavefishFull', sells: 2, zone: 1 / 5, caught: 'cavefishCatch', slips: 'cavefishSlip' },
  // The first ore, from a copper vein (D-480), into the bag the stone's way, in stacks of 20.
  copperOre: { id: 'copperOre', kind: 'item', name: 'Copper Ore', bag: true, max: 20, look: 'copperOreLook', full: 'copperOreFull' },
  // The first lantern part (D-483): made at the workbench, never found. Fit, in the bag, puts it
  // in the lantern's `part.slot`, free, with its `fits` line; fitted, a lit turn burns `part.burn`,
  // so a full tank lasts 75 turns, not 60. Oil alone still sets the reach (D-014).
  copperWick: { id: 'copperWick', kind: 'item', name: 'Copper Wick', bag: true, max: 1, look: 'copperWickLook', full: 'copperWickFull',
    bench: { of: { copperOre: 3, wood: 1 }, says: 'wickMake', short: 'wickShort' }, part: { slot: 'wick', burn: 1 / 75 }, fits: 'wickFit' },
  // The first armour piece (D-484), leatherwork: made at the workbench, never found. Wear, in the
  // bag, puts it on, free, in the hero's `wear.slot`, with its `wears` line; worn, each bite has a
  // `wear.glance` chance to glance off and hurt nothing (creatureturn.js).
  ratVest: { id: 'ratVest', kind: 'item', name: 'Rat Hide Vest', bag: true, max: 1, look: 'ratVestLook', full: 'ratVestFull',
    bench: { of: { ratTail: 4, wood: 1 }, says: 'vestMake', short: 'vestShort' }, wear: { slot: 'armour', glance: 0.25 }, wears: 'vestWear' },
  // The first charm (D-486): made at the workbench, never found. Wear, in the bag, puts it on,
  // free, in the `charm` slot; worn, a beaten creature leaves its rare material about `wear.rare`
  // of the time, not 1 in 10 (turn.js).
  wispCharm: { id: 'wispCharm', kind: 'item', name: 'Wisp Charm', bag: true, max: 1, look: 'wispCharmLook', full: 'wispCharmFull',
    bench: { of: { gloamWisp: 3, copperOre: 1 }, says: 'charmMake', short: 'charmShort' }, wear: { slot: 'charm', rare: 0.2 }, wears: 'charmWear' },
  // The second charm (D-487): made at the workbench, never found, worn in the second charm slot
  // or beside the Wisp Charm; worn, a lit turn burns `wear.burn` of its oil, so a full tank
  // lasts 70 turns, not 60, or about 87 with the Copper Wick (parts.js).
  heartCharm: { id: 'heartCharm', kind: 'item', name: 'Heart Charm', bag: true, max: 1, look: 'heartCharmLook', full: 'heartCharmFull',
    bench: { of: { mimicHeart: 1, copperOre: 1 }, says: 'heartMake', short: 'heartShort' }, wear: { slot: 'charm', burn: 6 / 7 }, wears: 'heartWear' },
  // The charm against poison (D-656): made at the workbench, its 12th slot, never found; worn,
  // poisoned lasts `wear.poison` turns, not 6, so it takes 1 heart, not 2 (poison.js).
  centipedeCharm: { id: 'centipedeCharm', kind: 'item', name: 'Centipede Charm', bag: true, max: 1, look: 'centipedeCharmLook', full: 'centipedeCharmFull',
    bench: { of: { centipedeLeg: 3, copperOre: 1 }, says: 'centipedeCharmMake', short: 'centipedeCharmShort' }, wear: { slot: 'charm', poison: 3 }, wears: 'centipedeCharmWear' },
  // The first home piece (D-488): made at the workbench, never found, set down on the surface
  // the chest's way as the bed tile, where sleeping at night rests the hero (sleep.js).
  bed: { id: 'bed', kind: 'item', name: 'Bed', bag: true, max: 1, look: 'bedLook', full: 'bedFull',
    bench: { of: { wood: 4, ratTail: 2 }, says: 'bedMake', short: 'bedShort' }, sets: { tile: 'bedstead', says: 'bedSet' } },
  // The place to plant (garden step 2, D-565): made at the workbench, never found, set down on the
  // surface the bed's way as the garden bed tile, holding one plant at a later step.
  gardenBed: { id: 'gardenBed', kind: 'item', name: 'Garden Bed', bag: true, max: 1, look: 'gardenBedLook', full: 'gardenBedFull',
    bench: { of: { wood: 3, stone: 2 }, says: 'gardenBedMake', short: 'gardenBedShort' }, sets: { tile: 'plot', says: 'gardenBedSet' } },
  // The relic shelf (step 20, D-689, D-690): made at the workbench, never found, set down on the
  // surface the bed's way as the shelf tile, empty; relics are set on it at later steps.
  shelf: { id: 'shelf', kind: 'item', name: 'Shelf', bag: true, max: 1, look: 'shelfLook', full: 'shelfFull',
    bench: { of: { wood: 4, stone: 2 }, says: 'shelfMake', short: 'shelfShort' }, sets: { tile: 'relicShelf', says: 'shelfSet' } },
  // The bag upgrades (D-545, D-547): made at the workbench, never found, never in the bag.
  // Made, the bag `grows` from 6 slots to 9 (the Pouch), then 9 to 12 (the Big Bag), for good.
  pouch: { id: 'pouch', kind: 'item', name: 'Pouch', max: 1, look: 'pouchLook', full: 'pouchFull',
    bench: { of: { ratTail: 4, spiderSilk: 2 }, says: 'pouchMake', short: 'pouchShort' }, grows: { from: 6, to: 9 } },
  bigBag: { id: 'bigBag', kind: 'item', name: 'Big Bag', max: 1, look: 'bigBagLook', full: 'bigBagFull',
    bench: { of: { moleFur: 4, spiderSilk: 3 }, says: 'bigBagMake', short: 'bigBagShort' }, grows: { from: 9, to: 12 } },
  // Made from Moth Dust and Wood in the bag, never found (D-478), in stacks of 5. Set down
  // anywhere, the bench's way, it `sets` the torch's stone foot with a lit torch on it that
  // `burns` that many turns, then goes out and leaves bare floor (endturn.js).
  bagTorch: { id: 'bagTorch', kind: 'item', name: 'Torch', bag: true, max: 5, look: 'bagTorchLook', full: 'bagTorchFull',
    sets: { tile: 'torchStand', says: 'torchSet', anywhere: true, light: 'torch', burns: 100 } },
  // Normal's fall leaves the bag where the hero fell, `holds` its stacks (MO3, D-334, D-345).
  // Walking onto it puts back what fits, with its `says` line; the rest stays in it,
  // with its `full` line. Each fall leaves its own. It never grows back.
  lostbag: { id: 'lostbag', kind: 'item', name: 'Your bag', fetch: true, says: 'bagBack', full: 'bagFull' },
  // Antidote: a tall green vial made in the bag from 1 Snapcap Gill and 1 herb; Drink ends
  // poisoned, healing nothing, and only while poisoned (D-652, D-655). Made, never found.
  antidote: { id: 'antidote', kind: 'item', name: 'Antidote', bag: true, max: 5, full: 'antidoteFull', cures: true, eats: 'antidoteDrink', verb: 'DRINK' },
  // Lightkeeper's Locket (D-691): biome 1's first relic, found, never made, left once in one
  // room at depth 4 with a warden guarding it (relic.js, room.js, D-692). Carried for now; set on the
  // shelf and keeping a find on a fall come at their own steps. Not sold. A `relic`: drawn with
  // its own violet glow over the dark (sprites.js, drawRelics, D-692).
  locket: { id: 'locket', kind: 'item', relic: true, name: 'Lightkeeper\'s Locket', bag: true, max: 1, says: 'locketTake', look: 'locketLook', full: 'locketFull' },
};
