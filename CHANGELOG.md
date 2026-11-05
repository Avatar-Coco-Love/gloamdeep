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

## 0.3.47 (2026-11-05)
- The home waystone now stands in the woods, just north of the middle: four tall standing stones around a cross of flagstones, with a carved plate in the middle. It is asleep for now; waking it and travelling come in the next steps.
- The standing stones block your light and sight, like rock. You can walk the cross and stand on the plate.
- A journey already saved gets the stone once, at the nearest clear spot to there. Only trees, stumps, branches and bushes are cleared; nothing you built moves.
- Decisions: D-589, D-590. Questions raised: Q-081, Q-082.

## 0.3.46 (2026-11-03)
- Fixed: on Android, the hero and the tiles could come back blank after the game had been in the background. Every picture the game keeps is now drawn again when the phone wipes it.
- Decisions: D-588.

## 0.3.45 (2026-11-03)
- Planning only, nothing in the game changed: waystones will be 5 × 5, with a walkable cross and a plate in the middle, and big landmarks like them will be placed by one shared tool from simple plans.
- Decisions: D-587. Questions raised: Q-080.
