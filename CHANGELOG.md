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

## 0.3.140 (2026-11-08)
- A new creature, the spit grub: a plump pale glowworm with a glowing green tail, drawn side on. It turns up from depth 4, never moves, and its faint green glow shows even in the dark. It has 1 heart, so one blow of anything ends it.
- For now it hurts you if you stand right beside it. Its spit, a glowing glob sent down a row or column at your lit lantern, comes next.
- A beaten spit grub leaves a Grub Skin about 1 time in 2, sold for 1, and now and then a rare Glow Gland, sold for 5.
- Decisions: D-688. D-675 moved to the archive, word for word.

## 0.3.139 (2026-11-07)
- With reduced motion on, the room in play is drawn once and kept until something in it changes, as under a card, so a phone does much less work and saves battery. Play looks and feels the same.
- Decisions: D-687. D-674 moved to the archive, word for word.

## 0.3.138 (2026-11-07)
- Under a card (the bag, pause, the map and the rest), the room behind it holds still instead of being drawn again 60 times a second, so a phone does much less work and saves battery. Its torches stop flickering until the card closes; the card itself moves as before.
- Decisions: D-686. D-673 moved to the archive, word for word.
