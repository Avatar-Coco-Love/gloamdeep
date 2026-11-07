# The world

How the world is laid out, generated, lit between places and mapped.
Stage 0.3 builds it (D-168). Settled parts cite decisions; open parts
cite questions in `OPEN-QUESTIONS.md`. Where this page and a decision
disagree, the decision wins. Read this before any world, region, map or
room-joining step.

## Words we use
- **World:** everything, surface and below, generated once per save from
  its seed and then kept (D-019).
- **Region:** one area with its own character and rules, such as the
  owner's example, a marsh. It is a grid of cells. (D-169)
- **Cell:** one slot in a region's grid. A used cell holds one **room**.
  Not every cell has to be used. (D-169)
- **Room:** any one space you walk in, inside or outside: a cave
  chamber, a stretch of woods, a house, a desert. In the code it is a
  "place" (`src/core/room.js`).
- **Opening:** a way from one room to another (D-171).
- **Rule sheet:** a region's own list of generation rules (D-169).

## Regions are grids of rooms (D-169)
Each region is a grid, for example 3 × 3 = 9 cells. Its rule sheet says
how it generates: which cells are used, what kinds of room go where, and
fixed promises that hold for every seed. The owner's example: in a 3 × 3
marsh the centre room is special, with its own purpose and rules, and
has exactly one secret entrance, from a side that differs from seed to
seed. A rule sheet can also say that a special item must appear in a
named room or building. This works on the surface and below. How
regions join each other is Q-037.

## Ways between rooms (D-171)
- **Stairs** (and later maybe ladders or holes) up and down.
- **Side openings** at a room's edge, into the room beside it.
- **Water:** some rooms are reached only by following a river or an
  underground stream, once the hero can swim (Q-039).
- **Secret entrances**, like the marsh centre's.
Both sides of an opening always line up: walk out of one room's east
edge and you come in at the matching spot on the next room's west edge.
The first one joins the first crypt room's bottom doorway to a crypt room
south of it (D-197). Generated rooms get one-tile openings at a spot the
seed picks along their shared edge (D-201).
Stairs line up too: stairs down in a cell at a tile lead to stairs up in
the same cell at the same tile one floor down (D-202). Depths 2 to 4 are
three-room grids with the stairs down in another room than the stairs
up (D-203). Depths 5 to 7 are warrens: 5 rooms in a 3 × 3 grid, a
winding chain with the stairs down farthest away (D-227). From depth 8
each floor is a dungeon: 6 rooms of straight-walled halls in a 3 × 3
grid, grown the same way plus one loop, in the crypt's bricks (D-228).
A doorway or mouth keeps the depth, only stairs change it: the woods
and the crypt are both depth 0, the second room depth 1 (D-212). Each
place keeps the seed numbers it had before, so a seed keeps its rooms;
the map shows the part of the surface the hero is in (D-213).

## How a region is generated (proposed, confirmed at its step, Q-037)
Two passes, both run from the save's seed:
1. **Layout:** pick the used cells, which sides join, which joins are
   secret, and where each promised thing goes (the centre's one entrance,
   the special item). Check that every promised room can be reached.
2. **Rooms:** each room is made to fit the openings it was given, using
   its kind's own rules (cave chambers, burrows, woods…). Each room gets
   its own seed from the save's seed, so it can be built the first time
   the hero walks in and still be the same every time.
The first built: depth 2 (depth 3 before D-212) is a 2 × 2 grid, one cell empty, three rooms in
an L; the seed picks the stairs room (D-201, `src/core/region.js`).

## Shapes and sizes (D-172)
Rooms differ in shape and size by kind: tunnels are narrow, deserts are
vast. A room bigger than the screen scrolls: the camera keeps the hero in
the middle and stops at the room's edges (D-195). The crypt rooms are
11 × 13 tiles, one screen; the generated caves were 17 × 20 at first (D-195). Floors grow with depth:
13 × 15 at depths 2 to 4, 15 × 17 at 5 to 7, 17 × 20 from 8 (D-580), built at 0.3.42
(D-584; `sizeAt` in `src/core/region.js`). Biome 1 grows next: rooms made of
11 × 13 cells, 1, 2 or 2 × 2 of them, more a floor (D-645). The last room of
each side branch, a dead end, holds a cache of 2 or 3 extra finds (D-650). Which kinds, how big, and
whether shapes come from hand-made templates or are generated: Q-038.

## Light between rooms (D-173)
An opening lets in the light of the room on its other side.
- From outside: a cave mouth or the stairs behind you shine with
  daylight on a bright day, less in rain or snow, and not at night. It
  follows the time of day (D-025) and the weather (Q-035).
- Underground: an open entrance to a lit room you haven't found yet
  glows faintly, so you can tell a lit space lies ahead.
Through the cave mouth: 3 tiles of pale daylight, shrinking and warming
through dusk, none at night (D-218). The rest: Q-040.
Past an opening, the place beyond shows itself, made by its own kind's
rules, as it is now, in its own light (D-440): past the crypt's doorway
out, the real woods room, in the woods' own daylight or moonlit night
(D-438, D-439).

## Finding stairs (D-174)
Stairs glow more dimly than now (D-134), and their glow shows only once
the fog of war has lifted from them, so stairs and doors must be found.
Light that reaches them, a lantern, a torch or a lit room, reveals them
as usual. Some underground places are brightly lit. Numbers: D-194.

The map, where today's game goes, the first outside room, the starting
region and the rule sheet template: in `WORLD-2.md` (D-660).
