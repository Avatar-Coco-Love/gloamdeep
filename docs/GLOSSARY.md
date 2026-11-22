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
- **Chapter:** a stretch of 8 floors ending in its boss: chapter 1 is the surface and depths 1 to 8, the Lampeater its boss; four in all (D-635, D-954). Old text's "biome 1" means chapter 1. A **biome** is an area's own look, as the crypt, the warrens and the dungeon are (D-954).
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
  who leaves the finds (Q-084). **The spark:** the guide, freed from a
  **Gloam knot** in depth 2's first room, then by the hero's side (D-1024).

## The hero
Moved to `GLOSSARY-HERO.md` word for word at 0.3.393 (D-951).

## Home
Moved to `GLOSSARY-2.md` word for word at 0.3.27 (D-565): workbench,
stash chest, bed, station; the garden bed joined them there.
They moved on to `GLOSSARY-HOME.md` word for word at 0.3.245 (D-797).

## Creatures
Moved to `GLOSSARY-2.md` word for word at 0.3.3 (D-531): creatures,
colour sets, the creature list, now in `GLOSSARY-CREATURES.md` (D-884).
The peddler, trade coins and rubble
went with them, and came back word for word at 0.3.234 (D-784):

### People
- **Peddler:** the first person, found trapped in a ring of rubble on
  depth 3; freed by digging one heap, he stands at home by the home waystone (D-855),
  and is the first vendor: bumped there, his card opens (from his talk box's
  SHOP since D-1017) and he buys
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
