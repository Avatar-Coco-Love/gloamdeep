# The starting region

Rule sheet for the first region (step 42, D-182 to D-185). Uses the
template in `WORLD-2.md`. Where this sheet and a decision disagree, the
decision wins.

## Name and place
- **Name:** Hearthwood (D-348). "Gloamwood" stays free for a darker
  woods later.
- **Place:** the surface, where every journey starts (D-022).
- **Biome:** woods and mountains (D-028).

## Grid (D-182)
3 × 3 cells. All 9 are used, every seed, in this region (other regions
may leave cells empty). Built at 0.3.186 (D-734, `src/core/hearthwood.js`):
all 9 are woods rooms of 17 × 20 for now, home keeping the id `woods`,
the others `woods:x,y` by their cell. Each room is joined to every room
beside it by a path 3 tiles wide through the edge trees.

```
 N   [mountain] [mountain] [mountain]
     [  woods ] [  HOME  ] [  woods ]
 S   [  woods ] [  woods ] [  woods ]
```

## Kinds of room (D-183)
- The north row (3 cells): mountain rooms, every seed.
- The other 6 cells: woods rooms.
- How big each kind is and how its shape is made: Q-038.
- Woods rooms range from thick woods to open glades, the seed picking
  (D-733, planned).

## Fixed promises, every seed
- **Home base** in the centre cell (D-182). Since 0.3.187 (D-735) a new
  journey starts in one of the south woods rooms, never the cave's, the
  seed picking, and the hero walks north to find home; before, in the
  crypt (D-119); D-020 said here. Planned (D-733): a fall wakes the
  hero in the last bed slept in; with none, at the home waystone once
  woken; otherwise in the room where the journey began, as it does now.
- **The first cave's entrance** in one of the four side cells next to
  home: north, east, south or west, picked by the seed (D-184). If north,
  it is a mountain room. Since 0.3.186 the mouth stands on that room's
  far edge (D-734); before, on that edge of the one woods room (D-211).
- **Where a journey begins** and the goals each start sets: one entry
  a start in `src/core/starts.js` (D-735); South woods, for now the only one.

## Caves (D-184, D-185)
- One cave entrance for now: the first cave. The sheet leaves room for
  more caves later.
- **The first cave** is today's game (D-175): the crypt's two rooms at
  depth 0, joined by a doorway (D-197), its room below at depth 1, then
  generated floors from depth 2: caves at 2 to 4, warrens at 5 to 7,
  the dungeon from 8 (D-212, D-233). Before D-354 depth 5 was its bottom
  (depths 1 to 5 before D-212, D-185).
- Biome 1 is the surface and depths 1 to 8 (D-635). Below depth 8 the
  floors are made as depth 8 is, until biome 2 (D-647). A portal at the
  bottom leads to the endless depths, renewed on each visit (D-019,
  D-032); where the first cave ends and its portal wait for the portal
  step (D-354).
- The first cave gets its own rule sheet when it is built.

## NPC houses (D-184)
None yet. A slot is kept for later; who lives where is decided when NPCs
exist.

## Openings to other regions
Decided when the second region is designed (Q-037).

## Light
- Darkness and daylight outside: day and night pass with turns (D-025);
  night darkness is Q-027. Light through the cave mouth: Q-040.
- Lit rooms: none promised yet.

## Creatures and finds
A pond at home in the woods, 5 to 9 tiles (D-503). A gloamberry bush
in each woods room (D-531). The rest is not decided yet. Landmarks and special items are ideas for later (see
"Ideas for later" in `PROGRESS.md`).
