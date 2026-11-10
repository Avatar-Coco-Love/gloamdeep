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

## 0.3.222 (2026-11-10)
- Nothing in the game changes. Alchemy will get a station of its own at home, apart from the kitchen fire: a mortar and pestle, an alchemy lab, or both, still to choose. 16 finds already wait for recipes. It comes after the night creatures and then the day creatures.
- Decisions: D-771. D-769 moved to the archive, word for word. Questions: Q-093 opened.

## 0.3.221 (2026-11-10)
- The second landmark: a miners' camp now stands in one of the 3 mountain rooms, never the one with the campfire or the lamppost. It's a slumped canvas tent and an old crate, 3 tiles wide and 2 tall, with a stone pick leaning on the crate. Bump it and it says "A miners' camp, long left." and asks "Take the pick?" Yes puts a Stone Pick in your bag and the pick is gone from the camp; after that, a bump only says its words. With a pick already carried, or a full bag, it tells you so and keeps its pick. In an older journey, its room gets it if you haven't been there yet.
- Decisions: D-770. D-763 moved to the archive, word for word.

## 0.3.220 (2026-11-10)
- The first landmark: a dead lamppost now stands in one of the 8 rooms around home, never the one with the campfire. It's an old Lightkeeper's iron post with its cold lamp hanging from the arm. You can't walk through it, and light passes it. Bump it and it says "An old lamppost.", then "Its lamp went out long ago." In an older journey, its room gets it if you haven't been there yet.
- Decisions: D-769. D-762 moved to the archive, word for word. The rare materials' table moved from `CONTENT-3.md` to `CONTENT-FINDS.md`, word for word.
