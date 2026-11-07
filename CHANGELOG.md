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

## 0.3.131 (2026-11-07)
- A creature's drops, mined finds that don't fit in the bag and berries picked from the garden bed never land under a creature or a person: they go to the next open tile, or where they came from when none is left. Before, a rare drop could lie hidden under another creature.
- Decisions: D-679. D-665 and D-666 moved to the archive, word for word.

## 0.3.130 (2026-11-07)
- Once the trapped peddler is free, digging another heap of rubble beside him is plain digging: the rubble's own lines, and he still leaves when he meant to. Before, he cheered the digging on and was freed a second time, thanking you again and waiting 5 more turns.
- Decisions: D-678. D-664 moved to the archive, word for word.

## 0.3.129 (2026-11-07)
- Nine materials with recipes, from Stone and Copper Ore to the Mimic Heart, now say "good for making things" when chosen in the bag, not "for crafting later". The eleven no recipe uses yet still say "for crafting later".
- Decisions: D-677. D-663 moved to the archive, word for word.
