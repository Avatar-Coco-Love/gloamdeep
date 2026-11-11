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

## 0.3.263 (2026-11-11)
- New: Guard, the Growth tree's second-row upgrade on Body, 1 ember, bought once, its tile a small pale round shield. With it, about 1 bite in 6 glances off and hurts nothing, by the journey's dice, and the game says "The bite glances off you." With the Rat Hide Vest worn, each rolls its own dice, so about 3 bites in 8 glance off, and a bite the vest turns keeps its own line. An oil drink, a glob and a sting are not turned.
- Decisions: D-817.

## 0.3.262 (2026-11-11)
- New: Quick Pour, the first upgrade in the Growth tree's second row, on Light, 1 ember, bought once, its tile a tipped flask with a drop falling. With it, pouring a flask from the bag takes no turn: no oil burns, no creature moves, and the game says "You pour a flask." A Pond Minnow's oil still takes a turn.
- The first time the second row opens, walking down past depth 8 or by a dev jump, the game says "Growth has a new row."
- Decisions: D-816.

## 0.3.261 (2026-11-11)
- The Growth tree's second row opens the first time you go deeper than depth 8. Until then, picking one of its locked tiles says "Reach depth 9 to open." Once open, each branch has a dashed tile to come, and the row above shows locked. A journey already past depth 8 finds it open.
- Decisions: D-815.
