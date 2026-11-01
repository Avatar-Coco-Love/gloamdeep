// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
// Taken, a kind with `regrow` lies there again that many turns later, out of
// sight (regrow.js): a day for mushrooms and herbs, three for a flask (D-306).
import { DAY_TURNS } from './daytime.js';
// How far a mushroom's tone may shift (D-305, the owner's pick of three)
export const MUSHROOM_TONE = { hue: 12, light: 7 };
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
  knife: { id: 'knife', kind: 'item', name: 'Knife', hit: 2, hold: true, says: 'knifeTake', bagged: 'knifeBag', holds: 'knifeHold' },
  // The second weapon (D-479): it hits a creature for `hit` and the one awake
  // behind it, in a line, for `through`. It lies only in depth 3's first room.
  spear: { id: 'spear', kind: 'item', name: 'Spear', hit: 2, through: 1, hold: true, says: 'spearTake', bagged: 'spearBag', holds: 'spearHold' },
  // Walking onto a herb hurt eats it on the spot (`eatHurt`); at full health it goes
  // into the bag, 5 a stack, and Eat there heals the same (D-511, supersedes D-156).
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
  // A plain stone from a broken deposit, never found lying (D-311, O2), for crafts
  // later. Into the bag in stacks of 20 (D-333); choosing it says one of its `look` lines.
  stone: { id: 'stone', kind: 'item', name: 'Stone', bag: true, max: 20, look: 'stoneLook', full: 'stoneFull' },
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
  snapcapGill: { id: 'snapcapGill', kind: 'item', name: 'Snapcap Gill', bag: true, max: 20, says: 'snapcapGillTake', look: 'snapcapGillLook', full: 'snapcapGillFull', sells: 1 },
  // A herb mimic's Mimic Leaf, taken and kept the same way (D-549).
  mimicLeaf: { id: 'mimicLeaf', kind: 'item', name: 'Mimic Leaf', bag: true, max: 20, says: 'mimicLeafTake', look: 'mimicLeafLook', full: 'mimicLeafFull', sells: 1 },
  // Bat Guano, a find of its own (D-539, D-540): a pile beside each bat as a room is made
  // (guano.js), taken and kept the same way, sold for 1, growing back after a day. Kept
  // for the garden (step 14) and crafts later.
  batGuano: { id: 'batGuano', kind: 'item', name: 'Bat Guano', bag: true, max: 20, says: 'batGuanoTake', look: 'batGuanoLook', full: 'batGuanoFull', sells: 1, regrow: DAY_TURNS },
  // Each common material `sells` to the peddler for 1 trade coin, each rare one for 5 (step 13a, D-494).
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
  // Picked from a gloamberry bush in the woods, 2 a bump (step 13b, D-531), into the bag the
  // oilcap's way in stacks of 20. Eaten from the bag the heartcap's way: 1 heart, a turn.
  // Its seed and its recipe come at later steps.
  gloamberry: { id: 'gloamberry', kind: 'item', name: 'Gloamberry', bag: true, max: 20, look: 'gloamberryLook', full: 'gloamberryFull',
    heal: 1, eats: 'gloamberryEat' },
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
  // is carried; it is never held, only carried: with it in the bag, a copper vein breaks.
  pick: { id: 'pick', kind: 'item', name: 'Stone Pick', bag: true, max: 1, look: 'pickLook', full: 'pickFull',
    bench: { of: { wood: 2, stone: 3 }, says: 'pickMake', short: 'pickShort' } },
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
  // The first home piece (D-488): made at the workbench, never found, set down on the surface
  // the chest's way as the bed tile, where sleeping at night rests the hero (sleep.js).
  bed: { id: 'bed', kind: 'item', name: 'Bed', bag: true, max: 1, look: 'bedLook', full: 'bedFull',
    bench: { of: { wood: 4, ratTail: 2 }, says: 'bedMake', short: 'bedShort' }, sets: { tile: 'bedstead', says: 'bedSet' } },
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
};
