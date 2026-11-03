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

## 0.3.45 (2026-11-03)
- Planning only, nothing in the game changed: waystones will be 5 × 5, with a walkable cross and a plate in the middle, and big landmarks like them will be placed by one shared tool from simple plans.
- Decisions: D-587. Questions raised: Q-080.

## 0.3.44 (2026-11-02)
- The trapped peddler on depth 3 can now stand in more places: at least 4 heaps of rubble around him (not 5), and never in a nook with walls on two sides.
- A creature or find that stood on or beside his spot now moves to the nearest free floor instead of ruling the spot out, so his room comes out as the seed made it far more often.
- Decisions: D-586. Questions closed: Q-079.

## 0.3.43 (2026-11-02)
- Fixed: now and then a dungeon room deep down came out as a small crypt room instead, so its openings and stairs didn't line up. Those rooms are now made properly; every other room stays exactly as it was.
- A journey saved with one of those crypt rooms has just that room made again, once. If you were in it, you stand on that floor's stairs up.
- Decisions: D-585. Questions closed: Q-078.
