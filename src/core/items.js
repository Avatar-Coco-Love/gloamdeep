// § items: every item kind, keyed by id (D-048, D-077). Items lie on floor
// tiles, one per tile, in `state.items`. registry.js gathers this table.
// Taken, a kind with `regrow` lies there again that many turns later, out of
// sight (regrow.js): a day for mushrooms and herbs, three for a flask (D-306).
import { DAY_TURNS } from './daytime.js';
// How far a mushroom's tone may shift (D-305, the owner's pick of three)
const MUSHROOM_TONE = { hue: 12, light: 7 };
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
  // while the hero holds one (cave.js, stairs.js).
  knife: { id: 'knife', kind: 'item', name: 'Knife', hit: 2, hold: true, says: 'knifeTake' },
  herb: { id: 'herb', kind: 'item', name: 'Healing herb', heal: 2, says: 'herbEat', regrow: DAY_TURNS },
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
  ratTail: { id: 'ratTail', kind: 'item', name: 'Rat Tail', bag: true, max: 20, says: 'ratTailTake', look: 'ratTailLook', full: 'ratTailFull' },
  // The other four common materials (D-454), taken and kept the Rat Tail's way (D-475):
  // a lampmoth's Moth Dust, a scorpion's Stinger, a flask mimic's Mimic Glass and a
  // gloamling's Gloam Wisp. Make on Mimic Glass turns 1 with 2 oilcaps into a flask (D-477).
  mothDust: { id: 'mothDust', kind: 'item', name: 'Moth Dust', bag: true, max: 20, says: 'mothDustTake', look: 'mothDustLook', full: 'mothDustFull' },
  stinger: { id: 'stinger', kind: 'item', name: 'Stinger', bag: true, max: 20, says: 'stingerTake', look: 'stingerLook', full: 'stingerFull' },
  mimicGlass: { id: 'mimicGlass', kind: 'item', name: 'Mimic Glass', bag: true, max: 20, says: 'mimicGlassTake', look: 'mimicGlassLook', full: 'mimicGlassFull',
    craft: { into: 'flask', of: { mimicGlass: 1, oilcap: 2 }, says: 'glassFlaskMake' } },
  gloamWisp: { id: 'gloamWisp', kind: 'item', name: 'Gloam Wisp', bag: true, max: 20, says: 'gloamWispTake', look: 'gloamWispLook', full: 'gloamWispFull' },
  // The three rare materials (D-454), from creatures of depth 3 down, about 1 in 10,
  // taken and kept the same way (D-476): a scorpion's Venom Sac, a flask mimic's Mimic
  // Heart and a gloamling's Gloam Eye.
  venomSac: { id: 'venomSac', kind: 'item', name: 'Venom Sac', bag: true, max: 20, says: 'venomSacTake', look: 'venomSacLook', full: 'venomSacFull' },
  mimicHeart: { id: 'mimicHeart', kind: 'item', name: 'Mimic Heart', bag: true, max: 20, says: 'mimicHeartTake', look: 'mimicHeartLook', full: 'mimicHeartFull' },
  gloamEye: { id: 'gloamEye', kind: 'item', name: 'Gloam Eye', bag: true, max: 20, says: 'gloamEyeTake', look: 'gloamEyeLook', full: 'gloamEyeFull' },
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
  // Normal's fall leaves the bag where the hero fell, `holds` its stacks (MO3, D-334, D-345).
  // Walking onto it puts back what fits, with its `says` line; the rest stays in it,
  // with its `full` line. Each fall leaves its own. It never grows back.
  lostbag: { id: 'lostbag', kind: 'item', name: 'Your bag', fetch: true, says: 'bagBack', full: 'bagFull' },
};
