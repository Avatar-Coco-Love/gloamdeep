# Content, part 4

`CONTENT.md` continued, under its rules. The places moved here from
`CONTENT-3.md` word for word at 0.3.299, as that page neared 8 KB.

## Places (`src/core/room.js`)

| Place | What it is | Decisions |
| --- | --- | --- |
| `first`, `second`, `south` | the hand-made rooms of the crypt | D-106, D-138, D-192 |
| `woods` | the surface's generated woods rooms; the north row's are mountain rooms; the 5 round home thick, as before or glades, at least one thick and one glade (`KINDS`, woods.js) | D-209, D-233, D-738, D-756 |
| generated depths | Crypt (1), Cave (2 to 4), Warren (5 to 7), Dungeon (8 on) | D-147, D-233, D-354 |
| the vault | from depth 2, one one-cell dead end a floor the seed picks, never the peddler's, the locket's or a waystone's; none on a floor without one. An outer room with 2 braziers, and a wall with the sealed door in its middle, the vault 3 tiles deep behind it, away from the opening: above or below for an opening at the top or bottom, beside for one at the left or right; bigger with the cell from depth 8. Drawn in the crypt's bricks; nothing else in it (`vault.js`) | D-891, D-892 |

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

## Tiles, continued (`src/core/tiles.js`)
Tiles added once `CONTENT-3.md` neared 8 KB (0.3.337).

| id | What it does | Grows back | Where | Decisions |
| --- | --- | --- | --- | --- |
| `brazier` | a vault's cold brazier: a crypt-stone fire bowl on a foot, its violet band dark, old ash in the bowl; solid, light passing over it. Bumped with the lantern out, it says "A cold stone brazier.", then "Old ash lies in its bowl.", a sentence a bump, free; with it lit, the text line says the first and the card asks "Light the brazier?" over the second, Yes grey with less than 5 turns' oil, lighting it for 5 turns' oil and a turn: "The brazier catches." | | 2 in each vault (`vault.js`) | D-891, D-892, D-893 |
| `brazierLit` | a lit brazier: its violet band bright, coals in the bowl, the torch's flame swaying over them in 3 frames; solid, light passing over it, lighting 2 tiles round it in the torch's warm colour, as a campfire's embers. Bumped, it says "A brazier, burning.", then "Its flame burns steady.", free | | where a brazier was lit | D-893 |
| `sealedDoor` | a vault's sealed door: a stone slab in the wall's face, a flame rune cut in it, a dark notch on the lintel above it for each brazier, glowing violet for each lit, the left first; solid, blocking light. Bumped, it says "A sealed stone door.", then "A flame rune is cut into it.", free. Left with a brazier still cold, its lit braziers go cold again, the oil spent | | in the middle of each vault's inner wall (`vault.js`) | D-891, D-892, D-893, D-895 |
| `openDoor` | Open door: the sealed door once both braziers burn, the slab sunk away, the doorway fully open and dark, a worn line where it sank, both notches glowing on the lintel; walked through, light passing; open for good, the braziers lit. "The stone door sinks open." in the last brazier's line's place | | where a vault's sealed door was | D-895 |
