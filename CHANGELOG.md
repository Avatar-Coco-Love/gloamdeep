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

## 0.3.115 (2026-11-07)
- A flask or herb mimic waking no longer rings the waystone's bells or starts its rune glowing. It wakes silently, as decided. The waystone still rings when it wakes.
- Decisions: D-662.

## 0.3.114 (2026-11-07)
- A slow tap works on every menu and card. Before, a press held a quarter of a second or longer did nothing off play, so a slow, careful tap on a phone was lost. In play, holding still walks as before.
- Decisions: D-661.

## 0.3.113 (2026-11-07)
- The tenth audit, part 1. Nothing in play changes. New floors are worked out about 5 times faster, the same floors as before, and the tests run in 35 seconds, not 59.
- Behind the scenes: touch in play has its own file; two long pages and five decisions moved to their own files, word for word. Four bug hunts, a docs read-through and a phone speed check found 19 bugs, some stale doc lines and one freeze, for you to pick fixes from.
- Decisions: D-660. D-648 to D-651 and D-653 moved to the archive, word for word.
