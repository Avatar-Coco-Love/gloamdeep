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

## 0.3.33 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 2. A new tool keeps the game's records: one command sets the version number, copies these notes into the Version history, and moves older notes to the archive.
- Decisions: D-572.

## 0.3.32 (2026-11-02)
- Behind the scenes, nothing you see has changed: the eighth audit, part 1. The bag, Drop, setting down, and the workbench, chest, bed and peddler cards moved into their own file of the code.
- For screen readers: on the peddler's Sell side, each bag slot is read with its name, how many and its price again, not "Empty". It had been wrong since 0.2.219.
- Tests run faster (22 s to 16 s), two unused pieces of code are gone, and the notes for making changes are tidier.
- Decisions: D-570, D-571.

## 0.3.31 (2026-11-02)
- Feed your garden now: walk into a sprout and its card shows FEED and DECONSTRUCT. Feed puts 1 Bat Guano on the soil. It takes a turn.
- A fed sprout shows a few flecks of guano on its soil and grows in 150 turns from planting instead of 300. Fed after that, it grows at once.
- Once is enough: with no guano, or already fed, Feed is dim. After picking, the sprout needs feeding again. Taken down, the guano is spent.
- Water doesn't matter to the garden yet; it waits for a way to carry water.
- Decisions: D-569.
