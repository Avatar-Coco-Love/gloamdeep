# Content, part 3

`CONTENT.md` continued, under its rules: one row each, with where it
turns up and the decisions behind it. The tiles, lights and places moved
here from `CONTENT-2.md` word for word at 0.3.73 (D-618), as that page
neared 8 KB.

## Tiles (`src/core/tiles.js`)

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `wall`, `floor` | solid and open ground | | everywhere | the style study |
| `caveMouth`, `outcrop` | the way into the crypt; surface rock | | the surface | D-209 |
| `stairsDown`, `stairsUp` | lead between depths | | each floor | D-132, D-174 |
| `tree` | 4 bumps: 3 Wood, leaves a stump | 900 | the woods; the edge is always trees | D-209, D-317, D-321 |
| `stump` | grows back into a tree | | where a tree was felled | D-317 |
| `branch` | 2 bumps: 2 Wood | 900 | 1 in each woods room | D-316 |
| `berryBush` | 1 bump: 2 Gloamberries, leaves it bare | 300 | 1 in each woods room | D-531 |
| `bareBush` | a picked bush, solid; fills again on its tile | | where a bush was picked | D-531 |
| `deposit` | 3 bumps: 1 Stone | 900 | 3 in each Cave room | D-311, D-312 |
| `vein` | with the pick in the Tool slot, 4 bumps: 1 Copper Ore | 1800 | 1 of the 3 deposits in each Cave room from depth 3 | D-480, D-552 |
| `bench` | the workbench's panel | | set down on the surface | D-320, D-322, D-323 |
| `stash` | a chest's 12 slots | | set down on the surface | D-325, D-330, D-340 |
| `bedstead` | the bed: at night sleep till morning, healed, a gold heart; by day, Deconstruct bed? | | set down on the surface | D-488 |
| `plot` | the garden bed: bumped, its card, Plant (a Gloamberry Seed) or Deconstruct | | set down on the surface | D-565, D-566 |
| `sprout` | the garden bed planted, a sprout showing; its card, Feed (a Bat Guano) or Deconstruct, which gives back the seed too | | planted from the bed's card | D-566, D-567, D-569 |
| `fedSprout` | the sprout fed, guano flecks on its soil; grows 150 turns after planting; Feed dim | | Feed on the sprout's card | D-569 |
| `berryBed` | the sprout grown, a small gloamberry bush, its card "Gloamberries grow here."; Pick gives 3 Gloamberries, a sprout again; Deconstruct gives back the seed too | | 300 turns after planting, every turn counting | D-567, D-568 |
| `rubble` | solid, light passing over it; 3 bumps by hand clear it, nothing taken, never back; the person beside it calls out, then is freed | | a ring around the peddler, depth 3: at least 4 heaps, a wall on one straight side at most | D-490, D-491, D-586 |
| `water` | a still pool: solid, light passing over it; on the map in its blue-grey (D-502); fished with the rod: the pond's Pond Minnow, a cave pool's Blind Cavefish (D-618) | | about 1 grey-rock Cave room in 2, 5 to 9 tiles; a pond at home (D-503) | D-500, D-502, D-503, D-618 |
| `standingStone`, `waystonePath`, `waystonePlate` | the home waystone, asleep, 3 × 3 from its plan (`landmarks.js`): an old mossy standing stone in each corner tile, solid and blocking light like rock; flagstones on the cross and the plate in the middle, walked on; stepping on the plate wakes it (`wakes`) into `wokenPlate`, its rune lit violet with the stairs' faint glow; on a woken plate the travel card goes to another (`travel.js`) | | the woods, 2 tiles north of the middle; in an old save, the nearest clear spot, made 3 × 3 where it stood | D-579, D-587, D-589, D-591, D-593, D-620 |
| `torchStand` | a torch's stone foot, solid; bare floor once it burns out | | set down anywhere | D-478 |

## Lights (`src/core/lights.js`)

| id | What it does | Where | Decisions |
| --- | --- | --- | --- |
| `torch` | lights 3 tiles around, flickering | the first rooms; by the stairs up in generated rooms; on a torch stand, out after 100 turns | D-121, D-149, D-478 |
| `unlitTorch` | lit for good by walking into its wall | the first rooms | D-121, D-122 |

## Places (`src/core/room.js`)

| Place | What it is | Decisions |
| --- | --- | --- |
| `first`, `second`, `south` | the hand-made rooms of the crypt | D-106, D-138, D-192 |
| `woods` | the surface's generated woods rooms | D-209, D-233 |
| generated depths | Crypt (1), Cave (2 to 4), Warren (5 to 7), Dungeon (8 on) | D-147, D-233, D-354 |

Regions: Hearthwood, the starting region (D-348, `docs/regions/`).
