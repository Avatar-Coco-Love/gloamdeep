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
| `mortarStand` | the Mortar and Pestle: bumped, day or night, the workbench's card as MORTAR, its six draughts (`makes`), each once all its parts have been held, else "Nothing to make here yet."; Deconstruct takes it back | | set down on the surface | D-786, D-789 |
| `rubble` | solid, light passing over it; 3 bumps by hand clear it, nothing taken, never back; the person beside it calls out, then is freed | | a ring around the peddler, depth 3: at least 4 heaps, a wall on one straight side at most | D-490, D-491, D-586 |
| `water` | a still pool: solid, light passing over it; on the map in its blue-grey (D-502); fished with the rod: the pond's Pond Minnow, a cave pool's Blind Cavefish (D-618) | | about 1 grey-rock Cave room in 2, 5 to 9 tiles; a pond in most woods rooms (D-503, D-734) | D-500, D-502, D-503, D-618 |
| `standingStone`, `waystonePath`, `waystonePlate` | the home waystone, asleep, 3 × 3 from its plan (`landmarks.js`): an old mossy standing stone in each corner tile, solid and blocking light like rock; flagstones on the cross and the plate in the middle, walked on; stepping on the plate wakes it (`wakes`) into `wokenPlate`, its rune lit violet with the stairs' faint glow; on a woken plate the travel card goes to another (`travel.js`) | | the cave mouth's room, 2 tiles north of the middle (D-753); in an old save, the nearest clear spot there, woken if it was; a sleeping one on depths 2, 5, 8, then every 4th, in a room the seed picks, never the stairs-up room, nearest its middle (D-592, D-594) | D-579, D-587, D-589, D-591, D-592, D-593, D-594, D-620, D-753 |
| `torchStand` | a torch's stone foot, solid; bare floor once it burns out | | set down anywhere | D-478 |
| `campfire`, `campfireEmbers`, `campfireAshes` | a ring of stones round a fire, solid, light passing over it: blazing, glowing 3 tiles round in the torch's colour; embers, 2; cold ashes, none. Bumped, a burning one says its first words and opens Sit and Add wood, where Sit (`sits`), a turn, gives 2 hearts blazing, 1 embers, ends stiff, warms (Warmed 60 turns blazing, 30 embers, `warmed.js`) and burns it a level down, Sit grey when nothing would change, and Add wood (`stokes`), 1 Wood, a turn, makes embers blazing (`fireside.js`); cold ashes say "Cold ashes." and open Light the fire?, "No one has sat here for a long time.", No picked, where Yes (`kindles`) makes them embers for one turn's oil, Yes grey with no oil. None burns down by itself (`campfire.js`) | | one a seed, in one of Hearthwood's 8 rooms outside home, the seed picking the room and blazing, embers or ashes, on open grass 2 tiles in from the edge | D-757, D-844, D-845, D-849 |
| `ownCampfire`, `ownEmbers`, `ownAshes` | your own campfire: the campfire's three levels as twins, the same pictures and rules, each lit, burnt or fed into its own twin. The card's notes are its own: "Your fire burns well.", "Your fire still glows.", "You laid these stones."; cold, its card shows Yes, Take up and No, No picked, where Take up (`takes`), a turn, puts the Campfire back in the bag whole, "You take up the stones.", or says "You already carry a campfire.", free | | where the hero sets down a Campfire from the bag (`bagCampfire`) | D-851, D-853 |
| `lamppost` | the first landmark: an old Lightkeeper's iron crook post, its cold lamp hanging dark from the arm; solid, light passing it. Bumped, it says "An old lamppost.", then "Its lamp went out long ago.", a sentence a bump, free (`lamppost.js`) | | one a seed, in one of Hearthwood's 8 rooms outside home, never the campfire's, on open grass 2 tiles in from the edge; in an old save, its room if never seen (`relamp.js`) | D-769 |
| `minersCamp`, `minersCampBare` | the second landmark: a slumped canvas tent and an old crate, 3 × 2 tiles, the Stone Pick leaning on the crate; all solid, light passing them. Bumped, it says "A miners' camp, long left." and opens Take the pick?, "An old pick leans on the crate.", No picked, where Yes (`takes`) puts the Stone Pick in the bag, a turn, the camp turning bare; bare, its words, free (`camp.js`) | | one a seed, in one of Hearthwood's 3 mountain rooms, never the campfire's or the lamppost's, on open grass 2 tiles in from the edge; in an old save, its room if never seen (`recamp.js`) | D-770 |

## Lights
Moved to `CONTENT-2.md` word for word at 0.3.254, as this page passed 8 KB.

## Places
Moved to `CONTENT-4.md` word for word at 0.3.299, as this page neared 8 KB.

## Rare materials
Moved to `CONTENT-FINDS.md` word for word at 0.3.220, as this page
passed 8 KB.
