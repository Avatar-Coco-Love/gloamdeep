# Content, part 3

`CONTENT.md` continued, under its rules: one row each, with where it
turns up and the decisions behind it. The tiles, lights and places moved
here from `CONTENT-2.md` word for word at 0.3.73 (D-618), as that page
neared 8 KB.

## Tiles (`src/core/tiles.js`)

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `wall`, `floor` | solid and open ground | | everywhere | the style study |
| `caveMouth`, `outcrop` | the way into the crypt; surface rock | | the surface; the mountain rooms' rock; the way in drawn as the broken seal, the cave looks kept for later caves | D-209, D-738, D-739, D-744, D-745 |
| `stairsDown`, `stairsUp` | lead between depths | | each floor | D-132, D-174 |
| `tree` | 4 bumps: 3 Wood, leaves a stump | 900 | the woods; the edge is always trees, thicker or thinner inside by the room's kind; a few lone ones in the mountain rooms | D-209, D-317, D-321, D-738, D-756 |
| `stump` | grows back into a tree | | where a tree was felled | D-317 |
| `branch` | 2 bumps: 2 Wood | 900 | 1 in each woods and mountain room | D-316, D-738 |
| `berryBush` | 1 bump: 2 Gloamberries, leaves it bare | 300 | 1 in each woods room | D-531 |
| `bareBush` | a picked bush, solid; fills again on its tile | | where a bush was picked | D-531 |
| `deposit` | 3 bumps: 1 Stone | 900 | 3 in each Cave room and mountain room | D-311, D-312, D-738 |
| `vein` | with the pick in the Tool slot, 4 bumps: 1 Copper Ore | 1800 | 1 of the 3 deposits in each Cave room from depth 3 | D-480, D-552 |
| `bench` | the workbench's panel | | set down on the surface | D-320, D-322, D-323 |
| `stash` | a chest's 12 slots | | set down on the surface | D-325, D-330, D-340 |
| `bedstead` | the bed: at night sleep till morning, healed, a gold heart; by day, Deconstruct bed? | | set down on the surface | D-488 |
| `bedroll` | the Fur Bedroll laid out: from dusk, Sleep here until morning? (2 hearts, not stiff); by day, Roll up the bedroll? | | set down on the surface | D-804 |
| `plot` | the garden bed: bumped, its card, Plant (a Gloamberry Seed) or Deconstruct | | set down on the surface | D-565, D-566 |
| `sprout` | the garden bed planted, a sprout showing; its card, Feed (a Bat Guano) or Deconstruct, which gives back the seed too | | planted from the bed's card | D-566, D-567, D-569 |
| `fedSprout` | the sprout fed, guano flecks on its soil; grows 150 turns after planting; Feed dim | | Feed on the sprout's card | D-569 |
| `berryBed` | the sprout grown, a small gloamberry bush, its card "Gloamberries grow here."; Pick gives 3 Gloamberries, a sprout again; Deconstruct gives back the seed too | | 300 turns after planting, every turn counting | D-567, D-568 |
| `relicShelf` | the shelf, empty: bumped, Deconstruct shelf? "Nothing on it yet."; with the locket in the bag, Set the locket on the shelf? | | set down on the surface | D-690, D-693 |
| `locketShelf` | the shelf with the locket on it, glowing violet: bumped, Deconstruct shelf? "The locket rests here.", both back in the bag or neither | | the locket set on the shelf | D-693 |
| `mortarStand` | the Mortar and Pestle: bumped, day or night, the workbench's card as MORTAR, the Glow Draught once Duskstar and Wisp Glass have been held, else "Nothing to make here yet."; Deconstruct takes it back | | set down on the surface | D-786, D-789 |
| `rubble` | solid, light passing over it; 3 bumps by hand clear it, nothing taken, never back; the person beside it calls out, then is freed | | a ring around the peddler, depth 3: at least 4 heaps, a wall on one straight side at most | D-490, D-491, D-586 |
| `water` | a still pool: solid, light passing over it; on the map in its blue-grey (D-502); fished with the rod: the pond's Pond Minnow, a cave pool's Blind Cavefish (D-618) | | about 1 grey-rock Cave room in 2, 5 to 9 tiles; a pond in most woods rooms (D-503, D-734) | D-500, D-502, D-503, D-618 |
| `standingStone`, `waystonePath`, `waystonePlate` | the home waystone, asleep, 3 × 3 from its plan (`landmarks.js`): an old mossy standing stone in each corner tile, solid and blocking light like rock; flagstones on the cross and the plate in the middle, walked on; stepping on the plate wakes it (`wakes`) into `wokenPlate`, its rune lit violet with the stairs' faint glow; on a woken plate the travel card goes to another (`travel.js`) | | the cave mouth's room, 2 tiles north of the middle (D-753); in an old save, the nearest clear spot there, woken if it was | D-579, D-587, D-589, D-591, D-593, D-620, D-753 |
| `torchStand` | a torch's stone foot, solid; bare floor once it burns out | | set down anywhere | D-478 |
| `campfire`, `campfireEmbers`, `campfireAshes` | a ring of stones round a fire, solid, light passing over it: blazing, glowing 3 tiles round in the torch's colour; embers, 2; cold ashes, none. Bumped, a burning one says its words, a sentence a bump, free; cold ashes say "Cold ashes." and open Light the fire?, "No one has sat here for a long time.", No picked, where Yes (`kindles`) makes them embers for one turn's oil, Yes grey with no oil. None burns down yet (`campfire.js`) | | one a seed, in one of Hearthwood's 8 rooms outside home, the seed picking the room and blazing, embers or ashes, on open grass 2 tiles in from the edge | D-757 |
| `lamppost` | the first landmark: an old Lightkeeper's iron crook post, its cold lamp hanging dark from the arm; solid, light passing it. Bumped, it says "An old lamppost.", then "Its lamp went out long ago.", a sentence a bump, free (`lamppost.js`) | | one a seed, in one of Hearthwood's 8 rooms outside home, never the campfire's, on open grass 2 tiles in from the edge; in an old save, its room if never seen (`relamp.js`) | D-769 |
| `minersCamp`, `minersCampBare` | the second landmark: a slumped canvas tent and an old crate, 3 × 2 tiles, the Stone Pick leaning on the crate; all solid, light passing them. Bumped, it says "A miners' camp, long left." and opens Take the pick?, "An old pick leans on the crate.", No picked, where Yes (`takes`) puts the Stone Pick in the bag, a turn, the camp turning bare; bare, its words, free (`camp.js`) | | one a seed, in one of Hearthwood's 3 mountain rooms, never the campfire's or the lamppost's, on open grass 2 tiles in from the edge; in an old save, its room if never seen (`recamp.js`) | D-770 |

## Lights
Moved to `CONTENT-2.md` word for word at 0.3.254, as this page passed 8 KB.

## Places (`src/core/room.js`)

| Place | What it is | Decisions |
| --- | --- | --- |
| `first`, `second`, `south` | the hand-made rooms of the crypt | D-106, D-138, D-192 |
| `woods` | the surface's generated woods rooms; the north row's are mountain rooms; the 5 round home thick, as before or glades, at least one thick and one glade (`KINDS`, woods.js) | D-209, D-233, D-738, D-756 |
| generated depths | Crypt (1), Cave (2 to 4), Warren (5 to 7), Dungeon (8 on) | D-147, D-233, D-354 |

Regions: Hearthwood, the starting region (D-348, `docs/regions/`).

Starts (`src/core/starts.js`, D-735): South woods, one of Hearthwood's south
rooms, never the cave mouth's; the lantern off, by day.

Moved from `CONTENT.md` word for word at 0.3.100, as that page passed 8 KB:
Each generated room holds 2 creatures at depth 2, 3 at depths 3 and 4, 4 from depth 5: the rat by the flask (gone elsewhere in the dark, picked from the pool, for 1 flask in 4, D-725), the rest picked from the depth's pool (`poolAt` in `room.js`), at least two kinds a room (D-534); the cave spider joins the pool at depth 2 (D-535), the bat at depth 3 (D-537), the mole at depth 5 (D-541), the snapcap at depth 2 (D-543), the herb mimic at depth 3 (D-549), the bone rat at depth 4 (D-551), the oil tick at depth 3 (D-606), the lure wisp at depth 4 (D-649).

## Rare materials
Moved to `CONTENT-FINDS.md` word for word at 0.3.220, as this page
passed 8 KB.
