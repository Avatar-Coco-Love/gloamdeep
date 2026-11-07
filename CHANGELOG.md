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

## 0.3.138 (2026-11-07)
- Under a card (the bag, pause, the map and the rest), the room behind it holds still instead of being drawn again 60 times a second, so a phone does much less work and saves battery. Its torches stop flickering until the card closes; the card itself moves as before.
- Decisions: D-686. D-673 moved to the archive, word for word.

## 0.3.137 (2026-11-07)
- A cave room's rock and earth are painted in about half the time, so the pause on reaching depth 2 is shorter. The picture is the same, pixel for pixel.
- Decisions: D-685. D-672 moved to the archive, word for word.

## 0.3.136 (2026-11-07)
- At home, the peddler no longer says "Let me unpack. I'll have wares soon." while his card shows his wares. His two other home lines take turns, as before.
- Decisions: D-684. D-671 moved to the archive, word for word.
