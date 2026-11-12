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
Each generated room holds 2 creatures at depth 2, 3 at depths 3 and 4, 4 from depth 5: the rat by the flask (gone elsewhere in the dark, picked from the pool, for 1 flask in 4, D-725), the rest picked from the depth's pool (`poolAt` in `room.js`), at least two kinds a room (D-534); the cave spider joins the pool at depth 2 (D-535), the bat at depth 3 (D-537), the mole at depth 5 (D-541), the snapcap at depth 2 (D-543), the herb mimic at depth 3 (D-549), the bone rat at depth 4 (D-551), the oil tick at depth 3 (D-606), the lure wisp at depth 4 (D-649).
