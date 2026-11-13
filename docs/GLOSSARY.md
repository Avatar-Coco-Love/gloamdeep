# Glossary

The game's words, what each means, and the decision behind it (D-264).
Use these words in the game, the docs and the code, so names stay the
same as the world grows. A new word goes here when it is decided. Where
this page and a decision disagree, the decision wins. A find's name
capitalises every word, in lines too (Oil Flask, 1 Healing Herb); a
creature's, tile's or place's only its first (Cave spider) (D-870).

## The journey
- **Journey:** one game, kept on this device, saved after every turn
  (D-019, D-238). Not a "run": the world stays and the journey goes on.
- **Seed:** the number that sets a world's randomness; the same seed
  makes the same world (D-019, D-148).
- **Fall:** what happens at 0 hearts: the hero lies down and wakes
  beside the last bed slept in, else on the woken home waystone, else
  where the journey began, keeping their level; the world stays as it
  was outside Hardcore (D-234, D-246, D-332, D-737).
- **Gentle, Normal, Hardcore:** the three ways to play, by what a fall
  costs: the bag kept, the bag left where you fell, or one life (D-334).
  Changed in Settings during a journey, only toward easier (D-346).
- **The bag where you fell:** Normal's fallen bag, lying on the floor to
  fetch by walking onto it, marked on the map (D-345).
- **Record:** the deepest depth walked to, kept for good (D-232, D-260).

## The world (more in `WORLD.md`)
- **World, region, cell, room, opening:** see `WORLD.md`, "Words we
  use" (D-169, D-171). In the code a room is a "place".
- **Hearthwood:** the starting region, home in its centre (D-348); 9 rooms joined by paths (D-734), woods but for the north row's mountain rooms (D-738); the woods round home are thick woods, woods as before or open glades, the seed picking (D-756).
- **Surface:** depth 0, the woods and the way into the crypt (D-233).
- **Campfire:** a ring of stones round a fire on the surface, blazing, embers or cold ashes; ashes are lit with the lantern's oil (D-757); sitting by a burning one gives hearts back, ends stiff and leaves the hero Warmed, the fire burning down a level (D-844, D-845); Add wood, 1 Wood, makes embers blazing (D-849). Made in the bag from 3 Stone and 2 Wood, set down as cold ashes (D-850, D-851).
- **Landmark:** a hand-made place on the surface to find and look at; the first is the **dead lamppost**, an old Lightkeeper's lamppost gone cold, one a seed (D-769); the second the **miners' camp**, a tent and a crate in a mountain room, its old Stone Pick there to take (D-770).
- **Depth:** how far down a floor is. **Floor:** all the rooms at one
  depth.
- **Area:** a depth's kind of place: Crypt (1), Cave (2 to 4), Warren
  (5 to 7), Dungeon (8 on) (D-233).

## The story (more in `LORE.md`, D-633)
- **The gloam:** alive, it eats light. **The First Light:** the great
  lamp at the bottom, to relight. **Underhearth:** the city below, now
  the sunken ruins. **The Lightkeepers:** the order of lamplighters.
- **Old Maren:** the hero's teacher, taken by the gloam. **The keeper:**
  who leaves the finds (Q-084). **The spark:** the guide.

## The hero
- **Growth's upgrades:** in `GLOSSARY-2.md` (D-883).
- **Hearts:** the hero's health, 5, and up to 5 more bought (D-115, D-293). **LV:** the level (D-246).
- **Embers:** 1 for each level past the first, spent in Growth (D-293).
- **Glints:** the look currency, paid by Feats and, 15 times in 100, a teaching goal (D-706, D-707), spent on looks (D-516).
- **Feat:** one record's set of 3 tiers, each paying Glints: Beaten, Deepest, Flasks, Rooms, Steps and Torches (D-467, D-695, D-697, D-698, D-721, D-722, D-723).
- **Experience:** a creature beaten gives its hearts and bite; a new room 1 (D-245, D-371).
- **Lantern, oil:** the light the hero carries and what it burns.
- **Flask:** oil to pour into the lantern, from the bag (D-247, D-249).
- **Quick slot:** the round button left of the lantern that pours a flask (D-384).
- **Bag:** what the hero carries, in stacks of up to 20, or 5 of flasks and potions; a kind can fill several slots (D-247, D-333, D-339). A Pouch makes it 9 slots, then a Big Bag 12, made at the workbench (D-545, D-547). **Store** sends its stacks to chests nearby (D-558); **Sort** lines it up by kind and joins half stacks, free (D-559).
- **Drop:** the bag's button that sets the chosen stack down at the hero's feet, free, to take back by stepping on it; on a find, a swap (D-546).
- **Finds:** oilcap to grow back, with fishing and wood, moved to
  `GLOSSARY-FINDS.md` word for word at 0.3.72 (D-617).
- **Craft, Make:** turning things in the bag into another; Make is its
  button in the bag (D-299). The bag's **Make tab**, beside its BAG
  tab, lists what is made in the bag, each once its finds have been
  held; a find's MAKE opens it on its recipe (D-787, D-788).
- **Gear, held:** what the hero holds in hand, first the knife (D-252), then the spear, which hits through to the creature behind (D-479). **Hold**, in the bag, swaps a weapon into the hand, or a tool into the Tool slot (D-552). **Take off**, on the Weapon or Tool slot chosen in the gear row, puts it back in the bag, free (D-554).
- **Gear slots:** the row of five across the bag's top: Weapon, Tool, Armour, Charm, Charm (D-552). A tool works only from the **Tool slot**: the Stone Pick breaks copper there.
- **Armour, charm, lantern part:** gear worn or fitted: one armour piece
  and two charms worn, parts in the lantern's slots (D-458, D-459); the
  first of each below.
- **Copper Wick, Fit:** the first lantern part, in its wick slot; Fit,
  in the bag, puts a part in the lantern, free (D-483).
- **Rat Hide Vest, Wear, glance:** the first armour; Wear, in the bag,
  puts it on, free; worn, a bite may glance off and hurt nothing (D-484).
- **Shell Vest, blunt:** the second armour, from Crab Shell, worn in the
  vest's place; a bite or strike of 2 or more hurts 1 less (D-801).
- **Wisp Charm:** the first charm, worn from the bag; worn, rare drops
  come about 1 in 5 (D-486).
- **Heart Charm:** the second charm, worn beside it; worn, the oil
  burns a sixth slower (D-487).
- **Centipede Charm:** the charm against poison; worn, poisoned lasts
  3 turns, not 6 (D-656).
- **Echo Charm:** the charm for the dark, from Bat Wing; worn, creatures
  within 4 tiles show as pale outlines where no light is (D-805).
- **Fang Charm:** the charm for hearts back, from Bat Fang; worn, a
  beaten creature gives back 1 heart about 1 time in 4 (D-809).

## Home
Moved to `GLOSSARY-2.md` word for word at 0.3.27 (D-565): workbench,
stash chest, bed, station; the garden bed joined them there.
They moved on to `GLOSSARY-HOME.md` word for word at 0.3.245 (D-797).

## Creatures
Moved to `GLOSSARY-2.md` word for word at 0.3.3 (D-531): creatures,
colour sets, the creature list. The peddler, trade coins and rubble
went with them, and came back word for word at 0.3.234 (D-784):

### People
- **Peddler:** the first person, found trapped in a ring of rubble on
  depth 3; freed by digging one heap, he stands at home by the home waystone (D-855),
  and is the first vendor: bumped there, his card opens and he buys
  creature materials and sells a flask and a torch (D-471, D-490,
  D-491, D-492, D-494, D-495).
- **Trade coins (coins):** earned only by selling to a vendor, each find
  at its own price: 1 for most common creature materials (Wisp Glass 2),
  5 for a rare one; kept on a fall, but not
  when Hardcore starts over; spent at a vendor (D-472, D-494, D-495,
  D-649, D-674).
- **Rubble:** a heap of fallen rock, solid, light passing over it; dug
  away by hand in 3 bumps (D-490, D-491).

## Menus and tools
Moved to `GLOSSARY-CODE.md` (D-490): glass panel, Journal, Bestiary,
Growth, Records, Seed Explorer, dev tools.

## In the code (D-263)
Moved to `GLOSSARY-CODE.md` (D-468): event, profile, slot, the slot
screen, the name pad, the ask card, the look, behaviour, the registry.
