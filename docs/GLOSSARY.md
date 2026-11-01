# Glossary

The game's words, what each means, and the decision behind it (D-264).
Use these words in the game, the docs and the code, so names stay the
same as the world grows. A new word goes here when it is decided. Where
this page and a decision disagree, the decision wins.

## The journey
- **Journey:** one game, kept on this device, saved after every turn
  (D-019, D-238). Not a "run": the world stays and the journey goes on.
- **Seed:** the number that sets a world's randomness; the same seed
  makes the same world (D-019, D-148).
- **Fall:** what happens at 0 hearts: the hero lies down and wakes at
  the start, keeping their level; the world stays as it was outside
  Hardcore (D-234, D-246, D-332).
- **Gentle, Normal, Hardcore:** the three ways to play, by what a fall
  costs: the bag kept, the bag left where you fell, or one life (D-334).
  Changed in Settings during a journey, only toward easier (D-346).
- **The bag where you fell:** Normal's fallen bag, lying on the floor to
  fetch by walking onto it, marked on the map (D-345).
- **Record:** the deepest depth walked to, kept for good (D-232, D-260).

## The world (more in `WORLD.md`)
- **World, region, cell, room, opening:** see `WORLD.md`, "Words we
  use" (D-169, D-171). In the code a room is a "place".
- **Hearthwood:** the starting region, home in its centre (D-348).
- **Surface:** depth 0, the woods and the way into the crypt (D-233).
- **Depth:** how far down a floor is. **Floor:** all the rooms at one
  depth.
- **Area:** a depth's kind of place: Crypt (1), Cave (2 to 4), Warren
  (5 to 7), Dungeon (8 on) (D-233).

## The hero
- **Hearts:** the hero's health, 5, and up to 5 more bought (D-115, D-293). **LV:** the level (D-246).
- **Embers:** 1 for each level past the first, spent in Growth (D-293).
- **Glints:** the look currency, paid by Feats, spent on looks (D-516).
- **Experience:** a creature beaten gives its hearts and bite; a new room 1 (D-245, D-371).
- **Lantern, oil:** the light the hero carries and what it burns.
- **Flask:** oil to pour into the lantern, from the bag (D-247, D-249).
- **Quick slot:** the round button left of the lantern that pours a flask (D-384).
- **Bag:** what the hero carries, in stacks of up to 20, or 5 of flasks and potions; a kind can fill several slots (D-247, D-333, D-339). A Pouch makes it 9 slots, then a Big Bag 12, made at the workbench (D-545, D-547).
- **Drop:** the bag's button that sets the chosen stack down at the hero's feet, free, to take back by stepping on it; on a find, a swap (D-546).
- **Oilcap:** an amber mushroom, the first resource, one in every
  generated room; 3 make an oil flask (D-296, D-299).
- **Heartcap:** a bright red mushroom in about half the rooms; Eat, in the
  bag, heals 1 heart (D-303, D-308); 3 make a healing potion (D-309).
- **Gloamberry:** a dark blue berry picked from a gloamberry bush in
  the woods, 2 a bump; Eat, in the bag, for 1 heart (D-531).
- **Gloamberry bush:** a low round bush, one in each woods room; picked,
  it stands **bare** and fills again 300 turns later (D-530, D-531).
- **Healing potion:** a red bottle made from 3 heartcaps; Drink, in the
  bag, heals 4 hearts (D-309).
- **Torch (set down):** made from 1 Moth Dust and 1 Wood, set down on a
  floor tile anywhere; it burns 100 turns, then goes out (D-478).
- **Eat, Drink:** the bag's buttons for a heartcap and a potion (D-308, D-309).
- **Creature materials:** what a beaten creature leaves: Rat Tail, Moth
  Dust, Stinger, Mimic Glass, Gloam Wisp; rare ones Venom Sac, Mimic
  Heart, Gloam Eye (D-453, D-454). All eight are in the game (D-474
  to D-476). The cave spider's Spider Silk is the ninth (D-535);
  the bat's Bat Wing and rare Bat Fang the tenth and eleventh (D-537);
  the mole's Mole Fur and rare Mole Claw the twelfth and thirteenth (D-541);
  the snapcap's Snapcap Gill the fourteenth (D-543); the herb mimic's Mimic
  Leaf the fifteenth (D-549); the bone rat's Rat Bone the sixteenth (D-551).
- **Bat Guano:** a pile of bat droppings, one beside each bat as a room
  is made; it grows back, and is kept for the garden (D-539, D-540).
- **Tone:** a mushroom's own slight shift of colour (D-304, D-305).
- **Deposit:** a round grey boulder, 3 in each Cave room; three bumps
  break it for a stone (D-311, D-312).
- **Pond:** still water at home in the woods, 5 to 9 tiles (D-503).
- **Pool:** still water in a Cave room; not yet to step in (D-500).
- **Stone:** a small grey pebble from a deposit, for later crafts (D-312).
- **Copper vein:** a deposit's boulder flecked with copper, one in each
  Cave room from depth 3; four bumps with the Stone Pick break it for
  Copper Ore, the first ore (D-450, D-480).
- **Stone Pick:** the first pick, made at the workbench, held in the
  Tool slot, where it breaks copper (D-480, D-552).
- **Wood:** sticks, branches and trees all give it, for crafts and building;
  sticks lie in the woods in three looks (D-314, D-315).
- **Fallen branch:** one in each woods room, blocking a tile; two bumps
  break it for 2 Wood (D-316).
- **Stump:** what a chopped tree leaves; four bumps fell a tree for 3 Wood,
  and the stump grows back into it (D-317).
- **Workbench:** made in the bag from 3 Wood, set down on the surface;
  bigger things are made at it, on its panel, where Deconstruct workbench
  puts it back in the bag (D-314, D-319, D-320, D-322, D-323).
- **Stash chest:** made at the workbench from 3 Wood and 3 Stone, set down
  on the surface, opened by walking into it; each one keeps 12 slots of its
  own, a picked stack moving between it and the bag, and taken down only
  when empty (D-021, D-324, D-325, D-326, D-330, D-331, D-340).
- **Bed, sleep, rested:** the first home piece, from the workbench, set
  down on the surface; bumped from dusk, the hero sleeps until morning
  and wakes healed and rested, a gold heart after the red (D-488).
- **Station:** a place to make one bigger craft family, built at home on
  the surface: forge, kitchen fire, power bench, altar (D-455). Not in
  the game yet.
- **Grow back:** a picked thing returning after its time (D-306).
- **Craft, Make:** turning things in the bag into another; Make is its
  button in the bag (D-299).
- **Gear, held:** what the hero holds in hand, first the knife (D-252), then the spear, which hits through to the creature behind (D-479). **Hold**, in the bag, swaps a weapon into the hand, or a tool into the Tool slot (D-552).
- **Gear slots:** the row of five across the bag's top: Weapon, Tool, Armour, Charm, Charm (D-552). A tool works only from the **Tool slot**: the Stone Pick breaks copper there.
- **Armour, charm, lantern part:** gear to come: one armour piece and two
  charms worn, parts in the lantern's slots (D-458, D-459).
- **Copper Wick, Fit:** the first lantern part, in its wick slot; Fit,
  in the bag, puts a part in the lantern, free (D-483).
- **Rat Hide Vest, Wear, glance:** the first armour; Wear, in the bag,
  puts it on, free; worn, a bite may glance off and hurt nothing (D-484).
- **Wisp Charm:** the first charm, worn from the bag; worn, rare drops
  come about 1 in 5 (D-486).
- **Heart Charm:** the second charm, worn beside it; worn, the oil
  burns a sixth slower (D-487).

## Creatures, people
Moved to `GLOSSARY-2.md` word for word at 0.3.3 (D-531): creatures,
colour sets, the creature list, the peddler, trade coins, rubble.

## Menus and tools
Moved to `GLOSSARY-CODE.md` (D-490): glass panel, Journal, Bestiary,
Growth, Records, Seed Explorer, dev tools.

## In the code (D-263)
Moved to `GLOSSARY-CODE.md` (D-468): event, profile, slot, the slot
screen, the name pad, the ask card, the look, behaviour, the registry.
