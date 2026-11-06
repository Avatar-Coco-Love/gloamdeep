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

## 0.3.83 (2026-11-06)
- A new journey now opens with its first words, on a card in the middle of the dim crypt: "You wake in the dark of the crypt. Your lantern still burns, but its oil will not last. Something waits below." Begin, or a tap anywhere, starts the journey.
- Decisions: D-628, D-629. D-620 moved to the archive, word for word.

## 0.3.82 (2026-11-06)
- The dev panel has a new Spots section, its tab a bookmark, with three test spots kept on this device. Save puts the game as it is now into a slot; Load brings it back at once, no turn passed. Each slot's line says what it holds, like 1 · DEPTH 3 · TURN 120, or EMPTY. A loaded spot counts as a dev jump, so that journey's records stop counting.
- Decisions: D-627. D-608 moved to the archive, word for word.

## 0.3.81 (2026-11-06)
- The dev panel's Oil section has an Endless oil switch. While it is on, the lantern never runs down: turns burn no oil, and an oil tick still drinks, with its line, sip and flicker, but takes none. The oil stays where it was, so a dim lantern stays dim. It stays on in this game until you switch it off; a new game starts with it off.
- Decisions: D-626.
