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

## 0.3.99 (2026-11-07)
- Nothing in the game changed. The Lure Wisp is planned: a small cold flame with pink eyes, seen even out in the dark, though it lights nothing around it. Come within 3 tiles and it drifts a tile away, toward the nearest other creature, so following it leads you into trouble.
- It never bites, and one hit puts it out. It has 1 heart, turns up from depth 4, and may leave Wisp Glass, sold for 2. It is built next.
- Decisions: D-649.

## 0.3.98 (2026-11-07)
- Halls and large rooms join the first cave's floors: a hall is two cells long, side by side or one above the other, and a large room two by two. Depths 2 to 4 have 1 or 2 halls, depths 5 to 7 1 or 2 halls and sometimes a large room, depth 8 and below 2 or 3 halls and a large room.
- They are always side rooms, so the walk to the stairs down stays as short as before, and each holds today's finds for now. Each stretch of a big room's wall can open into a different room, and on the map every room still lines up on the grid.
- Old saves have their cave floors made again once more, the hero on that floor's stairs up; home, the woods and the crypt stay.
- The map preview tints the halls and large rooms, counts them, and names a tapped room's shape.
- Decisions: D-648. D-640 moved to the archive, word for word.

## 0.3.97 (2026-11-07)
- The first cave's floors are bigger: 6 to 8 rooms on each floor at depths 2 to 4, 9 to 11 at depths 5 to 7 and 11 to 13 at depth 8 and below, the number changing from seed to seed. Each room is one cell of the floor's grid, 11 by 13 tiles, 13 by 15 from depth 8.
- The stairs down are 3 or 4 rooms from the stairs up; the other rooms branch off as side rooms and dead ends, each with today's finds, so exploring them is a choice the oil pays for. Depth 8 and below have two loops.
- Old saves have their cave floors made again once, the hero on that floor's stairs up; home, the woods and the crypt stay.
- A map preview page draws any seed's floors for the owner to flip through before merging, and every step that changes how things are made gets one.
- Decisions: D-646, D-647. D-638 and D-639 moved to the archive, word for word.
