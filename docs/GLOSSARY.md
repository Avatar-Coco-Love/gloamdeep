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

## The story (more in `LORE.md`, D-633)
- **The gloam:** alive, it eats light. **The First Light:** the great
  lamp at the bottom, to relight. **Underhearth:** the city below, now
  the sunken ruins. **The Lightkeepers:** the order of lamplighters.
- **Old Maren:** the hero's teacher, taken by the gloam. **The keeper:**
  who leaves the finds (Q-084). **The spark:** the guide.

## The hero
- **Hearts:** the hero's health, 5, and up to 5 more bought (D-115, D-293). **LV:** the level (D-246).
- **Embers:** 1 for each level past the first, spent in Growth (D-293).
- **Glints:** the look currency, paid by Feats, spent on looks (D-516).
- **Experience:** a creature beaten gives its hearts and bite; a new room 1 (D-245, D-371).
- **Lantern, oil:** the light the hero carries and what it burns.
- **Flask:** oil to pour into the lantern, from the bag (D-247, D-249).
- **Quick slot:** the round button left of the lantern that pours a flask (D-384).
- **Bag:** what the hero carries, in stacks of up to 20, or 5 of flasks and potions; a kind can fill several slots (D-247, D-333, D-339). A Pouch makes it 9 slots, then a Big Bag 12, made at the workbench (D-545, D-547). **Store** sends its stacks to chests nearby (D-558); **Sort** lines it up by kind and joins half stacks, free (D-559).
- **Drop:** the bag's button that sets the chosen stack down at the hero's feet, free, to take back by stepping on it; on a find, a swap (D-546).
- **Finds:** oilcap to grow back, with fishing and wood, moved to
  `GLOSSARY-FINDS.md` word for word at 0.3.72 (D-617).
- **Craft, Make:** turning things in the bag into another; Make is its
  button in the bag (D-299).
- **Gear, held:** what the hero holds in hand, first the knife (D-252), then the spear, which hits through to the creature behind (D-479). **Hold**, in the bag, swaps a weapon into the hand, or a tool into the Tool slot (D-552). **Take off**, on the Weapon or Tool slot chosen in the gear row, puts it back in the bag, free (D-554).
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

## Home
Moved to `GLOSSARY-2.md` word for word at 0.3.27 (D-565): workbench,
stash chest, bed, station; the garden bed joined them there.

## Creatures, people
Moved to `GLOSSARY-2.md` word for word at 0.3.3 (D-531): creatures,
colour sets, the creature list, the peddler, trade coins, rubble.

## Menus and tools
Moved to `GLOSSARY-CODE.md` (D-490): glass panel, Journal, Bestiary,
Growth, Records, Seed Explorer, dev tools.

## In the code (D-263)
Moved to `GLOSSARY-CODE.md` (D-468): event, profile, slot, the slot
screen, the name pad, the ask card, the look, behaviour, the registry.
