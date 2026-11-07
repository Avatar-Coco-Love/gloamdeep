# Changelog

Newest first. Every PR adds exactly one entry, and that entry is the
version bump. The same lines go, word for word, into the in-game Version
history, `src/core/history-0.3.js` (D-254, D-528).

Versions:
- `0.0.x`: pre-production (decisions, docs, art studies). No playable game.
- `0.1.x`: foundation. The first code, built up one small visible step at a time.
- `0.2.x`: stage 0.2, from step 32: places with character, a dive worth
  repeating, and stronger, slowly (D-159).
- `0.3.x`: stage 0.3, the world (D-168), from 0.3.0, once stage 0.2's
  last steps were done (D-528).
- Later minor versions (`0.4`…) are set when the build plan in
  `docs/PROGRESS.md` defines the next stage.
- `1.0.0`: the first release the owner calls finished.

Entry format:

```
## 0.0.2 (2026-10-18)
- One line per change, written so the owner can follow it.
- Decisions: D-008. Questions closed: Q-001.
```

## 0.3.97 (2026-11-07)
- The first cave's floors are bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8 and below, the number changing from seed to seed. Each room is one cell of the floor's grid, 11 by 13 tiles, 13 by 15 from depth 8.
- The stairs down are 3 or 4 rooms from the stairs up; the other rooms branch off as side rooms and dead ends, each with today's finds, so exploring them is a choice the oil pays for. Depth 8 and below have two loops.
- Old saves have their cave floors made again once, the hero on that floor's stairs up; home, the woods and the crypt stay.
- A map preview page draws any seed's floors for the owner to flip through before merging, and every step that changes how things are made gets one.
- Decisions: D-646, D-647. D-638 and D-639 moved to the archive, word for word.

## 0.3.96 (2026-11-07)
- Nothing in the game changed. The first cave's floors are planned bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8, the number changing from seed to seed, about 69 rooms in all where there are about 33 now.
- Rooms will be made of square-cut cells so everything lines up, in play and on the map: a small room is one cell, a long hall two, a large room two by two. The stairs down stay about as near as today, 3 or 4 rooms away; the other rooms branch off the way and hold the rewards. Old saves will have their cave floors made again once; home, the woods and the crypt stay.
- Decisions: D-645. D-634 moved to the archive, word for word.

## 0.3.95 (2026-11-07)
- Nothing in the game changed. Each biome will grow to about 2 to 3 times its size to hold everything planned: more rooms on each floor, and rooms both smaller and bigger than today's, so no two seeds feel the same. The first cave grows first, before the next creature.
- The owner's idea is kept for later: a cleared room filling again over time, perhaps with different creatures.
- Decisions: D-644. Questions opened: Q-086. D-482 moved to the archive, word for word.
