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

## 0.3.323 (2026-11-12)
- At the Peddler, pressing SELL on an empty slot, or on something he doesn't buy, no longer moves the frame, so a second press can't sell something else by mistake.
- When you sell the last of a stack, the frame stays put and the next stack slides in under it, as before.
- When the Peddler goes home, he never stands on your tile or on a creature's.
- Talking to the freed Peddler never makes him leave sooner: he still waits his 5 turns, or 3 more after a late bump.
- Decisions: D-878. Questions closed: Q-102. D-875 moved to the archive, word for word.

## 0.3.322 (2026-11-12)
- With Sound Off, the game no longer downloads its sounds. They download once you turn Sound On, which saves phone data.
- Each place's music downloads the first time you reach that place, not all five tunes at once.
- Decisions: D-877. D-874 moved to the archive, word for word.

## 0.3.321 (2026-11-12)
- After a night's sleep, in your bed or sleeping out, what was due to grow back by morning is there when you wake. Before, nothing grew back at home while you stayed, since daylight lights every tile.
- Still pools in the grey-rock caves are now in about 1 room in 2, as decided. Before, many tries cut the room in two and were given up, so only about 1 room in 4 had one.
- A pool never wraps round three sides of a floor tile any more, so a herb on one no longer seems to float.
- Decisions: D-876. Questions closed: Q-101. D-873 moved to the archive, word for word.
