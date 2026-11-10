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

## 0.3.220 (2026-11-10)
- The first landmark: a dead lamppost now stands in one of the 8 rooms around home, never the one with the campfire. It's an old Lightkeeper's iron post with its cold lamp hanging from the arm. You can't walk through it, and light passes it. Bump it and it says "An old lamppost.", then "Its lamp went out long ago." In an older journey, its room gets it if you haven't been there yet.
- Decisions: D-769. D-762 moved to the archive, word for word. The rare materials' table moved from `CONTENT-3.md` to `CONTENT-FINDS.md`, word for word.

## 0.3.219 (2026-11-10)
- Nothing in the game changes. A note is kept for when bosses are designed: a boss beaten by a scorpion's sting or a glob could lose its found ability, so its big rewards may need to come whatever lands the last blow.
- Decisions: none. Questions: a note added to Q-083.

## 0.3.218 (2026-11-10)
- The scorpion's sting now hits creatures too. A creature on its marked tiles takes 2 hearts, just as you would, and the line says "The sting strikes the rat." with its name. One beaten this way leaves nothing and gives no experience. A creature in front of you doesn't shield you: every marked tile is struck. Other scorpions are hit too, and one stung with its tail up strikes no more. A mole under the earth and a pile of bones are passed over. The scorpion's Bestiary page says so.
- Decisions: D-768. D-761 moved to the archive, word for word.
