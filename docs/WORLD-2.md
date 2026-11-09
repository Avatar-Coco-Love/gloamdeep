# The world, part 2

`WORLD.md` continued: the map, where today's game goes, the first
outside room, the starting region and the rule sheet template. Moved
from `WORLD.md` word for word at 0.3.113, the tenth audit (D-660), as
that page neared 8 KB.

## The map (D-176)
The world map is uncovered as you explore and kept forever (D-021). Dev
tools get a switch to reveal the whole map, and a map mode, which may be
the same map players see. Built at step 47 (D-205): the map button or M
shows the floor the hero is on, on its grid, each room from the tiles
remembered, in a box that scrolls and zooms; dev Reveal map shows the
whole floor (`src/core/map.js`). It turns between floors (D-206).
Since 0.2.133 a round map top right shows the floor around the hero, and a
tap on it opens the full map (D-383). Since 0.2.146 the full map, and the
Seed Explorer, is a glass card like the bag's (D-395).

## Where today's game goes (D-175)
The crypt rooms (two, and a third beside the first since D-197) and the
generated depths below them become the first cave under the starting region, reached by a cave entrance on the
surface. It goes on below depth 5 as built, warrens then the dungeon;
where it ends, and its portal to the endless depths, wait for the portal
step (D-185, D-354).

## The first outside room (D-209)
A woods room, 17 × 20, made from the seed (`src/core/woods.js`): one
round tree a tile, thick at the edges. Plain daylight shows and
remembers it whole. It is depth 0, called SURFACE for now; the cave mouth
leads there (step 49, `src/core/mouth.js`), and dev Go outside.
Since 0.3.186 it is home, the centre of Hearthwood's 9 woods rooms,
joined by paths, the mouth in a room beside it (D-734).
Day and night pass with the turns, 300 to a day, with dusk and dawn
fades; at night it is dark like a cave, memory a moonlit blue (D-217,
`src/core/daytime.js`).

## The starting region
Its rule sheet is `docs/regions/starting-region.md` (D-182 to D-185):
3 × 3, home in the centre, mountains in the north row, one cave beside
home. Each cave gets its own rule sheet too. One file per region in
`docs/regions/`, under 8 KB each.

## Rule sheet template
For each region file:
- Name, place in the world, surface or below, biome (D-028).
- Grid size, and which cells may be used.
- Kinds of room it uses, and where.
- Fixed promises: special rooms, secret entrances, items that must
  appear and where.
- Openings to other regions.
- Light: darkness (D-063), daylight, lit rooms.
- Creatures and finds.
