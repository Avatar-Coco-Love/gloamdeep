# Content, part 4

`CONTENT.md` continued, under its rules. The places moved here from
`CONTENT-3.md` word for word at 0.3.299, as that page neared 8 KB.

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
Each generated room holds 2 creatures at depth 2, 3 at depths 3 and 4, 4 from depth 5: the rat by the flask (gone elsewhere in the dark, picked from the pool, for 1 flask in 4, D-725), the rest picked from the depth's pool (`poolAt` in `room.js`), at least two kinds a room (D-534); the cave spider joins the pool at depth 2 (D-535), the bat at depth 3 (D-537), the mole at depth 5 (D-541), the snapcap at depth 2 (D-543), the herb mimic at depth 3 (D-549), the bone rat at depth 4 (D-551), the oil tick at depth 3 (D-606), the lure wisp at depth 4 (D-649). Added at 0.3.328 (D-883): the centipede at depth 3 (D-654), the spit grub at depth 4 (D-659); the bunny, skulker crab and rim lurker never underground (D-784, D-796, D-797).

Moved from `CONTENT-2.md` word for word at 0.3.328 (D-883), as that page neared 8 KB:

## Growth upgrades (`src/core/upgrades.js`)

Bought with embers on the Journal's Growth tree (D-462, D-481): Light,
Body and Hands. Body: Heart, one more heart, up to 5 (D-293); Tough, a hurting bite
poisons only 1 time in 2, above Heart in the first row (D-657). Light:
Steady Wick, a lit turn burning 9/10 of its oil, for good, a full tank
about 66 turns, not 60; "Steady" in a box too narrow (D-798). Hands:
Quick Hands, a tree, a stone deposit or a branch gathered by hand takes
1 bump fewer, never under 1; tools keep their own count (D-813).

Row 2 opens the first time the hero goes deeper than depth 8, 1 ember each, bought once (D-814). Light: Quick Pour, a flask poured by hand takes no turn; a Pond Minnow's oil still does (D-816). Body: Guard, a bite the vest did not turn glances off about 1 time in 6, about 3 in 8 with the Rat Hide Vest; bites only, not a drink, a glob or a sting (D-817). Hands: Thrift, about 1 making in 4 keeps 1 of the part its recipe uses most of, the first listed on a tie: at the bag's Make, the workbench, the mortar, the Pouch and the Big Bag (D-818). Code: `quickPour`, `guard`, `thrift`.
