# depths worker notes (running)

## Confirmed findings so far
- F1 Warden Bestiary page: "Beat 2 more to learn how to fight it." but one warden per journey (creatures never come back; relic.js once). `fights` needs 3 beaten (bestiary.js FIGHT_AT=3, D-632). REPRODUCED pc: out/lk-b2-pc.png. Low. Fix: warden's fight tip at 1 beaten (Rec) / leave / reword hint.
- Observation (not against a decision, D-720 says asleep warden never notices): in 253 of 400 seeds the locket can be picked up without touching the warden (pick.mjs); it blocks the only way in 147.
- Stale comments: items.js:244-246 ("Carried for now; set on the shelf ... come at their own steps"), tiles.js:129 ("Asleep for now: nothing happens on them").

## Checked and sound
- sweep.mjs 150 seeds x depths 4-12 (14543 rooms): no creature/find on solid tile, none stacked, no floor cut off, stairs reachable, every door open both sides, all rooms joined, pool by depth right, flask mimic only to depth 5, >=2 kinds a room.
- counts.mjs 200 seeds: rooms 6-8 / 9-11 / 11-13, loops 0/0/2, way 3-4 rooms, halls/large per band, creatures 3/4 a cell (+2 pack), halls x2, large x4 (D-645, D-651, D-534, D-727).
- stones.mjs 400 seeds x depths 5,8,12,16: always a stone, never stairs-up room, 3x3 plan + clear ring, nothing starts on it, at the middle in 96%.
- Locket: always in depth 4, never stairs room, warden beside it asleep (400 seeds).
- Warden played pc+phone: bump wakes, no harm that turn (free turn true), 4 lantern swings / 2 knife blows, bite 1, awake 6 then "The warden stands still again.", win/lose/flee; after a fall it is asleep again, locket still there. Lines match lines.js / D-692. Locket take line, bag card, look lines ok.
- pc tour seed 4127 depths 4-8 without god mode: no invariant broken, no page errors; places Cave 4, Warren 5-7, Dungeon 8.
